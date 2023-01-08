import Image from 'next/image';
import loading from '../assets/images/svg/loading.svg';

interface ButtonDefaultProps {
    type: "button" | "submit" | "reset" | undefined;
    color: 'danger' | 'warning' | 'info' | 'default';
    variant: 'solid' | 'outline'
    children: string;
    isLoading?: boolean;
}

export function ButtonDefault({ type, children, isLoading, variant, color }: ButtonDefaultProps) {
    return (
        <button
            type={type}
            className={`
                flex justify-center items-center text-white transition-all border-2 border-transparent hover:brightness-90
                ${color == 'default' ? 'bg-primary-900 border-primary-900 focus:ring-4 ring-primary-900/50' : ''}
                ${color == 'warning' ? 'bg-warning border-warning focus:ring-4 ring-warning/50' : ''}
                ${color == 'danger' ? 'bg-danger border-danger focus:ring-4 ring-danger/50' : ''}
                ${color == 'info' ? 'bg-info border-info focus:ring-4 ring-info/50' : ''}
                focus:outline-none font-medium rounded-xl text-sm px-5 py-2.5 text-center mr-2 mb-2 
                ${isLoading ? 'opacity-60 cursor-wait' : ''}
                ${variant == 'outline' ? 'bg-transparent border-red-400' : ''}
            `}
            disabled={isLoading}
        >
            {children}
            {isLoading && <Image src={loading} alt="loading" width={16} className="ml-2" />}
        </button>

    )
}