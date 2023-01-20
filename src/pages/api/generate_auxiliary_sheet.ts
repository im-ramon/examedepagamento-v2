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
        ],
        descontos: [
            data
        ]
    })
}