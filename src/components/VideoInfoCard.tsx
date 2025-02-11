import { Card, CardFooter } from "@heroui/card";
import { Image } from "@heroui/image";
import { Clock, Youtube } from "lucide-react";
import { videoInfo } from "@/types";


interface Props {
    videoInfo?: videoInfo | undefined;
}

export default function VideoInfoCard({ videoInfo }: Props) {
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
                        <p className="text-sm font-bold overflow-hidden truncate w-9/12 md:w-11/12">{videoInfo?.channel}</p>
                    </div>
                    <div className="flex items-center gap-x-1">
                        <Clock size={18} />
                        <p className="text-sm font-bold">{videoInfo?.duration}</p>
                    </div>
                </CardFooter>
            </Card>
            <div className="overflow-x-auto w-full flex flex-col gap-3 px-3 ">
                <p className="uppercase font-bold lg:text-2xl text-xl truncate text-wrap">{videoInfo?.title}</p>
            </div>
        </div>
    )
}