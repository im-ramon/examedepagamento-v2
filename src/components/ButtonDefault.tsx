import Image from 'next/image';
import loading from '../assets/images/svg/loading.svg';

interface ButtonDefaultProps {
    type: "button" | "submit" | "reset" | undefined;
    color: 'green' | 'red' | 'orange' | 'blue' | 'yellow';
    variant: 'solid' | 'outline'
    children: React.ReactNode;
    isLoading?: boolean;
    click?: Function;
    disabled?: boolean;
}

export function ButtonDefault({ type, children, isLoading, variant, color, click, disabled }: ButtonDefaultProps) {
    return (
        <button
            type={type}
            className={`
                relative no-underline inline-flex mx-2 items-center justify-center p-4 px-5 py-2 overflow-hidden font-medium text-primary-600 transition duration-300 ease-out rounded-full shadow-xl group hover:ring-2 hover:ring-gray-500/50
                ${isLoading ? 'opacity-60 cursor-wait' : ''}
                ${variant == 'outline' ? 'bg-transparent !text-gray-900 dark:!text-white' : ''}
            `}
            onClick={() => { click && click() }}
            disabled={isLoading || disabled}
        >
            {color == 'red' && <><span className={`absolute inset-0 w-full h-full bg-gradient-to-br from-red-400 via-red-600 to-red-900`}></span><span className={`absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-red-900 rounded-full opacity-30 group-hover:rotate-90 ease`}></span></>}
            {color == 'green' && <><span className={`absolute inset-0 w-full h-full bg-gradient-to-br from-primary-400 via-primary-600 to-primary-900`}></span><span className={`absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-primary-900 rounded-full opacity-30 group-hover:rotate-90 ease`}></span></>}
            {color == 'orange' && <><span className={`absolute inset-0 w-full h-full bg-gradient-to-br from-orange-400 via-orange-600 to-orange-900`}></span><span className={`absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-orange-900 rounded-full opacity-30 group-hover:rotate-90 ease`}></span></>}
            {color == 'blue' && <><span className={`absolute inset-0 w-full h-full bg-gradient-to-br from-sky-400 via-sky-600 to-sky-900`}></span><span className={`absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-sky-900 rounded-full opacity-30 group-hover:rotate-90 ease`}></span></>}
            {color == 'yellow' && <><span className={`absolute inset-0 w-full h-full bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600`}></span><span className={`absolute bottom-0 right-0 block w-64 h-64 mb-32 mr-4 transition duration-500 origin-bottom-left transform rotate-45 translate-x-24 bg-yellow-600 rounded-full opacity-30 group-hover:rotate-90 ease`}></span></>}
            <span className="relative text-white">{children}</span>
            <span className="relative text-white">{isLoading && <Image src={loading} alt="loading" width={18} className="ml-2" />}</span>

        </button>

    )
}


<a href="#_" className="">


</a>