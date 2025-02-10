import { Skeleton } from "@heroui/skeleton";

interface Props {
    manualClip?: boolean
}
export default function VideoInfoSkeleton({ manualClip }: Props) {
    return (
        <div className=" w-full flex items-start gap-4 relative">
            <div>
                <Skeleton className="flex rounded-lg max-w-full w-[400px] h-[200px] md:h-[250px]" />
            </div>
            <div className="w-full flex flex-col gap-3">
                <Skeleton className="h-4 w-3/5 rounded-lg" />
                <Skeleton className="h-4 w-4/5 rounded-lg" />
                <Skeleton className="h-4 w-2/5 rounded-lg" />
                {manualClip && (
                    <div className="mt-6 flex gap-x-6 absolute bottom-0">
                        <div className="flex items-center gap-x-3">
                            <Skeleton className="h-12 w-32 rounded-md" />
                            <Skeleton className="h-12 w-32 rounded-md" />
                        </div>
                        <Skeleton className="h-12 w-40 rounded-full" />
                    </div>
                )}
            </div>
        </div>
    )
}