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