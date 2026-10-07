import type { Metadata } from "next";
import { getStartProjectPage } from "@/src/lib/content";
import { toMetadata } from "@/src/lib/seo";
import { BriefForm } from "@/src/components/brief-form/brief-form";
import { PageLayout } from "@/src/components/ui/page-layout/page-layout";
import { Section } from "@/src/components/ui/section/section";

export const metadata: Metadata = toMetadata(getStartProjectPage().seo);

const StartProjectPage = () => {
  return <PageLayout showScrollPrompt={false}><Section className="pb-24 pt-10 md:pb-32 md:pt-16"><BriefForm /></Section></PageLayout>;
}

export default StartProjectPage;
