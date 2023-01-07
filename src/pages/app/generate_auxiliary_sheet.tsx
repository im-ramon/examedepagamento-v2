import type { ReactElement } from 'react';
import { BiQuestionMark } from 'react-icons/bi';
import BlockTitle from '../../components/BlockTitle';
import { Card } from '../../components/Card';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { NextPageWithLayout } from "../_app";

interface BlockFormContainerProps {
    children: React.ReactNode;
}

interface BlockFormItemProps extends BlockFormContainerProps {
    labelText: string;
    supportText: string;
}

const GeneratePayslip: NextPageWithLayout = () => {
    return (
        <>
            <PageTitle title='Gerar ficha auxilar' sub_title='Responda o formulário abaixo com as informação do militar/ pensionista que deseja gerar uma ficha auxiliar. Se sugir dúvidas, clique na interrogação (?) no canto de cada campo.' />
            <div>
                <BlockTitle title='Informações gerais' />
                <BlockFormContainer>
                    <BlockFormItem labelText='Universo' supportText='Qual universo/ classificação do examinado?'>
                        <input type="text" id="small-input" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                    </BlockFormItem>
                </BlockFormContainer>
            </div>
        </>
    )
}


const BlockFormContainer = ({ children }: BlockFormContainerProps) => {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 gap-8 bg-gray-500/5 shadow-md rounded-lg px-4 py-6'>
            {children}
        </div>
    )
}


const BlockFormItem = ({ children, labelText, supportText }: BlockFormItemProps) => {
    return (
        <Card>
            <div className='absolute -top-1 -right-1 cursor-pointer bg-white dark:bg-gray-700 shadow-md p-1 box-content rounded-lg transition-all hover:text-primary-900 dark:hover:text-primary-300'>
                <BiQuestionMark />
            </div>
            <label htmlFor="small-input" className="block absolute -top-4 left-3 text-md mb-1 font-medium dark:border dark:border-gray-700 dark:bg-gray-800 px-2 rounded-lg text-gray-900 dark:text-white">{labelText}</label>
            <p className="block mb-4 text-sm text-gray-900 dark:text-white">{supportText}</p>
            <div className='flex px-4'>
                {children}
            </div>
        </Card>
    )
}


GeneratePayslip.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default GeneratePayslip;
