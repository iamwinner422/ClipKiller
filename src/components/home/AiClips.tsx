import { analysisResult } from "@/types";
import { Progress } from "@heroui/progress";
import { Button } from "@heroui/button";
import { Card, CardFooter } from "@heroui/Card";
import { Image } from "@heroui/image";




interface Props {
    loading: boolean;
    error: string | undefined;
    clips: analysisResult[]; 
    thumbnail?: string | undefined;
}



export default function AiClips({loading, error, clips, thumbnail}: Props) {
  return (
    <div className="mt-16 flex flex-col justify-center items-center">
        {loading && (
            <>
                <p>Processing, Finding best clips for you...</p>
                <Progress
                    isIndeterminate
                    aria-label="Loading..."
                    color="secondary"
                    className="mt-2 w-1/2"
                    size="sm"
                />   
            </>            
        )}
        {(!loading && clips.length > 0) ? (
            <div className="flex flex-col gap-y-3">
                <p>Humm... Cannot find any suitable clip for the moment! Please retry.</p>
                <Button variant="ghost" color="secondary" radius="full">
                    Retry
                </Button>
            </div>
        ): (
            <div className="flex flex-wrap gap-5">
                {clips.map((clip: analysisResult, index: number)=> {
                    return(
                        <Card shadow="sm" isBlurred={true} key={index} >
                            <Image isBlurred={true}
                                alt={clip.title}
                                src={thumbnail}
                                className="w-full object-cover h-[140px]"
                                width="100%"
                            />
                            <CardFooter className="text-small block">
                                
                            </CardFooter>
                        </Card>
                    )
                })}
            </div>
        )}
    </div>
  )
}
