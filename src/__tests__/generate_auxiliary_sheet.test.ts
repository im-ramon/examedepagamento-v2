import { describe, expect, test } from '@jest/globals';
import { AuxiliarySheetEtitie } from '../entities/auxiliary_sheet';
import { AuxiliarySheetFields } from '../pages/app/generate_auxiliary_sheet';

describe('Auxialary sheet Entitie teste white 3º Sgt base to calc', () => {
    let baseMockForm: AuxiliarySheetFields = {
        dataReferencia: "2023-01-17",
        maior65: false,
        isentoIr: false,
        pgSoldo: "3º Sgt",
        pgReal: "3º Sgt",
    }

    test('Test calc [SOLDO]: Category "VT"', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: "integral",
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.soldo.value).toBe(3825);
    });

    test('Test calc [SOLDO]: Without shared pension', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoType: "integral",
            cotaParteSoldoPercent: '33.33'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.soldo.value).toBe(1274.87);
    });

    test('Test calc [SLD PROP P/COTA]: Without shared pension', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: "cota",
            soldoPropPercent: '50',
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.soldo.value).toBe(1912.50);
        expect(auxialarySheet.soldo.title).toBe('SLD PROP P/COTA');
    });

    test('Test calc [SLD PROP P/COTA]: With shared pension of 50%', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoType: "cota",
            soldoPropPercent: '50',
            cotaParteSoldoPercent: '12.57'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.soldo.value).toBe(240.40);
        expect(auxialarySheet.soldo.title).toBe('SLD PROP P/COTA');
    });

    test('Test calc [COMPL COTA SOLDO]: - With complement - Category "VT"', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: "cota",
            soldoPropPercent: '50',
            complemetoCotaSoldoBool: true,
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.complementoCotaSoldo.value).toBe(1912.50);
    });

    test('Test calc [COMPL COTA SOLDO]: With complement - Category "PN"', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoType: "cota",
            soldoPropPercent: '50',
            complemetoCotaSoldoBool: true,
            cotaParteSoldoPercent: '100'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.complementoCotaSoldo.value).toBe(1912.50);
    });

    test('Test calc [COMPL COTA SOLDO]: Whitout complement- Category "PN"', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoPropPercent: '50',
            complemetoCotaSoldoBool: false,
            cotaParteSoldoPercent: '100'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.complementoCotaSoldo.value).toBe(0);
    });

    test('Test calc [AD C DISP MIL | ADIC TP SV]: When AD C DISP MIL is smaller then ADIC TP SV', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoPropPercent: '50',
            complemetoCotaSoldoBool: false,
            cotaParteSoldoPercent: '100',
            adicCompDispMilBool: true,
            adicTpSvPercent: '10'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicCompDispMil.value).toBe(0);
        expect(auxialarySheet.adicTpSv.value).toBe(382.50);
    });

    test('Test calc [AD C DISP MIL | ADIC TP SV]: When AD C DISP MIL is bigger then ADIC TP SV', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoPropPercent: '50',
            complemetoCotaSoldoBool: false,
            cotaParteSoldoPercent: '100',
            adicCompDispMilBool: true,
            adicTpSvPercent: '5'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicCompDispMil.value).toBe(229.5);
        expect(auxialarySheet.adicTpSv.value).toBe(0);
    });

    test('Test calc [AD C DISP MIL | ADIC TP SV]: When AD C DISP MIL equals ADIC TP SV', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoPropPercent: '50',
            complemetoCotaSoldoBool: false,
            cotaParteSoldoPercent: '100',
            adicCompDispMilBool: true,
            adicTpSvPercent: '6'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicCompDispMil.value).toBe(229.5);
        expect(auxialarySheet.adicTpSv.value).toBe(0);
    });

    test('Test calc [ADIC HAB]: When ADIC HAB is "formacao"', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            adicHabType: 'formacao'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicHab.value).toBe(459);
    });

    test('Test calc [ADIC HAB]: When ADIC HAB is "aperfeicoamento"', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            adicHabType: 'aperfeicoamento'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicHab.value).toBe(1568.25);
    });

    test('Test calc [ADIC MIL]: To 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            adicMilBool: true,
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicMil.value).toBe(612);
        expect(auxialarySheet.adicMil.percent).toBe('16');
    });

    test('Test calc [ADIC PERM]: 5% of 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            adicPerm: '5'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicPerm.value).toBe(191.25);
    });

    test('Test calc [ADIC PERM]: 35% of 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            adicPerm: '35'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicPerm.value).toBe(1338.75);
    });

    test('Test calc [ADIC COORG]: 10% of Cap QAO', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            adicPerm: '35',
            adicCoOrgBool: true,
            adicCoOrgPg: 'Cap QAO',
            adicCoOrgPercent: '10'
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicCoOrg.value).toBe(913.50);
    });

    test('Test calc [AD C ORG H VOO]: 10% of 2º Ten', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            adicHVooBool: true,
            adicHVooPercent: '10',
            adicHVooPg: '2º Ten',
            universo: 'VT',
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicHVoo.value).toBe(749);
    });

    test('Test calc [AD C ORG H VOO]: 10% of 2º Sgt with shared pension of 50% ', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            soldoType: 'integral',
            cotaParteSoldoPercent: '50',
            adicHVooBool: true,
            adicHVooPercent: '10',
            adicHVooPg: '2º Sgt',
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicHVoo.value).toBe(238.50);
    });

    test('Test calc [ACRESC 25% SOLDO]: Without shared pension', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: 'integral',
            acres25Bool: true
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.acres25Soldo.value).toBe(956.25);
    });

    test('Test calc [ACRESC 25% SOLDO]: With shared pension of 73.18%', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'PN',
            cotaParteSoldoPercent: '73.18',
            acres25Bool: true
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.acres25Soldo.value).toBe(699.78);
    });

    test('Test calc [ADIC FÉRIAS]: Vocation default', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicFerias.value).toBe(1479);
    });

    test('Test calc [ADIC FÉRIAS]: Vocation PTTC', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicFerias.value).toBe(443.70);
    });

    test('Test calc [ADIC NATAL]: For 6 months', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": true,
            "adicNatalinoMesesQtd": "6",
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicNatalino.value).toBe(2218.5);
    });

    test('Test calc [SALARIO FAMILIA]: For 4 dependents', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": true,
            "adicNatalinoMesesQtd": "6",
            "depSalFamiliaQtd": "4",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.salarioFamilia.value).toBe(0.64);
    });

    test('Test calc [AUX TRANSPORTE]: For R$ 1000 - 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": true,
            "adicNatalinoMesesQtd": "6",
            "depSalFamiliaQtd": "4",
            "depIrQtd": "0",
            "auxTransporteBool": true,
            "auxTransporteVal": '1000',
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxTransporte.value).toBe(831.70);
    });

    test('Test calc [AUX TRANSPORTE]: For R$ 1000 - 2º Ten QAO', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "2º Ten QAO",
            "pgReal": "2º Ten QAO",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": true,
            "adicNatalinoMesesQtd": "6",
            "depSalFamiliaQtd": "4",
            "depIrQtd": "0",
            "auxTransporteBool": true,
            "auxTransporteVal": '1000',
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxTransporte.value).toBe(670.45);
    });

    test('Test calc [AUX TRANSPORTE]: For R$ 1.827,77 - Cel', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cel",
            "pgReal": "2º Ten QAO",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": true,
            "adicNatalinoMesesQtd": "6",
            "depSalFamiliaQtd": "4",
            "depIrQtd": "0",
            "auxTransporteBool": true,
            "auxTransporteVal": '1827.77',
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxTransporte.value).toBe(1323.93);
    });

    test('Test calc [AUX NATALIDATE]: For 3 children - 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": true,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "3",
            "auxTransporteVal": "1000",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxNatalidade.value).toBe(7650);
    });

    test('Test calc [AUX NATALIDATE]: For 2 children - 2º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "2º Sgt",
            "pgReal": "2º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": true,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "2",
            "auxTransporteVal": "1000",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxNatalidade.value).toBe(7155);
    });

    test('Test calc [AUX NATALIDATE]: For 3 children - 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": true,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "3",
            "auxTransporteVal": "1000",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxNatalidade.value).toBe(7650);
    });

    test('Test calc [AUX INVALIDEZ]: For 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "VT",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxInvalidez.value).toBe(1520);
    });

    test('Test calc [AUX INVALIDEZ]: For Cap', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "VT",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cap",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxInvalidez.value).toBe(2283.75);
    });

    test('Test calc [ASSIST PRE-ESC]: For 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "VT",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "2",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxPreEsc.length).toBe(2);
        expect(auxialarySheet.auxPreEsc[0].value).toBe(304.95);
        expect(auxialarySheet.auxPreEsc[1].value).toBe(304.95);
        expect(auxialarySheet.auxPreEsc[2]).toBeUndefined();
    });

    test('Test calc [ASSIST PRE-ESC]: For 0 dependent', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "VT",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxPreEsc.length).toBe(1);
        expect(auxialarySheet.auxPreEsc[0].value).toBe(0);
        expect(auxialarySheet.auxPreEsc[1]).toBeUndefined();
    });

    test("Test calc [AUX FARDAMENTO]: Don't First time - 3º Sgt", () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": true,
            "auxFard1VezBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxFardamento.value).toBe(3825);
        expect(auxialarySheet.auxFardamento.title).toBe('AUX FARD 1 SLD');
    });

    test('Test calc [AUX FARDAMENTO]: First time - 2º Ten', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "2º Ten",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": true,
            "auxFard1VezBool": true,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxFardamento.value).toBe(11235);
        expect(auxialarySheet.auxFardamento.title).toBe('AUX FARD 1.5 SLD');

    });

    test('Test calc [AUX ALIM C]: Default', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: 'integral',
            auxAlimentC: true
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxAlimentC.value).toBe(270);
    });

    test('Test calc [AUX ALIM]: 5x - 10', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": true,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "3",
            "auxTransporteVal": "1000",
            "auxFard1VezBool": false,
            "auxAlimentEspQtd": "10",
            "auxAlimentEspType": "5",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxAliment.value).toBe(450);
    });

    test('Test calc [AUX ALIM]: 10x - 10', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": true,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "3",
            "auxTransporteVal": "1000",
            "auxFard1VezBool": false,
            "auxAlimentEspQtd": "10",
            "auxAlimentEspType": "10",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxAliment.value).toBe(900);
    });

    test('Test calc [GRAT LOC ESP ]: Type "A" - 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: 'integral',
            gratRepreType: 'A',
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.gratLocEsp.value).toBe(765);
    });

    test('Test calc [GRAT LOC ESP ]: Type "B" - 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: 'integral',
            gratRepreType: 'B',
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.gratLocEsp.value).toBe(382.50);
    });

    test('Test calc [GRAT REPR CMDO]: 3º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            ...baseMockForm,
            universo: 'VT',
            soldoType: 'integral',
            gratCmdoBool: true,
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.gratRepCmdo.value).toBe(382.50);
    });

    test('Test calc [GRAT REPRES 2%]: 7 days of 2º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cap",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": true,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": true,
            "gratRep2DiasQtd": '7',
            "gratRep2Pg": '2º Sgt',
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "3",
            "auxTransporteVal": "1000",
            "auxFard1VezBool": false,
            "auxAlimentEspQtd": "10",
            "auxAlimentEspType": "10",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.gratRep2.value).toBe(667.80);
    });

    test('Test calc [GRAT REPRES 2%]: 15 day of Cap', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "1º Ten QAO",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "sem_formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "10",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": true,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": true,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": true,
            "gratRep2DiasQtd": '15',
            "gratRep2Pg": 'Cap',
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicCoOrgPercent": "10",
            "adicCoOrgPg": "2º Ten",
            "adicCoOrgType": "PDQT",
            "adicNatalinoMesesQtd": "6",
            "adicNatalino1ParcelaVal": "0",
            "auxNatatalidadeQtd": "3",
            "auxTransporteVal": "1000",
            "auxFard1VezBool": false,
            "auxAlimentEspQtd": "10",
            "auxAlimentEspType": "10",
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.gratRep2.value).toBe(2740.5);
    });

    test('Test calc [ADIC PTTC]: To Cap - With vocation', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-19",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cap",
            "pgReal": "Cap",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "formacao",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": true,
            "ferias": true,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "00",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "extraValues": []
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.adicPTTC.value).toBe(3672.27);
        expect(auxialarySheet.adicFerias.value).toBe(1224.08);
    });

    test('Test calc [P MIL 10,5% - 1,5%]: 3º Sgt, ADIC HAB 12% and same PG.', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "Cap",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "formacao",
            "adicMilBool": false,
            "adicPerm": "0",
            "pMilBool": true,
            "pMil15Bool": true,
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.pMil[0].value).toBe(449.82);
        expect(auxialarySheet.pMil[1].value).toBe(64.25);
    });

    test('Test calc [P MIL 10,5% - 1,5%]: 3º Sgt, ADIC HAB 12% and PG 2º Sgt', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "Cap",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "adicCompDispMilBool": false,
            "adicHabType": "formacao",
            "adicMilBool": false,
            "adicPerm": "0",
            "pMilBool": true,
            "pMil15Bool": true,
            "pMilPgAcimaBool": true,
            "pMilPgAcimaPg": "2º Sgt"
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.pMil[0].value).toBe(560.95);
        expect(auxialarySheet.pMil[1].value).toBe(80.13);
    });

    test('Test calc [P MIL 3%]: 3º Sgt, ADIC MIL', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "PN",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "cotaParteSoldoPercent": "100",
            "adicMilBool": true,
            "pMilBool": true,
            "pMil15Bool": true,
            "pMil30Bool": true,
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.pMilExt.value).toBe(133.10);
    });

    test('Test calc [FUSEX 3%]: 3º Sgt, ADIC MIL', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "PN",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "cotaParteSoldoPercent": "100",
            "adicMilBool": true,
            "fusex3Bool": true,
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.fusex.value).toBe(133.10);
    });

    test('Test calc [DESC DEP FUSEX]: 3º Sgt, ADIC MIL - 0,5', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "PN",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "3º Sgt",
            "pgReal": "3º Sgt",
            "soldoType": "integral",
            "adicTpSvPercent": "0",
            "cotaParteSoldoPercent": "100",
            "adicMilBool": true,
            "fusex3Bool": true,
            "descDepFusexType": "5"
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.descDepFusex.value).toBe(22.18);
    });

    test('Test calc [BRUTO]: Calculte gross to IR', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cap",
            "pgReal": "Cap",
            "soldoType": "integral",
            "adicTpSvPercent": "33",
            "adicCompDispMilBool": true,
            "adicHabType": "aperfeicoamento",
            "adicMilBool": false,
            "adicPerm": "5",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": false,
            "adicNatalinoBool": false,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "0",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.grossAmountToDiscounts).toBe(16351.65);
    });

    test('Test calc [IR - MENSAL]: With all conditions', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cel",
            "pgReal": "Cel",
            "soldoType": "integral",
            "adicTpSvPercent": "52",
            "adicCompDispMilBool": false,
            "adicHabType": "altos_estudos_I",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": true,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "5",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "0",
            "pnrBool": false,
            "pjBoolean": false,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicNatalinoMesesQtd": "12",
            "adicNatalino1ParcelaVal": "1.99",
            "extraValues": []
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.irMensal.value).toBe(5718.61);
        expect(auxialarySheet.irFerias.value).toBe(617.19);
        expect(auxialarySheet.irAdicNatalino.value).toBe(6522.08);
    });

    test('Test calc [IR - MENSAL]: With PJ', () => {
        const MockForm: AuxiliarySheetFields = {
            "universo": "MA",
            "dataReferencia": "2023-01-20",
            "maior65": false,
            "isentoIr": false,
            "pgSoldo": "Cel",
            "pgReal": "Cel",
            "soldoType": "integral",
            "adicTpSvPercent": "52",
            "adicCompDispMilBool": false,
            "adicHabType": "altos_estudos_I",
            "adicMilBool": true,
            "adicPerm": "0",
            "adicCoOrgBool": false,
            "adicHVooBool": false,
            "acres25Bool": false,
            "pttcBool": false,
            "ferias": true,
            "adicNatalinoBool": true,
            "depSalFamiliaQtd": "0",
            "depIrQtd": "5",
            "auxTransporteBool": false,
            "auxNatatalidadeBool": false,
            "auxInvalidezBool": false,
            "auxPreEscQtd": "0",
            "auxFardBool": false,
            "auxAlimentC": false,
            "auxAlimentEspBool": false,
            "gratRepreType": "-",
            "gratCmdoBool": false,
            "gratRep2Bool": false,
            "pMilBool": true,
            "pMil15Bool": false,
            "pMil30Bool": false,
            "fusex3Bool": false,
            "descDepFusexType": "0",
            "pnrBool": false,
            "pjBoolean": true,
            "pjAdicNatalBoolean": false,
            "existemValoresExtraBool": false,
            "pMilPgAcimaBool": false,
            "adicNatalinoMesesQtd": "12",
            "adicNatalino1ParcelaVal": "1.99",
            "pj1Val": "500",
            "pj2Val": "0",
            "pj3Val": "0",
            "pj4Val": "0",
            "pj5Val": "0",
            "pj6Val": "0",
            "extraValues": []
        }

        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.irMensal.value).toBe(5581.11);
    });

});