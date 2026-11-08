"use client";

import { Info } from "lucide-react";
import ContentEditorPage from "@/components/settings/ContentEditorPage";

const AboutUsPage = () => {
  return (
    <ContentEditorPage
      contentType="about-us"
      title="About Us"
      subtitle="Publish your brand story, mission, and company information for customers and partners."
      icon={Info}
    />
  );
};

export default AboutUsPage;
