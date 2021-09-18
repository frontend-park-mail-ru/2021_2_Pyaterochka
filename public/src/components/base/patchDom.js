function replace (oldDom, newDom) {
    oldDom.replaceWith(newDom)
    return newDom
}
function patchDom (oldDom, newDom) {
    if (oldDom instanceof Element && newDom instanceof Element) {
        if (!oldDom.parentNode) {
            console.warn('Old dom has not parent!', oldDom)
        }
        if (oldDom.tagName !== newDom.tagName) {
            return replace(oldDom, newDom)
        }
        attributesPatch(oldDom, newDom)
        childrenPatch(oldDom, newDom)
        return oldDom
    }
    if (oldDom instanceof Text && newDom instanceof Text) {
        oldDom.textContent = newDom.textContent
        return oldDom
    }
    return replace(oldDom, newDom)
}

function attributesPatch (oldDom = document.createElement(), newDom) {
    const oldKeys = oldDom.getAttributeNames()
    const newKeys = newDom.getAttributeNames()

    newKeys.forEach(key => {
        oldDom.setAttribute(key, newDom.getAttribute(key))
    })

    const removedKeys = oldKeys.filter(key => !newKeys.includes(key))
    removedKeys.forEach(key => {
        oldDom.removeAttribute(key)
    })
}

function childrenPatch (oldDom, newDom) {
    const oldChildren = Array(...oldDom.childNodes)
    const newChildren = Array(...newDom.childNodes)

    const minI = Math.min(oldChildren.length, newChildren.length)

    for (let i = 0; i < minI; ++i) {
        patchDom(oldChildren[i], newChildren[i])
    }

    if (oldChildren.length >= newChildren.length) {
        oldChildren.slice(minI).forEach((el) => {
            el.remove()
        })
        return
    }
    newChildren.slice(minI).forEach((el) => {
        oldDom.appendChild(el)
    })
}

export default patchDom
