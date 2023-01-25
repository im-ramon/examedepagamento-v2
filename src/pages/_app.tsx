import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import type { ReactElement, ReactNode } from 'react'
import { useEffect } from 'react'
import { Flip, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useDarkMode } from 'usehooks-ts'
import '../../styles/globals.css'
import '../../styles/styles.scss'
import { AppProvider } from '../contexts/app.context'

function addInitialStyleClassInBodyTag(): void {
    const bodyClassList = document.querySelector('body')?.classList
    bodyClassList?.add('dark:bg-gray-800')
    bodyClassList?.add('dark:text-white')
    bodyClassList?.add('text-gray-900')
}

function toggleThemeModeThroughTheHtmlTag(themeMode: boolean): void {
    const htmlClassList = document.querySelector('html')?.classList
    if (themeMode) {
        htmlClassList?.add('dark')
        htmlClassList?.remove('light')
    } else {
        htmlClassList?.add('light')
        htmlClassList?.remove('dark')
    }
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
    getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout
}

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    const { isDarkMode } = useDarkMode()

    useEffect(() => {
        addInitialStyleClassInBodyTag()
    }, [])

    useEffect(() => {
        toggleThemeModeThroughTheHtmlTag(isDarkMode)
    }, [isDarkMode])


    const getLayout = Component.getLayout ?? ((page) => page)

    return getLayout(
        <AppProvider>
            <Component {...pageProps} />
            <ToastContainer
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                transition={Flip}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                toastClassName='rounded-2xl dark:bg-gray-800 dark:text-white shadow-md'
                className='text-sm mr-4'
                theme={`${isDarkMode ? 'dark' : 'light'}`}
            />
        </AppProvider>
    )
}