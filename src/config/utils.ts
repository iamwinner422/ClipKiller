import { analysisResult, videoInfo } from "@/types";
import { GoogleGenerativeAI } from "@google/generative-ai"



const API_HOST = import.meta.env.VITE_API_HOST
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY




export const ytLinkRegex = /^((?:https?:)?\/\/)?((?:www|m)\.)?((?:youtube\.com|youtu.be))(\/(?:[\w\-]+\?v=|embed\/|v\/)?)([\w\-]+)(\S+)?$/
export const numericRegex = /^[0-9]+$/;
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
            `${API_HOST}/info?ytLink=${ytLink}`
        );

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Video not found (404)');
            } else {
                throw new Error(`Oops! Something went wrong (${response.status})`);
            }
        }
        const data: videoInfo = await response.json();
        setVideoInfo(data);

    } catch (error: any) {
        setError(error.message);
    } finally {
        setLoading(false);
    }

};


export async function analyzeYouTubeVideo(ytLink: string, setLoading: (loading: boolean) => void, setError: (error: string | undefined) => void, setResult: (result: analysisResult[]) => void) {
    const prompt = `Analyze the YouTube video "${ytLink}" and identify the key moments. Extract timestamps (start and duration in seconds) with a maximum duration of 1 minute and 20 seconds per moment.
    Extract at least 3 and at most 6 key moments, depending on the length of the video.
    Each moment should have a descriptive and engaging title that accurately summarizes its content. 
    The title must be in the same language as the video.
    Return the results as a JSON array in the following format:

    [
        {
            start: "0.34",
            duration: 75, // in seconds
            title: "Le secret d'une pâte à pizza parfaite révélé !"
        },
        {
            start: "1.00",
            duration: 55, // in seconds
            title: "Les étapes clés pour une pâte maison réussie"
        }
    ]`;


    const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const geminiModel = genAI.getGenerativeModel({model: 'gemini-2.0-flash-exp'});
    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      };

    try {
        const chatSession = geminiModel.startChat({generationConfig});
        const result = await chatSession.sendMessage(prompt);
        const response =  result.response;
        if(response.text().length === 0){
            setError('Oops! Cannot processing this video at this time.')
        }
        //const jsonResult = JSON.parse(response.text()) as analysisResult[];
        //setResult(jsonResult);
        //console.log("json",jsonResult);
        console.log("res",response);
    } catch (error: any) {
        console.error('Error:', error);
        setError("Something went wrong! Try again.");
    }finally {
        setLoading(false);
    }
}