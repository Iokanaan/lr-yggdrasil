import { dynamicComps } from "../globals"
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
                log(labelCmp.id())
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