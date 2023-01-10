import Head from 'next/head';
import type { ReactElement } from 'react';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";

const ManagePayslip: NextPageWithLayout = () => {
    return (
        <>
            <Head>
                <title>{appIdentity.app_name} | Gerenciar fichas auxiliares</title>
            </Head>
            <p>manage_payslip</p>
        </>
    )
}

ManagePayslip.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default ManagePayslip;