import { Inter } from '@next/font/google'
import Head from 'next/head'
import Link from 'next/link'
import { appIdentity } from '../utils/texts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>{appIdentity.app_name}</title>
                <meta name="description" content="Faça o exame de pagamento de pessoal, no âmbito do exército brasileiro, de forma fácil e descomplicada." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className='bg-red-600 text-blue-500'>
                <p>Hello word!s</p>
                <Link href="/app">APP</Link>
            </main>
        </>
    )
}
