/**
 * Преобразует массив массивов в единый массив
 *
 * @param {any} a - исходный массив
 * @returns {any} результирующий массив
 */
export function arrayOfArraysToArray (a) {
    if (!Array.isArray(a)) { return a; }

    return a.reduce((acc, a) => {
        if (!Array.isArray(a)) {
            return [...acc, a];
        }
        return [...acc, ...arrayOfArraysToArray(a)];
    }, []);
}
