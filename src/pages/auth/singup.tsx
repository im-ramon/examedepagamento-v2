import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { BiLeftArrowAlt } from "react-icons/bi";
import { toast } from "react-toastify";
import { ButtonDefault } from "../../components/ButtonDefault";
import PageTitle from "../../components/PageTitle";
import { pb } from "../../services/pocktbase";
import { user } from '../../types/data_base_fields';
import { appIdentity } from "../../utils/util_texts";


export default function SingUp() {
    const { register, handleSubmit, formState: { errors }, reset, setValue, getValues } = useForm<user>();

    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<user> = async data => {
        const formatedUserName = data.name.replace(/[^a-zA-Z]/g, '_')
        data.username = formatedUserName
        setIsLoading(true)

        await pb.collection('users').create(data)
            .then(async r => {
                toast.success("Cadastro realizado!")
            })
            .catch(e => {
                console.error(e)
                toast.error("Não foi possível realizar seu cadastro agora. Tente novamente mais tarde!")
            })
            .finally(() => {
                setIsLoading(false)
            })
    };

    return (
        <>
            <Head>
                <title>{appIdentity.app_name + ' | Login'}</title>
            </Head>
            <div className="p-16 max-w-7xl mx-auto">
                <div>
                    <Link href="/auth/singin" className="no-underline"><BiLeftArrowAlt className="inline text-xl" /> Voltar</Link>
                </div>
                <PageTitle title="Cadastre-se" sub_title="Preencha o formulário abaixo para ter acesso às funcionalidades do App." />
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div>
                            <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome completo do examinador</label>
                            <input {...register("name")} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            <p className="mt-2 text-sm text-orange-600 dark:text-orange-500"><span className="font-medium">Atenção!</span> Essa opção não poderá ser alterada posteriormente.</p>
                        </div>

                        <input type="hidden"{...register("emailVisibility", { value: true })} />
                        <input type="hidden"{...register("type", { value: 3 })} />
                        <input type="hidden"{...register("username", { value: getValues('name') })} />

                        <div>
                            <label htmlFor="pg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">P/G do examinador</label>
                            <input {...register("pg")} type="text" id="pg" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label htmlFor="boss_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome do chefe da equipe</label>
                            <input {...register("boss_name")} type="text" id="boss_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label htmlFor="boss_pg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">P/G do chefe da equipe</label>
                            <input {...register("boss_pg")} type="text" id="boss_pg" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                        <div>
                            <label htmlFor="om" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Organização militar</label>
                            <input {...register("om")} type="text" id="om" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex: 35º BI" required />
                        </div>

                        <div>
                            <label htmlFor="signature_place" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cidade e UF da OM</label>
                            <input {...register("signature_place")} type="text" id="signature_place" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Ex: Feira de Santana, BA" required />
                        </div>
                    </div>
                    <div className="mb-6">
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input {...register("email")} type="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                    </div>
                    <div className="grid gap-6 mb-6 md:grid-cols-2">
                        <div className="mb-6">
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Senha</label>
                            <input {...register("password", { validate: () => getValues('passwordConfirm') === getValues('password'), minLength: 8 })} type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                            {errors.password?.type == 'validate' && <p className="text-sm pl-2 py-1 text-danger" role="alert">As senhas não conferem!</p>}
                            {errors.password?.type == 'minLength' && <p className="text-sm pl-2 py-1 text-danger" role="alert">A senha deve ter no mínimo 8 dígitos.</p>}
                        </div>


                        <div className="mb-6">
                            <label htmlFor="passwordConfirm" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirme a senha</label>
                            <input {...register("passwordConfirm", { minLength: 8 })} type="password" id="passwordConfirm" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" required />
                        </div>
                    </div>

                    {/*                     
                    <div className="flex items-start mb-6">
                        <div className="flex items-center h-5">
                            <input id="remember" type="checkbox" value="" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required />
                        </div>
                        <label htmlFor="remember" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">I agree with the <a href="#" className="text-primary-600 hover:underline dark:text-primary-500">terms and conditions</a>.</label>
                    </div> 
                    */}
                    <div className="w-full flex">
                        <ButtonDefault type="submit" color="green" variant="solid" isLoading={isLoading} disabled={isLoading}>
                            Cadastrar
                        </ButtonDefault>
                    </div>
                </form>
            </div>
        </>
    )
}