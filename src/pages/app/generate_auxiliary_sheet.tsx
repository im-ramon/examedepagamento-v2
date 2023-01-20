import moment from 'moment';
import Head from 'next/head';
import { ReactElement, useEffect, useState } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import { BiErrorCircle, BiTrash } from 'react-icons/bi';
import BlockTitle from '../../components/BlockTitle';
import { BreakLine } from '../../components/BreakLine';
import { ButtonDefault } from '../../components/ButtonDefault';
import { ButtonDefaultSmall } from '../../components/ButtonDefaultSmall';
import { FormBlockContainer } from '../../components/FormBlockContainer';
import { FormItem } from '../../components/FormItem';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { pg_data } from '../../data/pg_data';
import { api } from '../../services/api';
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";


export type PostGrad = 'Gen Ex Inat' | 'Gen Ex' | 'Gen Div' | 'Gen Bda' | 'Cel' | 'TC' | 'Maj' | 'Cap' | 'Cap QAO' | '1º Ten' | '1º Ten QAO' | '2º Ten' | '2º Ten QAO' | 'Asp Of' | 'Cad último ano' | 'Cad 1/2/3 ano' | 'Al CPOR' | 'Al ES F S' | 'Al EPC' | 'Al EPC 1/2/3' | 'S Ten' | '1º Sgt' | '2º Sgt' | '2º Sgt QE' | '3º Sgt' | '3º Sgt QE' | 'Cb Eng' | 'Cb N Eng' | 'Sd Esp' | 'Sd 2A Cl' | 'Sd 3A Cl' | 'Sd Eng' | 'Sd Rcr' | 'TF Mor' | 'TF 1Cl' | 'TF 2Cl';

export interface AuxiliarySheetFields {
    universo?: 'MA' | 'VT' | 'PN',
    dataReferencia?: string,
    maior65?: boolean,
    isentoIr?: boolean,
    pgSoldo: PostGrad,
    pgReal: PostGrad,
    soldoType?: 'integral' | 'cota',
    soldoPropPercent?: string,
    cotaParteSoldoPercent?: string,
    complemetoCotaSoldoBool?: boolean,
    adicTpSvPercent?: string,
    adicCompDispMilBool?: boolean,
    adicHabType?: 'sem_formacao' | 'altos_estudos_I' | 'altos_estudos_II' | 'aperfeicoamento' | 'especializacao' | 'formacao',
    adicMilBool?: boolean,
    adicPerm?: string,
    adicCoOrgBool?: boolean,
    adicCoOrgPercent?: string,
    adicCoOrgPg?: PostGrad,
    adicCoOrgType?: string,
    adicHVooBool?: boolean,
    adicHVooPercent?: string,
    adicHVooPg?: PostGrad,
    acres25Bool?: boolean,
    pttcBool?: boolean,
    depSalFamiliaQtd?: string,
    depIrQtd?: string,
    ferias?: boolean,
    auxTransporteBool?: boolean,
    auxTransporteVal?: string,
    auxNatatalidadeBool?: boolean,
    auxNatatalidadeQtd?: string,
    adicNatalinoBool?: boolean,
    adicNatalinoMesesQtd?: string,
    adicNatalino1ParcelaVal?: string,
    auxInvalidezBool?: boolean,
    auxPreEscQtd?: string,
    auxFardBool?: boolean,
    auxFard1VezBool?: boolean,
    gratRepreType?: string,
    gratCmdoBool?: boolean,
    gratRep2Bool?: boolean,
    gratRep2DiasQtd?: string,
    gratRep2Pg?: PostGrad,
    auxAlimentC?: boolean,
    auxAlimentEspBool?: boolean,
    auxAlimentEspQtd?: string,
    auxAlimentEspType?: '1' | '5' | '10',
    pMilBool?: boolean,
    pMilPgAcimaBool?: boolean,
    pMilPgAcimaPg?: PostGrad,
    pMil15Bool?: boolean,
    pMil30Bool?: boolean,
    descDepFusexType?: string,
    fusex3Bool?: boolean,
    pnrBool?: boolean,
    pnrType?: string,
    pjBoolean?: boolean,
    pj1Val?: string,
    pj2Val?: string,
    pj3Val?: string,
    pj4Val?: string,
    pj5Val?: string,
    pj6Val?: string,
    pjAdicNatalBoolean?: boolean,
    pjAdicNatal1Val?: string,
    pjAdicNatal2Val?: string,
    pjAdicNatal3Val?: string,
    pjAdicNatal4Val?: string,
    pjAdicNatal5Val?: string,
    pjAdicNatal6Val?: string,
    existemValoresExtraBool?: boolean,
    extraValues?: ExtraValues[] | {}
};

export interface ExtraValues {
    description: string;
    value: string;
    type: 'receita' | 'desconto';
    isTaxable: '0' | '1';
}

