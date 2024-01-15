import { computed } from "../utils/utils";

export const sheetData = function(sheet: PjSheet) {
    log(sheet.attributsSecondaires)
    const data = computed(function() {
        return {
            ini: sheet.attributsSecondaires.ini.total(),
            rea: sheet.attributsSecondaires.ini.rea(),
            dp_base: sheet.attributsSecondaires.dp.base(),
            dp: sheet.attributsSecondaires.dp.total(),
            dm_base: sheet.attributsSecondaires.dm.base(),
            dm: sheet.attributsSecondaires.dm.total(),
            dep: sheet.attributsSecondaires.dep().base,
            course: sheet.attributsSecondaires.dep().course,
            sprint: sheet.attributsSecondaires.dep().sprint,
            enc_label: sheet.attributsSecondaires.enc.niveauEnc(),
            enc_max: sheet.attributsSecondaires.enc.max(),
            enc_actuel: sheet.attributsSecondaires.enc.actuel(),
            pv_label: sheet.attributsSecondaires.pv.niveauBlessure(),
            pv_max: sheet.attributsSecondaires.pv.max(),
        }
    }, [
        sheet.attributsSecondaires.ini.total,
        sheet.attributsSecondaires.dp.total,
        sheet.attributsSecondaires.dm.total,
        sheet.attributsSecondaires.dep,
        sheet.attributsSecondaires.enc.niveauEnc,
        sheet.attributsSecondaires.pv.niveauBlessure
    ])   

    computed(function() {
        sheet.raw().setData(data())
    }, [data])
}

