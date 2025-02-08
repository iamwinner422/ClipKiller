
import { Image } from "@heroui/image";
import { Skeleton } from "@heroui/skeleton";
import { Card, CardFooter } from "@heroui/card";
import { videoInfo } from "@/types";
import {Clock, Youtube}from "lucide-react";
import { Button } from "@heroui/button";

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
                        <div className=" w-full flex items-start gap-4 relative">
                            <div>
                                <Skeleton className="flex rounded-lg max-w-full w-[400px] h-[250px]" />
                            </div>
                            <div className="w-full flex flex-col gap-3">
                                <Skeleton className="h-4 w-3/5 rounded-lg" />
                                <Skeleton className="h-4 w-4/5 rounded-lg" />
                                <Skeleton className="h-4 w-2/5 rounded-lg" />
                                <div className="mt-6 flex gap-x-6 absolute bottom-0">
                                    <div className="flex items-center gap-x-3">
                                        <Skeleton className="h-12 w-32 rounded-md" />
                                        <Skeleton className="h-12 w-32 rounded-md" />
                                    </div>
                                    <Skeleton className="h-12 w-40 rounded-full" />
                                </div>
                            </div>
                        </div>
                    )}
                    {!loading && Object.keys(videoInfo?.channel ?? {}).length > 0 && (
                        <div className=" w-full flex items-start gap-4">
                            <Card isFooterBlurred={true} isBlurred={true} className="min-w-full md:min-w-[400px]">
                                <Image isBlurred={true}
                                    alt={videoInfo?.title}
                                    src={videoInfo?.thumbnail}
                                    height={250}
                                    width="100%" 
                                />
                                <CardFooter className="absolute bg-background/30 bottom-0 border-t-1 border-zinc-100/20 z-10 justify-between">
                                    <div className="flex items-center gap-x-1">
                                        <Youtube size={18} />
                                        <p className="text-sm font-bold overflow-hidden truncate w-11/12">{videoInfo?.channel}</p>
                                    </div>
                                    <div className="flex items-center gap-x-1">
                                        <Clock size={18}/>
                                        <p className="text-sm font-bold">{videoInfo?.duration}</p>
                                    </div>
                                </CardFooter>
                            </Card>
                            <div className="w-full flex flex-col gap-3">
                                <p className="uppercase font-bold text-2xl">{videoInfo?.title}</p>
                            </div>
                        </div>
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
