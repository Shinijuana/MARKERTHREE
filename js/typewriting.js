AFRAME.registerComponent('typewriting', {
    schema: {
      value: {type: 'string'},
      speed: {type: 'number', default: 10},
    },
    init() {
      this.typewriterEffect = this.typewriterEffect.bind(this)
    },
    update(oldData) {
      if (oldData.value !== this.data.value) {
        this.typewriterEffect()
      }
    },
    typewriterEffect() {
      const element = this.el
      const text = this.data.value
      const {speed} = this.data
  
      let index = 0
      element.setAttribute('value', '')
  
      const type = () => {
        if (index < text.length) {
          element.setAttribute('value', element.getAttribute('value') + text.charAt(index))
          index++
          setTimeout(type, speed)
        }
      }
  
      type()
    },
  })