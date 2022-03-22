class UnaPersona {
  constructor(edad = 10) {
    this.edad = edad
  }

  info() {
    return `Edad: ${this.edad}`
  }
}

const ninio = new UnaPersona(18)

console.log(ninio.info());

console.log('Hola')