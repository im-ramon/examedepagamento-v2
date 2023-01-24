import { Button, Spinner } from 'flowbite-react';

interface ButtonDefaultProps {
    type: "button" | "submit" | "reset" | undefined;
    color: 'gray' | 'dark' | 'light' | 'success' | 'failure' | 'warning' | 'purple';
    variant: 'solid' | 'outline'
    gradientDuoTone?: 'cyanToBlue' | 'greenToBlue' | 'pinkToOrange' | 'purpleToBlue' | 'purpleToPink' | 'redToYellow' | 'tealToLime';
    children: React.ReactNode;
    isLoading?: boolean;
    click?: Function;
    disabled?: boolean;
    size: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    helpText?: string;
}

export function ButtonDefault({ type, children, isLoading, variant, color, click, disabled, gradientDuoTone, size, helpText }: ButtonDefaultProps) {
    return (
        <Button title={helpText} className='mx-auto' size={size} color={color} gradientDuoTone={gradientDuoTone} pill={true} outline={variant == 'outline'} type={type} onClick={() => { click && click() }} disabled={isLoading || disabled}>
            {isLoading &&
                <div className="mr-3 flex justify-center items-center -translate-y-0.5">
                    <Spinner size="sm" light={true} />
                </div>}
            {children}
        </Button>
    )
}


<a href="#_" className="">


</a>