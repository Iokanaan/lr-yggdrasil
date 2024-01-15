// Conversion d'un entier vers du text pour transmission dans les tags
export const intToWord = function(n: number) {
    let neg = false
    if(n < 0) {
      neg=true
      n=Math.abs(n)
    }
    const chars = n.toString().split('')
    let word = ''
    for(var i in chars) {
        word += String.fromCharCode(97 + parseInt(chars[i]))
    }
    if(neg) {
        return "Z" + word
    } else {
        return word
    }
}

// Fonction inverse de la précédente
export const wordToInt = function(str: string) {
    let neg = false
    if(str.startsWith("Z")) {
        str = str.substring(1)
        neg = true
    } 
    const chars = str.split('')
    let res = ''
    for(var i in chars) {
        res += (chars[i].charCodeAt(0) - 97).toString()
    }
    if(neg) {
        return -parseInt(res)
    } else {
        return parseInt(res)
    }
}

// Implémentation du pattern signal
export function signal<T>(value: T): Signal<T> {
    let state = value;
    let handlers: Handler<T>[] = []
    function _signal() {
        return state;
    }

    _signal.set = function(value: T) {
        state = value;
        for(let i=0; i<handlers.length; i++) {
            handlers[i](value)
        }
    }

    _signal.subscribe = function(handler: Handler<T>) {
        handlers.push(handler);
        return function() { }
    }

    return _signal;
}

// Implémentation du pattern computed
export const computed = function<T>(compute: () => T, dependencies: Signal<unknown>[] | Computed<unknown>[]): Computed<T> {
    const s = signal(compute());
    for(let i=0; i<dependencies.length; i++) {
        dependencies[i].subscribe(function(c) {
            s.set(compute())
        })
    }
    return s;
}

export const effect = function(apply: () => void, dependencies: Signal<unknown>[] | Computed<unknown>[]): void {
    apply()
    for(let i=0; i<dependencies.length; i++) {
        dependencies[i].subscribe(function() {
            apply()
        })
    }
}

export const editableLabel = function(editBtn: Component, label: Component, input: Component, labelContainer: Component, inputContainer: Component) {
    editBtn.on("click", function() {
        if(labelContainer.visible()) {
            labelContainer.hide()
            inputContainer.show()
        } else {
            labelContainer.show()
            inputContainer.hide()
        }
    })
    input.on("update", function(cmp) {
        label.value(cmp.value())
        labelContainer.show()
        inputContainer.hide()
    })
}

