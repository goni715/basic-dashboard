"use client";

import React from "react";
import { FileText } from "lucide-react";
import ContentEditorPage from "@/components/settings/ContentEditorPage";

const TermsConditionPage = () => {
  return (
    <ContentEditorPage
      contentType="terms-condition"
      title="Terms &amp; Conditions"
      subtitle="Manage terms of service, membership rules, and shop redemption guidelines."
      icon={FileText}
    />
  );
};

export default TermsConditionPage;
