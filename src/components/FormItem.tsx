import { BiQuestionMark } from "react-icons/bi";
import { Card } from "./Card";

interface FormItemProps {
    children: React.ReactNode;
    labelText?: string;
    supportText?: string;
    helpText?: string;
    badgeColor?: 'blue' | 'gray' | 'redred' | 'green' | 'yellow' | 'indigo' | 'purple' | 'pink' | 'red';
    badgeText?: string,
}

export const FormItem = ({ children, labelText, supportText, helpText, badgeColor, badgeText }: FormItemProps) => {
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
            {labelText && <label htmlFor="small-input" className="block mb-2 text-md dark:border border-none font-bold rounded-lg text-gray-900 dark:text-white">
                {labelText}
                {badgeColor && <span className={`ml-2 bg-${badgeColor}-100 text-${badgeColor}-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-${badgeColor}-900 dark:text-${badgeColor}-300`}>{badgeText}</span>}
            </label>}
            {supportText && <p className="block mb-4 text-sm text-gray-900 dark:text-white text-justify">{supportText}</p>}
            <div className='flex px-4 flex-wrap flex-col'>
                {children}
            </div>
        </Card>
    )
}