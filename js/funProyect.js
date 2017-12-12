//-----------------------------------------
// guarda botones y su lisener

function addListenerNew(str) {	
	colBotonNuevo.push(document.getElementById(str))	
	colBotonNuevo[val].addEventListener('click', capturarData)
}

function addListenerDel(id, pos) {	
	colBotonNuevo.push(document.getElementById(id))
	colBotonNuevo[pos].addEventListener('click', eliminarData)
}

function addListenerEdt(id, pos) {
	colBotonNuevo.push(document.getElementById(id))
	colBotonNuevo[pos].addEventListener('click', editarData)
}

//-----------------------------------------
// Busca datos

function search(ev) {
	let val = buscar(ev.path[1].childNodes[1].value)
	
	if (posicion == 0) {
		posicion == 0
	} else if (posicion > 1) {
		ev.path[2].children[posicion].classList.remove("encontro")
	}

	if( val == -1) {
		alert('No existe')
	} else {
		ev.path[2].children[val+2].classList.add("encontro")
	}	
	posicion = val+2
}

function buscar(cont) {
	function indexCon(i) {
		let nombre = i.nombre.toLowerCase()
		let contacto = cont.toLowerCase()
		return nombre == contacto
	} 	 
	return coleccionCont.findIndex(indexCon)
}

//-----------------------------------------
// Elimina datos

function eliminarData(ev) {
	let id = (ev.srcElement.id).slice(2)
	id = (id/2) - 1

	delete coleccionCont[id]
	coleccionCont.sort()

	coleccionCont = coleccionCont.slice(0, coleccionCont.length - 1)

	storangeData(coleccionCont)
	ev.path[2].classList.add("ocultar")
}

//-----------------------------------------
// Edita los datos

function editarData(ev) {

	let id = (ev.srcElement.id).slice(2)
	id = (id - 1) / 2

	let nom = preguntaNNom(1)
	let dir = preguntaNDir(2)
	let tel = preguntaNTel(3)

	if(!isNaN(nom) || !isNaN(dir) || tel === "") {
		return console.log("")
	} else {
			console.log(tel)
				coleccionCont[id].nombre = nom
				coleccionCont[id].direccion = dir
				coleccionCont[id].telefono = tel

				storangeData(coleccionCont)
				ev.path[2].innerHTML = `<form class="form uno"><div class="div"><h2 class="h2"><label>Nombre</label></h2><label>${nom}</label></div><div class="div"><h2 class="h2"><label>Dirección</label></h2><label>${dir}</label></div><div class="div"><h2 class="h2"><label>Teléfono</label></h2><label>${tel}</label></div></form><div class="con-boton"><input type="submit" value="Editar" id="ID3" class="boton"><input type="submit" value="Eliminar" id="ID4" class="boton"></div>`
	}	
}

function preguntaNNom(ed) {
	let nom = mensaje(4)
	if ( isNaN(nom) ) {
		return nom	
	} else {
			return alert("Coloque el nombre")	
	}
}

function preguntaNDir(ed) { 
	let dir = mensaje(5)
	if ( isNaN(dir) ) {
		return dir
	} else {
			return alert("No introdujo la direccion")		
	}
}

function preguntaNTel(ed) { 
	let tel = mensaje(6) 
	if ( !isNaN(tel) ) {
		return tel
	} else {
			return alert("Sin numero telefonico")
	}
}

//-----------------------------------------
// Funciones para crear la estructura

const crearEtiqueta = (etq) => document.createElement(etq)

const AgregarA = (father, son) => father.appendChild(son)

const agregarText = (str) => document.createTextNode(str)

//-----------------------------------------
// Nuevo contacto

function newCont(nom, dir, tel) {
	coleccionCont.push( new Agendapp(nom, dir, tel) )
	storangeData(coleccionCont)
} 

function guardarStorage(nom, dir, tel) {
	storangeNom(nom)
	storangeDir(dir) 
	storangeTel(tel)
}

const storangeData = (data) => localStorage['cont']=JSON.stringify(data)

//-----------------------------------------
//captura data

function capturarData() {

	let nom = preguntaNom()
	let dir = preguntaDir()
	let tel = preguntaTel()

	if( !isNaN(nom) || !isNaN(dir) || isNaN(tel) ) {
		return console.log("")
	} else {
			newCont(nom, dir, tel)
			crearEstructura(nom, dir, tel)
			backUp()		
	}
}

function preguntaNom() {
	let nom = mensaje(1)
	if ( isNaN(nom) ) {
			return nom	
	} else {
			return alert("Coloque el nombre")	
	}
}

