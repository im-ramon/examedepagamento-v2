import { Inter } from '@next/font/google'
import { Modal, Navbar } from 'flowbite-react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import logo from '../assets/images/img/logo.png'
import logoramon from '../assets/images/svg/logo-ramon.svg'
import { ButtonDefault } from '../components/ButtonDefault'
import { appIdentity } from '../utils/util_texts'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router = useRouter()

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showModal, setShowModal] = useState<boolean>(false)

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

                    <Navbar fluid={true} className="mx-2 !border-gray-200/10 px-2 sm:px-4 py-2.5 rounded-3xl border !bg-white/10">
                        <Navbar.Brand href="/" className='no-underline'>
                            <Image width={28} height={28} src={logo} className="mr-3" alt="Logo" />
                            <span className="self-center text-xl font-semibold whitespace-nowrap text-white uppercase">Exame de pagamento</span>
                        </Navbar.Brand>
                        <Navbar.Toggle />
                        <Navbar.Collapse>
                            <ButtonDefault isLoading={isLoading} color='green' type='button' variant='solid' click={() => { setIsLoading(true); router.push('/app') }}>
                                <span className='text-white flex justify-center items-center'>
                                    Acessar
                                    <BiLinkExternal className="w-4 h-4 ml-2" />
                                </span>
                            </ButtonDefault>
                        </Navbar.Collapse>
                    </Navbar>

                    <div className='bg-black/80 pt-2 pb-8 backdrop-blur-sm rounded-xl md:bg-none px-4 md:px-8 md:backdrop-blur-none md:rounded-none md:bg-transparent'>
                        <div className='mt-8 text-sm text-white/50 italic'>&lt; web app /&gt;</div>
                        <div className='w-full md:w-3/4 lg:w-2/5'>
                            <div className='flex flex-col justify-start mb-8'>
                                <p>
                                    <span id="app_presatation" className='text-4xl md:text-7xl font-bold '>EXAME DE PAGAMENTO</span>
                                    <span className='mt-8 px-1 block dark:text-white !text-white'>
                                        Uma nova forma de realiar o Exame de Pagamento de Pessoal, no Exército Brasileiro!
                                    </span>
                                    <br />
                                    <span className='px-1 block dark:text-white !text-white'>
                                        Poupe tempo, minimize erros, tenha acesso fácil à toda legislação e encontre possíveis
                                        divergências no pagamento de pessoal com facilidade e seguraça.
                                    </span>
                                </p>
                            </div>
                            <div className='mb-8 flex'>
                                <ButtonDefault color='yellow' type='button' variant='invisible' click={() => { setShowModal(true) }}>
                                    <span className='text-white'>Como funciona?</span>
                                </ButtonDefault>
                                <div className="mx-2"></div>
                                <ButtonDefault color='blue' type='button' variant='solid' click={() => { router.push('/auth/singin') }}>Conhecer</ButtonDefault>
                            </div>
                        </div>
                    </div>

                    <p className='absolute bottom-8 text-xs right-0 bg-black px-4 py-1 opacity-25 hover:opacity-100 transition-opacity rounded-3xl rounded-r-none'>Fotografia: <a href="https://www.flickr.com/photos/exercitooficial/albums/" target="_blank" rel="noopener noreferrer" className='no-underline'>CCOMSEx</a></p>
                </div>
            </main>
            <p className='w-full bg-black fixed bottom-0 left-0 px-4 py-2 flex justify-center items-center'>
                <span className='opacity-50 hover:opacity-100 transition-opacity text-sm text-gray-300'>
                    <a className='no-underline text-white' href="http://ramonoliveira.dev" target="_blank" rel="noopener noreferrer">
                        <Image src={logoramon} alt="logoramon" className='w-4 mr-1 inline-block' />
                        ramonoliveira.dev
                    </a>
                </span>
            </p>

            <Modal show={showModal} onClose={() => setShowModal(false)} >
                <Modal.Header>
                    Como funciona?
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-6">
                        <p className="text-base text-justify leading-relaxed text-gray-500 dark:text-gray-400">
                            O App tem como finalidade ajudar todos que
                            realizam a atividade de exame de pagamento de
                            pessoal, no âmbito do Exército Brasileiro. O App
                            realiza todos os cálculos complexos por você,
                            reduzindo a possibilidade de erros por parte do
                            examinador, sem exigir conhecimento prévio da legislação.
                            <br />
                            <br />
                            O funcionamento do App é muito simples!
                            <br />
                            Você só precisa preencher um formulário
                            respondendo algumas perguntadas simples sobre
                            o militar/ pensionista que você deseja montar a
                            ficha auxiliar. Depois, basta clicar no botão
                            “gerar, o App irá fazer os
                            cálculos automaticamente e montará a
                            ficha auxiliar para você.
                            <br />
                            <br />
                            Após montada, você pode salvar a ficha auxiliar em
                            um banco de dados e voltar quando quiser para o
                            editar.

                            <br />
                            <br />
                            <i>** Em razão de algumas restrições impostas
                                pela Lei nº 13.709, de 14 de agosto de 2018
                                - Lei Geral de Proteção de Dados Pessoais
                                (LGPD), quanto ao tratamento de dados
                                pessoais de terceiros, esta aplicação não
                                armazena ou trata nenhum dado pessoal (nome,
                                identidade, cpf, entre outros). Os dados
                                pessoais do examinado poderão ser inseridos
                                apenas no momento da
                                impressão do ficha auxiliar, porém não ficarão
                                armazenados.
                            </i>
                        </p>
                    </div>
                </Modal.Body>
            </Modal>
        </>
    )
}
