import type { ReactElement } from 'react';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import { NextPageWithLayout } from "../_app";

const GeneratePayslip: NextPageWithLayout = () => {
    return (
        <p>generate_payslip</p>
    )
}

GeneratePayslip.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default GeneratePayslip;