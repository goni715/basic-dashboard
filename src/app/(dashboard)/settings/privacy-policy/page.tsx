"use client";

import { ShieldCheck } from "lucide-react";
import ContentEditorPage from "@/components/settings/ContentEditorPage";

const PrivacyPolicyPage = () => {
  return (
    <ContentEditorPage
      contentType="privacy-policy"
      title="Privacy Policy"
      subtitle="Edit and maintain the official platform privacy policy published for members and partners."
      icon={ShieldCheck}
    />
  );
};

export default PrivacyPolicyPage;
