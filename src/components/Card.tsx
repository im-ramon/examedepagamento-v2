interface CardProps {
    children: React.ReactElement;
    title: string;
}

export default function Card({ children, title }: CardProps) {
    return (
        <div className="mb-8 bg-gradient-to-r border-transparent dark:border dark:border-gray-700 from-white to-slate-50 dark:from-gray-700 dark:text-white dark:to-gray-750 rounded-xl py-4 px-4 shadow-sm">
            <h1 className="text-lg font-bold mb-4">{title}</h1>
            {children}
        </div>
    )
}