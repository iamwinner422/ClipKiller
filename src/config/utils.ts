import { videoInfo } from "@/types";

const API_HOST = import.meta.env.VITE_API_HOST
const




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
            `${API_HOST}/video-info?videoURL=${ytLink}`
        );
        const data: videoInfo = await response.json();
        setVideoInfo(data);

    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }

};


async function analyzeYouTubeVideo(ytLink: string) {
    const apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

    const prompt = `Analyze the YouTube video "${ytLink}" and identify the key moments. Extract timestamps (start and end) with a maximum duration of 1 minute and 20 seconds per moment.
    Extract at least 3 and at most 6 key moments, depending on the length of the video.
    Each moment should have a descriptive and engaging title that accurately summarizes its content. 
    The title must be in the same language as the video.
    Return the results as a JSON array in the following format:

    [
        {
            start: "0.34",
            end: "1.00",
            title: "Le secret d'une pâte à pizza parfaite révélé !"
        },
        {
            start: "1.00",
            end: "1.24",
            title: "Les étapes clés pour une pâte maison réussie"
        }
    ]`;

    const payload = {
        "contents": [{
            "parts": [{
                "text": prompt
            }]
        }],
    };


    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-goog-api-key': apiKey,
            },
            body: JSON.stringify(payload),
        });


        if (!response.ok) {
            throw new Error(`Erreur HTTP: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();

        if (data.candidates && data.candidates.length > 0 && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts.length > 0) {
            const generatedText = data.candidates[0].content.parts[0].text;

            try {
                const jsonTimestamps = JSON.parse(generatedText);
                return jsonTimestamps;
            } catch (error) {
                console.error('Erreur lors du parsing du JSON:', error, generatedText);
                return null;
            }
        }
        else {
            console.error('Réponse de l\'API inattendue', data)
            return null;
        }


    } catch (error) {
        console.error('Erreur lors de la requête à l\'API Gemini:', error);
        return null;
    }
}