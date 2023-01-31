import { Inter } from '@next/font/google'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { FiLock } from 'react-icons/fi'
import logo from '../assets/images/img/logo.png'
import { ButtonDefault } from '../components/ButtonDefault'
import RouteLink from '../components/RouteLink'
import { appIdentity } from '../utils/util_texts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{appIdentity.app_name}</title>
                <meta name="description" content="Faça o exame de pagamento de pessoal, no âmbito do exército brasileiro, de forma fácil e descomplicada." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.png" />
                <title>{appIdentity.app_name + ' | Bem vindo!'}</title>
            </Head>
            <main id="home" className='w-full h-screen p-2 md:p-8 bg-gradient-to-r from-black to-black '>
                <div id='home-container' className="pt-2 w-full relative h-full bg-black rounded-3xl shadow-xl p-0 md:p-4 max-w-8xl mx-auto bg-right bg-no-repeat bg-[url('/background-home.jpg')]">

                    <nav className="mx-2 border-gray-200/10 px-2 sm:px-4 py-2.5 rounded-2xl borderbg-white/10">
                        <div className="container flex flex-wrap items-center justify-between mx-auto">
                            <span className="flex items-center">
                                <Image width={28} height={28} src={logo} className="mr-3" alt="Flowbite Logo" />
                                <span className="self-center text-xl font-semibold whitespace-nowrap text-white">| Exame de pagamento</span>
                            </span>
                            <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2hover:bg-gray-700 focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
                                <span className="sr-only">Abrir menu</span>
                                <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                            </button>
                            <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                                <ul className="flex flex-col p-4 mt-4 border rounded-lg md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium md:border-0 border-gray-700">
                                    <li className="py-1 !text-red-900">
                                        <RouteLink href='/auth/singin' text='Entrar' underline={false} />
                                    </li>
                                    <li className="py-1">
                                        <RouteLink href='/auth/singup' text='Cadastrar-se' underline={false} />
                                    </li>
                                    <li className='flex bg-gray-800 items-center justify-center border-gray-200/10 border rounded-2xl px-3 py-1'>
                                        <RouteLink href='/app' text='Painel' underline={false} />
                                        <FiLock className="w-4 h-4 ml-1 text-gray-400" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>

                    <div className='bg-black/80 pt-2 pb-8 backdrop-blur-sm rounded-xl md:bg-none px-4 md:px-8 md:backdrop-blur-none md:rounded-none md:bg-transparent'>
                        <div className='mt-8 text-sm text-white/50 italic'>&lt; web app /&gt;</div>
                        <div className='w-full md:w-3/4 lg:w-2/5'>
                            <div className='flex flex-col justify-start mb-8'>
                                <p>
                                    <span id="app_presatation" className='text-4xl md:text-7xl font-bold '>EXAME DE PAGAMENTO</span>
                                    <span className='mt-8 px-1 block dark:text-white !text-white'>
                                        Uma nova forma de realiar o Exame de Pagamento de Pessoal no Exército Brasileiro!
                                    </span>
                                    <br />
                                    <span className='px-1 block dark:text-white !text-white'>
                                        Poupe tempo, minimize erros, tenha acesso fácil à toda legislação e encontre possíveis
                                        divergências no pagamento de pessoal com facilidade e seguraça.
                                    </span>
                                </p>
                            </div>
                            <ButtonDefault color='green' type='button' variant='solid' click={() => { router.push('/auth/singin') }}>Conhecer</ButtonDefault>
                        </div>
                    </div>

                    <p className='absolute bottom-8 text-xs right-0 bg-black px-4 py-1 opacity-25 hover:opacity-100 transition-opacity rounded-3xl rounded-r-none'>Fotografia: <a href="https://www.flickr.com/photos/exercitooficial/albums/" target="_blank" rel="noopener noreferrer" className='no-underline'>CCOMSEx</a></p>
                </div>
            </main>
        </>
    )
}
