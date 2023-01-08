
interface FormBlockContainerProps {
    children: React.ReactNode;
}

export const FormBlockContainer = ({ children }: FormBlockContainerProps) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-500/5 shadow-md rounded-lg px-4 py-6'>
            {children}
        </div>
    )
}
