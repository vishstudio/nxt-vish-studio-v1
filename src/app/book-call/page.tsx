import type { Metadata } from "next";
import { BookCall } from "@/src/components/book-call/book-call";
import { PageLayout } from "@/src/components/ui/page-layout/page-layout";
import { Section } from "@/src/components/ui/section/section";

export const metadata: Metadata = {
  title: "Book Free Call | VISH Studio",
  description: "Book a free 20-30 minute discovery call with VISH Studio.",
};

export default function BookCallPage() {
  return (
    <PageLayout showScrollPrompt={false}>
      <Section className="pb-24 pt-10 md:pb-32 md:pt-16">
        <BookCall />
      </Section>
    </PageLayout>
  );
}
