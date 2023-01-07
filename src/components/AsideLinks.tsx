import Link from "next/link";

interface AsideLinksProps {
    title: string;
    children: React.ReactNode;
    to: string;
    onClick?: () => void
}

export default function AsideLinks({ title, children, to, onClick }: AsideLinksProps) {
    return (
        <li onClick={onClick}>
            <Link href={to} className="relative no-underline justify-between flex flex-row items-center h-11 focus:outline-none dark:hover:bg-gray-700 dark:text-white hover:bg-gray-100 text-gray-600 outline-none hover:text-gray-800 transition-all pr-6">
                <span className="inline-flex justify-center items-center ml-4">
                    {children}
                </span>
                <span className="ml-2 text-sm tracking-wide truncate mr-auto">{title}</span>
                <div className="active-aside_link transition-all w-2 h-2 shadow-md rounded-sm bg-primary-600" />
            </Link>
        </li>
    );
}