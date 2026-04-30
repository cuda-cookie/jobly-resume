import { NextResponse } from "next/server";
import { AIModelType } from "@/config/ai";
import { AI_MODEL_CONFIGS } from "@/config/ai";

const parseUpstreamError = (raw: string, fallback: string) => {
  if (!raw) return { message: fallback };
  try {
    const data = JSON.parse(raw) as {
      error?: { message?: string; code?: string };
      message?: string;
    };
    return {
      message: data.error?.message || data.message || fallback,
      code: data.error?.code
    };
  } catch {
    return { message: raw };
  }
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let { apiKey, model, content, modelType, apiEndpoint } = body;

    // Use environment variables as fallback for production convenience
    if (!apiKey) {
      if (modelType === "openrouter") apiKey = process.env.OPENROUTER_API_KEY;
      else if (modelType === "deepseek") apiKey = process.env.DEEPSEEK_API_KEY;
      else if (modelType === "gemini") apiKey = process.env.GEMINI_API_KEY;
      else if (modelType === "doubao") apiKey = process.env.DOUBAO_API_KEY;
      else if (modelType === "openai") apiKey = process.env.OPENAI_API_KEY;
    }

    if (!apiKey) {
      return Response.json(
        { error: "API Key is required. Please configure it in Settings > AI." },
        { status: 400 }
      );
    }

    const modelConfig = AI_MODEL_CONFIGS[modelType as AIModelType];
    if (!modelConfig) {
      throw new Error("Invalid model type");
    }

    const response = await fetch(modelConfig.url(apiEndpoint), {
      method: "POST",
      headers: modelConfig.headers(apiKey),
      body: JSON.stringify({
        model: modelConfig.requiresModelId ? model : modelConfig.defaultModel,
        messages: [
          {
            role: "system",
            content: `You are a professional resume optimization assistant. Please help optimize the following text to make it more professional and compelling.
              
              Optimization Principles:
              1. Use more professional vocabulary and expressions.
              2. Highlight key achievements and skills.
              3. Maintain conciseness and clarity.
              4. Use active voice.
              5. Maintain the integrity of the original information.
              6. Preserve the input format (e.g., Markdown, bullet points).

              Strict Output Constraints (Must follow):
              1. Only output the "polished content" itself.
              2. Prohibited from outputting any preamble, explanation, summary, or additional advice.
              3. Prohibited from using introductory phrases like: "Here is...", "Based on...", "This is...", "Features:", "Explanation:", "Summary:", etc.
              4. Prohibited from adding new section titles or closing paragraphs unrelated to the original text.
              5. Do not wrap the result in Markdown code blocks (\`\`\`).
              6. If you generate any explanatory content, you must self-check and delete it before outputting, leaving only the final text.`,
          },
          {
            role: "user",
            content,
          },
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
      const rawError = await response.text();
      const parsedError = parseUpstreamError(rawError, fallbackMessage);
      return NextResponse.json(
        { error: parsedError },
        { status: response.status }
      );
    }

    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        if (!response.body) {
          controller.close();
          return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let pending = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) {
              break;
            }

            pending += decoder.decode(value, { stream: true });
            const lines = pending.split(/\r?\n/);
            pending = lines.pop() ?? "";

            for (const line of lines) {
              const trimmed = line.trim();
              if (!trimmed.startsWith("data:")) continue;

              try {
                const payload = trimmed.slice(5).trim();
                if (!payload || payload === "[DONE]") continue;

                const data = JSON.parse(payload) as {
                  error?: { message?: string };
                  choices?: Array<{ delta?: { content?: string } }>;
                };
                if (data.error?.message) {
                  controller.error(new Error(data.error.message));
                  return;
                }

                const content = data.choices?.[0]?.delta?.content;
                if (content) {
                  controller.enqueue(encoder.encode(content));
                }
              } catch (e) {
                console.error("Error parsing JSON:", e);
              }
            }
          }

          const tail = (pending + decoder.decode()).trim();
          if (tail.startsWith("data:")) {
            const payload = tail.slice(5).trim();
            if (payload && payload !== "[DONE]") {
              const data = JSON.parse(payload) as {
                choices?: Array<{ delta?: { content?: string } }>;
              };
              const content = data.choices?.[0]?.delta?.content;
              if (content) {
                controller.enqueue(encoder.encode(content));
              }
            }
          }

          controller.close();
        } catch (error) {
          console.error("Stream reading error:", error);
          controller.error(error);
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Polish error:", error);
    return NextResponse.json(
      { error: "Failed to polish content" },
      { status: 500 }
    );
  }
}

export const runtime = "edge";
