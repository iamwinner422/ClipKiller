import { Navbar } from "@/components/navbar";
export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                {children}
            </main>
            <footer className="backdrop-blur-lg fixed left-0 right-0 bottom-0 w-full flex items-center justify-center py-3">
                <p className="text-default-600">Made with ❤️ in Togo</p>
            </footer>
        </div>
    );
}
