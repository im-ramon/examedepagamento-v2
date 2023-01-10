interface BlockTitleProps {
    title: string;
    sub_title?: string;
}

export default function BlockTitle({ title, sub_title }: BlockTitleProps) {
    return (
        <div>
            <h1 className="text-2xl mt-12 text-center mb-4 px-4 py-2 rounded-2xl bg-white/50 font-bold dark:bg-gray-900/50 shadow-md">{title}</h1>
            {sub_title && <h2 className="text-gray-500 dark:text-gray-400 text-lg mt-2 mb-2">{sub_title}</h2>}
        </div>
    );
};