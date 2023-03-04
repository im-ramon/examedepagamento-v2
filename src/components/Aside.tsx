import copy from 'copy-to-clipboard';
import { Modal } from 'flowbite-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiBook, BiCustomize, BiDotsVerticalRounded, BiGridAlt, BiHelpCircle, BiHomeAlt, BiMoon, BiSun, BiUser, BiX } from "react-icons/bi";
import { FaDesktop, FaGithub, FaLinkedinIn, FaRegEnvelope, FaWhatsapp } from "react-icons/fa";
import { FcKey } from "react-icons/fc";
import { TbHeartHandshake } from 'react-icons/tb';
import { toast } from 'react-toastify';
import { useDarkMode } from 'usehooks-ts';
import logo from '../assets/images/img/logo.png';
import pix from '../assets/images/svg/pix.svg';
import { pb } from '../services/pocktbase';
import { removeCookie } from '../utils/cookies';
import AsideDivider from './AsideDivider';
import AsideLinks from './AsideLinks';

export function Aside() {
    const router = useRouter()

    const [showModalDonate, setShowModalDonate] = useState<boolean>(true)
    const [showModalAbout, setShowModalAbout] = useState<boolean>(false)
    const [showAside, setShowAside] = useState<boolean>(true)
    const [userName, setUserName] = useState<string>('')
    const [userEmail, setUserEmail] = useState<string>('')
    const [showConfigMenu, setShowConfigMenu] = useState<boolean>(true)
    const { isDarkMode, toggle } = useDarkMode()

    function handleSingOut() {
        removeCookie('token')
        pb.authStore.clear();
        router.push('/');

        if (window) {
            window.localStorage.clear();
        }
    }

    function setModalDonateVisualized() {
        if (window) {
            window.localStorage.setItem('@examedepagamento:show_donate', 'true')
        }
    }

    useEffect(() => {
        if (window) {
            const auth = window.localStorage.getItem('pocketbase_auth')
            if (auth) {
                const pocketbase_auth = JSON.parse(auth)

                if (pocketbase_auth.model.name) {
                    setUserName(pocketbase_auth.model.name)
                }

                if (pocketbase_auth.model.email) {
                    setUserEmail(pocketbase_auth.model.email)
                }
            }

            const showDonate = window.localStorage.getItem('@examedepagamento:show_donate')
            if (showDonate) {
                setShowModalDonate(false)
            }
        }
    }, [])

    return (
        <aside className={`absolute lg:relative top-0 left-0 z-10 flex flex-col transition-all duration-300 bg-white dark:bg-gradient-to-b dark:from-gray-700 dark:to-gray-800 dark:text-white h-full ${showAside ? 'w-60 border-r dark:border-r-gray-700' : 'w-0 border-none'}`}>
            <div className={`absolute top-3 right-0 rounded-tr-xl rounded-br-xl translate-x-8 w-8 h-8 flex justify-center items-center bg-white dark:bg-gray-700 dark:text-white cursor-pointer border dark:border-gray-600 border-l-0 ${showAside ? '' : 'shadow-md'}`} onClick={() => setShowAside(!showAside)}>
                {showAside ? <AiOutlineClose /> : <AiOutlineMenu />}
            </div>
            <div className="flex items-center justify-center border-b dark:border-b-gray-600 overflow-hidden">
                <div className='flex flex-col my-4 items-center justify-center select-none'>
                    <Image className='w-8 mb-2 invert dark:invert-0' id='logo' src={logo} alt='Dan Abramov' />
                    <span className='font-handwrite text-md ml-2 text-gray-600 dark:text-gray-400 text-sm'>App | Exame de pagamento</span>
                </div>
            </div>
            <div className="overflow-y-auto overflow-x-hidden flex-grow">
                <ul className="flex flex-col py-4 space-y-1">
                    <AsideLinks to='/app' title='Página inicial'>
                        <BiHomeAlt size={20} />
                    </AsideLinks>

                    <AsideDivider title='Ficha auxiliar' />

                    <AsideLinks to='/app/generate_auxiliary_sheet' title='Gerar'>
                        <BiCustomize size={20} />
                    </AsideLinks>
                    <AsideLinks to='/app/manage_auxiliary_sheet' title='Gerenciar'>
                        <BiGridAlt size={20} />
                    </AsideLinks>

                    <AsideDivider title='Apoio' />

                    <AsideLinks to='/app/legislation' title='Legislação'>
                        <BiBook size={20} />
                    </AsideLinks>
                    <AsideLinks to='/app/help' title='Ajuda'>
                        <BiHelpCircle size={20} />
                    </AsideLinks>
                    <AsideLinks to='/app/profile' title='Perfil'>
                        <BiUser size={20} />
                    </AsideLinks>
                    <li onClick={() => { setShowModalDonate(true) }}>
                        <span className={`cursor-pointer relative no-underline justify-between flex flex-row items-center h-11 focus:outline-none dark:hover:bg-gray-700 dark:text-white hover:bg-gray-300 text-gray-600 outline-none hover:text-gray-800 transition-all pr-6 dark:bg-green-900/50 bg-green-600/20`}>
                            <span className="inline-flex justify-center items-center ml-4">
                                <TbHeartHandshake className='text-green-500' size={20} />
                            </span>
                            <span className="ml-2 text-sm tracking-wide truncate mr-auto">Apoie</span>
                        </span>
                    </li>
                </ul>
            </div>
            <div id='config_menu' className='mt-auto transition-all select-none'>
                <div className='flex mb-2 px-4 py-2'>
                    <div className='mr-4 flex justify-center items-center'>
                        <button id="dropdownUserAvatarButton" onClick={() => { setShowConfigMenu(!showConfigMenu) }} className="flex mx-3 text-sm rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                            {showConfigMenu ? <BiDotsVerticalRounded size={22} className={`${showAside ? '' : 'bg-white dark:bg-gray-700 p-1 box-content shadow-lg rounded-xl'}`} /> : <BiX className={`${showAside ? '' : 'bg-white dark:bg-gray-700 p-1 box-content shadow-lg rounded-xl'}`} size={22} />}
                        </button>

                        <div id="dropdownAvatar" className={`z-20 left-4 bg-gray-300/15 divide-y divide-gray-200 rounded-xl shadow-lg w-44 dark:bg-gray-700 dark:divide-gray-600 ${showConfigMenu ? 'hidden' : 'absolute left-0 bottom-16 '}`}>
                            <div className="px-4 py-3 text-sm text-gray-900 dark:text-white flex items-center cursor-pointer transition-all" onClick={toggle}>
                                <div className='mr-2'><span className="font-medium truncate">Alternar tema: </span></div>
                                <div className='mr-2'><BiMoon size={16} className={`${isDarkMode ? '' : 'hidden'}`} /><BiSun size={16} className={`${isDarkMode ? 'hidden' : ''}`} /></div>
                            </div>
                            <ul className="py-1 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownUserAvatarButton">
                                <li>
                                    <a href="/docs/FAQ.pdf" target="_blank" className="no-underline block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">FAQ</a>
                                </li>

                                <li>
                                    <a href="/docs/manual.pdf" target="_blank" className="no-underline block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Manual</a>
                                </li>

                                <li>
                                    <span onClick={() => setShowModalAbout(true)} className="no-underline cursor-pointer block px-4 py-2 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Sobre</span>
                                </li>
                            </ul>
                            <div className="py-0">
                                <span onClick={handleSingOut} className="cursor-pointer no-underline block transition-all px-4 py-2 rounded-bl-xl rounded-br-xl text-sm text-red-700 hover:bg-gray-100 dark:hover:bg-red-500 dark:text-red-500 dark:hover:text-white">
                                    Sair
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 flex flex-col select-none justify-center overflow-hidden'>
                        <p className='text-xs overflow-hidden whitespace-nowrap overflow-ellipsis'>{userName}</p>
                        <p className='text-xs overflow-hidden whitespace-nowrap overflow-ellipsis text-gray-500'>{userEmail}</p>
                    </div>
                </div>
            </div >

            <Modal show={showModalDonate} size="2xl" popup={true} onClose={() => { setShowModalDonate(false); setModalDonateVisualized() }} >
                <Modal.Header />
                <Modal.Body>
                    <div className="rounded-lg p-4">
                        <div className='flex justify-center items-center mb-12'>
                            <TbHeartHandshake className='text-green-500' size={64} />
                        </div>
                        <p className="text-center font-bold text-xl mb-4">
                            Essa idéia precisa de sua ajuda para continuar!
                        </p>
                        <p className='text-center'>
                            Ajude o <strong>App Exame de Pagamento</strong> manter-se online. Doe qualquer valor para contribuir na manutenção mensal do projeto.
                        </p>

                        <p onClick={() => { copy('6c49a14f-076b-489b-8300-df0382577f0e'); toast.info('Chave Pixa copiada!') }} className="text-center flex justify-center items-center  font-bold text-xl mt-8 mb-4">
                            <Image src={pix} alt="pix" className='inline-block mr-2 w-4' />
                            <span>Chave Pix <span className='text-xs'>(clique para copiá-la)</span>:</span>
                        </p>
                        <p onClick={() => { copy('6c49a14f-076b-489b-8300-df0382577f0e'); toast.info('Chave Pixa copiada!') }} className="text-center flex justify-center items-center  font-bold text-xl mb-4 cursor-pointer">
                            <FcKey className='mr-2' />
                            <span>6c49a14f-076b-489b-8300-df0382577f0e</span>
                        </p>

                        <p className='text-center'>Iniciais da conta: R.O.D.S</p>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showModalAbout} onClose={() => setShowModalAbout(false)}>
                <Modal.Header>
                    Sobre
                </Modal.Header>
                <Modal.Body>
                    <div className="space-y-4">
                        <p>
                            <span>Idealizado e desenvolvido por: <a href="https://ramonoliveira.dev">ramonoliveira.dev</a></span>
                        </p>

                        <p>
                            <span>Verão do app: 2.1.0</span>
                        </p>

                        <p>
                            <span>Repositório: <a href="https://github.com/im-ramon/examedepagamento-v2" target="_blank" rel="noopener noreferrer">www.github.com/im-ramon/examedepagamento-v2</a></span>
                        </p>

                        <div className='flex justify-center items-center py-2 space-x-4'>
                            <a href="mailto:contato@ramonoliveira.dev" className='hover:scale-110 hover:text-primary-600 drop-shadow-lg transition-all text-white' target="_blank" rel="noopener noreferrer"><FaRegEnvelope size={24} /></a>
                            <a href="https://www.linkedin.com/in/ramon-oliveira-21b8571a2/" className='hover:scale-110 hover:text-primary-600 drop-shadow-lg transition-all text-white' target="_blank" rel="noopener noreferrer"><FaLinkedinIn size={24} /></a>
                            <a href="tel:5575991537677" className='hover:scale-110 hover:text-primary-600 drop-shadow-lg transition-all text-white' target="_blank" rel="noopener noreferrer"><FaWhatsapp size={24} /></a>
                            <a href="https://github.com/im-ramon" className='hover:scale-110 hover:text-primary-600 drop-shadow-lg transition-all text-white' target="_blank" rel="noopener noreferrer"><FaGithub size={24} /></a>
                            <a href="https://ramonoliveira.dev/" className='hover:scale-110 hover:text-primary-600 drop-shadow-lg transition-all text-white' target="_blank" rel="noopener noreferrer"><FaDesktop size={24} /></a>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </aside >
    )
}