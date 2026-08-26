import { notFound } from "next/navigation";
import { CaseStudyView } from "@/components/CaseStudyView";
import { getCaseStudyBySlug, getWorkItemBySlug } from "@/lib/content";

type CaseStudyPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const work = getWorkItemBySlug(slug);
  const caseStudy = getCaseStudyBySlug(slug);

  if (!work || !caseStudy) {
    notFound();
  }

  return <CaseStudyView work={work} caseStudy={caseStudy} />;
}
