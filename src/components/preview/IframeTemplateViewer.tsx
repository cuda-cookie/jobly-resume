
import React, { useMemo } from "react";
import { useParams } from "next/navigation";
import ResumeTemplateComponent from "../templates";
import { cn } from "../../lib/utils";
import { normalizeFontFamily } from "@/utils/fonts";
import {
  TEMPLATE_PREVIEW_HEIGHT_PX,
  TEMPLATE_PREVIEW_WIDTH_PX,
  TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE,
  createTemplatePreviewData,
  getTemplateById,
  isTemplatePreviewLocale,
} from "@/lib/templatePreview";

const IframeTemplateViewer = () => {
  const { id } = useParams();
  const searchParams =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search)
      : null;
  const localeParam = searchParams?.get("locale");
  const cookieLocale =
    typeof document !== "undefined"
      ? document.cookie
        .split("; ")
        .find((row) => row.startsWith("NEXT_LOCALE="))
        ?.split("=")[1]
      : null;
  const locale = isTemplatePreviewLocale(localeParam)
    ? localeParam
    : isTemplatePreviewLocale(cookieLocale)
      ? cookieLocale
      : "zh";
  const isSnapshotMode = searchParams?.get("snapshot") === "1";

  const template = useMemo(() => {
    const templateId = Array.isArray(id) ? id[0] : id;
    return getTemplateById(templateId);
  }, [id]);

  const mockData = useMemo(() => {
    return createTemplatePreviewData(template, locale);
  }, [locale, template]);
  const selectedFontFamily = normalizeFontFamily(
    mockData.globalSettings?.fontFamily
  );

  return (
    <div
      className={cn(
        "w-full min-h-screen overflow-hidden bg-white",
        isSnapshotMode ? "flex items-start justify-start p-0" : "flex items-start justify-center"
      )}
    >
      <div
        {...{ [TEMPLATE_SNAPSHOT_ROOT_ATTRIBUTE]: "" }}
        className={cn(
          "bg-white relative origin-top-left",
          isSnapshotMode ? "" : "mx-auto"
        )}
        style={{
          width: `${TEMPLATE_PREVIEW_WIDTH_PX}px`,
          minWidth: `${TEMPLATE_PREVIEW_WIDTH_PX}px`,
          height: isSnapshotMode
            ? `${TEMPLATE_PREVIEW_HEIGHT_PX}px`
            : undefined,
          minHeight: `${TEMPLATE_PREVIEW_HEIGHT_PX}px`,
          overflow: "hidden",
          fontFamily: selectedFontFamily,
          padding: `${template.spacing.contentPadding}px`,
        }}
      >
        <ResumeTemplateComponent data={mockData} template={template} />
      </div>
    </div>
  );
};

export default IframeTemplateViewer;
