interface EmptyStateProps {
  text?: string
}

export function EmptyState({text = "Data tidak tersedia"} : EmptyStateProps) {
  return (
    <p className="col-span-2 text-center text-gray-500">
      {text}
    </p>
  )
}
