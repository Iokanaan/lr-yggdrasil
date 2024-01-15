/**
 * Fonction pour avoir du script sur chaque entrée d'un repeater :
 *  - setupEditEntry pour le script qui concerne l'entrée en mode édition
 *  - setupViewEntry pour le script qui concerne l'entrée en mode affichage
 *  - onDelete pour déclencher un script à la suppression d'un élément
 * 
 * En prérequis à l'utilisation de la fonction, il est nécessaire d'avoir :
 *  - un composant "label" avec l'id "mode" et contenant "VIEW" sur le sous-composant servant à l'affichage
 *  - un composant "label" avec l'id "mode" et contenant "EDIT" sur le sous-composant servant à l'édition
 */

// Variable globale de gestion des entries sur le repeater des talents


export const setupRepeater = function(
    sheet: PjSheet,
    repeaterId: string,
    setupEditEntry: ((entry: Component<any>) => void) | null,
    setupViewEntry: ((entry: Component<any>) => void) | null,
    onDelete: (((entryId: string) => void)) | null) {
    sheet.entryStates[repeaterId] = {}
    const repeater = sheet.raw().get(repeaterId)
    // On commence par exécuter le script des entry en mode VIEW au chargement de la feuille
    each(repeater.value(), function(_, entryId) {
        sheet.entryStates[repeaterId][entryId] = 'VIEW'
        if(setupViewEntry !== null) {
            setupViewEntry(repeater.find(entryId))
        }
    })

    // Gestion de l'initialisation du mode édition
    repeater.on('click', function(rep: Component<Record<string, unknown>>) {
        reviewEntries(rep, sheet.entryStates[rep.id()], setupEditEntry, setupViewEntry)
        // On parcours le tableau pour vérifier si certains on disparus du repeater
        each(sheet.entryStates[repeaterId], function(_, entryId) {
            if(repeater.value()[entryId] === undefined) {
                // Si disparition, on set l'entrée dans le tableau à undefined et on lancer la fonction onDelete
                sheet.entryStates[repeaterId][entryId] = undefined
                if(onDelete !== null) {
                    onDelete(entryId)
                }
            }
        })
    })
}

// À appeler quand on réinitialise toutes les données d'un repeater ou au dépôt d'un craft
export const reset = function(sheet: PjSheet, repeaterId: string,     
    setupEditEntry: ((entry: Component<any>) => void) | null,
    setupViewEntry: ((entry: Component<any>) => void) | null
    ) {
    sheet.entryStates[repeaterId] = {}
    wait(200, function() {
        const repeater = sheet.raw().get(repeaterId) as Component<Record<string, unknown>>
        reviewEntries(repeater, sheet.entryStates[repeaterId], setupEditEntry, setupViewEntry)
    })
}

const reviewEntries = function(
    rep: Component<Record<string, unknown>>, 
    entryStates: Record<string, RepeaterState | undefined>, 
    setupEditEntry: ((entry: Component<any>) => void) | null,
    setupViewEntry: ((entry: Component<any>) => void) | null) {
    each(rep.value(), function (_, entryId) {
        const entry = rep.find(entryId)
        if(entry.find('mode').value() === 'EDIT') {
            // On init uniquement les entries qui n'était pas en mode EDIT avant
            if(entryStates[entryId] !== 'EDIT' && setupEditEntry !== null) {
                // Initialisation de l'entry
                setupEditEntry(entry)
            }
            // L'entry est stockée en mode EDIT
            entryStates[entryId] = 'EDIT'
        } else {
            if(entryStates[entryId] !== 'VIEW' && setupViewEntry !== null) {
                // Initialisation de l'entry
                setupViewEntry(entry)
            }
            // L'entry est stockée en mode VIEW
            entryStates[entryId] = 'VIEW'
        }
    })
}