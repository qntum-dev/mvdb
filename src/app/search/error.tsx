'use client'
import ErrorComp from "@/components/custom/ErrorComp"

 // Error boundaries must be Client Components
 
export default function Error({
  error,
}: {
  error: Error & { digest?: string }
}) {
    
  return (
    <div className="h-full">
      <ErrorComp error={error} text="No results found"/>
    </div>
  )
}