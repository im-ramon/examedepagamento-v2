import moment from 'moment';
import { useRouter } from 'next/router';
import { useContext, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiGitCompare, BiPrinter, BiSave } from 'react-icons/bi';
import { TbArrowBackUp } from 'react-icons/tb';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { AppContext } from '../contexts/app.context';
import { AuxiliarySheetAPIResponseProps } from '../pages/app/generate_auxiliary_sheet';
import { pb } from '../services/pocktbase';
import { convert_in_BRL } from '../utils/util_convert_in_BRL';
import { ButtonDefault } from './ButtonDefault';

interface AuxiliarySheetProps {
    isVisible: boolean;
    closeModal: () => void;
    data: AuxiliarySheetAPIResponseProps
}

interface EditableValuesProps {
    obsReceitas: string;
    valorContraqueReceita1: string;
    valorContraqueReceita2: string;
    valorContraqueReceita3: string;
    valorContraqueReceita4: string;
    valorContraqueReceita5: string;
    valorContraqueReceita6: string;
    valorContraqueReceita7: string;
    valorContraqueReceita8: string;
    valorContraqueReceita9: string;
    valorContraqueReceita10: string;
    valorContraqueReceita11: string;
    valorContraqueReceita12: string;
    valorContraqueReceita13: string;
    valorContraqueReceita14: string;
    valorContraqueReceita15: string;
    valorContraqueReceita16: string;
    obsDescontos: string;
    valorContraqueDesconto1: string;
    valorContraqueDesconto2: string;
    valorContraqueDesconto3: string;
    valorContraqueDesconto4: string;
    valorContraqueDesconto5: string;
    valorContraqueDesconto6: string;
    valorContraqueDesconto7: string;
    valorContraqueDesconto8: string;
    valorContraqueDesconto9: string;
    valorContraqueDesconto10: string;
    valorContraqueDesconto11: string;
    valorContraqueDesconto12: string;
    valorContraqueDesconto13: string;
    valorContraqueDesconto14: string;
    valorContraqueDesconto15: string;
    valorContraqueDesconto16: string;
}

