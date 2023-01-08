import type { ReactElement } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import BlockTitle from '../../components/BlockTitle';
import { BreakLine } from '../../components/BreakLine';
import { ButtonDefault } from '../../components/ButtonDefault';
import { FormBlockContainer } from '../../components/FormBlockContainer';
import { FormItem } from '../../components/FormItem';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { NextPageWithLayout } from "../_app";

interface FormInputs {
    universo: string,
    dataReferencia: string,
    maior65: boolean,
    isentoIr: boolean,
    pgSoldo: string,
    pgReal: string,
    soldoType: string,
    soldoPropPercent: string,
    complemetoCotaSoldoBool: string,
    adicTpSvPercent: string,
    adicCompDispMilBool: boolean,
    adicHabType: string,
    adicMilType: string,
    adicHVooBool: boolean,
    adicHVooPercent: string,
    adicHVooPg: string,
    acres25Bool: boolean,
    pttcBool: boolean,
};

const GeneratePayslip: NextPageWithLayout = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm<FormInputs>();

    // console.log(watch("isentoIr")) //USAR PARA ESCUTAR UM CAMPO

    const onSubmit: SubmitHandler<FormInputs> = data => {
        if (data.universo == '-') {
            console.log(data)
            // procurar todos os selects para validar
            // console.error('implementar validação aqui.')
        } else {
            console.log(data)
        }
    };


    return (
        <>
            <PageTitle title='Gerar ficha auxilar' sub_title='Responda o formulário abaixo com as informação do militar/ pensionista que deseja gerar uma ficha auxiliar. Se sugir dúvidas, clique na interrogação (?) no canto de cada campo.' />
            <div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <BlockTitle title='Informações gerais' />
                    <FormBlockContainer>

                        <FormItem labelText='Universo/ Classificação' supportText='Qual universo/ classificação do examinado?'>
                            <select defaultValue={'-'} {...register('universo', { required: true })} className="block w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="-" disabled>- Selecione uma opção -</option>
                                <option value="MA">Militar da Ativa</option>
                                <option value="VT">Veterano</option>
                                <option value="PN">Pensionista</option>
                            </select>
                        </FormItem>

                        {/* A data não está sendo registrada - trocar para mês ano como select */}
                        <FormItem labelText='Data do contracheque' supportText='Qual a data do contracheque?'>
                            <input {...register('dataReferencia', { required: true })} name="data_contracheque" type="date" defaultValue="2023-01-01" className="block w-full p-1 pl-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        </FormItem>

                        <FormItem labelText='Idade' supportText='O examinado tem mais de 65 anos?' helpText='Essa informação irá influenciar no valor final do imposto de renda.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('maior65')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Isenção de Imposto de Renda' supportText='O examinado é isento de Imposto de Renda?' helpText='A Pensionista Especial de Ex-combatente que recebe o soldo de 2º Sgt (Lei nº 4.242/63) é isenta de imposto de renda, mesmo que em seu título de pensão não exista essa informação. Já a Pensionista Especial de Ex-combatente que recebe o soldo de 2º Sgt (Lei nº 8.059/90) não é automaticamente isenta de imposto de renda. *Observação: Ao contrário que muitos pensam, maiores de 65 anos não são isentos de imposto de renda. Esses recebem apenas um abatimento no valor final.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('isentoIr')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Post/Grad para Soldo' supportText='Qual o P/G em que o examinado recebe o soldo?' helpText='Deve ser selecionado o Posto/ Graduação em que o examinado recebe o soldo. No caso dos miltiares da ativa, o P/G para soldo e P/G Real são os mesmos, entretanto, no caso dos Militares Veteranos e Pensionistas, essas informações poderão ser difirentes.'>
                            <select defaultValue={'-'} {...register('pgSoldo', { required: true })} className="block w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="-" disabled>- Selecione uma opção -</option>
                                <option value="MAR">MAR</option>
                                <option value="CEL">CEL</option>
                            </select>
                        </FormItem>

                        <FormItem labelText='Post/Grad Real' supportText='Qual o P/G real do examinado?' helpText='O P/G real é o último Posto ou Graduação do militar (ou instituidor de pensão) enquanto na ativa. Não deve ser considerado: - Postos ou graduações alcançados pelo militar como benefício, na forma prevista em lei, em decorrência de reforma, morte ou transferência para a reserva; - Percepção de soldo ou de remuneração correspondente a grau hierárquico superior ao alcançado na ativa, em decorrência de reforma, morte ou transferência para a reserva; e - Percepção de pensão militar correspondente a grau hierárquico superior ao alcançado pelo militar em atividade, em decorrência de benefícios concedidos pela Lei nº 3.765, de 4 de maio de 1960.'>
                            <select defaultValue={'-'} {...register('pgReal', { required: true })} className="block w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="-" disabled>- Selecione uma opção -</option>
                                <option value="MAR">MAR</option>
                                <option value="CEL">CEL</option>
                            </select>
                        </FormItem>




                    </FormBlockContainer>

                    <BlockTitle title='Informações financeiras' />
                    <FormBlockContainer>

                        <FormItem labelText='Soldo' supportText='Qual tipo de soldo o examinado recebe?' helpText='Escolha a categoria de soldo que o examinado recebe. São duas opções, a primeira "Normal/Integral" significa que o examinado recebe o valor do seu soldo por completo, normalmente militares da ativa, veterenos que completaram o tempo mínimo para reserva e seus pensionistas recebem essa categoria de soldo. A categoria " Soldo Proporcional para Cota" é devida, normalmente, aos militares que fora para a reserva antes do tempo mínimo, como no caso de militares reformados por ser julgado incapaz definitivamente.'>
                            <select defaultValue={'-'} {...register('soldoType', { required: true })} className="block w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="-" disabled>- Selecione uma opção -</option>
                                <option value="integral">Integral</option>
                                <option value="cota">Proporcional por cota</option>
                            </select>
                        </FormItem>
                        
                        {watch('soldoType') == 'cota' && (
                            <>
                                <FormItem labelText='Complemento de cota de soldo' supportText='Recebe complemento de cota de soldo?' helpText='Direito extinto'>
                                    <div className='flex items-center justify-center w-full py-1'>
                                        <span className='text-sm mx-2'>Não</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" {...register('complemetoCotaSoldoBool')} value="" className="sr-only peer" />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                        </label>
                                        <span className='text-sm mx-2'>Sim</span>
                                    </div>
                                </FormItem>

                                <FormItem labelText='Soldo Proporcional para Cota' supportText='Qual porcentagem de soldo proporcional para cota o examinado recebe?' helpText='O soldo proporcional para cota é difirente da cota-parte do soldo. O soldo proporcional para cota é devido, normalmente, aos militares que foram para a reserva antes do tempo mínimo, como no caso de militares reformados por ser julgado incapaz definitivamente. Os pensionistas desses militares também pode receber o soldo proporcional para cota. Por exemplo, o instituidor da pensão poderia receber soldo proporcional para cota de 29/30 e ao falecer deixar a pensão de 1/3 para cada dependente, logo, a pensão será calculada primeiro sobre o soldo proporcional depois será dividida por cota-parte para cada beneficiário. Referência: Lei nº 6.880, de 9 de dezembro de 1980.'>
                                    <input {...register('soldoPropPercent', { required: true, min: 0, max: 100 })} defaultValue={0.00} step="0.01" min="0" max="100" type="number" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                </FormItem>
                            </>
                        )}

                        <FormItem labelText='Adicional de Tempo de Serviço' supportText='Qual o percentual que o examinado faz jus de Adicional de Tempo de Serviço?' helpText='Adicional de Tempo de Serviço é a parcela remuneratória mensal devida ao militar, inerente ao tempo de serviço e os acréscimos permitidos por lei, observado o disposto no art. 30 da Medida Provisória 2215/01. Será computado 1% para cada ano de serviço anterior a 31 DEZ 2000. É vedada a concessão cumulativa do adicional de compensação por disponibilidade militar com o adicional de tempo de serviço, sendo assegurado, caso o militar faça jus a ambos os adicionais, o recebimento do mais vantajoso.'>
                            <input {...register('adicTpSvPercent', { required: true, min: 0, max: 100 })} defaultValue={0} step="1" min="0" max="100" type="number" className="block w-full p-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        </FormItem>

                        <FormItem labelText='Adicional de Compensação por Disponibilidade Militar' supportText='O militar recebe Adicional de Compensação por Disponibilidade Militar?' helpText='O Adicional de compensação por disponibilidade militar é a parcela remuneratória mensal devida ao militar em razão da disponibilidade permanente e da dedicação exclusiva. É vedada a concessão cumulativa do adicional de compensação por disponibilidade militar com o adicional de tempo de serviço, sendo assegurado, caso o militar faça jus a ambos os adicionais, o recebimento do mais vantajoso. O percentual do adicional de compensação por disponibilidade militar é irredutível e corresponde sempre ao maior percentual inerente aos postos ou graduações alcançados pelo militar durante sua carreira no serviço ativo, independentemente de mudança de círculos hierárquicos, postos ou graduações. O percentual do adicional de compensação por disponibilidade militar a que o militar faz jus incidirá sobre o soldo do posto ou da graduação atual, e não serão considerados: I - postos ou graduações alcançados pelo militar como benefício, na forma prevista em lei, em decorrência de reforma, morte ou transferência para a reserva; percepção de soldo ou de remuneração correspondente a grau hierárquico superior ao alcançado na ativa, em decorrência de reforma, morte ou transferência para a reserva; e percepção de pensão militar correspondente a grau hierárquico superior ao alcançado pelo militar em atividade, em decorrência de benefícios concedidos pela Lei nº 3.765, de 4 de maio de 1960. Referência: Lei nº 13.954, de 16 de dezembro de 2019.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicCompDispMilBool')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional Habilitação' supportText='Qual nível de habilitação do examinado?' helpText='O Adicional de habilitação é a parcela remuneratória mensal devida ao militar, inerente aos cursos realizados com aproveitamento. Os percentuais podem ser consultados no ANEXO III da Lei nº 13.954, de 16 de dezembro de 2019. Os tipos de cursos existentes devem obedecer às seguintes condições: I - de altos estudos categoria I, realizados a partir de oficiais superiores e de primeiros sargentos; II - de altos estudos categoria II, realizados a partir de oficiais superiores e de segundos sargentos; III - de aperfeiçoamento, realizados a partir de oficiais subalternos e de terceiros sargentos; IV - de especialização, realizados a partir de aspirantes a oficial e de terceiros sargentos; e V - de formação, a partir da conclusão com aproveitamento dos cursos e estágios de formação ou adaptação de oficiais e praças, realizados nas organizações militares das Forças Armadas.'>
                            <select defaultValue={'-'} {...register('adicHabType', { required: true })} className="block w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                <option value="-" disabled>- Selecione uma opção -</option>
                                <option value="altos_estudos_I">Altos estudos Categoria I</option>
                                <option value="altos_estudos_II">Altos estudos Categoria II</option>
                                <option value="aperfeicoamento">Apefeiçoamento</option>
                                <option value="especializacao">Especialização</option>
                                <option value="formacao">Formação</option>
                                <option value="sem_formacao">Sem formação</option>
                            </select>
                        </FormItem>

                        <FormItem labelText='Adicional Militar' supportText='O militar receber Adicional Militar' helpText='O Adicional Militar é a parcela remuneratória mensal devida ao militar, inerente a cada círculo hierárquico da carreira militar. Os percentuais estão presentes na Medida Provisória nº 2.215-10, de 31 de agosto de 2001. O próprio CPEx faz a gerencia sobre que percentual do Adicional Militar deve ser pago para cadas militar/ pensionistas.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicMilType')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional de Horas de Voo (ART24MP)' supportText='Recebe Adicional de Horas de Voo?' helpText='O Adicional de habilitação é a parcela remuneratória mensal devida ao militar, inerente aos cursos realizados com aproveitamento. Os percentuais podem ser consultados no ANEXO III da Lei nº 13.954, de 16 de dezembro de 2019. Os tipos de cursos existentes devem obedecer às seguintes condições: I - de altos estudos categoria I, realizados a partir de oficiais superiores e de primeiros sargentos; II - de altos estudos categoria II, realizados a partir de oficiais superiores e de segundos sargentos; III - de aperfeiçoamento, realizados a partir de oficiais subalternos e de terceiros sargentos; IV - de especialização, realizados a partir de aspirantes a oficial e de terceiros sargentos; e V - de formação, a partir da conclusão com aproveitamento dos cursos e estágios de formação ou adaptação de oficiais e praças, realizados nas organizações militares das Forças Armadas.'>
                            <div className='flex flex-1 items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('adicHVooBool')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                            {watch('adicHVooBool') && (
                                <>
                                    <BreakLine />

                                    <FormItem supportText='Qual percentual?'>
                                        <input {...register('adicHVooPercent', { required: true, min: 0, max: 100 })} defaultValue={0} step="0.01" min="0" max="100" type="number" className="block w-full p-2 mx-2 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                                    </FormItem>

                                    <FormItem supportText='Calculado sobre o soldo de qual soldo?'>
                                        <select defaultValue={'-'} {...register('adicHVooPg', { required: true })} className="block w-full px-2 py-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="-" disabled>- Selecione uma opção -</option>
                                            <option value="MAR">MAR</option>
                                            <option value="CEL">CEL</option>
                                        </select>
                                    </FormItem>
                                </>
                            )}
                        </FormItem>

                        <FormItem labelText='Adicional de Acréscimo de 25% sobre o soldo' supportText='Recebe acréscimo de 25% sobre o soldo?' helpText='Vantagem concedida aos Ex-combatentes incapacitados fisicamente para o serviço militar, em consequência de ferimentos verificados ou moléstias adquiridas quando participavam da Força Expedicionária Brasileira destacada, em 1944-1945, no teatro de operações da Itália. O amparo para o pagamento deste adicional encontra-se no Decreto Lei nº 8.795, de 23 de janeiro de 1946.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('acres25Bool')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>

                        <FormItem labelText='Adicional PTTC' supportText='O examinado é Prestador de Trabalho por Tempo Certo (PTTC)?' helpText='A prestação de tarefa por tempo certo é a execução de atividades de natureza militar, atribuídas ao militar veterano, justificada pela necessidade do serviço, de caráter voluntário e por um período previamente especificado e limitado. Para isso, o militar nomeado receberá o Adicional PTTC de 30% sobre seu rendimento bruto.'>
                            <div className='flex items-center justify-center w-full py-1'>
                                <span className='text-sm mx-2'>Não</span>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input type="checkbox" {...register('pttcBool')} value="" className="sr-only peer" />
                                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-300/50 dark:peer-focus:ring-primary-800/50 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
                                </label>
                                <span className='text-sm mx-2'>Sim</span>
                            </div>
                        </FormItem>


                    </FormBlockContainer>

                    <div className='flex justify-center my-12'>
                        <ButtonDefault type='submit' isLoading={!true} color='default' variant='solid'>Gerar ficha</ButtonDefault>
                        <ButtonDefault type='reset' isLoading={!true} color='warning' variant='solid'>Limpar formulário</ButtonDefault>
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