function preguntaDir() { 
	let dir = mensaje(2)
	if ( isNaN(dir) ) {
			return dir
	} else {
			return alert("No introdujo la direccion")		
	}
}

function preguntaTel() { 
	let tel = mensaje(3)
	 if ( !isNaN(tel) ) {
			return tel
	} else {
		return alert("Sin numero telefonico")
	}
}

//-----------------------------------------
//mostrar datos en la agenda


const backUp = () => coleccionCont = JSON.parse(localStorage['cont'])

function mostrarData() {
	if (coleccionCont.length == 0) {
		console.log("sin datos")
	} else if (coleccionCont.length >= 0) {
		backUp()

		.map(function(i) {
			crearEstructura(i.nombre, i.direccion, i.telefono)
		})
	}	
}

//-----------------------------------------
// mensajes

function mensaje(val) {
	if(val == 1) {
		 return prompt("¿Nombre?")
	} else if (val == 2) {
			return prompt("¿Direccion?")
	} else if (val == 3) {
			return prompt("¿Telefono?")
	} else if (val == 4) {
			return prompt("Nuevo nombre")
	} else if (val == 5) {
			return prompt("Nueva direccion")
	} else if (val == 6) {
			return prompt("Nuevo telefono")
	}
}

//-----------------------------------------
//Estructura HTML

function crearEstructura(nom, dir, tel) {
	let conDiv = crearEtiqueta("DIV")
	conDiv.classList.add("part", "uno") 

	let $form = crearEtiqueta("FORM")
	$form.classList.add("form", "uno")
	AgregarA(conDiv, $form)

	let conBt =  crearEtiqueta("DIV")
	conBt.classList.add("con-boton")
	AgregarA(conDiv, conBt)

//-----------------------------------------
// Crear boton editar

	val++	
	let $botonEdit = crearEtiqueta("INPUT")
	$botonEdit.type = "submit"
	$botonEdit.value = "Editar"
	$botonEdit.id = "ID" + val
	let posEdit = val
	$botonEdit.classList.add("boton")
	AgregarA(conBt, $botonEdit)
	 
//-----------------------------------------
	// crear boton eliminar

 	val++	
	let $botonElim = crearEtiqueta("INPUT")
	$botonElim.type = "submit"
	$botonElim.value = "Eliminar"
	$botonElim.id = "ID" + val
	let posElim = val
	$botonElim.classList.add("boton")
	AgregarA(conBt, $botonElim)

//-----------------------------------------
// crear div para los labels de nombre, direccion y telefono

	let $conLabel = crearEtiqueta("DIV")
	AgregarA($form, $conLabel)
	$conLabel.classList.add("div")

	let $conLabel1 = crearEtiqueta("DIV")
	AgregarA($form, $conLabel1)
	$conLabel1.classList.add("div")

	let $conLabel2 = crearEtiqueta("DIV")
	AgregarA($form, $conLabel2)
	$conLabel2.classList.add("div")

//-----------------------------------------
//crear etiqueta H2

	let $h2 = crearEtiqueta("H2")
	AgregarA($conLabel, $h2)
	$h2.classList.add("h2")

	let $h21 = crearEtiqueta("H2")
	AgregarA($conLabel1, $h21)
	$h21.classList.add("h2")

	let $h22 = crearEtiqueta("H2")
	AgregarA($conLabel2, $h22)
	$h22.classList.add("h2")

//-----------------------------------------
// crear labels de nombre, direccion y telefono

	let $nom = crearEtiqueta("LABEL")
	AgregarA($h2, $nom)
	AgregarA( $nom, agregarText("Nombre") )	

	let $dir = crearEtiqueta("LABEL")
	AgregarA($h21, $dir)
	AgregarA( $dir, agregarText("Dirección") )	

	let $tel = crearEtiqueta("LABEL")
	AgregarA($h22, $tel)
	AgregarA($tel, agregarText("Teléfono"))

//-----------------------------------------
// crear labels de respuesta

	let $mostrarNom = crearEtiqueta("LABEL")
	AgregarA($conLabel, $mostrarNom)
	AgregarA( $mostrarNom, agregarText(nom) )

	let $mostrarDir = crearEtiqueta("LABEL")
	AgregarA($conLabel1, $mostrarDir)
	AgregarA( $mostrarDir, agregarText(dir) )
	
	let $mostrarTel = crearEtiqueta("LABEL")
	AgregarA($conLabel2, $mostrarTel)
	AgregarA( $mostrarTel, agregarText(tel) )

//-----------------------------------------

	document.getElementById("form").appendChild(conDiv);	

	addListenerEdt($botonEdit.id, posEdit)
	addListenerDel($botonElim.id, posElim)
}
