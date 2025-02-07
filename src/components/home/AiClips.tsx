import { analysisResult } from "@/types";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Card, CardFooter, CardHeader } from "@heroui/Card";
import { Image } from "@heroui/image";
import { Clock } from "lucide-react";



interface Props {
    loading: boolean;
    error: string | undefined;
    clips: analysisResult[];
    thumbnail?: string | undefined;
}



export default function AiClips({ loading, error, clips, thumbnail }: Props) {
    return (
        <div className="px-5">
            {loading && (
                <div className="mt-12 flex flex-col items-center justify-center">
                    <p>Processing, Finding best clips for you...</p>
                    <Progress
                        isIndeterminate
                        aria-label="Loading..."
                        color="secondary"
                        className="mt-2 w-1/2"
                        size="sm"
                    />
                </div>
            )}
            {(!loading && clips.length === 0) && (
                <div className="mt-12 flex flex-col gap-y-6 items-center justify-center">
                    <p>Humm... Cannot find any suitable clip for the moment! Please retry.</p>
                    <Button variant="ghost" color="secondary" radius="full" className="w-24">
                        Retry
                    </Button>
                </div>
            )}
            {!loading && clips.length > 0 && (
                <div className="flex flex-wrap justify-start gap-5 mb-5">
                    {clips.map((clip: analysisResult, index: number) => {
                        return (
                            <Card shadow="sm" className="w-[245px]" isBlurred={true} key={index}>
                                <CardHeader className="absolute z-10 top-1 flex-col !items-start">
                                    <h4 className="font-medium text-large truncate w-full">{clip.title}</h4>
                                </CardHeader>
                                <Image isBlurred={true}
                                    alt={clip.title}
                                    src={thumbnail}
                                    className="w-full object-cover h-[170px]"
                                    width="100%"
                                />
                                <CardFooter className="text-small flex flex-col gap-y-3 w-full">
                                    <p className="w-full ">{clip.title}</p>
                                    <div className="flex items-center justify-between w-full">
                                        <p className="text-sm font-medium">{clip.start}</p>
                                        <div className="flex items-center gap-x-1">
                                            <Clock size={15} />
                                            <p className="text-sm font-medium">{clip.duration}sec</p>
                                        </div>
                                    </div>
                                    <Button color="secondary" className="w-full">Download</Button>
                                </CardFooter>
                            </Card>
                        )
                    })}
                </div>
            )}
            {!loading && error && (
                <div className="flex items-center justify-center">
                    <p className="text-red-500">{error}</p>
                </div>
            )}
        </div>
    )
}
