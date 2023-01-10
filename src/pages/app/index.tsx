import Head from 'next/head';
import type { ReactElement } from 'react';
import { Card } from '../../components/Card';
import LayoutRouteApp from '../../components/layouts/LayoutRouteApp';
import PageTitle from '../../components/PageTitle';
import { appIdentity } from '../../utils/util_texts';
import type { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
    return (
        <div>
            <Head>
                <title>{appIdentity.app_name} | Home</title>
            </Head>
            <PageTitle title="Página inicial" />
            <Card title="👋🏽 Bem vindo ao App Exame de Pagamento.">
                <p>
                    Novo por aqui? Leia o manual do App no link: <a href="/docs/manual.pdf" target="_BLANK">Manual do App</a>
                </p>
                <p>
                    Em caso de dúvidas, acesse o link e veja se ela está entre as
                    mais frequetes: <a href="/docs/FAQ.pdf" target="_BLANK">FAQ</a>
                </p>
                <br />
                <p>
                    Já conhece o App? Então escolha uma das funcionalidades e siga
                    em frente.
                </p>
            </Card>
            <div className='mt-8'></div>
            <Card title="Avisos importantes">
                <p className="text-justify">
                    • Em razão de algumas restrições impostas pela Lei nº 13.709, de
                    14 de agosto de 2018 - Lei Geral de Proteção de Dados Pessoais
                    (LGPD), quanto ao tratamento de dados pessoais de terceiros,
                    esta aplicação <strong>não armazena ou trata nenhum dado pessoal</strong>. Os
                    dados pessoais do examinado poderão ser inseridos no momento da
                    impressão da Ficha Auxiliar, porém não ficarão armazenados.
                </p>
            </Card>
        </div>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default Home;