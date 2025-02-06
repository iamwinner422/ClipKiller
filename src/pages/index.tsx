
import {Input} from "@heroui/input";
import { title, subtitle } from "@/components/primitives";
import { LinkIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import { Sparkles } from 'lucide-react';

export default function IndexPage() {
    return (
        <DefaultLayout>
            <section className="h-full flex flex-col items-center justify-center">
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
                            startContent={<LinkIcon />} radius="full" className="w-full"
                            variant="bordered" size="lg" isClearable={true}
                        />
                        </div>
                        <button className="w-full sm:w-auto flex gap-x-2 items-center justify-center px-4 shadow bg-[#b249f8] hover:bg-[#b249f8]/90 font-medium text-white py-3 rounded-full">
                            Generate
                            <Sparkles size={18} className="font-semibold"/>
                        </button>
                    </div>


                </div>
            </section>
        </DefaultLayout>
    );
}
