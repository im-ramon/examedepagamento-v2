import { Inter } from '@next/font/google'
import Head from 'next/head'
import RouteLink from '../components/RouteLink'
import { appIdentity } from '../utils/util_texts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    return (
        <>
            <Head>
                <title>{appIdentity.app_name}</title>
                <meta name="description" content="Faça o exame de pagamento de pessoal, no âmbito do exército brasileiro, de forma fácil e descomplicada." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
                <title>{appIdentity.app_name + ' | Bem vindo!'}</title>
            </Head>
            <main id="home" className='w-full h-screen p-2 md:p-8 bg-gradient-to-r from-black to-primary-900/10 '>
                <div id='home-container' className="w-full relative h-full bg-black rounded-3xl shadow-xl p-4 max-w-8xl mx-auto bg-right bg-no-repeat bg-[url('/background-home.jpg')]">

                    <div className='bg-gray-900/30 flex justify-between rounded-2xl p-4 backdrop-blur-md border border-gray-800/75 shadow-md'>
                        <h1>Exame de pagamento | Logo</h1>
                        <ul className='flex no-underline'>
                            <li className='mx-2'><RouteLink href='/app' text='Dashboard' /></li>
                            <li className='mx-2'><RouteLink href='/auth/singin' text='Entrar' /></li>
                            <li className='mx-2'><RouteLink href='/auth/singup' text='Cadastrar-se' /></li>
                        </ul>
                    </div>

                    <div className='bg-black/80 py-2 backdrop-blur-sm rounded-xl md:bg-none md:px-8 md:backdrop-blur-none md:rounded-none md:bg-transparent'>

                        <div className='mt-8 text-sm text-white/50 italic'>&lt; web app /&gt;</div>
                        <div className='w-full md:w-3/4 lg:w-2/5'>
                            <div className='flex flex-col justify-start mb-8'>
                                <p>
                                    <span id="app_presatation" className='text-4xl md:text-7xl font-bold'>EXAME DE PAGAMENTO</span>
                                    {/* <p className='mt-8 px-1'>Uma <strong>nova forma</strong> de realiar o <strong>Exame de Pagamento de Pessoal</strong> no Exército Brasileiro!</p> */}
                                    <br />
                                    {/* <p className='px-1'>Poupe tempo, minimize erros, tenha acesso fácil à toda legislação e encontre possíveis divergências no pagamento de pessoal com facilidade e seguraça.</p> */}
                                </p>
                            </div>
                            {/* <ButtonDefault color='green' type='button' variant='solid'>Conhecer</ButtonDefault> */}
                        </div>
                    </div>

                    <p className='absolute bottom-8 text-xs right-0 bg-black px-4 py-1 opacity-25 hover:opacity-100 transition-opacity rounded-3xl rounded-r-none'>Fotografia: <a href="https://www.flickr.com/photos/exercitooficial/albums/" target="_blank" rel="noopener noreferrer" className='no-underline'>CCOMSEx</a></p>
                </div>
            </main>
        </>
    )
}
