import moment from "moment";
import { pg_data } from "../data/pg_data";
import { AuxiliarySheetFields } from "../pages/app/generate_auxiliary_sheet";

export interface fieldInterface {
    title: string;
    percent: string;
    value: number;
}

export class AuxiliarySheetEtitie {

    private fields: AuxiliarySheetFields
    private paymentRefereceByDate
    private pgRealInfo
    private soldoBase: number

    constructor(fields: AuxiliarySheetFields) {
        this.fields = fields;

        this.paymentRefereceByDate = pg_data.filter((item) => {
            return moment(fields.dataReferencia).isBetween(item.startAt, item.endAt)
        })[0]

        this.soldoBase = this.paymentRefereceByDate[this.fields.pgSoldo].soldo
        this.pgRealInfo = this.paymentRefereceByDate[this.fields.pgReal]
    }
    private trunc(num: number): number {
        return Math.trunc(num * 100) / 100;
    }

    get soldo(): fieldInterface {
        let soldoCalculated = this.soldoBase
        let soldoTitle = 'SOLDO'
        if (this.fields.soldoType == 'cota') {
            soldoCalculated = soldoCalculated * (Number(this.fields.soldoPropPercent) / 100)
            soldoTitle = 'SLD PROP P/COTA'
        }

        if (this.fields.universo == 'PN') {
            soldoCalculated = soldoCalculated * (Number(this.fields.cotaParteSoldoPercent) / 100)
        }

        return {
            title: soldoTitle,
            percent: '-',
            value: this.trunc(soldoCalculated)
        }
    }

    get complementoCotaSoldo(): fieldInterface {
        let soldoCalculated = 0
        if (this.fields.soldoType == 'cota' && this.fields.complemetoCotaSoldoBool) {

            if (this.fields.universo == 'PN') {
                soldoCalculated = this.soldoBase * (Number(this.fields.cotaParteSoldoPercent) / 100)
                soldoCalculated = soldoCalculated - (soldoCalculated * (Number(this.fields.soldoPropPercent) / 100))
            } else {
                soldoCalculated = this.soldoBase - (this.soldoBase * (Number(this.fields.soldoPropPercent) / 100))
            }

        }

        return {
            title: 'COMPL COTA SOLDO',
            percent: '-',
            value: soldoCalculated
        }
    }

    get adicTpSv(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.adicTpSvPercent !== '0') {
            let valueAdicTpSv = this.soldo.value * (Number(this.fields.adicTpSvPercent) / 100)
            let valueAdicCompDispMil = this.soldo.value * (this.pgRealInfo.adic_disp / 100)

            if (valueAdicTpSv > valueAdicCompDispMil) {
                valueCalculated = valueAdicTpSv
            }
        }
        return {
            title: 'ADIC TP SV',
            percent: this.fields.adicTpSvPercent || '0',
            value: valueCalculated
        }
    }

    get adicCompDispMil(): fieldInterface {
        let valueCalculated = 0
        if (this.fields.adicCompDispMilBool) {
            let valueAdicCompDispMil = this.soldo.value * (this.pgRealInfo.adic_disp / 100)

            if (valueAdicCompDispMil >= this.adicTpSv.value) {
                valueCalculated = valueAdicCompDispMil
            }
        }

        return {
            title: 'AD C DISP MIL',
            percent: String(this.pgRealInfo.adic_disp),
            value: valueCalculated
        }
    }
}

/*
 get adicTpSv(): fieldInterface {
    let valueCalculated = 0
    return {
        title: 'XXXXX',
        percent: '-',
        value: valueCalculated
    }
}
*/