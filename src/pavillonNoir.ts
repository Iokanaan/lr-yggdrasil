import { dynamicComp } from "./competences/competences"
import { sheetData } from "./data/data"
import { pjSheet } from "./pjSheet"

init = function(sheet) {
    if(sheet.id() === "main") {
        const s = pjSheet(sheet)
        sheetData(s)
        dynamicComp(s)
    }
}