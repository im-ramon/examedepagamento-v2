import { Aside } from "../Aside";

interface LayoutRouteAppProps {
    children: React.ReactNode;
}

export default function LayoutRouteApp({ children }: LayoutRouteAppProps) {
    return (
        <div className="flex relative h-screen">
            <Aside />
            <main className="flex-1 px-3 py-3 md:px-12 md:py-3 bg-slate-100 dark:bg-gray-800">
                {children}
            </main>
        </div>
    );
};