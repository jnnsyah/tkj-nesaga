import LearningPathDetail from "@/components/pages/LearningPathDetail"

export default async function LearningPathDetailPage({ 
  params 
}: {
   params: Promise<{ id: string }>
}) {
  const {id} = await params;
  return(
    <LearningPathDetail id={id}/>
  )
}
