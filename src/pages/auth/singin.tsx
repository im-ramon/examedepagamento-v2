import copy from "copy-to-clipboard";
import { Modal } from "flowbite-react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { BiHomeAlt, BiMailSend } from "react-icons/bi";
import { FaRegCopy } from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import { toast } from "react-toastify";
import { ButtonDefault } from "../../components/ButtonDefault";
import { AppContext, UserDataProps } from "../../contexts/app.context";
import { pb } from "../../services/pocktbase";
import { setCookie } from "../../utils/cookies";
import { appIdentity } from "../../utils/util_texts";


interface loginFields {
    email: string;
    password: string;
}

export default function SingIn() {
    const router = useRouter()

    const [showModal, setShowModal] = useState<boolean>(false)
    const [showModalHelp, setShowModalHelp] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<loginFields>();

    const { setUserData } = useContext(AppContext)


    const onSubmit: SubmitHandler<loginFields> = async data => {
        setIsLoading(true)

        await pb.collection('users').authWithPassword(data.email, data.password)
            .then((data) => {
                // @ts-expect-error
                setUserData(data as UserDataProps)
                setCookie('token', data.token)

                setTimeout(() => {
                    router.push('/app')
                }, 6000);
            })
            .catch((error) => {
                console.log(error)
                toast.error('Algo deu errado. Verifique os dados digitado e tente novamente.')
                setValue('password', '')
            })
            .finally(() => {
                setTimeout(() => {
                    setIsLoading(false)
                }, 6000);
            })
    }

    return (
        <>
            <Head>
                <title>{appIdentity.app_name + ' | Login'}</title>
            </Head>

            <div className="flex justify-center items-center h-screen flex-col">
                <div className="w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg shadow-md sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" action="#">
                        <div>
                            <h5 className="text-xl font-medium text-gray-900 dark:text-white">Entrar</h5>
                            <h6 className="text-md mt-2 text-gray-800 dark:text-white/80">Faça login para acessar o App.</h6>
                        </div>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiMail className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input type="email" {...register('email', { required: true })} required id="user" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="nome@email.com.br" />
                        </div>
                        <div className="relative mb-6">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <FiLock className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                            </div>
                            <input type={showPassword ? 'text' : 'password'} {...register('password', { required: true, min: 8 })} required id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="••••••••" />
                            <div onClick={() => setShowPassword(!showPassword)} className="absolute top-1/2 -translate-y-1/2 right-3 hover:bg-red-50/10 cursor-pointer transition-all rounded-full p-1">
                                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                            </div>
                        </div>
                        <div className="flex items-end justify-end">
                            <button data-modal-target="authentication-modal" data-modal-toggle="authentication-modal" className="text-sm text-primary-600" type="button" onClick={() => { setShowModal(true) }}>
                                Esqueceu a senha?
                            </button>
                        </div>
                        <div className="flex justify-center">
                            <ButtonDefault color="green" type="submit" variant="solid" isLoading={isLoading} disabled={isLoading}>
                                Entrar
                            </ButtonDefault>
                        </div>
                        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                            Ainda não possui conta? <Link href="/auth/singup" className="text-primary-700 hover:underline dark:text-primary-500">Criar conta</Link>
                        </div>
                    </form>
                </div>
                <span onClick={() => setShowModalHelp(true)} className="p-2 mt-4 cursor-pointer text-primary-800">Não conseguiu acessar? Clique aqui.</span>
                <Link href="/" title="Voltar para página inicial" className="dark:bg-gray-700 shadow-md border dark:border-gray-800 transition-transform hover:scale-105 p-2 rounded-full mt-4"><BiHomeAlt size={20} /></Link>

            </div>

            <Modal show={showModal} onClose={() => setShowModal(false)}>
                <Modal.Header>
                    Recuperar senha
                </Modal.Header>
                <form action="">
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Digite seu email para envio do link de recuperação de senha.
                            </p>
                            <div className="relative mb-6">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" >
                                    <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                </div>
                                <input type="email" required id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="usuario@email.com.br" />
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>
                        <ButtonDefault color="green" type="submit" variant="solid">
                            Enviar
                            <BiMailSend size={16} className='inline-block ml-2' />
                        </ButtonDefault>
                    </Modal.Footer>
                </form>
            </Modal>

            <Modal show={showModalHelp} onClose={() => setShowModalHelp(false)}>
                <Modal.Header>
                    Problemas para acessar?
                </Modal.Header>
                <div>
                    <Modal.Body>
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Caso não tenha sido redirecionado após fazer login, <a target="_blank" rel="noreferrer" href="https://examedepagamento.com.br/app">clique aqui</a>.
                            </p>
                            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                                Em caso de persistência do erro, entre em contato pelo e-mail abaixo, informando o problema:
                            </p>
                            <div className="flex">
                                <div className="relative mb-6 flex-1 mr-4">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none" >
                                        <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                                    </div>
                                    <input defaultValue="contato@ramonoliveira.dev" disabled type="email" id="input-group-1" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="usuario@email.com.br" />
                                </div>
                                <div>
                                    <ButtonDefault
                                        click={() => { copy('contato@ramonoliveira.dev'); toast.success('E-mail copiado!') }}
                                        color="green"
                                        type="submit"
                                        variant="solid">
                                        Copiar e-mail
                                        <FaRegCopy size={16} className='inline-block ml-2' />
                                    </ButtonDefault>
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                </div>
            </Modal>
        </>
    )
}