const GeneratePayslip: NextPageWithLayout = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset, setValue, getValues } = useForm<AuxiliarySheetFields>();

    const [extraValueDescription, setExtraValueDescription] = useState<string>("")
    const [extraValueAmount, setExtraValueAmount] = useState<string>("0")
    const [extraValueType, setExtraValueType] = useState<'receita' | 'desconto'>('receita')
    const [extraValueTaxable, setExtraValueTaxable] = useState<'0' | '1'>('0')
    const [extraValues, setExtraValues] = useState<ExtraValues[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const onSubmit: SubmitHandler<AuxiliarySheetFields> = async data => {
        setIsLoading(true)

        const requestData = {
            ...data,
            extraValues: {
                ...extraValues
            }
        }

        await api.post('/generate_auxiliary_sheet', requestData)
            .then(responseData => console.log(responseData.data))
            .catch(e => console.error(e))
            .finally(() => {
                setIsLoading(false)
            })
    };


    function pushExtraValuesInArrayAndClearItsForm() {
        setExtraValues([
            ...extraValues,
            {
                description: extraValueDescription == '' ? '-' : extraValueDescription,
                value: extraValueAmount == '' ? '0' : extraValueAmount,
                type: extraValueType,
                isTaxable: extraValueTaxable,
            }
        ])
        clearExtraValuesForm()
    }

    function excludeExtraValueInArray(index: number) {
        let extraValuesFiltered = [...extraValues];
        extraValuesFiltered.splice(index, 1)
        setExtraValues(extraValuesFiltered)
    }

    function clearExtraValuesForm() {
        setExtraValueDescription('')
        setExtraValueAmount('')
        setExtraValueType('receita')
        setExtraValueTaxable('0')
    }

    const styleInputNumber = "block w-32 p-2 mx-auto text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
    const styleInputSelect = "block w-64 mx-auto px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500";
    const styleInputToggle = "w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600";

    const [pgOptionsToSelectInput, setPgOptionsToSelectInput] = useState<any>([])
    const [auxiliarySheetDate, setAuxiliarySheetDate] = useState<string>(moment().format("YYYY-MM-DD"))

    const resetAllForm = () => {
        if (window) {
            window.location.reload();
        }
    }

    useEffect(() => {
        const allPgInfo = pg_data.filter((item) => {
            return moment(auxiliarySheetDate).isBetween(item.startAt, item.endAt)
        })[0]

        if (allPgInfo) {
            const arrayElements = [<option key={'-'} disabled selected value="-">- Selecione uma opção -</option>]
            Object.keys(allPgInfo).forEach(key => {
                if (key == 'startAt' || key == 'endAt') {
                    return
                }
                arrayElements.push(<option key={key} value={key}>{key}</option>)
            })
            setPgOptionsToSelectInput([...arrayElements])
        }


    }, [auxiliarySheetDate])

    return (
        <>
            <Head>
                <title>{appIdentity.app_name + ' | Gerar ficha auxiliar'}</title>
            </Head>
            <PageTitle title='Gerar ficha auxilar' sub_title='Responda o formulário abaixo com as informação do militar/ pensionista que deseja gerar uma ficha auxiliar. Se sugir dúvidas, clique na interrogação (?) no canto de cada campo.' />
            <div>

                <form onSubmit={handleSubmit(onSubmit)} className="relative block pb-8">
                    {/* <div className="flex items-center p-4 -mb-4 text-sm text-green-700 border border-green-300 rounded-lg bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800">
                        <BiCheckCircle size={16} />
                        <span className="font-medium ml-2">Você está criando uma nova ficha auxiliar. Para ver as fichas salvas, <Link href="/app/manage_auxiliary_sheet">clique aqui</Link>.</span>
                    </div> */}

                    <div className="flex items-center p-4 -mb-4 text-sm text-yellow-700 border border-yellow-300 rounded-lg bg-yellow-50 dark:bg-gray-800 dark:text-yellow-400 dark:border-yellow-800" role="alert">
                        <BiErrorCircle size={16} />
                        <span className="font-medium ml-2">Você está editando a ficha auxiliar nº xxxx. Ao gerar a salvar, os dados serão sobreescritos no banco de dados</span>
                    </div>
                    <BlockTitle title='Informações gerais' />
                    <FormBlockContainer>

                        <FormItem labelText='Universo/ Classificação' supportText='Qual universo/ classificação do examinado?'>
                            <select defaultValue={'-'} {...register('universo', { required: true })} required className={styleInputSelect}>
                                <option value="MA">Militar da Ativa</option>
                                <option value="VT">Veterano</option>
                                <option value="PN">Pensionista</option>
                            </select>
                        </FormItem>

                        <FormItem labelText='Data do contracheque' supportText='Qual a data do contracheque?'>
                            <input defaultValue={auxiliarySheetDate} type="date" min="2020-01-01" placeholder="Data" {...register("dataReferencia", { onChange: (e) => { setAuxiliarySheetDate(e.target.value) }, min: "2020-01-01" })} className={styleInputSelect} />
                        </FormItem>

                        <FormItem labelText='Idade' supportText='O examinado tem mais de 65 anos?' helpText='Essa informação irá influenciar no valor final do imposto de renda.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('maior65')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Isenção de Imposto de Renda' supportText='O examinado é isento de Imposto de Renda?' helpText='A Pensionista Especial de Ex-combatente que recebe o soldo de 2º Sgt (Lei nº 4.242/63) é isenta de imposto de renda, mesmo que em seu título de pensão não exista essa informação. Já a Pensionista Especial de Ex-combatente que recebe o soldo de 2º Sgt (Lei nº 8.059/90) não é automaticamente isenta de imposto de renda. *Observação: Ao contrário que muitos pensam, maiores de 65 anos não são isentos de imposto de renda. Esses recebem apenas um abatimento no valor final.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('isentoIr')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Post/Grad para Soldo' supportText='Qual o P/G em que o examinado recebe o soldo?' helpText='Deve ser selecionado o Posto/ Graduação em que o examinado recebe o soldo. No caso dos miltiares da ativa, o P/G para soldo e P/G Real são os mesmos, entretanto, no caso dos Militares Veteranos e Pensionistas, essas informações poderão ser difirentes.'>
                            <select defaultValue={'-'} {...register('pgSoldo', { required: true })} required className={styleInputSelect}>
                                {pgOptionsToSelectInput}
                            </select>
                        </FormItem>

                        <FormItem labelText='Post/Grad Real' supportText='Qual o P/G real do examinado?' helpText='O P/G real é o último Posto ou Graduação do militar (ou instituidor de pensão) enquanto na ativa. Não deve ser considerado: - Postos ou graduações alcançados pelo militar como benefício, na forma prevista em lei, em decorrência de reforma, morte ou transferência para a reserva; - Percepção de soldo ou de remuneração correspondente a grau hierárquico superior ao alcançado na ativa, em decorrência de reforma, morte ou transferência para a reserva; e - Percepção de pensão militar correspondente a grau hierárquico superior ao alcançado pelo militar em atividade, em decorrência de benefícios concedidos pela Lei nº 3.765, de 4 de maio de 1960.'>
                            <select defaultValue={'-'} {...register('pgReal', { required: true })} required className={styleInputSelect}>
                                {pgOptionsToSelectInput}
                            </select>
                        </FormItem>
                    </FormBlockContainer>

                    <BlockTitle title='Informações financeiras' />
                    <FormBlockContainer>

                        <FormItem labelText='Soldo' supportText='Qual tipo de soldo o examinado recebe?' helpText='Escolha a categoria de soldo que o examinado recebe. São duas opções, a primeira "Normal/Integral" significa que o examinado recebe o valor do seu soldo por completo, normalmente militares da ativa, veterenos que completaram o tempo mínimo para reserva e seus pensionistas recebem essa categoria de soldo. A categoria " Soldo Proporcional para Cota" é devida, normalmente, aos militares que fora para a reserva antes do tempo mínimo, como no caso de militares reformados por ser julgado incapaz definitivamente.' badgeColor='green' badgeText='Receita'>
                            <select defaultValue={'-'} {...register('soldoType', { required: true })} className={styleInputSelect}>
                                <option value="integral">Integral</option>
                                <option value="cota">Proporcional por cota</option>
                            </select>
                        </FormItem>

                        {watch('soldoType') == 'cota' && (
                            <>
                                <FormItem labelText='Soldo Proporcional para Cota' supportText='Qual porcentagem de soldo proporcional para cota o examinado recebe?' helpText='O soldo proporcional para cota é difirente da cota-parte do soldo. O soldo proporcional para cota é devido, normalmente, aos militares que foram para a reserva antes do tempo mínimo, como no caso de militares reformados por ser julgado incapaz definitivamente. Os pensionistas desses militares também pode receber o soldo proporcional para cota. Por exemplo, o instituidor da pensão poderia receber soldo proporcional para cota de 29/30 e ao falecer deixar a pensão de 1/3 para cada dependente, logo, a pensão será calculada primeiro sobre o soldo proporcional depois será dividida por cota-parte para cada beneficiário. Referência: Lei nº 6.880, de 9 de dezembro de 1980.'>
                                    <input {...register('soldoPropPercent', { required: true, min: 0, max: 100 })} defaultValue={100} step="0.01" min="0" max="100" type="number" className={styleInputNumber} />
                                </FormItem>

                                <FormItem labelText='Complemento de cota de soldo' supportText='Recebe complemento de cota de soldo?' helpText='Direito extinto'>
                                    <div className='flex items-center justify-center w-full py-1'>
                                        <span className='text-sm mx-2'>Não</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" {...register('complemetoCotaSoldoBool')} value="" className="sr-only peer" />
                                            <div className={styleInputToggle}></div>
                                        </label>
                                        <span className='text-sm mx-2'>Sim</span>
                                    </div>
                                </FormItem>
                            </>
                        )}

                        {watch('universo') == 'PN' && (
                            <FormItem labelText='Cota-parte do Soldo' supportText='Qual porcetagem de cota-parte a pensionista recebe?' helpText='Esse campo é exclusivo para pensionistas. Aqui deve ser informado qual porcentagem de cota-parte o(a) pensionista recebe. Essa informação fica disponível no título de pensão ou na apostila, na PHPM do(a) examinado(a). Em documentos mais antigos, é informado o percentual em fração, então, para inserir a informação no campo, converta a fração em porcentagem, por exemplo: 1/2 = 50%.' badgeColor='green' badgeText='Receita'>
                                <input {...register('cotaParteSoldoPercent', { required: true, min: 0, max: 100 })} defaultValue={100} step="0.01" min="0" max="100" type="number" className={styleInputNumber} />
                            </FormItem>
                        )}

                        <FormItem labelText='Adicional de Tempo de Serviço' supportText='Qual o percentual que o examinado faz jus de Adicional de Tempo de Serviço?' helpText='Adicional de Tempo de Serviço é a parcela remuneratória mensal devida ao militar, inerente ao tempo de serviço e os acréscimos permitidos por lei, observado o disposto no art. 30 da Medida Provisória 2215/01. Será computado 1% para cada ano de serviço anterior a 31 DEZ 2000. É vedada a concessão cumulativa do adicional de compensação por disponibilidade militar com o adicional de tempo de serviço, sendo assegurado, caso o militar faça jus a ambos os adicionais, o recebimento do mais vantajoso.' badgeColor='green' badgeText='Receita'>
                            <input {...register('adicTpSvPercent', { required: true, min: 0, max: 100 })} defaultValue={0} step="1" min="0" max="100" type="number" className={styleInputNumber} />
                        </FormItem>

                        <FormItem labelText='Adicional de Compensação por Disponibilidade Militar' supportText='O militar recebe Adicional de Compensação por Disponibilidade Militar?' helpText='O Adicional de compensação por disponibilidade militar é a parcela remuneratória mensal devida ao militar em razão da disponibilidade permanente e da dedicação exclusiva. É vedada a concessão cumulativa do adicional de compensação por disponibilidade militar com o adicional de tempo de serviço, sendo assegurado, caso o militar faça jus a ambos os adicionais, o recebimento do mais vantajoso. O percentual do adicional de compensação por disponibilidade militar é irredutível e corresponde sempre ao maior percentual inerente aos postos ou graduações alcançados pelo militar durante sua carreira no serviço ativo, independentemente de mudança de círculos hierárquicos, postos ou graduações. O percentual do adicional de compensação por disponibilidade militar a que o militar faz jus incidirá sobre o soldo do posto ou da graduação atual, e não serão considerados: I - postos ou graduações alcançados pelo militar como benefício, na forma prevista em lei, em decorrência de reforma, morte ou transferência para a reserva; percepção de soldo ou de remuneração correspondente a grau hierárquico superior ao alcançado na ativa, em decorrência de reforma, morte ou transferência para a reserva; e percepção de pensão militar correspondente a grau hierárquico superior ao alcançado pelo militar em atividade, em decorrência de benefícios concedidos pela Lei nº 3.765, de 4 de maio de 1960. Referência: Lei nº 13.954, de 16 de dezembro de 2019.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicCompDispMilBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional Habilitação' supportText='Qual nível de habilitação do examinado?' helpText='O Adicional de habilitação é a parcela remuneratória mensal devida ao militar, inerente aos cursos realizados com aproveitamento. Os percentuais podem ser consultados no ANEXO III da Lei nº 13.954, de 16 de dezembro de 2019. Os tipos de cursos existentes devem obedecer às seguintes condições: I - de altos estudos categoria I, realizados a partir de oficiais superiores e de primeiros sargentos; II - de altos estudos categoria II, realizados a partir de oficiais superiores e de segundos sargentos; III - de aperfeiçoamento, realizados a partir de oficiais subalternos e de terceiros sargentos; IV - de especialização, realizados a partir de aspirantes a oficial e de terceiros sargentos; e V - de formação, a partir da conclusão com aproveitamento dos cursos e estágios de formação ou adaptação de oficiais e praças, realizados nas organizações militares das Forças Armadas.' badgeColor='green' badgeText='Receita'>
                            <select defaultValue={'-'} {...register('adicHabType', { required: true })} className={styleInputSelect}>
                                <option value="sem_formacao">Sem formação (não recebe)</option>
                                <option value="altos_estudos_I">Altos estudos Categoria I</option>
                                <option value="altos_estudos_II">Altos estudos Categoria II</option>
                                <option value="aperfeicoamento">Apefeiçoamento</option>
                                <option value="especializacao">Especialização</option>
                                <option value="formacao">Formação</option>
                            </select>
                        </FormItem>

                        <FormItem labelText='Adicional Militar' supportText='O militar recebe Adicional Militar' helpText='O Adicional Militar é a parcela remuneratória mensal devida ao militar, inerente a cada círculo hierárquico da carreira militar. Os percentuais estão presentes na Medida Provisória nº 2.215-10, de 31 de agosto de 2001. O próprio CPEx faz a gerencia sobre que percentual do Adicional Militar deve ser pago para cadas militar/ pensionistas.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicMilBool')} defaultChecked value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional de Permanência' supportText='Qual o percentual que o examinado recebe de Adicional de Permanência?' helpText='É a parcela remuneratória devida ao militar, mensalmente, incidente sobre o soldo do posto ou da graduação, referente ao período em que continuar ou tenha continuado em serviço, após ter completado o tempo mínimo de permanência no serviço ativo. Situações e percentuais a serem observados: I – 5 (cinco) por cento: militar que, em atividade, a partir de 29 de dezembro de 2000, tenha completado ou venha a completar 720 (setecentos e vinte dias) a mais que o tempo requerido para a transferência para a inatividade remunerada; e II – 5 (cinco) por cento a cada promoção: militar que, tendo satisfeito o requisito do item acima, venha a ser promovido em atividade ao posto ou graduação superior. Os percentuais acima mencionados são acumuláveis entre si.' badgeColor='green' badgeText='Receita'>
                            <input {...register('adicPerm', { required: true, min: 0, max: 100, })} defaultValue={0} step="5" min="0" max="100" type="number" className={styleInputNumber} />
                        </FormItem>

                        <FormItem labelText='Adicional de Compensação Orgânica' supportText='Recebe Adicional de Compensação Orgânica?' helpText='O Adicional de Compensação Orgânica é parcela remuneratória mensal devida ao militar para compensação de desgaste orgânico resultante do desempenho continuado de atividades especiais. É possível encontrar os percentuais no Anexo V da Medida Provisória nº 2.215-10, de 31 de agosto de 2001.' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicCoOrgBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                            {watch('adicCoOrgBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Qual tipo?'>
                                        <select defaultValue={'-'} {...register('adicCoOrgType')} className={styleInputSelect}>
                                            <option value="PDQT">Paraquedista</option>
                                            <option value="RAIO-X">Raio-X</option>
                                            <option value="TO/ OMA/ FO">Tripulante Orgânico</option>
                                            <option value="TO/ OMA/ FO">Observador Meteorológico</option>
                                            <option value="TO/ OMA/ FO">Observador Fotogramétrico</option>
                                            <option value="IM/ MG/ CTA">Imersão a bordo de submarino</option>
                                            <option value="IM/ MG/ CTA">Mergulho com escafandro ou com aparelho</option>
                                            <option value="IM/ MG/ CTA">Controle de tráfego aéreo</option>
                                        </select>
                                    </FormItem>

                                    <FormItem supportText='Qual percentual?'>
                                        <input {...register('adicCoOrgPercent', { required: true, min: 0, max: 100 })} defaultValue={0} step="0.01" min="0" max="100" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Calculado sobre o soldo de qual soldo?'>
                                        <select defaultValue={'-'} {...register('adicCoOrgPg')} className={styleInputSelect}>
                                            {pgOptionsToSelectInput}
                                        </select>
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Adicional de Horas de Voo (ART24MP)' supportText='Recebe Adicional de Horas de Voo?' helpText='O Adicional de habilitação é a parcela remuneratória mensal devida ao militar, inerente aos cursos realizados com aproveitamento. Os percentuais podem ser consultados no ANEXO III da Lei nº 13.954, de 16 de dezembro de 2019. Os tipos de cursos existentes devem obedecer às seguintes condições: I - de altos estudos categoria I, realizados a partir de oficiais superiores e de primeiros sargentos; II - de altos estudos categoria II, realizados a partir de oficiais superiores e de segundos sargentos; III - de aperfeiçoamento, realizados a partir de oficiais subalternos e de terceiros sargentos; IV - de especialização, realizados a partir de aspirantes a oficial e de terceiros sargentos; e V - de formação, a partir da conclusão com aproveitamento dos cursos e estágios de formação ou adaptação de oficiais e praças, realizados nas organizações militares das Forças Armadas.' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicHVooBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                            {watch('adicHVooBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Qual percentual?'>
                                        <input {...register('adicHVooPercent', { required: true, min: 0, max: 100 })} defaultValue={0} step="0.01" min="0" max="100" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Calculado sobre o soldo de qual soldo?'>
                                        <select defaultValue={'-'} {...register('adicHVooPg')} className={styleInputSelect}>
                                            {pgOptionsToSelectInput}
                                        </select>
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Adicional de Acréscimo de 25% sobre o soldo' supportText='Recebe acréscimo de 25% sobre o soldo?' helpText='Vantagem concedida aos Ex-combatentes incapacitados fisicamente para o serviço militar, em consequência de ferimentos verificados ou moléstias adquiridas quando participavam da Força Expedicionária Brasileira destacada, em 1944-1945, no teatro de operações da Itália. O amparo para o pagamento deste adicional encontra-se no Decreto Lei nº 8.795, de 23 de janeiro de 1946.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('acres25Bool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional PTTC' supportText='O examinado é Prestador de Trabalho por Tempo Certo (PTTC)?' helpText='A prestação de tarefa por tempo certo é a execução de atividades de natureza militar, atribuídas ao militar veterano, justificada pela necessidade do serviço, de caráter voluntário e por um período previamente especificado e limitado. Para isso, o militar nomeado receberá o Adicional PTTC de 30% sobre seu rendimento bruto.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pttcBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional de Férias' supportText='O examinado irá gozar Férias?' helpText='Valor correspondente a 1/3 (um terço) da remuneração do mês de início das férias (no caso dos PTTC, 1/3 do Adicional PTTC), pago antecipadamente.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('ferias')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional Natalino' supportText='O examinado receberá Adicional Natalino?' helpText='O valor do adicional natalino corresponde a um doze avos da remuneração no país a que o militar fizer jus no mês de dezembro, por mês de efetivo serviço, no respectivo ano. A fração igual ou superior a quinze dias será considerada mês integral. O adicional natalino será pago ao militar em atividade em duas parcelas: - A primeira parcela em junho, em valor correspondente à metade da remuneração percebidos no mês anterior; e - A segunda parcela até o dia vinte de dezembro de cada ano, descontado o adiantamento da primeira parcela. O Adicional Natalino integra o rendimento bruto para fins do imposto de renda, não estando, o adiantamento da primeira parcela, sujeito à incidência na fonte.' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicNatalinoBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('adicNatalinoBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Referenta a quantos meses?'>
                                        <input {...register('adicNatalinoMesesQtd', { required: true, min: 0, max: 12 })} defaultValue={0} step="1" min="0" max="12" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='O examinado já recebeu algum Adiantamento do Adicional Natino durante o ano? Se sim, qual valor?'>
                                        <input {...register('adicNatalino1ParcelaVal', { required: true, min: 0, max: 99999 })} defaultValue={0} step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Dependentes para salário-família' supportText='Possui quantos dependentes para fins de Salário Família?' helpText='Neste campo deve ser informado a quantidade de dependentes para fins de salário-família. Para o  salário-família , a Portaria nº 7-GB, de 8 de janeiro de 1968 é a legislação base para concessão do direito (esssa legislação não facilmente encontrada na internet, portanto, na página "legislação" do App é possível encontra-la.' badgeColor='green' badgeText='Receita'>
                            <input {...register('depSalFamiliaQtd', { required: true, min: 0, max: 20 })} defaultValue="0" step="1" min="0" max="20" type="number" className={styleInputNumber} />
                        </FormItem>

                        <FormItem labelText='Dependentes para imposto de renda' supportText='Possui quantos dependentes para fins de imposto de renda?' helpText='Neste campo deve ser informado a quantidade de dependentes para fins de dedução no imposto de renda. Deve-se tomar como base o Decreto nº 3.000, de 26 de março de 1999.' badgeColor='green' badgeText='Receita'>
                            <input {...register('depIrQtd', { required: true, min: 0, max: 20 })} defaultValue="0" step="1" min="0" max="20" type="number" className={styleInputNumber} />
                        </FormItem>

                        <FormItem labelText='Auxílio Transporte' supportText='O examinado recebe Auxílio Transporte?' helpText='Benefício que se destina a indenizar, parcialmente, as despesas com o transporte municipal, intermunicipal e interestadual do militar da ativa, do prestador de tarefa por tempo certo e do convocado para o serviço ativo. Aqui deve ser inserido o valor constante na SAT (Solicitação de Auxílio Transporte).' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('auxTransporteBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('auxTransporteBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Valor do auxilío transporte:'>
                                        <input {...register('auxTransporteVal', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>
                                </>)
                            }
                            {/* COLOCAR VALOR DO AUXILIO TRANSPORTE AQUI */}
                        </FormItem>

                        <FormItem labelText='Auxílio Natalidade' supportText='O examinado irá receber Auxílio Natalidade?' helpText='É o direito pecuniário devido ao militar por motivo de nascimento do filho, adoção ou reconhecimento de paternidade, conforme Decreto nº 4.307, de 18 de julho de 2002, e corresponde a uma vez o soldo do posto ou graduação. Na hipótese de ambos os genitores serem militares, o auxílio-natalidade será pago apenas à parturiente, com base no soldo daquele que possuir a maior remuneração ou provento; Na ocorrência de parto múltiplo, o auxílio-natalidade será acrescido de cinquenta por cento (50%) por cada recém-nascido, sendo 1 ½ soldo ao 1º filho, acrescido de ½ soldo a cada nascido. Exemplo: Parto de trigêmeos ou adoção de 3 (três) crianças: 1 soldo e 50% (1º filho) + 50% (2º filho) + 50% (3º filho) = 2,5 soldos.' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('auxNatatalidadeBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                            {watch('auxNatatalidadeBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Referente a quantos filhos?'>
                                        <input {...register('auxNatatalidadeQtd', { required: true, min: 0, max: 18 })} defaultValue={0} step="1" min="0" max="18" type="number" className={styleInputNumber} />
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Auxílio Inavalidez' supportText='O examinado recebe Auxílio Inavalidez?' helpText='O auxílio-invalidez, segundo a Lei nº 11.421, de 21 de dezembro de 2006,  é devido, nos termos do regulamento, ao militar que necessitar de internação especializada, militar ou não, ou assistência, ou cuidados permanentes de enfermagem, devidamente constatados por Junta Militar de Saúde, e ao militar que, por prescrição médica, também homologada por Junta Militar de Saúde, receber tratamento na própria residência, necessitando assistência ou cuidados permanentes de enfermagem.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('auxInvalidezBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Auxílio Pré-escolar' supportText='Possui quantos filhos que recebem Auxílio Pré-escolar?' helpText='A assistência pré-escolar alcançará os dependentes do militar na faixa etária compreendida desde o nascimento até o mês em que completar 6 anos de idade. A geração do direito para concessão do benefício ocorre a partir da data do preenchimento da ficha cadastro pelo interessado. O militar só perde o direito a essa verba quando seu dependente completa 6 anos de idade, sendo que o fim do pagamento se dá no mês subsequente àquele em que se verifica o aniversário, qualquer que seja o dia. Referência: Portaria Interministerial nº 10, de 13 janeiro de 2016.' badgeColor='green' badgeText='Receita'>
                            <input {...register('auxPreEscQtd', { required: true, min: 0, max: 20 })} defaultValue="0" step="1" min="0" max="20" type="number" className={styleInputNumber} />
                        </FormItem>

                        <FormItem labelText='Auxílio Fardamento' supportText='O examinado irá receber Auxílio Fardamento?' helpText='O auxílio fardamento é o direito pecuniário devido ao militar para custear gastos com fardamento, cujo valor será calculado sobre o valor do soldo do militar vigente na data em que for efetivado o pagamento. a. O auxílio-fardamento equivalente a 1 ½ (um e meio) soldo será pago nas seguintes situações: - O militar, declarado Aspirante a Oficial da Ativa (AMAN), ou promovido a Terceiro Sargento; e - Os nomeados Oficiais ou Sargentos, ou matriculados em escolas de formação mediante habilitação em concurso e os nomeados Capelães Militares. b. O auxílio-fardamento equivalente a 1 (um) soldo será pago nas seguintes situações: - O Oficial promovido ao primeiro posto de Oficial General; - Os Aspirantes a Oficial, oriundos dos Órgãos de Formação de Oficiais da Reserva, convocados para a prestação do Serviço Militar (EIC); - Os médicos, farmacêuticos, dentistas e veterinários, quando convocados para o Serviço Militar Inicial; - O Oficial, Subtenente e Sargento ao ser promovido; - A cada 3 (três) anos no mesmo posto ou graduação; - O militar reincluído, convocado ou designado para o serviço ativo; - O militar que retornar à ativa por convocação, designação ou reinclusão, desde que há mais de seis meses de inatividade' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('auxFardBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('auxFardBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='É a primeira vez que receberá o Auxílio Fardamento na atual carreira?'>
                                        <div className='flex flex-1 items-center justify-center w-full py-1'>
                                            <span className='text-sm mx-2'>Não</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" {...register('auxFard1VezBool')} value="" className="sr-only peer" />
                                                <div className={styleInputToggle}></div>
                                            </label>
                                            <span className='text-sm mx-2'>Sim</span>
                                        </div>
                                    </FormItem>

                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Auxílio Alimentação - Tipo "C"' supportText='O examinado receberá Auxílio Alimentação - Tipo "C"?' helpText='Este auxílio é devido aos Cabos e Soldados, da ativa, quando entram de férias. São pagas 30 etapas.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('auxAlimentC')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Auxílio Alimentação' supportText='O examinado irá receber Auxílio Alimentação esporádico?' helpText='Caso o militar tenha que receber o auxílio-alimentação, preencher o campo abaixo com a quantidade de etapas que ele faz jus. Lembrando que desde 2017 até a presente data, o valor da etapa é de R$ 9,00. O militar, quando não puder receber alimentação por sua organização ou por outra nas proximidades do local de serviço ou expediente, ou quando, por imposição do horário de trabalhe distância de sua residência, seja obrigado a fazer refeições fora dela, tendo para tanto despesas extraordinárias, fará jus ao auxílio-alimentação, por dia em que cumprir integralmente o expediente, cujos valores serão: - 10 (dez) vezes o valor da etapa comum fixada para a localidade, quando em serviço de escala de duração de vinte e quatro horas; ou - 5 (cinco) vezes o valor da etapa comum fixada para a localidade, quando em serviço ou expediente de duração superior a oito horas de efetivo trabalho e inferior a vinte e quatro horas. O militar, quando servir em organização militar que não tenha serviço de rancho organizado e não possa ser arranchado por outra organização nas proximidades, fará jus a uma vez a etapa comum fixada para a localidade, nos dias em que cumprir expediente diário integral.' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('auxAlimentEspBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('auxAlimentEspBool') && (
                                <>
                                    <BreakLine />
                                    <FormItem supportText='Qual tipo de etapa?' badgeColor='green' badgeText='Receita'>
                                        <select {...register('auxAlimentEspType', { required: true })} className={styleInputSelect}>
                                            <option value="1">Normal - 1x</option>
                                            <option value="5">Majorada - 5x</option>
                                            <option value="10">Majorada - 10x</option>
                                        </select>
                                    </FormItem>

                                    <BreakLine />

                                    <FormItem supportText='Quantas etapas?'>
                                        <input {...register('auxAlimentEspQtd', { required: true, min: 0, max: 365 })} defaultValue={0} step="1" min="0" max="365" type="number" className={styleInputNumber} />
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Gratificação de Localidade Especial' supportText='Qual tipo de Gratificação de Localidade Especial o examinado recebe?' helpText='O militar em Localidade Especial Tipo “A” faz jus ao percentual de 20% (vinte por cento) do soldo e o militar em Localidade Especial Tipo “B” faz jus ao percentual de 10% (dez por cento) do soldo, nos termos da Portaria Normativa nº 13-MD, de 5 de janeiro de 2006 e suas atualizações; O direito do militar à gratificação de localidade especial, quando for transferido, começa no dia da sua apresentação à OM de destino e cessa no seu desligamento; É assegurado ao militar o direito à continuidade da percepção da gratificação de localidade especial nos afastamentos sem desligamento da OM; O deslocamento do militar de uma localidade especial para exercer atividades em outra localidade que não é considerada especial, por necessidade do serviço e em caráter temporário, não implicará na perda da Gratificação de Localidade Especial; e O militar que recebe a Gratificação de Localidade Especial Tipo B (10%) e vai exercer atividades em Localidade Especial Tipo A (20%) faz jus à diferença entre as gratificações.' badgeColor='green' badgeText='Receita'>
                            <select defaultValue={'-'} {...register('gratRepreType', { required: true })} className={styleInputSelect}>
                                <option value="-">Não recebe</option>
                                <option value="A">Tipo “A”</option>
                                <option value="B">Tipo “B”</option>
                            </select>
                        </FormItem>

                        <FormItem labelText='Gratificação de Representação de Comando' supportText='O examinado recebe Gratificação de Representação de Comando?' helpText='Parcela remuneratória mensal devida aos oficiais-generais e aos demais oficiais em cargo de comando, direção e chefia de organização militar, conforme percentuais definidos no Anexo IV da Lei nº 13.954, de 16 de dezembro de 2019. Na ocorrência de assunção interina do comando da OM por oficial, em virtude do afastamento do cargo pelo titular, por prazo superior a 30 (trinta) dias, o substituto fará jus ao recebimento da gratificação de representação de comando pelo período que exercer interinamente o cargo. Em contrapartida, deixará de fazer jus à referida gratificação, por igual período, o titular.' badgeColor='green' badgeText='Receita'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('gratCmdoBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Gratificação de Representação 2%' supportText='O examinado irá receber Gratificação de Representação 2%?' helpText='Parcela remuneratória eventual devida ao militar em viagem de representação, atividade de instrução, operação de emprego operacional ou que esteja às ordens de autoridade estrangeira no País. O cálculo do número de dias para fins de pagamento da gratificação de representação deve considerar o período superior a oito horas e inferior a vinte quatro horas como um dia, não havendo necessidade de se aguardar as primeiras vinte e quatro horas da viagem.' badgeColor='green' badgeText='Receita'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('gratRep2Bool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('gratRep2Bool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Referente a quantos dias?'>
                                        <input {...register('gratRep2DiasQtd', { required: true, min: 0, max: 365 })} defaultValue={0} step="1" min="0" max="365" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Sobre qual posto ou graduação?'>
                                        <select defaultValue={'-'} {...register('gratRep2Pg')} className={styleInputSelect}>
                                            {pgOptionsToSelectInput}
                                        </select>
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        {/* DESCONTOS */}

                        <FormItem labelText='Pensão Militar' supportText='O examinado contribui para a Pensão Militar?' helpText='É o desconto obrigatório incidente sobre a remuneração do militar para custeio das futuras pensões destinadas aos seus beneficiários. São contribuintes obrigatórios da pensão militar, mediante desconto mensal em folha de pagamento, os militares das Forças Armadas e os seus pensionistas, ou seja, TODOS CONTRIBUEM. O desconto da pensão militar tem alíquota de 10,5% (dez e meio por cento), conforme previsto na Lei nº 13.954, de 16 de dezembro de 2019.' badgeColor='red' badgeText='Desconto'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pMilBool')} value="" defaultChecked className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('pMilBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Contribui em um posto/ gradução acima do que recebe?'>
                                        <div className='flex flex-1 items-center justify-center w-full py-1'>
                                            <span className='text-sm mx-2'>Não</span>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" {...register('pMilPgAcimaBool')} value="" className="sr-only peer" />
                                                <div className={styleInputToggle}></div>
                                            </label>
                                            <span className='text-sm mx-2'>Sim</span>
                                        </div>
                                    </FormItem>

                                    {watch('pMilPgAcimaBool') && (
                                        <>
                                            <FormItem supportText='Sobre qual posto/ gradução o examinado contribui para a Pensão Militar?'>
                                                <select defaultValue={'-'} {...register('pMilPgAcimaPg')} className={styleInputSelect}>
                                                    {pgOptionsToSelectInput}
                                                </select>
                                            </FormItem>
                                        </>
                                    )}
                                </>
                            )}

                        </FormItem>

                        <FormItem labelText='Pensão Militar 1,5%' supportText='Fez a opção pelo desconto de Pensão Militar de 1.5%?' helpText='O desconto da pensão militar de 1,5% (um e meio por cento) destina-se à manutenção dos benefícios previstos na Lei nº 3.765, de 4 de maio de 1960, ou seja, anteriores à vigência da MP 2.215-10, de 31 de agosto de 2001. O desconto tem como finalidade garantir a permanência das filhas como dependente habilitável à pensão militar, mesmo após as "perderem" a condição de dependência (casarem-se e ultrapassar os 24 anos). Também contribui, obrigatoriamente, a pensionista que era esposa do instituidor da pensão e esse optou em  contribuir com este desconto adicional.' badgeColor='red' badgeText='Desconto'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pMil15Bool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Pensão Militar 3,0%' supportText='A pensionista contribui com o desconto extraordinário de Pensão Militar de 3.0%?' helpText='A partir de 1º de janeiro de 2020, contribuirão extraordinariamente para a pensão militar, com alíquota de 3%, as pensionistas filhas não inválidas pensionistas evitalícia (pensão não tem data para encerrar).' badgeColor='red' badgeText='Desconto'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pMil30Bool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='FuSEx 3%' supportText='Contribui para o FuSEx?' helpText='O desconto de FuSEx é destinado à manutenção da assistência médico-hospitalar do Exército Brasileiro. Alguns militares/ pensionsitas não contribuem por meio desse desconto, são eles: - Os soldades em serviço militar obrigatório - Os ex-combatentes - Os pensionistas especiais de ex-combatentes - Os militares que são dependentes de outros militares (cônjuge, filho etc) - Algumas pensionistas filhas, implantadas após a Lei nº 13.954/2019' badgeColor='red' badgeText='Desconto'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('fusex3Bool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Desconto de dependentes no FuSEx' supportText='Qual percentual de desconto de dependentes no FuSEx?' helpText='Deve ser analisado a quantidade de dependentes que o militar/ pensionista possui cadastrado como dependentes no FuSEx. Para 1 (um) dependente cadastrado, exceto o cônjuge ou companheira(o), o desconto será de 0,4% sobre o bruto. Para 2 (dois) ou mais dependentes cadastrados,   exceto o cônjuge ou companheira(o),  o desconto será de 0,5% sobre o bruto, não ultrapassando essa alíquota.' badgeColor='red' badgeText='Desconto'>
                            <select defaultValue={'-'} {...register('descDepFusexType', { required: true })} className={styleInputSelect}>
                                <option value="00">Não desconta</option>
                                <option value="04">0,4%</option>
                                <option value="05">0,5%</option>
                            </select>
                        </FormItem>

                        <FormItem labelText='PNR' supportText='O examinado reside em PNR?' helpText='Desconto devido ao militar que ocupa PRÓPRIO NACIONAL RESIDENCIAL (PNR), nos seguintes percentuais: - Percentual de 5,0% (cinco vírgula zero por cento) sobre o soldo do permissionário por ocupação de próprio nacional residencial (PNR) sob a jurisdição do Exército Brasileiro - Quando adotado um dos sistemas de administração especial em PNR de natureza apartamento, a taxa de uso terá o valor mensal correspondente ao percentual de 3,5% (três vírgula cinco por cento) sobre o soldo do permissionário.' badgeColor='red' badgeText='Desconto'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pnrBool')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('pnrBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Qual o tipo de desconto de PNR da unidade?'>
                                        <select defaultValue={'-'} {...register('pnrType', { required: true })} className={styleInputSelect}>
                                            <option value="-" disabled>- Selecione uma opção -</option>
                                            <option value="50">5,0%</option>
                                            <option value="35">3,5%</option>
                                        </select>
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Pensão Judiciária' supportText='O examinado paga Pensão Judiciária?' helpText='É direito estabelecido nos artigos 1.694 a 1.710 da Lei nº 10.406, de 10 de janeiro de 2002 (Código Civil), que garante aos parentes, cônjuges ou companheiros a possibilidade de solicitar à outra parte auxílio financeiro. Aqui deve ser inserido o valor correto da Pensão Alimentícia, conforme consta a folha de cálculos na PHPM do militar.' badgeColor='red' badgeText='Desconto'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pjBoolean')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('pjBoolean') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Valor da Pensão Judiciária nº 1:'>
                                        <input {...register('pj1Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 2:'>
                                        <input {...register('pj2Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 3:'>
                                        <input {...register('pj3Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 4:'>
                                        <input {...register('pj4Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 5:'>
                                        <input {...register('pj5Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 6:'>
                                        <input {...register('pj6Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Pensão Judiciária - Adicional Natal' supportText='O examinado irá pagar Pensão Judiciária sobre o Adicional Natal?' helpText='TODAS as Pensão incidem sobre o Adicional Natalino, exceto nos casso em que na sentação foi determinado EXPLICITAMENTE que não deve ser pago pensão sobre o Adicional Natalino.' badgeColor='red' badgeText='Desconto'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pjAdicNatalBoolean')} value="" className="sr-only peer" />
                                    <div className={styleInputToggle}></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>

                            {watch('pjAdicNatalBoolean') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Valor da Pensão Judiciária nº 1:'>
                                        <input {...register('pjAdicNatal1Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 2:'>
                                        <input {...register('pjAdicNatal2Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 3:'>
                                        <input {...register('pjAdicNatal3Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 4:'>
                                        <input {...register('pjAdicNatal4Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 5:'>
                                        <input {...register('pjAdicNatal5Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>

                                    <FormItem supportText='Valor da Pensão Judiciária nº 6:'>
                                        <input {...register('pjAdicNatal6Val', { required: true, min: 0, max: 99999 })} defaultValue="0" step="0.01" min="0" max="99999" type="number" className={styleInputNumber} />
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                    </FormBlockContainer>

                    <BlockTitle title='Receitas e descontos extras' />
                    <FormItem labelText='Existem receitas ou descontos que não estão disponíveis no formulário acima?'>
                        <div className='flex items-center justify-center w-full py-1'>
                            <span className='text-sm mx-2'>Não</span>
                            <label className="relative inline-flex items-center cursor-pointer">
                                <input type="checkbox" {...register('existemValoresExtraBool')} value="" className="sr-only peer" />
                                <div className={styleInputToggle}></div>
                            </label>
                            <span className='text-sm mx-2'>Sim</span>
                        </div>
                    </FormItem>

                    {watch('existemValoresExtraBool') && (
                        <div className='bg-gray-300/5 shadow-md rounded-3xl px-8 pt-8'>

                            {extraValues.map((el, index) => {
                                return (
                                    <div key={index} className='bg-white/50 dark:bg-black/10 border dark:border-gray-700 border-gray-200 shadow-md rounded-xl px-4 py-2 mb-3 flex justify-between items-center'>
                                        <div className='flex text-sm'>
                                            <p className='pr-3 border-r dark:border-gray-700 border-gray-200'><strong>Descrição:</strong> {el.description}</p>
                                            <p className='ml-3 pr-3 border-r dark:border-gray-700 border-gray-200'><strong>Valor: </strong>R$ {el.value}</p>
                                            <p className='ml-3 pr-3 border-r dark:border-gray-700 border-gray-200'><strong>Tributável:</strong> {el.isTaxable == '1' ? 'Sim' : 'Não'}</p>
                                            <p className='ml-3'><strong>Tipo: </strong><span className='capitalize'>{el.type}</span></p>
                                        </div>
                                        <div className='cursor-pointer' onClick={() => excludeExtraValueInArray(index)}>
                                            <BiTrash size={20} className="text-red-400" />
                                        </div>
                                    </div>
                                )
                            })}

                            <div>
                                <FormItem badgeColor='green' badgeText='Novo registro' labelText=' '>
                                    <div className='grid grid-cols-1 lg:grid-cols-12 mt-2'>
                                        <div className='lg:col-span-10 grid gap-4 lg:gap-2 grid-cols-1 lg:grid-cols-2'>
                                            <div className='flex items-center pr-2 mr-2'>
                                                <label>Descrição: </label>
                                                <input value={extraValueDescription} onChange={e => setExtraValueDescription(e.target.value.toLocaleUpperCase())} placeholder='Ex: SOLDO AT' type="text" className="block flex-1 p-2 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                            </div>

                                            <div className='flex items-center justify-center pr-2 mr-2'>
                                                <div className="flex items-center">
                                                    <input checked={extraValueTaxable == '1'} onChange={(e) => setExtraValueTaxable('1')} value="1" type="radio" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Tributável</label>
                                                </div>
                                                <div className="flex items-center ml-2">
                                                    <input checked={extraValueTaxable == '0'} onChange={(e) => setExtraValueTaxable('0')} value="0" type="radio" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Não tributável</label>
                                                </div>
                                            </div>

                                            <div className='flex items-center pr-2 mr-2'>
                                                <label>Valor: </label>
                                                <input value={extraValueAmount} onChange={e => setExtraValueAmount(e.target.value)} type="number" min="0" max="99999" step="0.01" className="block flex-1 p-2 ml-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                            </div>


                                            <div className='flex items-center justify-center pr-2 mr-2'>
                                                <div className="flex items-center">
                                                    <input checked={extraValueType == 'receita'} onChange={() => setExtraValueType('receita')} value="receita" type="radio" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Receita</label>
                                                </div>
                                                <div className="flex items-center ml-2">
                                                    <input checked={extraValueType == 'desconto'} onChange={() => setExtraValueType('desconto')} value="desconto" type="radio" className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                    <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">Desconto</label>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='lg:col-span-2 flex justify-center flex-col mt-4 lg:mt-0'>
                                            <ButtonDefaultSmall color='green' type='button' variant='solid' click={pushExtraValuesInArrayAndClearItsForm}>
                                                Salvar
                                            </ButtonDefaultSmall>
                                            <div className="lg:my-0.5 my-3"></div>
                                            <ButtonDefaultSmall color='yellow' type='button' variant='solid' click={() => { setExtraValueDescription(''); setExtraValueAmount('0') }} >
                                                Limpar
                                            </ButtonDefaultSmall>
                                        </div>
                                    </div>
                                </FormItem>
                            </div>
                        </div>
                    )}


                    <div className='flex justify-end py-2 px-2 bottom-0 right-0 lg:right-16 dark:bg-black/10  bg-white/50 backdrop-blur-sm dark:border-gray-800 border-t border-l rounded-t-3xl fixed'>
                        <ButtonDefault type='submit' isLoading={isLoading} color='green' variant='solid'>Gerar ficha</ButtonDefault>
                        <ButtonDefault type='button' disabled={isLoading} color='yellow' variant='solid' click={resetAllForm}>Limpar formulário</ButtonDefault>
                    </div>
                </form>
            </div>
        </>
    )
}


GeneratePayslip.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default GeneratePayslip;
