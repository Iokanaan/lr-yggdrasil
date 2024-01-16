export const setupModifiers = function(sheet: PjSheet) {
    sheet.find("difficulte_min").on("click", function() {
        if(sheet.difficulte() > 0) {
            sheet.difficulte.set(sheet.difficulte() - 1)
        }
    })
    sheet.find("difficulte_plus").on("click", function() {
        if(sheet.difficulte() < 8) {
            sheet.difficulte.set(sheet.difficulte() + 1)
        }
    })
}