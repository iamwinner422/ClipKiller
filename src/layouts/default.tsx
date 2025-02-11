import { Navbar } from "@/components/navbar";

interface Props {
    children: React.ReactNode;
    showMenu?: boolean;
}

export default function DefaultLayout({children, showMenu}: Props) {
    return (
        <div className="relative flex flex-col h-screen">
            <Navbar showMenu={showMenu} />
            <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
                {children}
            </main>
            <footer className="fixed left-0 right-0 bottom-0 w-full flex items-center justify-center py-1">
                <p className="text-default-600">Made with ❤️ in Togo</p>
            </footer>
        </div>
    );
}
