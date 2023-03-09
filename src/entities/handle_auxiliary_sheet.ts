import { AuxiliarySheetAPIResponseProps } from "../pages/app/generate_auxiliary_sheet";
import { AuxiliarySheetEtitie } from "./auxiliary_sheet";

export default function handlerAuxiliarySheet(body: any) {
    const data = body
    const auxiliarySheet = new AuxiliarySheetEtitie(data)

    const receitasList = [
        auxiliarySheet.soldo,
        auxiliarySheet.complementoCotaSoldo,
        auxiliarySheet.adicTpSv,
        auxiliarySheet.adicCompDispMil,
        auxiliarySheet.adicHab,
        auxiliarySheet.adicMil,
        auxiliarySheet.adicPerm,
        auxiliarySheet.adicCoOrg,
        auxiliarySheet.adicHVoo,
        auxiliarySheet.acres25Soldo,
        auxiliarySheet.adicPTTC,
        auxiliarySheet.adicFerias,
        auxiliarySheet.adicNatalino,
        auxiliarySheet.salarioFamilia,
        auxiliarySheet.auxTransporte,
        auxiliarySheet.auxNatalidade,
        auxiliarySheet.auxInvalidez,
        ...auxiliarySheet.auxPreEsc,
        auxiliarySheet.auxFardamento,
        auxiliarySheet.auxAlimentC,
        auxiliarySheet.auxAliment,
        auxiliarySheet.gratLocEsp,
        auxiliarySheet.gratRepCmdo,
    ].filter(item => item.value > 0)

    const descontosList = [
        ...auxiliarySheet.pMil,
        auxiliarySheet.pMilExt,
        auxiliarySheet.fusex,
        auxiliarySheet.descDepFusex,
        ...auxiliarySheet.pnr,
        ...auxiliarySheet.pensaoJudiciaria,
        ...auxiliarySheet.pensaoJudiciariaAdicNatal,
        auxiliarySheet.dedAdAdicNatalino,
        auxiliarySheet.irMensal,
        auxiliarySheet.irFerias,
        auxiliarySheet.irAdicNatalino,
    ].filter(item => item.value > 0)

    const response: AuxiliarySheetAPIResponseProps = {
        receitas: [
            ...receitasList,
            ...auxiliarySheet.extraValues.receitas,
        ],
        descontos: [
            ...descontosList,
            ...auxiliarySheet.extraValues.descontos,
        ],
        somatorios: {
            receitas: receitasList.reduce((prev, item) => prev + item.value, 0) + auxiliarySheet.extraValues.receitas.reduce((prev, item) => prev + item.value, 0),
            descontos: descontosList.reduce((prev, item) => prev + item.value, 0) + auxiliarySheet.extraValues.descontos.reduce((prev, item) => prev + item.value, 0),
        },
        extra: {
            date: auxiliarySheet.date,
            pg_real: auxiliarySheet.pgReal
        }
    }
    return response
}