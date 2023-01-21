import { NextApiRequest, NextApiResponse } from "next";
import { AuxiliarySheetEtitie } from "../../entities/auxiliary_sheet";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    const data = req.body
    const auxiliarySheet = new AuxiliarySheetEtitie(data)

    res.status(200).json({
        receitas: [
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
            ...auxiliarySheet.extraValues.receitas,
        ],
        descontos: [
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
            ...auxiliarySheet.extraValues.descontos,
        ],

        data: [
            data
        ]
    })
}