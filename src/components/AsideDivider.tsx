interface AsideDividerProps {
    title: string;
}

export default function AsideDivider({ title }: AsideDividerProps) {
    return (
        <li className="px-3 select-none">
            <div className="flex flex-row border-b dark:border-b-gray-600 px-2 items-center h-8 justify-between">
                <div className="text-sm font-light tracking-wide text-gray-500 dark:text-gray-400">{title}</div>
            </div>
        </li>
    );
}