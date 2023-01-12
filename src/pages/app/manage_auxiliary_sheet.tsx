import Head from 'next/head';
import type { ReactElement } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import { Card } from '../../components/Card';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";

const ManagePayslip: NextPageWithLayout = () => {
    const mockAuxiliarySheet = [
        { id: 0, pg: '3º Sgt', type: 'VT', },
        { id: 1, pg: '2º Sgt', type: 'VT', },
        { id: 2, pg: '2º Ten', type: 'VT', },
        { id: 3, pg: 'Cap', type: 'VT', },
        { id: 4, pg: '3º Sgt', type: 'VT', },
    ]

    return (
        <>
            <Head>
                <title>{appIdentity.app_name} | Gerenciar fichas auxiliares</title>
            </Head>
            <PageTitle title='Gerenciar fichas auxilares' sub_title='Visualize, edite ou exclua as fichas auxiliares que você já gerou.' />
            {mockAuxiliarySheet.length > 0 && mockAuxiliarySheet.map((el, index) => {
                const { id, pg, type } = el
                return (
                    <div key={index}>
                        <Card>
                            <div className='flex justify-between items-center -my-1'>
                                <p><strong>Código: </strong>{id}</p>
                                <p><strong>P/G: </strong>{pg}</p>
                                <p><strong>Classificação: </strong>{type}</p>
                                <div className='flex items-center justify-center hover:cursor-pointer'>
                                    <div className='bg-white/50 dark:bg-black/10 border dark:border-gray-700 border-gray-200 shadow-md rounded-xl mx-1 px-1 py-2 hover:scale-110 transition-transform'>
                                        <BiEdit size={18} className="mx-1 text-green-500" />
                                    </div>
                                    <div className='bg-white/50 dark:bg-black/10 border dark:border-gray-700 border-gray-200 shadow-md rounded-xl mx-1 px-1 py-2 hover:scale-110 transition-transform'>
                                        <BiTrash size={18} className="mx-1 text-red-500" />
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )
            })}


        </>
    )
}

ManagePayslip.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default ManagePayslip;