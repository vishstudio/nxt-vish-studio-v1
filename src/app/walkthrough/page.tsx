import type { Metadata } from "next";
import { getWalkthroughPage } from "@/src/lib/content";
import { toMetadata } from "@/src/lib/seo";
import { Walkthrough } from "@/src/components/walkthrough/walkthrough";
import { PageLayout } from "@/src/components/ui/page-layout/page-layout";

export const metadata: Metadata = toMetadata(getWalkthroughPage().seo);

const WalkthroughPage = () => {
  return (
    <PageLayout showScrollPrompt={false}>
      <Walkthrough />
    </PageLayout>
  );
}

export default WalkthroughPage;
