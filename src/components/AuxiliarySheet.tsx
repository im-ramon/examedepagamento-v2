import moment from 'moment';
import { useContext, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { BiGitCompare, BiPrinter, BiSave } from 'react-icons/bi';
import { TbArrowBackUp } from 'react-icons/tb';
import { useReactToPrint } from 'react-to-print';
import { toast } from 'react-toastify';
import { AppContext } from '../contexts/app.context';
import { AuxiliarySheetAPIResponseProps } from '../pages/app/generate_auxiliary_sheet';
import { pocktbase_api } from '../services/pocktbase_api';
import { convert_in_BRL } from '../utils/util_convert_in_BRL';
import { ButtonDefault } from './ButtonDefault';

interface AuxiliarySheetProps {
    isVisible: boolean;
    closeModal: () => void;
    data: AuxiliarySheetAPIResponseProps
}

const AuxiliarySheet = ({ isVisible, closeModal, data }: AuxiliarySheetProps) => {
    const componentRef = useRef(null);

    const { register, handleSubmit, setValue, getValues } = useForm();

    const { contextFormData, setContextFormData } = useContext(AppContext)


    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showUserNameInPrint, setShowUserNameInPrint] = useState<boolean>(true);
    const [showBossNameInPrint, setShowBossNameInPrint] = useState<boolean>(true);

    const onSubmit: SubmitHandler<any> = async data => {
        setIsLoading(true)

        await pocktbase_api.post('/collections/auxiliary_sheets/records', {
            userId: '',
            formData: JSON.stringify(contextFormData),
            editableValues: JSON.stringify(data)
        })
            .then(data => {
                const id: string = data.data.id
                toast.success(`Código: ${id.slice(0, 7)}`, { autoClose: false })
                toast.success(`Ficha auxiliar salva! Guarde o código a seguir para poder editá-la.`, { autoClose: false })
            })
            .catch(e => {
                console.error(e)
                toast.error('Não foi possível salvar a ficha auxiliar.')
            })
            .finally(() => {
                setIsLoading(false)
            })
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

    const [totalReceitas, setTotalReceitas] = useState<string>('');

    function setAndSumValuesFromTheValoresContrachequeField() {
        let listOfValues: string[] = []
        for (let index = 1; index <= 16; index++) {
            listOfValues.push(getValues('valorContraqueReceita' + index) || '0')
        }
        const sum = listOfValues.map(item => Number(item.replace(/[^0-9|\,]/gi, '').replace(',', '.'))).reduce((curr, prev) => curr + prev, 0)

        setTotalReceitas(String(convert_in_BRL(sum)))
    }

    function matchValuesInAuxiliarySheet() {
        data.receitas.forEach((element, index) => {
            setValue('valorContraqueReceita' + (index + 1), convert_in_BRL(element.value))
        });
        setAndSumValuesFromTheValoresContrachequeField()
    }

    return (
        <div id='auxiliary_sheet-modal' onClick={e => closeAuxiliarySheetWhenClickOutside(e.target as HTMLElement)} className={`fixed w-full top-0 right-0 bg-gray-900/50 backdrop-blur-sm z-50 p-24 overflow-y-scroll h-full ${isVisible ? '' : 'hidden'}`}>
            <div className='animate-auxiliary_sheet'>
                <form onSubmit={handleSubmit(onSubmit)} id='auxiliary_sheet-container' className='max-w-6xl mx-auto'>
                    <div className='flex select-none cursor-pointer justify-center items-center py-2 text-primary-400 px-4 bottom-0 right-0 lg:right-16 dark:bg-black/10  bg-white/50 backdrop-blur-sm dark:border-gray-800 border-t border-l rounded-t-3xl '>
                        <ButtonDefault color='yellow' type='button' variant='outline' click={closeModal} helpText="Continue editando sua ficha auxiliar">
                            <TbArrowBackUp className='inline-block mr-2' />
                            Continuar editando
                        </ButtonDefault>
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
                                            <div className='col-span-2'><input type="text" {...register(`valorContraqueReceita${index + 1}`, { onChange: setAndSumValuesFromTheValoresContrachequeField })} className='bg-none text-right w-full py-0.5 pr-1' /></div>
                                        </>
                                    )
                                })}

                                <div className='col-span-5 flex justify-center items-center'><span>SOMA</span></div>
                                <div className='col-span-2 flex justify-end items-center'><span className='pr-1'>{convert_in_BRL(Number(data.somatorios.receitas))}</span></div>
                                <div className='col-span-2 flex justify-end items-center'> <span className='text-right w-full py-0.5 pr-1'>{totalReceitas}</span></div>
                                <div className='col-span-3 flex justify-end items-center'><span></span></div>
                            </div>
                        </div>

                        {/* <p>D</p><p>E</p><p>S</p><p>C</p><p>O</p><p>N</p><p>T</p><p>O</p><p>S</p> */}

                        <div className='col-span-12 flex justify-center flex-col items-center !border-none'>
                            <br />
                            <br />
                            <p>Feira de Santana, BA, 1º de janeiro de 2022.</p>
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
                                <input type="checkbox" className="w-4 h-4 ml-2 text-primary-600 bg-gray-100 border-gray-300 rounded focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:!bg-gray-700 dark:!border-gray-600" checked={showBossNameInPrint} onChange={() => setShowBossNameInPrint(!showBossNameInPrint)} />
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
                    <div className='flex justify-center py-4 px-2 bottom-0 right-0 lg:right-16 dark:bg-black/10  bg-white/50 backdrop-blur-sm dark:border-gray-800 border-t border-l rounded-b-3xl '>
                        <ButtonDefault color='green' type='submit' isLoading={isLoading} disabled={isLoading} variant='solid'>
                            Salvar
                            <BiSave className='inline-block ml-2' />
                        </ButtonDefault>

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