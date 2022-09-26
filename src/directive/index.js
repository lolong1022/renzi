export const imgerror = {
  inserted(el, binding, vnode) {
    console.log(el)
    console.log(binding)
    console.log(vnode)
    el.onerror = () => {
      el.src = binding.value
    }
  }
}
