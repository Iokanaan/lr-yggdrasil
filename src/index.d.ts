//@ts-check

declare global { 

    interface Signal<T> {
        (): T;
        set(t:T)
        subscribe(t:Handler<T>): () => void;
    }
    
    interface Computed<T> {
        (): T;
        subscribe(t:Handler<T>): () => void;
    }

    type Handler<T> = (t: T) => void

    type RepeaterState = 'EDIT' | 'VIEW'

    interface ExtendedSheet {
        raw(): Sheet,
        find(id: string): Component<unknown> | ChoiceComponent<unknown>,
        stringId(): string,
        entryStates: Record<string, Record<string, RepeaterState | undefined>>
    }



    type Attribut = "agi" | "vig" | "pui" | "int" | "per" | "ten" | "cha" | "ins" | "com" 
    type AttributSecondaire = "pv"
    type WeaponCategory = "armes_courtes" | "armes_longues" | "armes_deux_mains" | "armes_hast" | "lancer" | "armes_tir"
    type WeaponData = {
        cat: WeaponCategory,
        nom: string,
        degats: number | undefined,
        degats_distance: number | undefined,
        lancable: boolean,
        portee_courte: number,
        portee_moyenne: number,
        portee_longue: number,
        portee_extreme: number,
        val: string,
        sol: number,
        enc: number
    }
    type ArmorData = {
        nom: string,
        prot: number
        val: string,
        sol: number,
        enc: number,
        bonus_cha: boolean
    }

    type Difficulte = "Très simple" | "Simple" | "Aisé" | "Moyen" | "Difficile" | "Très Difficile" | "Exceptionnel" | "Légendaire" | "Divin"

    type PjSheet = {
        attributs: Record<Attribut, Signal<number>>,
        attributsSecondaires: 
          { pv: { max: Computed<number>, niveauBlessure: Computed<string>, actuel: Signal<number>}}
        & { dp: { base: Computed<number>, modif: Signal<number>, total: Computed<number>}}
        & { dm: { base: Computed<number>, modif: Signal<number>, total: Computed<number>}}
        & { ini: { rea: Computed<number>, modif: Signal<number>, total: Computed<number>}}
        & { enc: { max: Computed<number>, niveauEnc: Computed<string>, actuel: Signal<number>}} 
        & { dep: Computed<{base: number, course: number, sprint: number}> },
        compSelected: Signal<string | undefined>,
        difficulte: Signal<number>,
        armes: Signal<Record<string, WeaponData>>,
        armures: Signal<Record<string, ArmorData>>,
        bouclier: {
            actif: Signal<boolean>,
            enc: Signal<number>,
            dp: Signal<number>
        },
        encombrement: Computed<number>,
        computed: Computed<SheetData>
    } & ExtendedSheet
}

export {}
