import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";

export default function ClipMe() {
    return (
        <DefaultLayout>
            <section id="home"
                className="snap-start flex flex-col items-center justify-center gap-4 py-8 pb-56 md:pt-16 md:pb-72"
            >
                <div className="inline-block max-w-lg text-center">
                    <span className={title({ color: "violet", size: "lg" })}>
                        Auto Clip&nbsp;
                    </span>
                    <br />
                    <div className={subtitle({ class: "mt-4" })}>
                        Generate and download Youtube videos clips in few clicks using AI
                    </div>
                </div>
            </section>

        </DefaultLayout>
    )
}
