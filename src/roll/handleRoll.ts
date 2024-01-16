import { seuils } from "../globals"
import { intToWord, wordToInt } from "../utils/utils"

export const handleRoll = function(sheet: PjSheet, title: string, nbRoll: number, nbKeep: number, bonus: number) {
   
    const sr = seuils[sheet.difficulte()].sr + (sheet.find("modif_sr").value() as number)
    nbRoll += sheet.find("modif_nbroll").value() as number
    nbKeep += sheet.find("modif_nbkeep").value() as number

    new RollBuilder(sheet.raw())
    .expression("(expl(keeph(" + nbRoll + "d10, " + nbKeep + ")) + " + bonus + ")[sr_" + intToWord(sr) + "]")
    .title(title)
    .roll()
    sheet.difficulte.set(3)
    sheet.raw().setData({
        difficulte_level: 3,
        modif_sr: 0,
        modif_nbroll: 0,
        modif_nbkeep: 0
    })
}

export const resultCallback = function(result: DiceResult) {
    return function(sheet: Sheet) {
        const sr = parseIntTag(result.allTags, /sr_/)
        if(sr !== undefined) {
            sheet.get("sr").text(sr.toString())
            const diff = sr - result.total
            if(diff > 0) {
                sheet.get("diff_label").text("Échoué de ")
            } else {
                sheet.get("diff_label").text("Réussi de ")
            }
            sheet.get("diff").text(Math.abs(diff).toString())
        }
        if(result.containsTag("initiative")) {
            sheet.get("result").text(result.total.toString())
        } else {
            sheet.get("result").text(result.total.toString())
        }
    }
}

// Fonction pour traduire la valeur d'un tag en integer
const parseIntTag = function(tags: string[], regex: RegExp): number | undefined {
    const res = tags.filter(function(e) { return regex.test(e) })
    if(res.length !== 0) {
        return wordToInt(res[0].split('_')[1])
    } else {
        return undefined
    }
}