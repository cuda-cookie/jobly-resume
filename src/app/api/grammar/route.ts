import { NextRequest, NextResponse } from "next/server";
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

export async function POST(req: NextRequest) {
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
      return NextResponse.json(
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
        response_format: {
          type: "json_object",
        },
        messages: [
          {
            role: "system",
            content: `You are a professional English resume proofreading assistant. Your task is **only** to identify spelling and punctuation errors in the resume.
            
            **Strict Prohibitions**:
            1. ❌ **Do not** provide suggestions for style, tone, polishing, or rewriting. If a sentence is grammatically correct (even if it doesn't sound "elegant"), **never** report it as an error.
            2. ❌ **Do not** report "no errors found" or similar messages. If no spelling or punctuation errors are found, the "errors" array must be empty.
            3. ❌ **Do not** over-correct professional terms unless you are certain they are typos based on context.

            **Check only these two types of errors**:
            1. ✅ **Typos/Spelling**: e.g., "manger" instead of "manager", "experince" instead of "experience".
            2. ✅ **Severe Punctuation Errors**: Only report repeated punctuation (e.g., ",,") or completely misplaced symbols.
            
            **Important Exceptions (Never report as errors)**:
            - ❌ **Ignore casing in technical terms**: e.g., "javascript" vs "JavaScript" is acceptable.
            - ❌ **Ignore spacing**: Do not report missing or extra spaces between words or punctuation.

            Response format example (JSON):
            {
              "errors": [
                {
                  "context": "The full sentence containing the error (must be original text)",
                  "text": "The specific error part (must be the exact string from the original text)",
                  "suggestion": "Only the corrected word or fragment (**do not** return the whole sentence unless the whole sentence is wrong)",
                  "reason": "Spelling / Punctuation error",
                  "type": "spelling"
                }
              ]
            }
            
            Again: **Only find spelling and punctuation errors, do not perform any polishing!**`,
          },
          {
            role: "user",
            content: content,
          },
        ],
      }),
    });

    const raw = await response.text();
    if (!response.ok) {
      const fallbackMessage = `Upstream API error: ${response.status} ${response.statusText}`;
      const parsedError = parseUpstreamError(raw, fallbackMessage);
      return NextResponse.json(
        { error: parsedError },
        { status: response.status }
      );
    }

    let data: unknown;
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch {
      return NextResponse.json(
        { error: "Invalid upstream response: expected JSON payload" },
        { status: 502 }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in grammar check:", error);
    return NextResponse.json(
      { error: "Failed to check grammar" },
      { status: 500 }
    );
  }
}
export const runtime = "edge";
