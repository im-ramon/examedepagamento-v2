
interface FormBlockContainerProps {
    children: React.ReactNode;
}

export const FormBlockContainer = ({ children }: FormBlockContainerProps) => {
    return (
        <div className='columns-1 lg:columns-2 gap-6 bg-gray-300/5 shadow-md rounded-3xl px-8 pt-8'>
            {children}
        </div>
    )
}
