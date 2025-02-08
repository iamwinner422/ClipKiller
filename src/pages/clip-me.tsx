import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import { useState, useEffect } from "react";
import { Input } from "@heroui/input";
import { LinkIcon } from "@/components/icons";
import { Sparkles } from "lucide-react";

export default function ClipMe() {
    const [ytLink, setYtLink] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);


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
                                type="button"
                                disabled={loading}
                                className="w-full sm:w-auto flex gap-x-2 items-center justify-center px-4 shadow bg-primary hover:bg-primary/90 font-medium text-white py-3 rounded-full"
                            >
                                Clip
                            <Sparkles size={18} className="font-semibold" />
                        </button>
                        </div>
                    </div>
                </div>
            </section>

        </DefaultLayout>
    )
}
