import type { ReactElement } from 'react';
import { BiLinkExternal } from 'react-icons/bi';
import Card from '../../components/Card';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { filesList } from '../../utils/util_filesList';
import { NextPageWithLayout } from "../_app";

const Legislation: NextPageWithLayout = () => {
    return (
        <>
            <PageTitle title='Legislação' sub_title='Encontre aqui a legislação base para o pagamento de pessoal no Exército Brasileiro.' />
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4 '>
                <CardLegislation badgeType='receita' filesListFiltered={filesList.receitas} />
                <CardLegislation badgeType='desconto' filesListFiltered={filesList.descontos} />
                <CardLegislation badgeType='lei' filesListFiltered={filesList.leis} />
            </div>
        </>
    )
}

interface CardLegislationProps {
    filesListFiltered: string[];
    badgeType: string;
}
const CardLegislation = ({ filesListFiltered, badgeType }: CardLegislationProps) => {
    return (
        <>
            {
                filesListFiltered.map(fileName => {
                    return (
                        <a href={`/docs/legislacao/${fileName}`} key={fileName} target="_blank" rel="noreferrer" className='block no-underline text-gray-900' title="Visualizar PDF">
                            <Card>
                                <div className='w-full h-full mt-1 flex items-center justify-between'>
                                    <p className='flex-1 text-sm overflow-hidden whitespace-nowrap overflow-ellipsis'>
                                        {badgeType == 'receita' && <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">RECEITA</span>}
                                        {badgeType == 'desconto' && <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-red-900 dark:text-red-300">DESCONTO</span>}
                                        {badgeType == 'lei' && <span className="bg-blue-100 text-blue-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">LEI</span>}
                                        {fileName.split('@')[1].replace(/_/g, " ").replace('.pdf', '')}
                                    </p>
                                    <BiLinkExternal size={18} className="ml-2" />
                                </div>
                            </Card>
                        </a>
                    )
                })
            }
        </>
    )
}

Legislation.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default Legislation;