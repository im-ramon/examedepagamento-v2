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

    private calculateIR(gross: number, discounts: number, dependents: number, isOlderThan65: boolean): number {
        let base = gross - discounts - (dependents * 189.59) - (isOlderThan65 ? 1903.98 : 0);

        let aliquota = 0;
        let parcela = 0;

        if (base <= 1903.98) {
            aliquota = 0;
            parcela = 0;
        } else if (base >= 1903.99 && base <= 2826.65) {
            aliquota = 0.075;
            parcela = 142.8;
        } else if (base >= 2826.66 && base <= 3751.05) {
            aliquota = 0.15;
            parcela = 354.8;
        } else if (base >= 3751.06 && base <= 4664.68) {
            aliquota = 0.225;
            parcela = 636.13;
        } else if (base >= 4664.69) {
            aliquota = 0.275;
            parcela = 869.36;
        }

        return Number((((base * aliquota) - parcela)).toFixed(2));
    }

    get grossAmountToDiscounts(): number {
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
    }

    get discountsAmountToIR(): number {
        return (
            this.pMil[0].value +
            this.pMil[1].value +
            this.pMilExt.value +
            this.fusex.value +
            this.pensaoJudiciaria.reduce((prev, curr) => {
                return prev + curr.value
            }, 0) +
            this.extraValues.descontosTributaveis
        )
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
        if (this.fields.adicPerm && this.fields.adicPerm != '0') {
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
            valueCalculated = this.grossAmountToDiscounts / 3

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
            let gross = this.grossAmountToDiscounts
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
            percent: this.fields.gratCmdoBool ? '10' : '0',
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

    get pMil(): fieldInterface[] {
        let valueCalculatedPMil10_5 = 0
        let valueCalculatedPMil1_5 = 0
        let percentBetweenPg = 0

        if (this.fields.pMilBool) {
            valueCalculatedPMil10_5 = this.grossAmountToDiscounts * 0.105

            if (this.fields.pMil15Bool) {
                valueCalculatedPMil1_5 = this.grossAmountToDiscounts * 0.015
            }

            if (this.fields.pMilPgAcimaBool && this.fields.pMilPgAcimaPg) {
                percentBetweenPg = this.paymentRefereceByDate[this.fields.pMilPgAcimaPg].soldo / this.soldoBase
                valueCalculatedPMil10_5 = valueCalculatedPMil10_5 * percentBetweenPg
                valueCalculatedPMil1_5 = valueCalculatedPMil1_5 * percentBetweenPg
            }


        }
        return [
            {
                title: 'P MIL',
                percent: this.fields.pMilBool ? '10.5' : '0',
                value: this.truncateDecimalNumbers(valueCalculatedPMil10_5)
            },
            {
                title: 'P MIL 1.5%',
                percent: this.fields.pMil15Bool ? '1.5' : '0',
                value: this.truncateDecimalNumbers(valueCalculatedPMil1_5)
            },
        ]
    }

    get pMilExt(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.pMil30Bool && this.fields.universo == 'PN') {
            valueCalculated = Number(this.grossAmountToDiscounts * 0.03)
        }
        return {
            title: 'P MIL EXT',
            percent: this.fields.pMil30Bool ? '3' : '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get fusex(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.fusex3Bool) {
            valueCalculated = Number(this.grossAmountToDiscounts * 0.03)
        }
        return {
            title: 'FUSEX 3%',
            percent: this.fields.fusex3Bool ? '3' : '0',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get descDepFusex(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.descDepFusexType == "4") {
            valueCalculated = Number(this.grossAmountToDiscounts * 0.004)
        } else if (this.fields.descDepFusexType == "5") {
            valueCalculated = Number(this.grossAmountToDiscounts * 0.005)
        }

        return {
            title: 'DESC DEP FUSEX',
            percent: this.fields.descDepFusexType == "0" ? "0" : `0.${this.fields.descDepFusexType}`,
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get pnr(): fieldInterface[] {
        let pnr_f_ex_mnt = 0
        let pnr_cod_ua = 0
        let pnr_f_ex_cnst = 0

        if (this.fields.pnrBool && this.fields.pnrType && this.fields.pnrType !== "0") {
            let baseValue = this.soldo.value * (Number(this.fields.pnrType) / 100)

            pnr_f_ex_cnst = baseValue * 0.2;
            pnr_f_ex_mnt = baseValue * 0.1;
            pnr_cod_ua = baseValue - pnr_f_ex_cnst - pnr_f_ex_mnt;
        }

        return [
            {
                title: 'PNR (F EX-CNST)',
                percent: '-',
                value: this.truncateDecimalNumbers(pnr_f_ex_cnst)
            },
            {
                title: 'PNR (COD/UA)',
                percent: '-',
                value: this.truncateDecimalNumbers(pnr_cod_ua)
            },
            {
                title: 'PNR (F EX-MNT)',
                percent: '-',
                value: this.truncateDecimalNumbers(pnr_f_ex_mnt)
            }
        ]
    }

    get pensaoJudiciaria(): fieldInterface[] {
        let pjList: fieldInterface[] = []

        if (this.fields.pjBoolean) {
            pjList = [this.fields.pj1Val, this.fields.pj2Val, this.fields.pj3Val, this.fields.pj4Val, this.fields.pj5Val, this.fields.pj6Val]
                .map(value => {
                    return {
                        title: 'PENS JUDICIARIA',
                        percent: '-',
                        value: Number(value)
                    }
                })
        }

        return pjList
    }

    get pensaoJudiciariaAdicNatal(): fieldInterface[] {
        let pjList: fieldInterface[] = []

        if (this.fields.pjAdicNatalBoolean) {
            pjList = [this.fields.pjAdicNatal1Val, this.fields.pjAdicNatal2Val, this.fields.pjAdicNatal3Val, this.fields.pjAdicNatal4Val, this.fields.pjAdicNatal5Val, this.fields.pjAdicNatal6Val]
                .map(value => {
                    return {
                        title: 'PENS JUDICIARIA 13º',
                        percent: '-',
                        value: Number(value)
                    }
                })
        }

        return pjList
    }

    get dedAdAdicNatalino(): fieldInterface {
        let valueCalculated = 0

        if (this.fields.adicNatalino1ParcelaVal) {
            valueCalculated = Number(this.fields.adicNatalino1ParcelaVal)
        }

        return {
            title: 'DED AD AD NATAL',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get irMensal(): fieldInterface {
        let valueCalculated = 0

        if (!this.fields.isentoIr) {
            valueCalculated = this.calculateIR(
                this.grossAmountToDiscounts + this.extraValues.receitasTributaveis,
                this.discountsAmountToIR,
                Number(this.fields.depIrQtd),
                this.fields.maior65
            )

            // Vide Art. 67 da Lei nº 9.430/99
            if (valueCalculated <= 10) {
                valueCalculated = 0
            }
        }

        return {
            title: 'IMPOSTO RENDA',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get irFerias(): fieldInterface {
        let valueCalculated = 0

        if (!this.fields.isentoIr && this.adicFerias.value > 0) {
            valueCalculated = this.calculateIR(
                this.adicFerias.value,
                this.discountsAmountToIR,
                Number(this.fields.depIrQtd),
                this.fields.maior65
            )

            // Vide Art. 67 da Lei nº 9.430/99
            if (valueCalculated <= 10) {
                valueCalculated = 0
            }
        }

        return {
            title: 'IMPOSTO RENDA FÉRIAS',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get irAdicNatalino(): fieldInterface {
        let valueCalculated = 0

        if (!this.fields.isentoIr && this.adicNatalino.value > 0) {
            valueCalculated = this.calculateIR(
                this.adicNatalino.value,
                this.pensaoJudiciariaAdicNatal.reduce((prev, curr) => {
                    return prev + curr.value
                }, 0),
                Number(this.fields.depIrQtd),
                this.fields.maior65
            )

            // Vide Art. 67 da Lei nº 9.430/99
            if (valueCalculated <= 10) {
                valueCalculated = 0
            }
        }

        return {
            title: 'IMPOSTO RENDA 13º',
            percent: '-',
            value: this.truncateDecimalNumbers(valueCalculated)
        }
    }

    get extraValues(): { receitas: fieldInterface[], descontos: fieldInterface[], receitasTributaveis: number, descontosTributaveis: number } {
        let receitas: fieldInterface[] = []
        let descontos: fieldInterface[] = []
        let receitasTributaveis: number = 0
        let descontosTributaveis: number = 0


        if (this.fields.extraValues && this.fields.existemValoresExtraBool) {
            let receitasFiltered = this.fields.extraValues.filter(item => item.type === 'receita')
            receitasTributaveis = receitasFiltered.reduce((prev, curr) => {
                return curr.isTaxable == '1' ? prev + Number(curr.value) : prev + 0
            }, 0)

            receitas = receitasFiltered.map((item): fieldInterface => {
                return { title: item.description, percent: '-', value: Number(item.value) }
            })

            let descontosFiltered = this.fields.extraValues.filter(item => item.type === 'desconto')
            descontosTributaveis = descontosFiltered.reduce((prev, curr) => {
                return curr.isTaxable == '1' ? prev + Number(curr.value) : prev + 0
            }, 0)
            descontos = descontosFiltered.map((item): fieldInterface => {
                return { title: item.description, percent: '-', value: Number(item.value) }
            })
        }
        return {
            receitas: [
                ...receitas
            ],
            descontos: [
                ...descontos
            ],
            receitasTributaveis,
            descontosTributaveis
        }
    }
}