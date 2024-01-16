export const setupWeaponEditEntry = function(entry: Component<WeaponData>) {
    
}

export const setupWeaponDisplayEntry = function(sheet: PjSheet) {
    return function(entry: Component<WeaponData>) {
        entry.find("weapon_label").on("click", function() {
            sheet.compSelected.set(entry.value().cat)
        })
    }
}
export const weaponDelete = function() {
    
}