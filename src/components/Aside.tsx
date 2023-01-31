import Image from 'next/image';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { BiBook, BiCustomize, BiDotsVerticalRounded, BiGridAlt, BiHelpCircle, BiHomeAlt, BiMoon, BiSun, BiUser, BiX } from "react-icons/bi";
import { useDarkMode } from 'usehooks-ts';
import logo from '../assets/images/img/logo.png';
import { pb } from '../services/pocktbase';
import { removeCookie } from '../utils/cookies';
import AsideDivider from './AsideDivider';
import AsideLinks from './AsideLinks';


export function Aside() {
    const router = useRouter()

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
                </ul>
            </div>
            <div id='config_menu' className='mt-auto transition-all select-none'>
                <div className='flex mb-2 px-4 py-2'>
                    <div className='mr-4 flex justify-center items-center'>
                        <button id="dropdownUserAvatarButton" onClick={() => { setShowConfigMenu(!showConfigMenu) }} className="flex mx-3 text-sm rounded-full lg:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600" type="button">
                            {showConfigMenu ? <BiDotsVerticalRounded size={22} className={`${showAside ? '' : 'bg-white dark:bg-gray-700 p-1 box-content shadow-lg rounded-xl'}`} /> : <BiX className={`${showAside ? '' : 'bg-white dark:bg-gray-700 p-1 box-content shadow-lg rounded-xl'}`} size={22} />}
                        </button>

                        <div id="dropdownAvatar" className={`z-20 left-4 bg-white divide-y divide-gray-100 rounded-xl shadow w-44 dark:bg-gray-700 dark:divide-gray-600 ${showConfigMenu ? 'hidden' : 'absolute left-0 bottom-16 '}`}>
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

        </aside >
    )
}