import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";

export default function ClipMe() {
    return (
        <DefaultLayout>
            <section id="home"
                className="snap-start flex flex-col items-center justify-center gap-4 py-8 pb-56 md:pt-16 md:pb-72"
            >
                <div className="inline-block max-w-lg text-center">
                    <span className={title({ color: "blue", size: "lg" })}>
                        Clip Me&nbsp;
                    </span>
                    <br />
                    <div className={subtitle({ class: "mt-4" })}>
                        Clip any Youtube video by giving the start time and the duration
                    </div>
                </div>
            </section>

        </DefaultLayout>
    )
}
