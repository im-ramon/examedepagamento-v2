interface BlockTitleProps {
    title: string;
    sub_title?: string;
}

export default function BlockTitle({ title, sub_title }: BlockTitleProps) {
    return (
        <div>
            <h1 className="text-2xl mt-8">{title}</h1>
            <h1 className="text-gray-500 dark:text-gray-400 text-lg mt-2 mb-2">{sub_title}</h1>
        </div>
    );
};