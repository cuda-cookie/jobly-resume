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

  const t = useTranslations();

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

  const models = [
    {
      id: "openrouter",
      name: "OpenRouter (DeepSeek)",
      description: "Access DeepSeek V3 - The most cost-effective and high-speed model available.",
      icon: Sparkles,
      link: "https://openrouter.ai/keys",
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950/50",
      isConfigured: !!openrouterApiKey,
    }
  ];

  return (
    <div className="mx-auto py-8 px-4 max-w-3xl">
      <div className="space-y-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-blue-600" />
            AI Configuration
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We use <strong>OpenRouter</strong> to provide the best balance between speed, cost, and quality using <strong>DeepSeek V3</strong>.
          </p>
        </div>

        <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl p-8 shadow-sm space-y-8">
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label className="text-base font-semibold">
                  OpenRouter API Key
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
                placeholder="sk-or-v1-..."
                className={cn(
                  "h-12 text-lg",
                  "bg-gray-50 dark:bg-gray-950",
                  "border-gray-200 dark:border-gray-800",
                  "focus:ring-2 focus:ring-primary/20 transition-all"
                )}
              />
              <p className="text-sm text-muted-foreground">
                Your API key is stored locally in your browser and never sent to our servers.
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
          <Check className={cn("h-4 w-4", openrouterApiKey ? "text-green-500" : "text-gray-300")} />
          {openrouterApiKey ? "Ready to use AI features" : "Configuration required to use AI features"}
        </div>
      </div>
    </div>
  );
};

export default AISettingsPage;
