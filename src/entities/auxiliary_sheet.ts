import moment from "moment";
import { adic_hab_data } from "../data/adic_hab_data";
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

    private truncateDecimalNumbers(num: number): number {
        return Math.trunc(num * 100) / 100;
    }

    private calculateSoldo(soldoBase: number): number {
        let soldoCalculated = soldoBase

        if (this.fields.soldoType == 'cota') {
            soldoCalculated = soldoBase * (Number(this.fields.soldoPropPercent) / 100)
        }

        if (this.fields.universo == 'PN') {
            soldoCalculated = soldoCalculated * (Number(this.fields.cotaParteSoldoPercent) / 100)
        }

        return this.truncateDecimalNumbers(soldoCalculated)
    }

    // ATENÇÃO!!!
    private calculateGrossAmountToIR(): number {
        return (
            this.soldo.value +
            this.complementoCotaSoldo.value +
            this.adicTpSv.value +
            this.adicCompDispMil.value +
            this.adicHab.value +
            this.adicMil.value +
            this.adicPerm.value +
            this.adicCoOrg.value +
            this.adicHVoo.value +
            this.acres25Soldo.value +
            this.adicPTTC.value +
            this.gratLocEsp.value +
            this.gratRepCmdo.value +
            this.gratRep2.value
        )

        // ESCREVER TESTE!!!!!
    }

    get soldo(): fieldInterface {
        let soldoTitle = 'SOLDO'

        if (this.fields.soldoType == 'cota') {
            soldoTitle = 'SLD PROP P/COTA'
        }

        return {
            title: soldoTitle,
            percent: '-',
            value: this.calculateSoldo(this.soldoBase)
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
            value: this.truncateDecimalNumbers(soldoCalculated)
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
            value: this.truncateDecimalNumbers(valueCalculated)
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
            percent: valueCalculated > 0 ? String(this.pgRealInfo.adic_disp) : '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicHab(): fieldInterface {
        let valueCalculated = 0

        const adicHabData = adic_hab_data.filter(item => {
            return moment(this.fields.dataReferencia).isBetween(item.startAt, item.endAt)
        })[0]

        valueCalculated = this.soldo.value * (adicHabData[this.fields.adicHabType || 'sem_formacao'] / 100)

        return {
            title: 'ADIC HAB',
            percent: String(adicHabData[this.fields.adicHabType || 'sem_formacao']),
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicMil(): fieldInterface {
        let valueCalculated = 0;
        if (this.fields.adicMilBool) {
            valueCalculated = this.soldo.value * (this.paymentRefereceByDate[this.fields.pgSoldo].adic_mil / 100)
        }

        return {
            title: 'ADIC MIL',
            percent: String(this.paymentRefereceByDate[this.fields.pgSoldo].adic_mil),
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicPerm(): fieldInterface {
        let valueCalculated = 0
        if (this.fields.adicPerm != '0') {
            valueCalculated = this.soldo.value * (Number(this.fields.adicPerm) / 100)
        }
        return {
            title: 'ADIC PERM',
            percent: this.fields.adicPerm || '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicCoOrg(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.adicCoOrgBool && this.fields.adicCoOrgPercent && this.fields.adicCoOrgPg) {
            valueCalculated = this.calculateSoldo(this.paymentRefereceByDate[this.fields.adicCoOrgPg].soldo) * (Number(this.fields.adicCoOrgPercent) / 100)
        }

        return {
            title: 'AD C ORG/ ' + this.fields.adicCoOrgType + '-' + (this.fields.adicCoOrgPg || ''),
            percent: this.fields.adicCoOrgBool ? String(this.fields.adicCoOrgPercent) : '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicHVoo(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.adicHVooBool && this.fields.adicHVooPg && this.fields.adicHVooPercent) {
            valueCalculated = this.calculateSoldo(this.paymentRefereceByDate[this.fields.adicHVooPg].soldo) * (Number(this.fields.adicHVooPercent) / 100)
        }

        return {
            title: 'AD C ORG H VOO',
            percent: this.fields.adicHVooBool ? String(this.fields.adicHVooPercent) : '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get acres25Soldo(): fieldInterface {
        let valueCalculated = 0
        if (this.fields.acres25Bool) {
            valueCalculated = this.soldo.value * 0.25
        }
        return {
            title: 'ACRESC 25% SOLDO',
            percent: this.fields.acres25Bool ? '25' : '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicPTTC(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.pttcBool) {
            valueCalculated = (
                this.soldo.value +
                this.complementoCotaSoldo.value +
                this.adicTpSv.value +
                this.adicCompDispMil.value +
                this.adicHab.value +
                this.adicMil.value +
                this.adicHVoo.value +
                this.acres25Soldo.value +
                this.adicPerm.value +
                this.adicCoOrg.value +
                this.gratLocEsp.value +
                this.gratRepCmdo.value +
                this.gratRep2.value
            )

            valueCalculated *= 0.3
        }

        return {
            title: 'ADIC PTTC',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicFerias(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.ferias) {
            valueCalculated = this.calculateGrossAmountToIR() / 3

            if (this.adicPTTC.value > 0) {
                valueCalculated = this.adicPTTC.value / 3
            }
        }

        return {
            title: 'ADIC FÉRIAS',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get adicNatalino(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.adicNatalinoBool && this.fields.adicNatalinoMesesQtd) {
            valueCalculated = (
                this.soldo.value +
                this.complementoCotaSoldo.value +
                this.adicTpSv.value +
                this.adicCompDispMil.value +
                this.adicHab.value +
                this.adicMil.value +
                this.adicHVoo.value +
                this.acres25Soldo.value +
                this.adicPerm.value +
                this.adicCoOrg.value
            )

            valueCalculated = valueCalculated / 12 * Number(this.fields.adicNatalinoMesesQtd)
        }
        return {
            title: 'ADIC NATAL',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get salarioFamilia(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.depSalFamiliaQtd != "0") {
            valueCalculated = Number(this.fields.depSalFamiliaQtd) * 0.16
        }

        return {
            title: 'SALARIO FAMILIA',
            percent: '-',
            value: valueCalculated
        }
    }

    get auxTransporte(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.auxTransporteBool && this.fields.auxTransporteVal != "0") {
            let cotaParte = this.truncateDecimalNumbers((this.soldo.value / 30 * 22) * 0.06)
            valueCalculated = Number(this.fields.auxTransporteVal) - cotaParte;
        }

        return {
            title: 'AUX TRANSPORTE',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get auxNatalidade(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.auxNatatalidadeBool && this.fields.auxNatatalidadeQtd != "0") {
            if (Number(this.fields.auxNatatalidadeQtd) === 1) {
                valueCalculated = this.soldo.value
            } else if (Number(this.fields.auxNatatalidadeQtd) >= 2) {
                valueCalculated = this.soldo.value + ((this.soldo.value / 2) * (Number(this.fields.auxNatatalidadeQtd) - 1))
            }
        }
        return {
            title: 'AUX NATALIDADE',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get auxInvalidez(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.auxInvalidezBool) {
            let minValue = 1520;
            valueCalculated = this.soldo.value * 0.25

            if (valueCalculated < minValue) {
                valueCalculated = minValue
            }
        }

        return {
            title: 'AUX INVALIDEZ',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get auxPreEsc(): fieldInterface[] {
        let valueCalculated = 0
        let arrayResponse: fieldInterface[] = [{
            title: 'ASSIST PRE-ESC',
            percent: '-',
            value: 0
        }]

        if (this.fields.auxPreEscQtd != "0") {
            let auxPreEscBaseValue = 321
            let gross = this.calculateGrossAmountToIR()
            let calcBaseSdSoldo = this.paymentRefereceByDate["Sd Eng"].soldo
            let quota = gross / calcBaseSdSoldo
            let quotaToCal = 0

            if (quota > 0 && quota <= 5) {
                quotaToCal = 0.05;
            } else if (quota > 5 && quota <= 10) {
                quotaToCal = 0.10;
            } else if (quota > 10 && quota <= 15) {
                quotaToCal = 0.15;
            } else if (quota > 15 && quota <= 20) {
                quotaToCal = 0.20;
            } else if (quota > 20) {
                quotaToCal = 0.25;
            }

            valueCalculated = auxPreEscBaseValue - (quotaToCal * auxPreEscBaseValue)
            arrayResponse.length = 0
            for (let i = 0; i < Number(this.fields.auxPreEscQtd); i++) {
                arrayResponse.push({
                    title: 'ASSIST PRE-ESC',
                    percent: '-',
                    value: this.truncateDecimalNumbers(valueCalculated)
                })
            }
        }

        return arrayResponse
    }

    get auxFardamento(): fieldInterface {
        let valueCalculated = 0
        let title = 'AUX FARD 1 SLD'

        if (this.fields.auxFardBool) {
            valueCalculated = this.soldo.value

            if (this.fields.auxFard1VezBool) {
                valueCalculated += (valueCalculated / 2)
                title = 'AUX FARD 1.5 SLD'
            }

        }
        return {
            title: title,
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get auxAlimentC(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.auxAlimentC) {
            valueCalculated = 9 * 30
        }

        return {
            title: 'AUX ALIM C',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get auxAliment(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.auxAlimentEspBool && this.fields.auxAlimentEspType && this.fields.auxAlimentEspQtd) {
            let valueEtapa = 9
            valueCalculated = valueEtapa * Number(this.fields.auxAlimentEspQtd) * Number(this.fields.auxAlimentEspType)
        }
        return {
            title: `AUX ALIM ${this.fields.auxAlimentEspType}X`,
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get gratLocEsp(): fieldInterface {
        let valueCalculated = 0
        let percent = '0'

        if (this.fields.gratRepreType) {
            switch (this.fields.gratRepreType) {
                case 'A':
                    valueCalculated = this.soldo.value * 0.2
                    percent = '20'
                    break;

                case 'B':
                    valueCalculated = this.soldo.value * 0.1
                    percent = '10'

                    break;

                default:
                    break;
            }
        }
        return {
            title: `GRAT LOC ESP ${this.fields.gratRepreType}`,
            percent: percent,
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get gratRepCmdo(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.gratCmdoBool) {
            valueCalculated = this.soldo.value * 0.1
        }

        return {
            title: 'GRAT REPR CMDO',
            percent: '10',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get gratRep2(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.gratRep2Bool && this.fields.gratRep2Pg && this.fields.gratRep2DiasQtd) {
            valueCalculated = this.calculateSoldo(this.paymentRefereceByDate[this.fields.gratRep2Pg].soldo) * 0.02 * Number(this.fields.gratRep2DiasQtd)
        }

        return {
            title: 'GRAT REPRES 2%',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }
}

// Conferir os campos de ADIC NATALINO, FERIAS e BRUTO
// Dependentes para IR

/*

get adicTpSv(): fieldInterface {
    let valueCalculated = 0
    return {
        title: 'XXXXX',
        percent: '-',
        value: this.truncateDecimalNumbers(valueCalculated)
    }
}

*/