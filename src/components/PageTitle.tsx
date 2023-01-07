interface PageTitleProps {
    title: string;
    sub_title?: string;
}

export default function PageTitle({ title, sub_title }: PageTitleProps) {
    return (
        <div>
            <h1 className="text-4xl mt-8">{title}</h1>
            <h1 className="text-gray-500 dark:text-gray-400 text-justify text-md mt-2 mb-8">{sub_title}</h1>
        </div>
    );
};