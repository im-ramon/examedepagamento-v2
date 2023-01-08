import { BiQuestionMark } from "react-icons/bi";
import { Card } from "./Card";

interface FormItemProps {
    children: React.ReactNode;
    labelText?: string;
    supportText: string;
    helpText?: string;
}

export const FormItem = ({ children, labelText, supportText, helpText }: FormItemProps) => {
    return (
        <Card>
            {helpText && (
                <div className='help_box-container absolute -top-1 -right-1 cursor-pointer bg-white dark:bg-gray-700 shadow-md p-1 box-content rounded-lg transition-all hover:text-primary-900 dark:hover:text-primary-300'>
                    <BiQuestionMark />
                    <div className="help_box-text w-96 text-xs text-justify text-white cursor-default bg-gray-900/70 rounded-lg p-4 absolute top-6 opacity-0 invisible right-0 z-20 transition-all shadow-md">
                        {helpText}
                    </div>
                </div>
            )}
            {labelText && <label htmlFor="small-input" className="block absolute -top-4 left-3 text-md mb-1 font-medium bg-white dark:border dark:border-gray-700 dark:bg-gray-800 px-2 rounded-lg text-gray-900 dark:text-white">{labelText}</label>}
            <p className="block mb-4 text-sm text-gray-900 dark:text-white">{supportText}</p>
            <div className='flex px-4 flex-wrap flex-col'>
                {children}
            </div>
        </Card>
    )
}