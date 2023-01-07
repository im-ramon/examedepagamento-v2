import { Aside } from "../Aside";

interface LayoutRouteAppProps {
    children: React.ReactNode;
}

export default function LayoutRouteApp({ children }: LayoutRouteAppProps) {
    return (
        <div className="flex relative h-screen">
            <Aside />
            <main className="flex-1 px-3 py-6 md:px-12 md:pb-12 md:pt-4 bg-slate-100 dark:bg-gray-800 overflow-y-scroll">
                {children}
            </main>
        </div>
    );
};