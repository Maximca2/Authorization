export function checkAllValueInObject(value) {
    let bool = false;
    Object.values(value).forEach(it => it.length <= 2 ? bool : bool = true)
    if (Object.values(value).length < 4 || bool === false) {
        return false
    }
    return true

}

