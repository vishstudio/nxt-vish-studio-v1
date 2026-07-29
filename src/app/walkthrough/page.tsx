import type { Metadata } from "next";
import { Walkthrough } from "@/src/components/walkthrough/walkthrough";
import { PageLayout } from "@/src/components/ui/page-layout/page-layout";

export const metadata: Metadata = {
  title: "Portal Walkthrough | VISH Studio",
  description: "A guided walkthrough of the VISH Studio client portal experience.",
};

export default function WalkthroughPage() {
  return (
    <PageLayout showScrollPrompt={false}>
      <Walkthrough />
    </PageLayout>
  );
}
