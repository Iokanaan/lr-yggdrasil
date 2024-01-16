export const setupCombatToggles = function(sheet: PjSheet)  {
    sheet.find("bouclier_toggle_on").on("click", function(cmp) {
        sheet.bouclier.actif.set(false)
        cmp.hide()
        sheet.find("bouclier_toggle_off").show()
    })

    sheet.find("bouclier_toggle_off").on("click", function(cmp) {
        sheet.bouclier.actif.set(true)
        cmp.hide()
        sheet.find("bouclier_toggle_on").show()
    })
}