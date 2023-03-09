import { Spinner } from 'flowbite-react';

interface ButtonDefaultProps {
    type: "button" | "submit" | "reset" | undefined;
    color: 'green' | 'blue' | 'orange' | 'purple' | 'red' | 'yellow' | 'red';
    variant: 'solid' | 'outline' | 'invisible'
    children: React.ReactNode;
    isLoading?: boolean;
    click?: Function;
    disabled?: boolean;
    helpText?: string;
}

export function ButtonDefault({ type, children, isLoading, variant, color, click, disabled, helpText }: ButtonDefaultProps) {
    return (
        <button title={helpText} type={type} className={`default_button shadow-md  rounded-full text-sm font-semibold ${color} ${disabled || isLoading ? 'cursor-not-allowed' : ''} ${variant == 'outline' ? 'text-gray-700' : 'text-white'} ${variant == 'invisible' && '!bg-none'}`} onClick={() => { click && click() }} disabled={isLoading || disabled}>
            <div className={`rounded-full flex items-center px-4 py-2.25 m-0.5 transition-all duration-300 ${variant == 'outline' ? 'bg-white text-black dark:bg-black dark:text-white hover:dark:bg-transparent' : ''} ${variant == 'invisible' && 'bg-none underline hover:bg-primary-400/10'}`}>
                {isLoading && <div className="mr-3 flex justify-center items-center -translate-y-0.5"><Spinner size="sm" light={true} /></div>}
                <div className={`flex items-center justify-center ${variant == 'outline' ? 'text-gray-800 dark:text-white' : ''}`}>
                    {children}
                </div>
            </div>
        </button>

        /* <Button title={helpText} className='mx-auto' size={size} color={color} gradientDuoTone={gradientDuoTone} pill={true} outline={variant == 'outline'} type={type} onClick={() => { click && click() }} disabled={isLoading || disabled}>
              {isLoading &&
                  <div className="mr-3 flex justify-center items-center -translate-y-0.5">
                      <Spinner size="sm" light={true} />
                  </div>}
              {children}
          </Button> 
      */
    )
}


<a href="#_" className="">


</a>