import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Clock, Youtube } from "lucide-react";
import { videoInfo } from "@/types";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

interface Props {
    videoInfo?: videoInfo | undefined;
    manualClip?: boolean
}

export default function VideoInfoCard({ videoInfo, manualClip }: Props) {
    return (
        <div className=" w-full flex flex-col md:flex-row items-start  gap-4 relative">
            <Card isFooterBlurred={true} isBlurred={true} className="min-w-full md:min-w-[400px]">
                <Image isBlurred={true}
                    alt={videoInfo?.title}
                    src={videoInfo?.thumbnail}
                    className="aspect-auto h-[230px] md:h-[250px]"
                    width="100%"
                />
                <CardFooter className="absolute bg-background/30 bottom-0 border-t-1 border-zinc-100/20 z-10 justify-between">
                    <div className="flex items-center gap-x-1">
                        <Youtube size={18} />
                        <p className="text-sm font-bold overflow-hidden truncate w-11/12">{videoInfo?.channel}</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Clock size={18} />
                        <p className="text-sm font-bold">{videoInfo?.duration}</p>
                    </div>
                </CardFooter>
            </Card>
            <div className="overflow-x-auto w-full flex flex-col gap-3 px-3 ">
                <p className="uppercase font-bold lg:text-2xl text-xl truncate text-wrap">{videoInfo?.title}</p>
                {manualClip && (
                    <div className="mt-6 mb-6 md:mb-0 lg:absolute lg:bottom-0 flex flex-col gap-y-2">
                        <small className="text-default-500 text-wrap">*Both of the Start Time and Duration should be in seconds</small>
                        <div className="w-full flex items-center justify-start flex-col sm:flex-row gap-x-6 gap-y-3">
                            <div className="flex items-center gap-x-3">
                                <Input type="number" id="start-time" size="lg" placeholder="Start Time" className="h-12 w-1/2 sm:w-32 rounded-md" />
                                <Input type="number" id="duration" size="lg" placeholder="Duration" className="h-12 w-1/2 sm:w-32 rounded-md" />
                            </div>
                            <div className="w-full">
                                <Button className="w-full md:w-auto " size="lg" color="primary">Download</Button>
                            </div>
                            
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}