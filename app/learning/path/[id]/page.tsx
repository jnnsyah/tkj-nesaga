import { LearningPathDetail } from "@/components"

export default async function LearningPathDetailPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params;
  return (
    <LearningPathDetail id={id} />
  )
}
