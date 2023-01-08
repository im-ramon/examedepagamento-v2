
interface FormBlockContainerProps {
    children: React.ReactNode;
}

export const FormBlockContainer = ({ children }: FormBlockContainerProps) => {
    return (
        <div className='columns-2 bg-gray-300/5 shadow-md rounded-3xl px-8 pt-12'>
            {children}
        </div>
    )
}
