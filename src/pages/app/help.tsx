import type { ReactElement } from 'react';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import { NextPageWithLayout } from "../_app";

const Help: NextPageWithLayout = () => {
    return (
        <p>Help</p>
    )
}

Help.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default Help;