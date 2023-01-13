import Head from "next/head";
import Link from "next/link";
import { BiHomeAlt } from "react-icons/bi";
import { FiLock, FiMail } from "react-icons/fi";
import { appIdentity } from "../../utils/util_texts";

export default function SingIn() {
    return (
        <>
            <Head>
                <title>{appIdentity.app_name + ' | Login'}</title>
            </Head>
            <div className="flex justify-center items-center h-screen flex-col">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form className="space-y-6" action="#">
                        <div>
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Entrar</h5>
                            <h6 className="text-md mt-2 text-gray-800 dark:text-white/80">Faça login para acessar o App.</h6>
                        </div>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input type="email" required id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="nome@email.com.br" />
                        </div>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiLock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input type="password" required id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                        </div>
                        <div className="flex items-start">
                            <a href="#" className="ml-auto text-sm text-primary-700 hover:underline dark:text-primary-500">Esqueceu a senha?</a>
                        </div>
                        <button type="submit" className="w-full text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Entrar</button>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Ainda não possui conta? <Link href="/auth/singup" className="text-primary-700 hover:underline dark:text-primary-500">Criar conta</Link>
                        </div>
                    </form>
                </div>
                <Link href="/" title="Voltar para página inicial" className="dark:bg-gray-700 shadow-md border border-gray-800 transition-transform hover:scale-105 p-2 rounded-full mt-4"><BiHomeAlt size={20} /></Link>
            </div>
        </>
    )
}