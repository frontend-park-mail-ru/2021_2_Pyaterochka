/** @module частичное обновление DOM дерева */

/**
 * Заменяет старый элемент DOM на актуальный
 *
 * @param {Element | Text} oldDom Элемент DOM, требующий замены
 * @param {Element | Text} newDom Актуальный элемент DOM
 * @returns {Element | Text}  Актуальный элемент DOM
 */
function replace (oldDom, newDom) {
    oldDom.replaceWith(newDom);
    return newDom;
}

/**
 * Ищет разницу в новом и старом деревьях DOM и применяет изменения
 * к старому дереву
 *
 * @param {Element | Text} oldDom Элемент DOM, требующий обновления
 * @param {Element | Text} newDom Актуальный элемент DOM
 * @returns {Element | Text} Измененный или замененный элемент DOM
 */
function patchDom (oldDom, newDom) {
    if (oldDom instanceof Element && newDom instanceof Element) {
        if (!oldDom.parentNode) {
            console.warn('Old dom has not parent!', oldDom);
        }
        if (oldDom.tagName !== newDom.tagName) {
            return replace(oldDom, newDom);
        }
        attributesPatch(oldDom, newDom);
        childrenPatch(oldDom, newDom);
        return oldDom;
    }
    if (oldDom instanceof Text && newDom instanceof Text) {
        if (oldDom.textContent !== newDom.textContent) {
            oldDom.textContent = newDom.textContent;
        }
        return oldDom;
    }
    return replace(oldDom, newDom);
}

/**
 * Ищет разницу в новых и старых атрибутах элементов DOM и применяет
 * изменения к старому элемент
 *
 * @param {Element | Text} oldDom Элемент DOM, требующий обновления
 * @param {Element | Text} newDom Актуальный элемент DOM
 */
function attributesPatch (oldDom, newDom) {
    const oldKeys = oldDom.getAttributeNames();
    const newKeys = newDom.getAttributeNames();

    newKeys.forEach(key => {
        const newAttr = newDom.getAttribute(key);
        const oldAttr = oldDom.getAttribute(key);
        if (newAttr !== oldAttr) {
            oldDom.setAttribute(key, newDom.getAttribute(key));
        }
    });

    const removedKeys = oldKeys.filter(key => !newKeys.includes(key));
    removedKeys.forEach(key => {
        oldDom.removeAttribute(key);
    });
}

/**
 * Ищет изменения в дочерних узлах нового и старого элементов DOM и
 * применяет изменения дочерних узлов нового элемента к дочерним
 * узлам старого дерева
 *
 * @param {Element | Text} oldDom Элемент DOM, требующий обновления
 * @param {Element | Text} newDom Актуальный элемент DOM
 */
function childrenPatch (oldDom, newDom) {
    const oldChildren = Array(...oldDom.childNodes);
    const newChildren = Array(...newDom.childNodes);

    const minI = Math.min(oldChildren.length, newChildren.length);

    for (let i = 0; i < minI; ++i) {
        patchDom(oldChildren[i], newChildren[i]);
    }

    if (oldChildren.length >= newChildren.length) {
        oldChildren.slice(minI).forEach((el) => {
            el.remove();
        });
        return;
    }
    newChildren.slice(minI).forEach((el) => {
        oldDom.appendChild(el);
    });
}

export default patchDom;
