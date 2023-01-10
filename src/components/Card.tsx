interface CardProps {
    children: React.ReactNode;
    title?: string;
}

export function Card({ children, title }: CardProps) {
    return (
        <div className="inline-block w-full mb-6 bg-gradient-to-l border-transparent dark:border dark:border-gray-700 relative from-white to-slate-50 dark:from-gray-700 dark:text-white dark:to-gray-750 rounded-xl py-4 px-4 shadow-sm">
            {title && <h1 className="text-lg font-bold mb-4">{title}</h1>}
            {children}
        </div>
    )
}