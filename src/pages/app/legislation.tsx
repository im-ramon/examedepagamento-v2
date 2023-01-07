import type { ReactElement } from 'react';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import { NextPageWithLayout } from "../_app";

const Legislation: NextPageWithLayout = () => {
    return (
        <p>Legislation</p>
    )
}

Legislation.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default Legislation;