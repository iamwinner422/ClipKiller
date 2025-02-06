
import {Input} from "@heroui/input";
import {Progress} from "@heroui/progress";
import { title, subtitle } from "@/components/primitives";
import { LinkIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Sparkles } from 'lucide-react';
import { useState } from "react";
import { ytLinkRegex } from "@/config/utils";

export default function IndexPage() {
    const [ytLink, setYtLink] = useState<string>("");
    const [error, setError] = useState<string | undefined>(undefined);
    const [laoding, setLoading] = useState<boolean>(false);


    const handleGenerate = () => {
        if(ytLink === ""){
            setError("Please provide a link to the Youtube video.");
            setTimeout(() => setError(undefined), 5000);
        }else if(ytLinkRegex.test(ytLink) === false){
            setError("Please provide a valid link to the Youtube video.");
            setTimeout(() => setError(undefined), 5000);
        }else{
            setLoading(true);
        }
    }
    return (
        <DefaultLayout>
            <section id="#" className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    <span className={title({ color: "violet", size: 'lg' })}>Auto Clip&nbsp;</span>
                    <br />
                    <div className={subtitle({ class: "mt-4" })}>
                        Generate and download Youtube videos clips in few clicks using AI
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex flex-wrap gap-x-3 items-center justify-center gap-y-2">
                        <div className="w-full sm:w-[25rem]">
                            <Input type="text" placeholder="Paste your Youtube video link..."
                                startContent={<LinkIcon />} radius="full" className="w-full" value={ytLink}
                                onChange={(e) => setYtLink(e.target.value)} disabled={laoding}
                                variant="bordered" size="lg" isClearable={true} onClear={() => setYtLink("")}
                            />
                        </div>
                        <button type="button" disabled={laoding} onClick={handleGenerate} className="w-full sm:w-auto flex gap-x-2 items-center justify-center px-4 shadow bg-[#b249f8] hover:bg-[#b249f8]/90 font-medium text-white py-3 rounded-full">
                            Generate
                            <Sparkles size={18} className="font-semibold"/>
                        </button>
                        
                    </div>
                    {error && error !== "" &&(
                        <div className="mt-2">
                            <p className="text-red-500 text-center text-sm">{error}</p>
                        </div>
                    )} 
                    
                    {laoding && (
                        <div className="mt-16 flex flex-col justify-center items-center">
                            <p>Processing your video, please wait...</p>
                            <Progress isIndeterminate aria-label="Loading..." color="secondary" className="mt-2 w-1/2" size="sm" />
                        </div>
                    )}
                </div>
            </section>
        </DefaultLayout>
    );
}
