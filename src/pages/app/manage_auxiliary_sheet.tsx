import { Modal, Spinner } from 'flowbite-react';
import moment from 'moment';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { ReactElement, useContext, useEffect, useState } from 'react';
import { BiEdit, BiInfoCircle, BiRefresh, BiTrash } from 'react-icons/bi';
import { toast } from 'react-toastify';
import { ButtonDefault } from '../../components/ButtonDefault';
import { Card } from '../../components/Card';
import LayoutRouteApp from "../../components/layouts/LayoutRouteApp";
import PageTitle from '../../components/PageTitle';
import { AppContext } from '../../contexts/app.context';
import { pb } from '../../services/pocktbase';
import { appIdentity } from '../../utils/util_texts';
import { NextPageWithLayout } from "../_app";


interface RecordProps {
    collectionId: string;
    collectionName: string;
    created: string;
    editableValues: string;
    formData: string;
    id: string;
    updated: string;
    userId: string;
    expand: string;
}

interface showAuxiliarySheetProps {
    id: string;
    pg: string;
    type: string;
}

const ManagePayslip: NextPageWithLayout = () => {
    const { setContextFormData, setContextFormDataId, setContextEditableValues } = useContext(AppContext)

    const router = useRouter()

    const [auxiliarySheets, setAuxiliarySheets] = useState<showAuxiliarySheetProps[] | null>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [deleteId, setDeleteId] = useState<string>('')
    const [lastLocalStyleSheetUpdate, setLastLocalStyleSheetUpdate] = useState<string>('-')

    async function fetchAuxiliarySheet() {
        setIsLoading(true)
        await pb.collection('auxiliary_sheets').getFullList<RecordProps>(200, {
            sort: '-created',
        })
            .then(data => {
                const formatedAuxiliarySheets: showAuxiliarySheetProps[] = data.map(el => {
                    const formDataJson = JSON.parse(el.formData)
                    let universo = 'Ativa'

                    switch (formDataJson.universo) {
                        case 'VT':
                            universo = 'Veterano'
                            break;
                        case 'PN':
                            universo = 'Pensionista'
                            break;
                        case 'MA':
                            universo = 'Ativa'
                            break;

                        default:
                            break;
                    }

                    return {
                        id: el.id,
                        pg: formDataJson.pgReal ? formDataJson.pgReal : '-',
                        type: universo
                    }
                })

                window.localStorage.setItem('@examedepagmento:auxiliary_sheets', JSON.stringify(formatedAuxiliarySheets))
                window.localStorage.setItem('@examedepagmento:auxiliary_sheets_date', moment().format())
                setLastLocalStyleSheetUpdate(moment().format())
                setAuxiliarySheets(formatedAuxiliarySheets)
            })
            .catch(err => {
                console.log(err)
            })
            .finally(() => setIsLoading(false))
    }


    async function deleteAuxiliarySheet(id: string) {
        await pb.collection('auxiliary_sheets').delete(id)
            .then(data => {
                toast.success('Registro apagado com sucesso!')
                fetchAuxiliarySheet()
                setDeleteId('')
            })
            .catch(err => {
                toast.error('Houve um erro ao apagar, tente novamente!')
                console.error(err)
            })
    }

    async function editAuxiliarySheet(id: string) {
        await pb.collection('auxiliary_sheets').getOne<RecordProps>(id)
            .then(data => {
                const formDataJSON = JSON.parse(data.formData)
                const editableValuesJSON = JSON.parse(data.editableValues)
                setContextFormData(formDataJSON)
                setContextFormDataId(id)
                setContextEditableValues(editableValuesJSON)
                router.push('/app/generate_auxiliary_sheet')
            })
            .catch(error => {
                toast.error('Ficha auxiliar não encontrada. Clique em “Atualizar registros”')
                console.log(error)
            })
    }


    useEffect(() => {
        if (window) {
            const localData = window.localStorage.getItem('@examedepagmento:auxiliary_sheets')
            const localDataDate = window.localStorage.getItem('@examedepagmento:auxiliary_sheets_date')

            if (localDataDate) {
                setLastLocalStyleSheetUpdate(localDataDate)
            }

            if (localData) {
                setAuxiliarySheets(JSON.parse(localData))
            } else {
                fetchAuxiliarySheet()
            }
        }

    }, [])

    return (
        <>
            <Head>
                <title>{appIdentity.app_name + ' | Gerenciar fichas auxiliares'}</title>
            </Head>
            <PageTitle title='Gerenciar fichas auxilares' sub_title='Visualize, edite ou exclua as fichas auxiliares que você já gerou.' />
            {
                isLoading ? (
                    <div className='flex justify-center items-center h-48'>
                        <span className='mr-2'>Procurando registros</span> <Spinner size={'md'} />
                    </div>
                )
                    :
                    (auxiliarySheets && auxiliarySheets.map((el, index) => {
                        const { id, pg, type } = el
                        return (
                            <div key={index}>
                                <Card>
                                    <div className='flex justify-between items-center -my-1'>
                                        <p><strong>Código: </strong>{id.slice(0, 7)}</p>
                                        <p><strong>P/G: </strong>{pg}</p>
                                        <p><strong>Classificação: </strong>{type}</p>
                                        <div className='flex items-center justify-center hover:cursor-pointer'>
                                            <div onClick={() => { editAuxiliarySheet(id) }} className='bg-white/50 dark:bg-black/10 border dark:border-gray-700 border-gray-200 shadow-md rounded-xl mx-1 px-1 py-2 hover:scale-110 transition-transform'>
                                                <BiEdit size={18} className="mx-1 text-green-500" />
                                            </div>
                                            <div onClick={() => { setDeleteId(id) }} className='bg-white/50 dark:bg-black/10 border dark:border-gray-700 border-gray-200 shadow-md rounded-xl mx-1 px-1 py-2 hover:scale-110 transition-transform'>
                                                <BiTrash size={18} className="mx-1 text-red-500" />
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        )
                    }))}
            <p className='text-center mb-5 opacity-30 text-sm'>
                Última atualização: {moment(lastLocalStyleSheetUpdate).isValid() ? moment(lastLocalStyleSheetUpdate).format('DD/MM/YYYY [às] HH:mm') : '-'}
            </p>
            <div className='flex justify-center items-center'>
                <ButtonDefault type='button' color='blue' variant='solid' click={fetchAuxiliarySheet}>
                    <span>Atualizar registros</span>
                    <BiRefresh className='ml-2 hover:-rotate-180 transition-all' size={20} />
                </ButtonDefault>
            </div>

            <Modal show={deleteId.length > 0} size="md" popup={true} onClose={() => { setDeleteId('') }}>
                <Modal.Header />
                <Modal.Body>
                    <div className="text-center">
                        <BiInfoCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                        <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                            Você apagará este registro <strong>definitivamente</strong>.
                            <br />
                            Deseja continuar?
                        </h3>
                        <div className="flex justify-center">
                            <ButtonDefault
                                color="red"
                                type='button'
                                variant='solid'
                                click={() => deleteAuxiliarySheet(deleteId)}
                            >
                                <span>Apagar</span>
                            </ButtonDefault>
                            <div className="mx-2"></div>
                            <ButtonDefault
                                color="blue"
                                type='button'
                                variant='outline'
                                click={() => setDeleteId('')}
                            >
                                <span className='text-gray-800 dark:text-white'>Voltar</span>
                            </ButtonDefault>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>

        </>
    )
}

ManagePayslip.getLayout = function getLayout(page: ReactElement) {
    return (
        <LayoutRouteApp>{page}</LayoutRouteApp>
    )
}

export default ManagePayslip;