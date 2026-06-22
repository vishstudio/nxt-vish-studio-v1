import type { Metadata } from "next";
import { BriefForm } from "@/src/components/brief-form/brief-form";
import { PageLayout } from "@/src/components/ui/page-layout/page-layout";
import { Section } from "@/src/components/ui/section/section";

export const metadata: Metadata = {
  title: "Start a Project | VISH Studio",
  description: "Tell VISH Studio about your website, mobile app, software, or branding project.",
};

export default function StartProjectPage() {
  return <PageLayout showScrollPrompt={false}><Section className="pb-24 pt-10 md:pb-32 md:pt-16"><BriefForm /></Section></PageLayout>;
}
