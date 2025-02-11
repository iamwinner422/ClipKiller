import { Link } from "@heroui/link";
import { Button } from "@heroui/button";
import DefaultLayout from "@/layouts/default";
export default function NotFoundPage() {
    return (
        <DefaultLayout showMenu={false}>
            <div className='snap-start flex flex-col gap-y-7 items-center justify-center absolute top-0 left-0 right-0 bottom-0'>
            <div className="flex flex-col items-center justify-center gap-y-1">
                <h1 className="font-bold text-4xl">404</h1>
                <p>The page you are looking for does not exist!</p>
                <div className="mt-4">
                    <Button as={Link} radius="full" href="/" color="primary">Go Home</Button>
                </div>
            </div>
        </div>
        </DefaultLayout>
    )
}
