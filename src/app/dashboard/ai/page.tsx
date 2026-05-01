"use client";

import { useEffect, useState } from "react";
import { Check, ExternalLink, Sparkles } from "lucide-react";
import { useTranslations } from "@/i18n/compat/client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAIConfigStore } from "@/store/useAIConfigStore";
import { cn } from "@/lib/utils";

const AISettingsPage = () => {
  const {
    openrouterApiKey,
    openrouterModelId,
    setOpenrouterApiKey,
    setOpenrouterModelId,
    selectedModel,
    setSelectedModel,
  } = useAIConfigStore();

  const [serverStatus, setServerStatus] = useState<"loading" | "configured" | "not_configured">("loading");
  const t = useTranslations();

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const res = await fetch("/api/ai/status");
        const data = await res.json();
        setServerStatus(data.status);
      } catch {
        setServerStatus("not_configured");
      }
    };
    checkStatus();
  }, []);

  // Force OpenRouter as the only choice
  useEffect(() => {
    if (selectedModel !== "openrouter") {
      setSelectedModel("openrouter");
    }
    // Force DeepSeek-V3 as the default cost-effective model
    if (!openrouterModelId || openrouterModelId === "") {
      setOpenrouterModelId("deepseek/deepseek-chat");
    }
  }, [selectedModel, openrouterModelId, setSelectedModel, setOpenrouterModelId]);

  const handleApiKeyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOpenrouterApiKey(e.target.value);
  };

  return (
    <div className="mx-auto py-8 px-4 max-w-3xl">
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
              <Sparkles className="h-8 w-8 text-blue-600" />
              AI Configuration
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              We use <strong>OpenRouter</strong> to provide the best balance between speed, cost, and quality using <strong>DeepSeek V3</strong>.
            </p>
          </div>
          
          <div className="flex flex-col items-end gap-2">
            <div className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-500",
              serverStatus === "configured" 
                ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 border border-green-200 dark:border-green-800"
                : serverStatus === "loading"
                  ? "bg-gray-100 text-gray-500 animate-pulse"
                  : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border border-amber-200 dark:border-amber-800"
            )}>
              <div className={cn(
                "h-2 w-2 rounded-full",
                serverStatus === "configured" ? "bg-green-500" : serverStatus === "loading" ? "bg-gray-400" : "bg-amber-500"
              )} />
              {serverStatus === "configured" ? "Server Connected" : serverStatus === "loading" ? "Checking..." : "Local-Only Mode"}
            </div>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">Production Status</span>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  OpenRouter API Key (Optional)
                </Label>
                <a
                  href="https://openrouter.ai/keys"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline flex items-center gap-1 font-medium"
                >
                  Get API Key from OpenRouter
                  <ExternalLink className="h-3 w-3" />
                </a>
              </div>
              <Input
                value={openrouterApiKey}
                onChange={handleApiKeyChange}
                type="password"
                placeholder={serverStatus === "configured" ? "Using server-side default key..." : "Enter your API key here..."}
                className={cn(
                  "h-12 text-lg",
                  "bg-gray-50 dark:bg-gray-950",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20 transition-all",
                  serverStatus === "configured" && !openrouterApiKey && "opacity-70"
                )}
              />
              <p className="text-sm text-muted-foreground">
                {serverStatus === "configured" 
                  ? "The system is currently using a global production key. You can still provide your own key (BYOK) below to use your own credits or higher rate limits."
                  : "No global production key detected. Please provide your own OpenRouter API key to use AI features."
                }
              </p>
            </div>

            <div className="pt-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-start gap-4 p-4 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30">
                <div className="mt-1">
                  <div className="h-2 w-2 rounded-full bg-blue-600 animate-pulse" />
                </div>
                <div>
                  <h4 className="font-bold text-blue-900 dark:text-blue-300">Automatic Model Selection</h4>
                  <p className="text-sm text-blue-800/80 dark:text-blue-400/80 mt-1">
                    System is locked to <strong>deepseek/deepseek-chat</strong> for maximum performance and minimum cost.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground justify-center">
          <Check className={cn("h-4 w-4", (openrouterApiKey || serverStatus === "configured") ? "text-green-500" : "text-gray-300")} />
          {(openrouterApiKey || serverStatus === "configured") ? "Ready to use AI features" : "Configuration required to use AI features"}
        </div>
      </div>
    </div>
  );
};

export default AISettingsPage;
