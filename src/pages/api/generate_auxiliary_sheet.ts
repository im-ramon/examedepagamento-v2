import { NextApiRequest, NextApiResponse } from "next";
import { AuxiliarySheetEtitie } from "../../entities/auxiliary_sheet";
import { AuxiliarySheetAPIResponseProps } from "../app/generate_auxiliary_sheet";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body
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

    res.status(200).json(response)
}