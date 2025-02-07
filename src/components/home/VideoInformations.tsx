
import { Button } from "@heroui/button";
import { Skeleton } from "@heroui/skeleton";
import { Card } from "@heroui/Card";


interface Props {
    loading: boolean;
    error: string | undefined;
}
export default function VideoInformations({ loading, error }: Props) {
    return (
        <div className="p-8">
            {loading && (
                <div className="flex flex-col gap-3">
                    <Card className="w-full h-full size-full py-8 px-6" radius="lg">
                    <div className=" w-full flex items-start gap-4">
                        <div>
                            <Skeleton className="flex rounded-lg max-w-full w-[400px] h-[250px]" />
                        </div>
                        <div className="w-full flex flex-col gap-3">
                            <Skeleton className="h-4 w-3/5 rounded-lg" />
                            <Skeleton className="h-4 w-4/5 rounded-lg" />
                            <Skeleton className="h-4 w-2/5 rounded-lg" />
                        </div>
                    </div>
                    </Card>
                </div>
            )}
        </div>
    )
}
