import Head from 'next/head';
import { ReactElement } from 'react';
import { Card } from '../../components/Card';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";

const Help: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>{appIdentity.app_name} | Ajuda</title>
            </Head>
            <PageTitle title='Ajuda' />
            <Card title='Algumas informações importantes sobre este App:'>
                <ul className='px-8'>
                    <li className='list-disc'>Mudança do nome</li>
                    <li className='list-disc'>Contato com dev</li>
                    <li className='list-disc'>Obrigação de ler a legislação</li>
                </ul>
            </Card>
        </>
    )
}

Help.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default Help;