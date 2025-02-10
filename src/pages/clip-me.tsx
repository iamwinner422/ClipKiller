import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import LoadingSection from "@/components/LoadingSection";
import ClipMeBox from "@/components/ClipMeBox";
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
    const [startTime, setStartTime] = useState<string>("");
    const [duration, setDuration] = useState<string>("");
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
            if ((startTime === "" && duration === "") || (!numericRegex.test(startTime.toString()) || !numericRegex.test(duration.toString()))) {
                setError("Please provide a valid start time and duration.");
                setTimeout(() => setError(undefined), 5000);
            } else if (parseInt(startTime) < videoInfo.durationSeconds || (parseInt(startTime) + parseInt(duration)) > videoInfo.durationSeconds) {
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
                    {videoInfo && videoInfo.channel && (
                        <ClipMeBox handleDownload={handleDownload} startTime={startTime}
                            duration={duration} durationSeconds={videoInfo?.durationSeconds || 0}
                            setStartTime={setStartTime} setDuration={setDuration}
                        />
                    )}
                </Card>
            </section>

        </DefaultLayout>
    )
}
