import type { ReactElement } from 'react';
import { SubmitHandler, useForm } from "react-hook-form";
import BlockTitle from '../../components/BlockTitle';
import { ButtonDefault } from '../../components/ButtonDefault';
import { FormBlockContainer } from '../../components/FormBlockContainer';
import { FormItem } from '../../components/FormItem';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { NextPageWithLayout } from "../_app";

interface FormInputs {
    example: string,
    universo: string,
};

const GeneratePayslip: NextPageWithLayout = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>();

    const onSubmit: SubmitHandler<FormInputs> = data => {
        if (data.universo == '-') {
            console.log(data)
            console.error('implementar validação aqui.')
        } else {
            console.log(data)
        }
    };


    return (
        <>
            <PageTitle title='Gerar ficha auxilar' sub_title='Responda o formulário abaixo com as informação do militar/ pensionista que deseja gerar uma ficha auxiliar. Se sugir dúvidas, clique na interrogação (?) no canto de cada campo.' />
            <div>
                <BlockTitle title='Informações gerais' />

                <form onSubmit={handleSubmit(onSubmit)}>
                    <FormBlockContainer>

                        <FormItem labelText='Universo' supportText='Qual universo/ classificação do examinado?' helpText='wrwrwr'>
                            <input {...register('example', { required: true, min: 0, max: 1 })} step="0.1" min="0" max="1" type="number" id="small-input" className="block w-full p-2 mx-32 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 sm:text-xs focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" />
                        </FormItem>

                    </FormBlockContainer>

                    <div className='flex justify-end my-4'>
                        <ButtonDefault type='submit' isLoading={!true} color='default' variant='solid'>Gerar ficha</ButtonDefault>
                        <ButtonDefault type='reset' isLoading={!true} color='warning' variant='outline'>Limpar formulário</ButtonDefault>
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
