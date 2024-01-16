import { setupWeaponDisplayEntry, setupWeaponEditEntry, weaponDelete } from "./combat/armes"
import { setupCombatToggles } from "./combat/valeurs"
import { attrRoll, dynamicComp, setupCompSelection } from "./competences/competences"
import { sheetData } from "./data/data"
import { pjSheet } from "./pjSheet"
import { resultCallback } from "./roll/handleRoll"
import { setupModifiers } from "./roll/modifiers"
import { setupRepeater } from "./utils/repeaters"

initRoll = function(result: DiceResult, callback: DiceResultCallback) {
    callback('DiceResult', resultCallback(result))
}


init = function(sheet) {
    if(sheet.id() === "main") {
        const s = pjSheet(sheet)
        sheetData(s)
        dynamicComp(s)
        setupCompSelection(s)
        attrRoll(s)
        setupModifiers(s)
        setupCombatToggles(s)
        //setupRepeater(sheet, "armes_repeater", setupWeaponEditEntry, setupWeaponDisplayEntry(s), weaponDelete)
    }
}