const AuxiliarySheet = ({ isVisible, closeModal, data }: AuxiliarySheetProps) => {
    const componentRef = useRef(null);

    const { register, handleSubmit, setValue, getValues } = useForm();

    const { contextFormData, contextEditableValues, userData, contextFormDataId } = useContext(AppContext)

    const router = useRouter()


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showUserNameInPrint, setShowUserNameInPrint] = useState<boolean>(true);
    const [showBossNameInPrint, setShowBossNameInPrint] = useState<boolean>(true);
    const [signatureDate, setSignatureDate] = useState<string>('~ digite a data aqui ~');

    function storageSignatureDate() {
        if (window) {
            window.localStorage.setItem('@examedepagamento:signature_date', signatureDate)
        }
        console.log(signatureDate)
    }

    const onSubmit: SubmitHandler<any> = async data => {
        setIsLoading(true)

        const fetchData = {
            user_id: userData.id,
            form_data: JSON.stringify(contextFormData),
            observations: JSON.stringify(data)
        }

        if (contextFormDataId) {
            await pb.collection('auxiliary_sheets').update(contextFormDataId, fetchData)
                .then(data => {
                    toast.success(`Ficha auxiliar atualizada!`)
                })
                .catch(e => {
                    console.error(e)
                    toast.error('Não foi possível salvar a ficha auxiliar.')
                })
                .finally(() => {
                    router.push('/app/manage_auxiliary_sheet')
                    setIsLoading(false)
                })
        } else {
            await pb.collection('auxiliary_sheets').create(fetchData)
                .then(data => {
                    const id: string = data.id
                    toast.success(`Código: ${id.slice(0, 7)}`, { autoClose: false })
                    toast.success(`Ficha auxiliar salva! Guarde o código a seguir para poder editá-la.`, { autoClose: 15000 })
                    console.log(data)
                })
                .catch(e => {
                    console.error(e)
                    toast.error('Não foi possível salvar a ficha auxiliar.')
                })
                .finally(() => {
                    router.push('/app/manage_auxiliary_sheet')
                    setIsLoading(false)
                })
        }


    };

    function addWhiteLineWhenTheListIsSmallerThenEithteen(listOfValues: { title: string; percent: string; value: number | null }[]) {
        const list = listOfValues
        while (list.length < 16) {
            list.push({ title: "", percent: "", value: null })
        }
        return list
    }

    function closeAuxiliarySheetWhenClickOutside(element: HTMLElement) {
        if (element.id === 'auxiliary_sheet-modal') {
            closeModal()
        }
    }

    const [totalReceitas, setTotalReceitas] = useState<number>(0);
    const [totalDescontos, setTotalDescontos] = useState<number>(0);

    function setAndSumValuesFromTheValoresContrachequeField() {
        const arrayTypes = ['valorContraqueReceita', 'valorContraqueDesconto']

        arrayTypes.forEach(el => {
            let listOfValues: string[] = []
            for (let index = 1; index <= 16; index++) {
                listOfValues.push(getValues(el + index) || '0')
            }
            const sum = listOfValues.map(item => Number(item.replace(/[^0-9|\,]/gi, '').replace(',', '.'))).reduce((curr, prev) => curr + prev, 0)

            if (el == 'valorContraqueReceita') {
                setTotalReceitas(sum)
            }

            if (el == 'valorContraqueDesconto') {
                setTotalDescontos(sum)
            }

        })

    }

    function matchValuesInAuxiliarySheet() {
        data.receitas.forEach((element, index) => {
            setValue('valorContraqueReceita' + (index + 1), convert_in_BRL(element.value))
        });

        data.descontos.forEach((element, index) => {
            setValue('valorContraqueDesconto' + (index + 1), convert_in_BRL(element.value))
        });

        setAndSumValuesFromTheValoresContrachequeField()
    }

    useEffect(() => {
        if (window) {
            const storagedSignatureDate = window.localStorage.getItem('@examedepagamento:signature_date')
            if (storagedSignatureDate) {
                setSignatureDate(storagedSignatureDate)
            }
        }
    }, [])

    useEffect(() => {
        const valuesJSON = (contextEditableValues as EditableValuesProps)

        for (const key in valuesJSON) {
            // @ts-expect-error
            setValue(key, valuesJSON[key])
        }

        setAndSumValuesFromTheValoresContrachequeField()

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contextEditableValues, setValue])

    return (
        <div id='auxiliary_sheet-modal' onClick={e => closeAuxiliarySheetWhenClickOutside(e.target as HTMLElement)} className={`fixed w-full top-0 right-0 bg-gray-900/50 backdrop-blur-sm z-50 p-24 overflow-y-scroll h-full ${isVisible ? '' : 'hidden'}`}>
            <div className='animate-auxiliary_sheet'>
                <form onSubmit={handleSubmit(onSubmit)} id='auxiliary_sheet-container' className='max-w-6xl mx-auto'>
                    <div className='flex select-none cursor-pointer justify-center items-center py-2 text-primary-400 px-4 bottom-0 right-0 lg:right-16 dark:bg-black/10  bg-white/50 backdrop-blur-sm dark:border-gray-800 border-t border-l rounded-t-3xl '>
                        <ButtonDefault color='yellow' type='button' variant='outline' click={closeModal} helpText="Continue editando sua ficha auxiliar">
                            <TbArrowBackUp className='inline-block mr-2' />
                            Continuar editando
                        </ButtonDefault>
                        <div className="mx-2"></div>
                        <ButtonDefault color='purple' type='button' variant='outline' click={matchValuesInAuxiliarySheet} helpText="Igular colunas “valor pesquisado” e “valor contracheque”">
                            Igualar valores
                            <BiGitCompare className='inline-block ml-2' />
                        </ButtonDefault>

                    </div>
                    <div id='auxiliary_sheet' ref={componentRef} className='bg-white text-black border-2 print:border-none p-2'>
                        <div className='col-span-12 !border-none flex justify-center font-bold text-lg'>
                            FICHA AUXILIAR
                        </div>
                        <div className='col-span-12 grid grid-cols-12 !border-none px-2 gap-0.5 pt-3 pb-2'>
                            <label><strong>UG:</strong></label>
                            <input type="text" className='auxiliary_sheet-title p-0 pl-1 col-span-2 border-dashed border border-gray-400 print:border-none' />

                            <label className='col-span-4 text-right mr-1'><strong>MÊS:</strong></label>
                            <p className='col-span-5'>{moment(data.extra.date).format("MM/YYYY")}</p>

                            <label><strong>NOME:</strong></label>
                            <input type="text" className='auxiliary_sheet-title p-0 pl-1 col-span-7 border-dashed border border-gray-400 print:border-none' />

                            <label className='text-right mr-1'><strong>P/G:</strong></label>
                            <p className='col-span-3'>{data.extra.pg_real}</p>


                            <label><strong>IDT:</strong></label>
                            <input type="text" className='auxiliary_sheet-title p-0 pl-1 col-span-3 border-dashed border border-gray-400 print:border-none' />

                            <label className='col-span-2 text-right mr-1'><strong>CPF:</strong></label>
                            <input type="text" className='auxiliary_sheet-title p-0 pl-1 col-span-2 border-dashed border border-gray-400 print:border-none' />

                        </div>

                        {/* <div className='grid grid-cols-12'> <p>1</p><p>2</p> <p>3</p> <p>4</p> <p>5</p> <p>6</p> <p>7</p> <p>8</p> <p>9</p> <p>10</p> <p>11</p> <p>12</p> </div> */}

                        <div className='col-span-12 !border-none'>
                            <div className='auxiliary_sheet grid grid-cols-12 !border-b-none'>
                                <div className='row-span-18 text-center flex flex-col justify-center'>
                                    <p>R</p><p>E</p><p>C</p><p>E</p><p>I</p><p>T</p><p>A</p><p>S</p>
                                </div>
                                <div className='row-span-18 col-span-3 col-start-10 text-center h-full'>
                                    <strong>OBSERVAÇÕES</strong>
                                    <textarea {...register('obsReceitas')} className='w-full mt-2 h-5/6 p-1' ></textarea>
                                </div>

                                <div className='col-span-3 text-center flex justify-center items-center'><strong className='p-1'>DISCRIMINAÇÃO</strong></div>
                                <div className='text-center flex justify-center items-center'><strong className='p-1'>%</strong></div>
                                <div className='col-span-2 text-center flex justify-center items-center'><strong className='p-1'>VALOR PESQUISADO</strong></div>
                                <div className='col-span-2 text-center flex justify-center items-center'><strong className='p-1'>VALOR CONTRACHEQUE</strong></div>


                                {addWhiteLineWhenTheListIsSmallerThenEithteen(data.receitas).map((el, index) => {
                                    return (
                                        <>
                                            <div className='col-span-3 pl-1 flex items-center'><span>{el.title || <br />}</span></div>
                                            <div className='text-center flex items-center justify-center'><span>{el.percent}</span></div>
                                            <div className='col-span-2 text-right pr-1 flex items-center justify-end'><span>{el.value ? convert_in_BRL(Number(el.value)) : ''}</span></div>
                                            <div className='col-span-2'><input type="text" {...register(`valorContraqueReceita${index + 1}`, { onBlur: setAndSumValuesFromTheValoresContrachequeField })} className='bg-none text-right w-full py-0.5 pr-1' /></div>
                                        </>
                                    )
                                })}

                                <div className='col-span-5 flex justify-center items-center'><span>SOMA</span></div>
                                <div className='col-span-2 flex justify-end items-center'><span className='pr-1'>{convert_in_BRL(Number(data.somatorios.receitas))}</span></div>
                                <div className='col-span-2 flex justify-end items-center'> <span className='text-right w-full py-0.5 pr-1'>{convert_in_BRL(totalReceitas)}</span></div>
                                <div className='col-span-3 flex justify-end items-center'><span></span></div>
                            </div>
                        </div>

                        <div className='col-span-12 !border-none'>
                            <div className='auxiliary_sheet grid grid-cols-12 !border-b-none'>
                                <div className='row-span-18 text-center flex flex-col justify-center'>
                                    <p>D</p><p>E</p><p>S</p><p>C</p><p>O</p><p>N</p><p>T</p><p>O</p><p>S</p>
                                </div>
                                <div className='row-span-18 col-span-3 col-start-10 text-center h-full'>
                                    <strong>OBSERVAÇÕES</strong>
                                    <textarea {...register('obsDescontos')} className='w-full mt-2 h-5/6 p-1' ></textarea>
                                </div>

                                <div className='col-span-3 text-center flex justify-center items-center'><strong className='p-1'>DISCRIMINAÇÃO</strong></div>
                                <div className='text-center flex justify-center items-center'><strong className='p-1'>%</strong></div>
                                <div className='col-span-2 text-center flex justify-center items-center'><strong className='p-1'>VALOR PESQUISADO</strong></div>
                                <div className='col-span-2 text-center flex justify-center items-center'><strong className='p-1'>VALOR CONTRACHEQUE</strong></div>


                                {addWhiteLineWhenTheListIsSmallerThenEithteen(data.descontos).map((el, index) => {
                                    return (
                                        <>
                                            <div className='col-span-3 pl-1 flex items-center'><span>{el.title || <br />}</span></div>
                                            <div className='text-center flex items-center justify-center'><span>{el.percent}</span></div>
                                            <div className='col-span-2 text-right pr-1 flex items-center justify-end'><span>{el.value ? convert_in_BRL(Number(el.value)) : ''}</span></div>
                                            <div className='col-span-2'><input type="text" {...register(`valorContraqueDesconto${index + 1}`, { onChange: setAndSumValuesFromTheValoresContrachequeField })} className='bg-none text-right w-full py-0.5 pr-1' /></div>
                                        </>
                                    )
                                })}

                                <div className='col-span-5 flex justify-center items-center'><span>SOMA</span></div>
                                <div className='col-span-2 flex justify-end items-center'><span className='pr-1'>{convert_in_BRL(Number(data.somatorios.descontos))}</span></div>
                                <div className='col-span-2 flex justify-end items-center'> <span className='text-right w-full py-0.5 pr-1'>{convert_in_BRL(totalDescontos)}</span></div>
                                <div className='col-span-3 flex justify-end items-center'><span></span></div>

                                <div className='col-span-5 flex justify-center items-center'><span>LÍQUIDO A RECEBER</span></div>
                                <div className='col-span-2 flex justify-end items-center'><span className='pr-1'>{convert_in_BRL(Number(data.somatorios.receitas - data.somatorios.descontos))}</span></div>
                                <div className='col-span-2 flex justify-end items-center'> <span className='text-right w-full py-0.5 pr-1'>{convert_in_BRL(totalReceitas - totalDescontos)}</span></div>
                                <div className='col-span-3 flex justify-end items-center'><span></span></div>
                            </div>
                        </div>



                        <div className='col-span-12 flex justify-center flex-col items-center !border-none'>
                            <br />
                            <br />
                            <p>{userData.signature_place}, <input type="text" className='p-0 m-0' value={signatureDate} onBlur={storageSignatureDate} onChange={(e) => setSignatureDate(e.target.value)} /></p>
                            <br />
                            <br />
                            <br />

                            <div className='text-gray-500 !border-none print:hidden'>
                                Exibir nome do examinador na impressão?
                                <input type="checkbox" className="w-4 h-4 ml-2 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:!bg-gray-700 dark:!border-gray-600" checked={showUserNameInPrint} onChange={() => setShowUserNameInPrint(!showUserNameInPrint)} />
                            </div>
                            {
                                showUserNameInPrint && (
                                    <>

                                        <p>{userData.name + ' - ' + userData.pg}</p>
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
                                <input type="checkbox" className="w-4 h-4 ml-2 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:!bg-gray-700 dark:!border-gray-600" checked={showBossNameInPrint} onChange={() => setShowBossNameInPrint(!showBossNameInPrint)} />
                            </div>
                            {
                                showBossNameInPrint && (
                                    <>
                                        <p>{userData.boss_name + ' - ' + userData.boss_pg}</p>
                                        <p>Chefe da Equipe</p>
                                    </>
                                )
                            }
                            <br />
                            <br />
                            <p className='text-center'>ESTA FICHA DEVERÁ FICAR À DISPOSIÇÃO DOS ÓRGÃOS DE CONTROLE INTERNO E EXTERNO, POR UM PERÍODO NUNCA INFERIOR A UM ANO.</p>
                        </div>

                    </div>
                    <div className='flex justify-center py-4 px-2 bottom-0 right-0 lg:right-16 dark:bg-black/10  bg-white/50 backdrop-blur-sm dark:border-gray-800 border-t border-l rounded-b-3xl '>
                        <ButtonDefault color='green' type='submit' isLoading={isLoading} disabled={isLoading} variant='solid'>
                            {contextFormDataId === '' ? 'Salvar' : 'Atualizar'}
                            <BiSave className='inline-block ml-2' />
                        </ButtonDefault>
                        <div className="mx-2"></div>
                        <ButtonDefault color='blue' type='button' variant='solid' click={handlePrint}>
                            Imprimir
                            <BiPrinter className='inline-block ml-2' />
                        </ButtonDefault>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AuxiliarySheet;