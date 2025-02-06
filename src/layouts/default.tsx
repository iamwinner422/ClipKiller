import { Navbar } from "@/components/navbar";
export default function DefaultLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar />
            <main className="container h-full mx-auto max-w-7xl px-6 flex items-center justify-center flex-grow">
                {children}
            </main>
            <footer className="w-full flex items-center justify-center py-3">
                <p className="text-default-600">Made with ❤️ in Togo</p>
            </footer>
        </div>
    );
}
