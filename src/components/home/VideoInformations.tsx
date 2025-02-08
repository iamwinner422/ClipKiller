
import { videoInfo } from "@/types";
import { Button } from "@heroui/button";
import VideoInfoSkeleton from "@/components/VideoInfoSkeleton";
import VideoInfoCard from "@/components/VideoInfoCard";

interface Props {
    loading: boolean;
    error: string | undefined;
    videoInfo: videoInfo | undefined;
    manualClip?: boolean;
    retryFunction: () => void;
}
export default function VideoInformations({ loading, error, videoInfo, manualClip, retryFunction }: Props) {
    return (
        <div>

            <div className="flex flex-col gap-3">
                <div className="w-full h-full size-full md:py-8 md:px-6">
                    {loading && (
                        <VideoInfoSkeleton manualClip={manualClip}/>
                    )}
                    {!loading && Object.keys(videoInfo?.channel ?? {}).length > 0 && (
                        <VideoInfoCard videoInfo={videoInfo} manualClip={manualClip}/>
                    )}
                    {!loading && error && error.length > 0 && (
                        <div className="my-12 flex flex-col gap-y-3 items-center justify-center">
                            <p className="text-red-500">{error}</p>
                            <Button onPress={retryFunction} variant="ghost" color={manualClip ? "primary" : "secondary"} radius="full" className="w-24">
                                Retry
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}
