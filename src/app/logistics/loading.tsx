import { Skeleton } from "@/components/ui/skeleton"

export default function ManufacturingLogisticsLoading() {
  return (
    <div className="flex flex-col gap-6 p-6">
      <Skeleton className="h-10 w-[250px]" />
      <div className="grid grid-cols-1 gap-6">
        <Skeleton className="h-[300px] w-full" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Skeleton className="h-[400px] w-full" />
          <Skeleton className="h-[400px] w-full" />
        </div>
        <Skeleton className="h-[350px] w-full" />
      </div>
    </div>
  )
}
