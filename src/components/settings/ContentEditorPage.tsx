/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import React, { useState, useEffect } from "react";
import type { LucideIcon } from "lucide-react";
import {
  Save,
  RotateCcw,
  Eye,
  Edit3,
  Clock,
  RefreshCw,
  Loader2,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import RichTextEditor from "@/components/common/RichTextEditor";
import { SuccessToast } from "@/helpers/ValidationHelper";
import { TContentType } from "@/constants/content.constant";
import {
  useGetContentByTypeQuery,
  useCreateUpdateContentMutation,
} from "@/redux/features/content/contentApi";

interface ContentEditorPageProps {
  contentType: TContentType;
  title: string;
  subtitle: string;
  icon: LucideIcon;
  initialContent?: string;
}

const ContentEditorPage = ({
  contentType,
  title,
  subtitle,
  icon: Icon,
  initialContent = "",
}: ContentEditorPageProps) => {
  const { data, isLoading, isFetching, refetch } =
    useGetContentByTypeQuery(contentType);
  const [createUpdateContent, { isLoading: isSaving }] =
    useCreateUpdateContentMutation();

  const [content, setContent] = useState<string>(initialContent);
  const [activeTab, setActiveTab] = useState<"edit" | "preview">("edit");
  const [hasInitialized, setHasInitialized] = useState(false);

  const serverContent = data?.data?.content;
  const serverUpdatedAt = data?.data?.updatedAt;

  // Sync content when server response is loaded
  useEffect(() => {
    if (serverContent !== undefined && serverContent !== null) {
      setContent(serverContent);
      setHasInitialized(true);
    } else if (initialContent && !hasInitialized) {
      setContent(initialContent);
    }
  }, [serverContent, initialContent, hasInitialized]);

  const formatLastUpdated = (dateString?: string) => {
    if (!dateString) return "Never updated";
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return "Recently";
      return new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      }).format(date);
    } catch {
      return dateString;
    }
  };

  const handleSave = async () => {
    if (isSaving) return;
    try {
      await createUpdateContent({
        type: contentType,
        content: content || "",
      }).unwrap();
    } catch {
      // Error handling is managed in contentApi onQueryStarted
    }
  };

  const handleReset = () => {
    if (window.confirm("Are you sure you want to reset any unsaved changes?")) {
      if (serverContent !== undefined && serverContent !== null) {
        setContent(serverContent);
      } else {
        setContent(initialContent);
      }
      SuccessToast("Content reset to current saved version");
    }
  };

  return (
    <div className="space-y-6 max-w-5xl">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary/10 text-primary">
              <Icon className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">
              {title}
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1.5 pl-0.5">
            {subtitle}
          </p>
        </div>

        {/* View Mode Switcher & Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => refetch()}
            disabled={isFetching}
            className="h-9 w-9 rounded-xl text-muted-foreground hover:text-foreground cursor-pointer"
            title="Refresh Content"
          >
            <RefreshCw
              className={`w-4 h-4 ${isFetching ? "animate-spin text-primary" : ""}`}
            />
          </Button>

          <div className="flex items-center gap-1.5 p-1 bg-secondary/80 rounded-xl border border-border">
            <button
              type="button"
              onClick={() => setActiveTab("edit")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "edit"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              <span>Editor</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                activeTab === "preview"
                  ? "bg-card text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Live Preview</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <Card className="bg-card border border-border rounded-2xl p-4 sm:p-6 shadow-2xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-border text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-primary" />
            <span>
              Last updated:{" "}
              {isLoading ? (
                <span className="animate-pulse">Loading...</span>
              ) : (
                <strong className="text-foreground font-medium">
                  {formatLastUpdated(serverUpdatedAt)}
                </strong>
              )}
            </span>
          </div>
          <span className="bg-secondary px-2.5 py-0.5 rounded-full font-medium border border-border/60">
            {activeTab === "edit" ? "Rich Text Mode" : "Public View Preview"}
          </span>
        </div>

        {isLoading ? (
          <div className="min-h-[380px] rounded-xl bg-secondary/30 animate-pulse flex flex-col items-center justify-center gap-3 border border-border">
            <Loader2 className="w-7 h-7 animate-spin text-primary" />
            <span className="text-xs text-muted-foreground font-medium">
              Loading {title} content...
            </span>
          </div>
        ) : activeTab === "edit" ? (
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder={`Type ${title} content here...`}
            minHeight="380px"
          />
        ) : (
          <div className="min-h-[380px] p-6 rounded-xl bg-secondary/20 border border-border/80 prose prose-sm max-w-none text-foreground space-y-4">
            {content ? (
              <div
                className="quill-preview leading-relaxed space-y-3"
                dangerouslySetInnerHTML={{ __html: content }}
              />
            ) : (
              <p className="text-muted-foreground italic">
                No content available to preview.
              </p>
            )}
          </div>
        )}

        {/* Bottom Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-border">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleReset}
            disabled={isLoading || isSaving}
            className="cursor-pointer text-muted-foreground hover:text-destructive hover:border-destructive/40 w-full sm:w-auto"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1.5" />
            Reset to Saved Version
          </Button>

          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <Button
              type="button"
              onClick={handleSave}
              disabled={isSaving || isLoading}
              size="default"
              className="cursor-pointer w-full sm:w-auto px-6"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1.5 animate-spin" />
                  <span>Saving Changes...</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-1.5" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ContentEditorPage;
