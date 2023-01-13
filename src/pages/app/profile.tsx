import Head from 'next/head';
import { ReactElement } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ButtonDefault } from '../../components/ButtonDefault';
import { Card } from '../../components/Card';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";

interface FormInputs {
    userName: string,
    userPg: string,
    bossName: string,
    bossPg: string,
    signatureLocation: string,
    om: string,
}

const Profile: NextPageWithLayout = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = data => {
        console.log(data)
    };

    const styleInputNumber = "block w-full mt-1 lg:mt-0 lg:w-auto disabled:opacity-50 disabled:cursor-not-allowed p-2 flex-1 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";

    return (
        <>
            <Head>
                <title>{appIdentity.app_name} | Perfil</title>
            </Head>
            <PageTitle title='Perfil' sub_title='Edite aqui as informações do seu perfil.' />
            <Card>
                <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
                    <div className='flex items-center md:flex-row flex-col'>
                        <label>Nome:</label>
                        <input {...register('userName', { disabled: true },)} type="text" placeholder='Nome completo do examinador' className={styleInputNumber} />
                    </div>

                    <div className='flex items-center md:flex-row flex-col'>
                        <label>P/G:</label>
                        <input {...register('userPg')} type="text" placeholder='Posto e graduação do examinado que será exibido na assinatura' className={styleInputNumber} />
                    </div>

                    <div className='flex items-center md:flex-row flex-col'>
                        <label>Nome do chefe da equipe:</label>
                        <input {...register('bossName')} type="text" placeholder='Nome completo do chefe da equipe' className={styleInputNumber} />
                    </div>

                    <div className='flex items-center md:flex-row flex-col'>
                        <label>P/G do chefe da equipe:</label>
                        <input {...register('bossPg')} type="text" placeholder='Posto e graduação do examinado que será exibido na assinatura' className={styleInputNumber} />
                    </div>

                    <div className='flex items-center md:flex-row flex-col'>
                        <label>Local de assinatura:</label>
                        <input {...register('signatureLocation')} type="text" placeholder='Posto e graduação do examinado que será exibido na assinatura' className={styleInputNumber} />
                    </div>

                    <div className='flex items-center md:flex-row flex-col'>
                        <label>Organização Militar:</label>
                        <input {...register('om')} type="text" placeholder='Posto e graduação do examinado que será exibido na assinatura' className={styleInputNumber} />
                    </div>
                    <p className='text-xs text-center opacity-70 my-2 lg:col-span-2'>
                        Na versão atual do App ainda não é possível alterar seu nome. Caso tenha cadastrado algum dado incorrento, envie um e-mail para <a href="mailto:contato@ramonoliveira.dev">contato@ramonoliveira.dev</a> com as informações que deseja alterar.
                    </p>
                    <div className='flex justify-center py-2 px-2 lg:right-16 rounded-3xl lg:col-span-2'>
                        <ButtonDefault type='submit' isLoading={!true} color='green' variant='solid'>Salvar</ButtonDefault>
                    </div>
                </form>
            </Card>
        </>
    )
}

Profile.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default Profile;