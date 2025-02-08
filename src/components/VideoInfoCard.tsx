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
        <div className=" w-full flex items-start gap-4 relative">
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
                        <Clock size={18} />
                        <p className="text-sm font-bold">{videoInfo?.duration}</p>
                    </div>
                </CardFooter>
            </Card>
            <div className="w-full flex flex-col gap-3">
                <p className="uppercase font-bold text-2xl">{videoInfo?.title}</p>
                {manualClip && (
                    <div className="mt-6 flex gap-x-6 absolute bottom-0">
                        <div className="flex items-center gap-x-3">
                            <Input type="number" id="start-time" size="lg" placeholder="Start Time" className="h-12 w-32 rounded-md" />
                            <Input type="number" id="duration" size="lg" placeholder="Duration" className="h-12 w-32 rounded-md" />
                        </div>
                        <Button className="w-40" size="lg" color="primary">Download</Button>
                    </div>
                )}
            </div>
        </div>
    )
}