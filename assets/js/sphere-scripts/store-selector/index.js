/* *********
Este módulo mueve el store selector hacia el pie
de las shipping options
********** */
const moveStoreSelector = (storeSelector, shippingOptions) => {
  if (!storeSelector && !shippingOptions) return
  const item = document.createElement('li')
  item.appendChild(storeSelector)
  shippingOptions.appendChild(item)
}

/* *********
Este módulo elimina el texto (Opcional) del título
********** */
const updateTitle = storeSelector => {
  if (!storeSelector) return

  const optionalText = storeSelector.querySelector('.optimizedCheckout-contentSecondary')

  if (optionalText) {
    optionalText.remove()
  }
}

/* *********
Este módulo es un obsevador permanente del DOM
y tiene como objetivo revisar si las shipping
options y el store selector están presentes. En
caso sea así, se modifican estos elementos.
********** */

const observer = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    const storeSelector = document.querySelector('.dynamic-form-field.dynamic-form-field--field_52')
    const shippingOptions = document.querySelector('#checkout-shipping-options ul.form-checklist')

    console.log('Hello')
    if (storeSelector && shippingOptions) {
      updateTitle(storeSelector)
      safeDOMUpdate(() => moveStoreSelector(storeSelector, shippingOptions))
    }
  })
})

// Observa cambios en todo el body
observer.observe(document.body, { childList: true, subtree: true })

/* *********
Este módulo desconecta temporalmente el observador
para realizar modificaciones seguras en el DOM y
luego lo reactiva, evitando bucles de observación.
********** */
const safeDOMUpdate = func => {
  observer.disconnect()
  func()
  observer.observe(document.body, { childList: true, subtree: true })
}
