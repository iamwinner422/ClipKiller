import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
import {Input} from "@heroui/input";
import { title, subtitle } from "@/components/primitives";
import { LinkIcon, SearchIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import {Button} from "@heroui/button";
import { Sparkles, WandSparklesIcon } from 'lucide-react';

export default function IndexPage() {
    return (
        <DefaultLayout>
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
                <div className="inline-block max-w-lg text-center justify-center">
                    
                    <span className={title({ color: "violet", size: 'lg' })}>Auto Clip&nbsp;</span>
                    <br />
                    <div className={subtitle({ class: "mt-4" })}>
                        Generate and download Youtube videos clips in few clicks using AI
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex gap-x-3 items-center">
                        <Input type="text" placeholder="Paste your Youtube video link..."
                            startContent={<LinkIcon />} radius="full"
                            variant="bordered" size="lg" isClearable={true}
                        />
                        <button className="flex gap-x-2 items-center px-4 shadow bg-[#b249f8] font-semibold text-white py-3 rounded-full">
                            Generate
                            <Sparkles size={18} className="font-semibold"/>
                        </button>
                    </div>


                </div>
            </section>
        </DefaultLayout>
    );
}
