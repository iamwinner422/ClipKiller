import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import LoadingSection from "@/components/LoadingSection";
import { LinkIcon } from "@/components/icons";
import { Scissors } from "lucide-react";
import { fetchYTVideoMetadata, numericRegex, ytLinkRegex } from "@/config/utils";
import { useNavigate } from "react-router-dom";
import VideoInformations from "@/components/home/VideoInformations";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";
import { videoInfo } from "@/types";

export default function ClipMe() {
    const [ytLink, setYtLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | undefined>(undefined);
    const [showVideoInfo, setShowVideoInfo] = useState<boolean>(false);
    const [videoInfo, setVideoInfo] = useState<videoInfo | undefined>(undefined);
    const [startTime, setStartTime] = useState<number>(0);
    const [duration, setDuration] = useState<number>(0);
    const [isDownloaded, setIsDownloaded] = useState<boolean>(false);
    const navigate = useNavigate();



    const handleClip = () => {
        setShowVideoInfo(false);
        if (ytLink === "") {
            setError("Please provide a link to the Youtube video.");
            setTimeout(() => setError(undefined), 5000);
        } else if (!ytLinkRegex.test(ytLink)) {
            setError("Please provide a valid link to the Youtube video.");
            setTimeout(() => setError(undefined), 5000);
        } else {
            setLoading(true);
            setTimeout(() => {
                setShowVideoInfo(true);
                navigate("/clip-me#video-informations", { replace: true });
                fetchYTVideoMetadata(ytLink, setLoading, setError, setVideoInfo);

            }, 3000);
        }
    }


    const handleDownload = () => {
        if (videoInfo && videoInfo.channel) {
            if ((startTime !== 0 && duration !== 0) || (!numericRegex.test(startTime.toString()) || !numericRegex.test(duration.toString()))) {
                setError("Please provide a valid start time and duration.");
                setTimeout(() => setError(undefined), 5000);
            } else if (startTime < videoInfo.durationSeconds || (startTime + duration) > videoInfo.durationSeconds) {
                setError("Please provide a valid start time and duration.");
                setTimeout(() => setError(undefined), 5000);
            } else {
                setIsDownloaded(true);

            }
        }
    }


    // Scroll to video informations
    useEffect(() => {
        if (showVideoInfo) {
            const element = document.getElementById("video-informations");
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        }
    }, [showVideoInfo]);

    return (
        <DefaultLayout>
            <section id="home" className="snap-start flex flex-col items-center justify-center gap-4 py-8 pb-56 md:pt-16 md:pb-72">
                <div className="inline-block max-w-lg text-center">
                    <span className={title({ color: "blue", size: "lg" })}>
                        Clip Me&nbsp;
                    </span>
                    <br />
                    <div className={subtitle({ class: "mt-4" })}>
                        Clip any Youtube video by giving the start time and the duration
                    </div>
                </div>
                <div className="mt-8">
                    <div className="flex flex-wrap gap-x-3 items-center justify-center gap-y-2">
                        <div className="w-full sm:w-[25rem]">
                            <Input
                                type="text"
                                placeholder="Paste your Youtube video link..."
                                startContent={<LinkIcon />}
                                radius="full"
                                className="w-full"
                                value={ytLink}
                                onChange={(e) => setYtLink(e.target.value)}
                                disabled={loading}
                                variant="bordered"
                                size="lg"
                                isClearable={true}
                                onClear={() => setYtLink("")}
                            />
                        </div>
                        <button
                            type="button" onClick={handleClip}
                            disabled={loading}
                            className="md:w-32 w-full flex gap-x-2 items-center justify-center px-4 shadow bg-primary hover:bg-primary/90 font-medium text-white py-3 rounded-full"
                        >
                            Clip
                            <Scissors size={18} className="font-semibold" />
                        </button>
                    </div>
                    {error && (
                        <div className="mt-2">
                            <p className="text-red-500 text-center text-sm">{error}</p>
                        </div>
                    )}

                    {loading && (
                        <LoadingSection manualClip={true} />
                    )}
                </div>
            </section>

            <section id="video-informations" className={`md:px-8 pt-8 snap-start h-screen w-full ${showVideoInfo ? "" : "hidden"}`}>
                <Card radius="lg" className="relative">
                    <VideoInformations loading={loading} error={error} videoInfo={videoInfo}
                        retryFunction={() => handleClip()} manualClip={false}
                    />
                    <div className="absolute bottom-0 right-8 pb-8">
                        <div className="mt-6 mb-6 md:mb-0 flex flex-col gap-y-2">
                            <small className="text-default-500 text-wrap">*Both of the Start Time and Duration should be in seconds</small>
                            <div className="w-full flex items-center justify-start flex-col sm:flex-row gap-x-6 gap-y-3">
                                <div className="flex items-center gap-x-3">
                                    <Input type="number" id="start-time" size="lg" placeholder="Start Time" className="h-12 w-1/2 sm:w-32 rounded-md" />
                                    <Input type="number" id="duration" size="lg" placeholder="Duration" className="h-12 w-1/2 sm:w-32 rounded-md" />
                                </div>
                                <div className="w-full">
                                    <Button className="w-full md:w-auto" onPress={handleDownload} size="lg" color="primary">Download</Button>
                                </div>

                            </div>
                        </div>
                    </div>

                </Card>
            </section>

        </DefaultLayout>
    )
}
