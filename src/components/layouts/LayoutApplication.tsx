import { useEffect } from 'react';
import { useDarkMode } from 'usehooks-ts';

interface LayoutApplicationProps {
    children: React.ReactNode;
}

export default function LayoutApplication({ children }: LayoutApplicationProps) {
    const { isDarkMode } = useDarkMode()
    useEffect(() => {
        const htmlClassList = document.querySelector('html')?.classList
        const bodyClassList = document.querySelector('body')?.classList

        bodyClassList?.add('dark:bg-gray-800')
        bodyClassList?.add('dark:text-white')
        bodyClassList?.add('text-gray-900')

        if (isDarkMode) {
            htmlClassList?.add('dark')
            htmlClassList?.remove('light')
        } else {
            htmlClassList?.add('light')
            htmlClassList?.remove('dark')
        }
    }, [isDarkMode])

    return (
        <>
            {children}
        </>
    )
}