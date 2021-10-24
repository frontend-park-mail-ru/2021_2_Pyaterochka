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

class Replacement {
    constructor (id, from, to) {
        this.id = id;
        this.from = from;
        this.to = to;
    }
}
export function findReplacements (oldArray, newArray) {
    const replacements = newArray.map((key, i) => {
        return new Replacement(
            key,
            oldArray.findIndex(oldKey => oldKey === key),
            i
        );
    });

    oldArray.forEach((key, i) => {
        if (newArray.includes(key)) return;
        replacements.push(
            new Replacement(
                key,
                i,
                -1
            )
        );
    });

    return replacements;
}

export async function nextTick () {
    await new Promise((resolve) => {
        setTimeout(resolve, 10);
    });
}
