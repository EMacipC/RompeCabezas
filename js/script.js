var cell=document.getElementById("cell");
var piezas=document.getElementById("piezas");
var selectedPiece=null;
crearTab();
crearPiece();

function crearCeldas(width,height){
	
	let cas = document.createElement("div");
	cas.style.width=width;
	cas.style.height=height;
	cas.style.border="1px solid";
	cas.onclick=clickcell;
	return cas;
}
function crearPie(width,height,piec){
	var cellElement=document.createElement("div");
	var piece =document.createElement("img");

	//Configurando la celda para la pieza dentro de el contenedor de piezas
	cellElement.style.width=width;
	cellElement.style.height= height;

	//configurar la pieza dentro del contenedor pieza
	piece.width=width;
	piece.height=height;
	piece.style.border="1px solid"
	piece.src=piec.image;
	piece.onclick=clickPice;

	//mandar la pieza a la celda
	cellElement.appendChild(piece);
	return cellElement;
}

function crearTab(){
	var width = cell.offsetWidth;
	var height =cell.offsetHeight;

	width=(width/ 4);
	height=(height/ 4);

	for(let i=0; i<16;i++){
		let cas=crearCeldas(width,height);
		addCas(cas);
	}
}
function crearPiece(){
	var width = piezas.offsetWidth;
	var height= piezas.offsetHeight;
	width/=4;
	height/=4;
	var pieces =generarPD();
	for(let i=0;i<16;i++){
		let pieceE=crearPie(width,height,pieces[i]);
		addPiece(pieceE);
	}

}
function addCas(element){
	cell.appendChild(element);
}
function addPiece(element){
	piezas.appendChild(element)
}
function generarPD(){
	//generamos una lista de piezas
	var pieces=[];
	for(let i=0;i<16;i++){
		let piece={
		image:"img/"+(i+1)+".jpg",
		position:i
		};
		pieces.push(piece);
	}
	return pieces;
}
function clickPice(e){
	var pieceE =e.target;
	selectedPiece=pieceE;
}
function clickcell(e){
	if(selectedPiece){
		let cell=e.target;
		cell.appendChild(selectedPiece);
	}
	else{
		console.log("seleccione una pieza");
	}
}