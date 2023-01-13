import Link from "next/link";
import { useRouter } from "next/router";

interface AsideLinksProps {
    title: string;
    children: React.ReactNode;
    to: string;
    onClick?: () => void
}

export default function AsideLinks({ title, children, to, onClick }: AsideLinksProps) {
    const router = useRouter()
    return (
        <li onClick={onClick}>
            <Link href={to} className={`relative no-underline justify-between flex flex-row items-center h-11 focus:outline-none dark:hover:bg-gray-700 dark:text-white hover:bg-gray-100 text-gray-600 outline-none hover:text-gray-800 transition-all pr-6 ${router.asPath == to ? 'bg-gray-500/10' : 'bg-transparent'}`}>
                <span className="inline-flex justify-center items-center ml-4">
                    {children}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate mr-auto">{title}</span>
                <div className={`transition-all w-2 h-2 rounded-sm ${router.asPath == to ? 'bg-primary-600 shadow-md' : 'bg-transparent'}`} />
            </Link>
        </li>
    );
}