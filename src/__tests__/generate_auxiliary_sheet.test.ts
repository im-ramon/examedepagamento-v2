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
});