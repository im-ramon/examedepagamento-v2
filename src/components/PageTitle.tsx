interface PageTitleProps {
    title: string;
}

export default function PageTitle({ title }: PageTitleProps) {
    return (
        <div>
            <h1 className="text-4xl my-8">{title}</h1>
        </div>
    );
};