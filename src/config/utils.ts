import { videoInfo } from "@/types";

const API_HOST = import.meta.env.VITE_API_HOST


export const ytLinkRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/

export function parseVideoDuration(duration: string): string {
    const parts = duration.split(":").map(Number);

    if (parts.length === 3) {
        // Déjà au format HH:MM:SS
        return duration;
    } else if (parts.length === 2) {
        const [minutes, seconds] = parts;
        if (minutes >= 60) {
            // Convertir MM:SS en HH:MM:SS si les minutes dépassent 60
            const hours = Math.floor(minutes / 60);
            const remainingMinutes = minutes % 60;
            return `${hours}:${remainingMinutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
        } else {
            return duration; // Afficher directement MM:SS
        }
    } else {
        // Cas improbable, mais au cas où
        return `0:${duration.padStart(2, "0")}`;
    }
}


export const fetchYTVideoMetadata = async (ytLink: string, setLoading: (loading: boolean) => void, setError: (error: string | undefined) => void, setVideoInfo: (videoInfo: videoInfo) => void) => {
    try {
        const response = await fetch(
            `${API_HOST}/video-info?/videoURL=${ytLink}`
        );
        const data: videoInfo = await response.json();
        setVideoInfo(data);

    } catch (error: any) {
        setError(error.message);
    }finally{
        setLoading(false);
    }

};