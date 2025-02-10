import { Progress } from "@heroui/progress";


interface Props {
    manualClip?: boolean;
}
export default function LoadingSection({manualClip}: Props) {
    return (
        <div className="mt-16 flex flex-col justify-center items-center">
            <p>Fetching video information, please wait...</p>
            <Progress
                isIndeterminate
                aria-label="Loading..."
                color={manualClip ? "primary": "secondary"}
                className="mt-2 w-1/2"
                size="sm"
            />
        </div>
    )
}
