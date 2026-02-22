import { LearningPathDetail } from "@/components"
import { Layout } from "@/components";

export default async function LearningPathDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <Layout>
      <LearningPathDetail id={id} />
    </Layout>
  )
}
