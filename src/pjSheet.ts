import { attributs } from "./globals"
import { computed, signal } from "./utils/utils"

const updateHandler = function<T>(signal: Signal<T>) {
    return function(c: Component<T>) {
        log("set signal")
        signal.set(c.value())
    }           

}

export const pjSheet = function(sheet: Sheet): PjSheet {
    const _pjSheet = {} as PjSheet
    _pjSheet.raw = function() { return sheet }
    _pjSheet.find = sheet.get
    _pjSheet.attributs = {} as any
    for(let i=0;i<attributs.length;i++) {
        const cmp = _pjSheet.find(attributs[i]) as Component<number>
        _pjSheet.attributs[attributs[i]] = signal(cmp.value())
        cmp.on("update", updateHandler<number>(_pjSheet.attributs[attributs[i]]))
    }
    _pjSheet.attributsSecondaires = {} as any


    _pjSheet.attributsSecondaires.dep = computed(function() {
        const dep = _pjSheet.attributs.agi() + _pjSheet.attributs.vig()
        return {
            base: dep,
            course: dep * 2,
            sprint: dep * 3 
        }
    }, [_pjSheet.attributs.agi, _pjSheet.attributs.vig]) 


    _pjSheet.attributsSecondaires.enc = {} as any
    _pjSheet.attributsSecondaires.enc.max = computed(function() {
        return _pjSheet.attributs.pui() * 2 + _pjSheet.attributs.vig()
    }, [_pjSheet.attributs.pui, _pjSheet.attributs.vig])
    _pjSheet.attributsSecondaires.enc.actuel = signal(0)
    _pjSheet.attributsSecondaires.enc.niveauEnc = computed(function() {
        const ratio =  _pjSheet.attributsSecondaires.enc.actuel() / _pjSheet.attributsSecondaires.enc.max()
        if(ratio > 3) {
            return "Surchargé"
        }
        if(ratio > 2) {
            return "Encombré"
        }
        if(ratio > 1) {
            return "Gêné"
        }
        return "Ok"
    }, [_pjSheet.attributsSecondaires.enc.max, _pjSheet.attributsSecondaires.enc.actuel])

    _pjSheet.attributsSecondaires.pv = {} as any
    _pjSheet.attributsSecondaires.pv.max = computed(function() {
        return (_pjSheet.attributs.pui() + _pjSheet.attributs.vig() + _pjSheet.attributs.agi()) * 3 + (_pjSheet.attributs.int() + _pjSheet.attributs.per() + _pjSheet.attributs.ten()) * 2 + _pjSheet.attributs.cha() + _pjSheet.attributs.com() + _pjSheet.attributs.ins()
    }, [_pjSheet.attributs.int, _pjSheet.attributs.ins, _pjSheet.attributs.per, _pjSheet.attributs.pui, _pjSheet.attributs.agi, _pjSheet.attributs.vig, _pjSheet.attributs.ten, _pjSheet.attributs.cha, _pjSheet.attributs.com])

    const pvActuelCmp = _pjSheet.find("pv_actuel") as Component<number>
    _pjSheet.attributsSecondaires.pv.actuel = signal(_pjSheet.find("pv_actuel").value() as number)
    pvActuelCmp.on("update", updateHandler(_pjSheet.attributsSecondaires.pv.actuel))
    _pjSheet.attributsSecondaires.pv.niveauBlessure = computed(function() {
        const ratio =  _pjSheet.attributsSecondaires.pv.actuel() / _pjSheet.attributsSecondaires.pv.max()
        if(ratio > 0.5) {
            return "Fringuant"
        }
        if(ratio > 0.25) {
            return "Blessé"
        }
        if(ratio > 0) {
            return "Meurtri"
        }
        if(ratio > -0.25) {
            return "Inconscient"
        }
        return "Mort"
    }, [_pjSheet.attributsSecondaires.pv.max, _pjSheet.attributsSecondaires.pv.actuel])

    _pjSheet.attributsSecondaires.ini = {} as any
    _pjSheet.attributsSecondaires.ini.rea = computed(function() {
        return _pjSheet.attributs.int() + _pjSheet.attributs.ins() + _pjSheet.attributs.per() 
    }, [_pjSheet.attributs.int, _pjSheet.attributs.ins, _pjSheet.attributs.per])
    const modifIniCmp = _pjSheet.find("ini_modif") as Component<number>
    _pjSheet.attributsSecondaires.ini.modif = signal(modifIniCmp.value())
    _pjSheet.attributsSecondaires.ini.total = computed(function() {
        return _pjSheet.attributsSecondaires.ini.rea() + _pjSheet.attributsSecondaires.ini.modif() 
    }, [_pjSheet.attributsSecondaires.ini.rea, _pjSheet.attributsSecondaires.ini.modif])
    modifIniCmp.on("update", updateHandler(_pjSheet.attributsSecondaires.ini.modif))

    const modifDpCmp = _pjSheet.find("dp_modif") as Component<number>
    _pjSheet.attributsSecondaires.dp = {} as any
    _pjSheet.attributsSecondaires.dp.base =  computed(function() {
        return _pjSheet.attributs.agi() + _pjSheet.attributs.vig() + _pjSheet.attributs.ins()
    }, [_pjSheet.attributs.agi,_pjSheet.attributs.vig, _pjSheet.attributs.ins])
    _pjSheet.attributsSecondaires.dp.modif = signal(modifDpCmp.value())
    _pjSheet.attributsSecondaires.dp.total = computed(function() {
        return _pjSheet.attributsSecondaires.dp.base() + _pjSheet.attributsSecondaires.dp.modif() 
    }, [_pjSheet.attributsSecondaires.dp.base, _pjSheet.attributsSecondaires.dp.modif])
    modifDpCmp.on("update", updateHandler(_pjSheet.attributsSecondaires.dp.modif))

    const modifDmCmp = _pjSheet.find("dm_modif") as Component<number>
    _pjSheet.attributsSecondaires.dm = {} as any
    _pjSheet.attributsSecondaires.dm.base = computed(function() {
        return _pjSheet.attributs.ten() + _pjSheet.attributs.ins() + _pjSheet.attributs.int()
    }, [_pjSheet.attributs.ten,_pjSheet.attributs.int, _pjSheet.attributs.ins])
    _pjSheet.attributsSecondaires.dm.modif = signal(modifDmCmp.value())
    _pjSheet.attributsSecondaires.dm.total = computed(function() {
        return _pjSheet.attributsSecondaires.dm.base() + _pjSheet.attributsSecondaires.dm.modif() 
    }, [_pjSheet.attributsSecondaires.dm.base, _pjSheet.attributsSecondaires.dm.modif])
    modifDmCmp.on("update", updateHandler(_pjSheet.attributsSecondaires.dm.modif))

    return _pjSheet
}