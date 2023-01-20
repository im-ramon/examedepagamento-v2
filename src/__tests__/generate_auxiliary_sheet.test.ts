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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
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
            "extraValues": {}
        }
        const auxialarySheet = new AuxiliarySheetEtitie(MockForm)

        expect(auxialarySheet.auxFardamento.value).toBe(11235);
        expect(auxialarySheet.auxFardamento.title).toBe('AUX FARD 1.5 SLD');

    });
});