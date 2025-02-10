import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

interface Props { 
    handleDownload: () => void
}

export default function ClipMeBox({handleDownload}: Props) {
    return (
        <div className="lg:absolute lg:bottom-0 lg:right-8 pb-4 lg:pb-8 px-4">
            <div className="mt-6 mb-6 md:mb-0 flex flex-col gap-y-2">
                <small className="text-default-500 text-wrap">*Both of the Start Time and Duration should be in seconds</small>
                <div className="w-full flex items-center justify-start flex-col sm:flex-row gap-x-6 gap-y-3">
                    <div className="flex items-center w-full justify-between gap-x-3">
                        <Input type="number" id="start-time" size="lg" placeholder="Start Time" className="h-12 w-1/2 lg:w-32 rounded-md" />
                        <Input type="number" id="duration" size="lg" placeholder="Duration" className="h-12 w-1/2 lg:w-32 rounded-md" />
                    </div>
                    <div className="w-full">
                        <Button className="w-full lg:w-auto" onPress={handleDownload} size="lg" color="primary">Download</Button>
                    </div>

                </div>
            </div>
        </div>

    )
}
