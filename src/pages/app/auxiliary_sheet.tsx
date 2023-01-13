import Head from 'next/head';
import Link from 'next/link';
import { ReactElement, useRef, useState } from 'react';
import { BiCheckCircle, BiPrinter, BiSave } from 'react-icons/bi';
import { useReactToPrint } from 'react-to-print';
import { ButtonDefault } from '../../components/ButtonDefault';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";

const AuxiliarySheet: NextPageWithLayout = () => {
    const mockAuxiliarySheet = {
        receitas: [
            {
                title: 'SOLDO',
                percent: '-',
                value: '3825,00'
            },
            {
                title: 'ADIC HAB',
                percent: '12%',
                value: '480,00'
            },
            {
                title: 'ADIC MIL',
                percent: '16%',
                value: '620,00'
            },
        ],
        descontos: [
            {
                title: 'P MIL',
                percent: '-',
                value: '3825,00'
            },
            {
                title: 'FUSEX',
                percent: '12%',
                value: '480,00'
            },
            {
                title: 'IR',
                percent: '16%',
                value: '620,00'
            },

        ]
    }

    const componentRef = useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [showUserNameInPrint, setShowUserNameInPrint] = useState<boolean>(true);
    const [showBossNameInPrint, setShowBossNameInPrint] = useState<boolean>(true);

    function addWhiteLineWhenTheListIsSmallerThenEithteen(listOfValues: { title: string; percent: string; value: string }[]) {
        const list = listOfValues
        while (list.length < 16) {
            list.push({ title: "", percent: "", value: "" })
        }
        return list
    }

    return (
        <>
            <Head>
                <title>{appIdentity.app_name} | Ficha auxiliar - 001</title>
            </Head>
            <PageTitle title='Ficha auxiliar' sub_title='Esta é a ficha auxiliar gerada com os dados que você informou no formulário.' />
            <div className="flex items-center p-4 mb-4 text-sm text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
                <BiCheckCircle size={16} />
                <span className="font-medium ml-2">Você está criando uma nova ficha auxiliar. Para ver as fichas salvas, <Link href="/app/manage_auxiliary_sheet">clique aqui</Link>.</span>
            </div>

            {/* <div className="flex items-center p-4 mb-4 text-sm text-yellow-700 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800" role="alert">
                <BiErrorCircle size={16} />
                <span className="font-medium ml-2">Você está editando a ficha auxiliar nº xxxx. Ao gerar a salvar, os dados serão sobreescritos no banco de dados</span>
            </div> */}

            <div id='auxiliary_sheet' ref={componentRef} className='bg-white text-black rounded-lg border-2 print:border-none p-2'>
                <div className='col-span-12 grid grid-cols-12 !border-none px-2 pt-3 pb-2'>
                    <label><strong>UG:</strong></label>
                    <input type="text" className='col-span-2' />

                    <label className='col-span-4 text-right mr-1'><strong>MÊS:</strong></label>
                    <p className='col-span-5'>01/2023</p>

                    <label><strong>NOME:</strong></label>
                    <input type="text" className='col-span-7' />

                    <label className='text-right mr-1'><strong>P/G:</strong></label>
                    <p className='col-span-3'>3º Sgt</p>


                    <label><strong>IDT:</strong></label>
                    <input type="text" className='col-span-2' />

                    <label className='col-span-2 text-right mr-1'><strong>CPF:</strong></label>
                    <input type="text" className='col-span-2' />

                </div>

                {/* 
                <div className='grid grid-cols-12'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                </div>
                */}

                <div className='col-span-12 !border-none'>
                    <div className='auxiliary_sheet grid grid-cols-12 !border-b-none'>
                        <div className='row-span-18 text-center flex flex-col justify-center'>
                            <p>R</p><p>E</p><p>C</p><p>E</p><p>I</p><p>T</p><p>A</p><p>S</p>
                        </div>
                        <div className='row-span-18 col-span-3 col-start-10 text-center h-full'>
                            <strong>OBSERVAÇÕES</strong>
                            <textarea className='w-full mt-2 h-5/6 p-1' ></textarea>
                        </div>

                        <div className='col-span-3 text-center flex justify-center items-center'><strong className='p-1'>DISCRIMINAÇÃO</strong></div>
                        <div className='text-center flex justify-center items-center'><strong className='p-1'>%</strong></div>
                        <div className='col-span-2 text-center flex justify-center items-center'><strong className='p-1'>VALOR PESQUISADO</strong></div>
                        <div className='col-span-2 text-center flex justify-center items-center'><strong className='p-1'>VALOR CONTRACHEQUE</strong></div>


                        {addWhiteLineWhenTheListIsSmallerThenEithteen(mockAuxiliarySheet.receitas).map((el, index) => {
                            return (
                                <>
                                    <div className='col-span-3 pl-1'> {el.title || <br />}</div>
                                    <div className='text-center'>{el.percent}</div>
                                    <div className='col-span-2 text-right pr-1'>{el.value}</div>
                                    <div className='col-span-2 pr-1'><input type="text" className='text-right w-full' /></div>
                                </>
                            )
                        })}

                        <div className='col-span-5 flex justify-center items-center'><span>SOMA</span></div>
                        <div className='col-span-2 flex justify-end items-center'><span>R$ 13.000,00</span></div>
                        <div className='col-span-2 flex justify-end items-center'><input type="text" className='text-right w-full' /></div>
                        <div className='col-span-3 flex justify-end items-center'><span></span></div>

                    </div>
                </div>

                <div className='col-span-12 flex justify-center flex-col items-center !border-none'>
                    <br />
                    <br />
                    <p>Feira de Santana, BA, 1º de janeiro de 2022.</p>
                    <br />
                    <br />
                    <br />

                    <div className='text-gray-500 !border-none print:hidden'>
                        Exibir nome do examinador na impressão?
                        <input type="checkbox" className='ml-2' checked={showUserNameInPrint} onChange={() => setShowUserNameInPrint(!showUserNameInPrint)} />
                    </div>
                    {
                        showUserNameInPrint && (
                            <>

                                <p>Ramon Oliveira - 3º Sgt</p>
                                <p>Membro da Equipe</p>
                            </>
                        )
                    }

                    {
                        (showUserNameInPrint && showBossNameInPrint) && (

                            <>
                                <br />
                                <br />
                                <br />
                            </>
                        )
                    }

                    <div className='text-gray-500 !border-none print:hidden'>
                        Exibir nome do chefe da equipe na impressão?
                        <input type="checkbox" className='ml-2' checked={showBossNameInPrint} onChange={() => setShowBossNameInPrint(!showBossNameInPrint)} />
                    </div>
                    {
                        showBossNameInPrint && (
                            <>
                                <p>Ramon Oliveira - 3º Sgt</p>
                                <p>Membro da Equipe</p>
                            </>
                        )
                    }
                    <br />
                    <br />
                    <p className='text-center'>ESTA FICHA DEVERÁ FICAR À DISPOSIÇÃO DOS ÓRGÃOS DE CONTROLE INTERNO E EXTERNO, POR UM PERÍODO NUNCA INFERIOR A UM ANO.</p>
                </div>

            </div>

            <div className='flex justify-end py-2 px-2 bottom-0 right-0 lg:right-16 dark:bg-black/10  bg-white/50 backdrop-blur-sm dark:border-gray-800 border-t border-l rounded-t-3xl fixed'>
                <ButtonDefault color='green' type='button' variant='solid'>
                    Salvar
                    <BiSave className='inline-block ml-2' />
                </ButtonDefault>
                <ButtonDefault color='blue' type='button' variant='solid' click={handlePrint}>
                    Imprimir
                    <BiPrinter className='inline-block ml-2' />
                </ButtonDefault>
            </div>
        </>
    )
}

AuxiliarySheet.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default AuxiliarySheet;