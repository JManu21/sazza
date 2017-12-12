
let val = 0 //contador
let coleccionCont = [] // coleccion contactos

let colBotonNuevo = [] // coleccion botones
let posicion = 0 // guarda la posicion del contacto encontrado

let $botonSearch = document.getElementById('boton-uno') // lisener boton buscar
$botonSearch.addEventListener('click', search)

addListenerNew('boton-ctr') // agregar lisener al boton new 

//-----------------------------------------
// guarda data y crea nueva instancia del contacto

class Agendapp {
	constructor(nom, dir, tel) {
		this.nombre = nom
		this.direccion = dir
		this.telefono = tel
	}
}

backUp()
mostrarData()