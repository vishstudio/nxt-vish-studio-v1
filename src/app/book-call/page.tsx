import type { Metadata } from "next";
import { BookCall } from "@/src/components/book-call/book-call";
import { PageLayout } from "@/src/components/ui/page-layout/page-layout";
import { Section } from "@/src/components/ui/section/section";

export const metadata: Metadata = {
  title: "Schedule a Free Call | VISH Studio",
  description: "Choose a time for a free 20-30 minute strategy call with VISH Studio.",
};

const BookCallPage = () => {
  return (
    <PageLayout showScrollPrompt={false}>
      <Section className="pb-24 pt-10 md:pb-32 md:pt-16">
        <BookCall />
      </Section>
    </PageLayout>
  );
}

export default BookCallPage;
