import { attributs, competences, dynamicComps } from "../globals"
import { handleRoll } from "../roll/handleRoll"
import { computed, effect, signal } from "../utils/utils"

export const dynamicComp = function(sheet: PjSheet) {
    dynamicComps.forEach(function(val) {
        const visibilities: Computed<boolean>[] = []
        for(let i=1;i<=3;i++) {
            visibilities.push(setupRow(sheet, val, i))
        }

        const plusCmp = sheet.find("plus_" + val)
        plusCmp.on("click", function() {
            for(let i=0;i < visibilities.length; i++) {
                if(!visibilities[i]()) {
                    sheet.find(val + "_" + (i+1) + "_row").show()
                    break;
                }
            }
        })

        effect(function() {
            let nbVisible = 0
            for(let i=0; i<visibilities.length; i++) {
                if(visibilities[i]()) {
                    nbVisible++
                }
            }
            if(nbVisible === visibilities.length) {
                plusCmp.hide()
            } else {
                plusCmp.show()
            }
        }, visibilities)

    })
}

export const setupCompSelection = function(sheet: PjSheet) {
    competences.forEach(function(comp) {
        const labelCmp = sheet.find(comp + "_label") as Component<string>
        labelCmp.on("click", function(cmp) {
            const selected = sheet.compSelected()
            if(sheet.compSelected() !== comp) {
                sheet.compSelected.set(comp)
            } else {
                sheet.compSelected.set(undefined)
            }
        })
    })

    effect(function() {
        competences.forEach(function(c) {
            const cCmp = sheet.find(c + "_label")
            if(cCmp.id() === sheet.compSelected() + "_label") {
                cCmp.addClass("text-info")
            } else {
                cCmp.removeClass("text-info")
            }
        })
    }, [sheet.compSelected])
}

export const attrRoll = function(sheet: PjSheet) {
    attributs.forEach(function(attr) {
        sheet.find(attr + "_label").on("click", function() {
            const comp = sheet.compSelected()
            let bonus = 0
            let title = sheet.find(attr + "_label").text()
            if(comp !== undefined) {
                bonus += sheet.find(comp + "_val").value() as number
                title = sheet.find(comp + "_label").text()
            }
            handleRoll(sheet, title, sheet.find(attr).value() as number, 2, bonus)
            sheet.compSelected.set(undefined)
        })
    })
}

const setupRow = function(sheet: PjSheet, val: string, i: number) {
    const row = sheet.find(val + "_" + i + "_row")
    const col = sheet.find(val + "_" + i + "_col")
    const editCol = sheet.find(val + "_" + i + "_edit_col")
    const inputCmp = sheet.find(val + "_" + i + "_input") as Component<string>
    const labelCmp = sheet.find(val + "_" + i + "_label")
    const editCmp = sheet.find(val + "_" + i + "_edit")
    
    const inputVal = signal(inputCmp.value())

    const visibility = computed(function() {
        return inputVal() !== undefined && inputVal() !== ""
    }, [inputVal])

    effect(function() {
        if(visibility()) {
            row.show()
            col.show()
            editCol.hide()
        } else {
            row.hide()
            col.hide()
            editCol.show()
        }
    }, [visibility])

    effect(function() {
        labelCmp.value(inputVal())
    }, [inputVal])

    editCmp.on("click", function() {
        col.hide()
        editCol.show()
    })
    
    inputCmp.on("update", function(cmp) {
        inputVal.set(cmp.value())
    })

    return visibility
}

