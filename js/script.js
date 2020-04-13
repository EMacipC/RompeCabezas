var cell=document.getElementById("cell");
var piezas=document.getElementById("piezas");
var dialogo=document.getElementById("dialogo")
var selectedPiece=null;
var b=dialogo.children[2];

document.addEventListener("dragstart", function(event){
	event.dataTransfer.setData("Text", event.target.id);
	console.log("drag start");
});
document.addEventListener("dragover", function(event) {
  event.preventDefault();
});
document.addEventListener("drop", function(event) {
  event.preventDefault();
  if ( event.target.className == "droptarget" ) {
    var data = event.dataTransfer.getData("Text");
    event.target.appendChild(document.getElementById(data));
  }
});
document.onkeypress= keypress;
crearTab();
crearPiece();
b.onclick=reinciar;
function crearCeldas(width,height,position){
	
	let cas = document.createElement("div");
	cas.style.width=width;
	cas.style.height=height;
	cas.style.border="1px solid";
	cas.dataset.position=position;
	cas.onclick=clickcell;
	cas.className="droptarget";
	return cas;
}

function crearPie(width,height,piec,position){
	var cellElement=document.createElement("div");
	var piece =document.createElement("img");

	//Configurando la celda para la pieza dentro de el contenedor de piezas
	cellElement.style.width=width;
	cellElement.style.height= height;
	cellElement.className="droptarget";

	//configurar la pieza dentro del contenedor pieza
	
	piece.width=width;
	piece.height=height;
	piece.style.border="1px solid"
	piece.src=piec.image;
	piece.dataset.position=piec.position;
	piece.onclick=clickPice;
	piece.id=("drag"+position);
	piece.draggable=true;

	//mandar la pieza a la celda
	cellElement.appendChild(piece);
	return cellElement;
}

function GererarRan(){
	var ver=[];
	let contador=0;
	for(let i=0;i<16;i++){
		let provicional=0;
		provicional=Math.floor(Math.random() * 16);
		for(let j=0;j<16;j++){
			if(provicional!=ver[j]||i==0){
				contador++;
			}
		}
		if(contador==16){
			ver.push(provicional);
		}else{i--;}
		contador=0;
	}
	return ver;
}

function crearTab(){
	var width = cell.offsetWidth;
	var height =cell.offsetHeight;

	width=(width/ 4);
	height=(height/ 4);

	for(let i=0; i<16;i++){
		let cas=crearCeldas(width,height,i);
		addCas(cas);
	}
}
function crearPiece(){
	var width = piezas.offsetWidth;
	var height= piezas.offsetHeight;
	width/=4;
	height/=4;
	var pieces =generarPD();
	let ran= GererarRan();
	for(let i=0; i<16;i++){
		let pieceE=crearPie(width,height,pieces[ran[i]],i);
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
		let cel=e.target;
		cel.appendChild(selectedPiece);
	}
	else{
		console.log("seleccione una pieza");
	}
}
function keypress(ke){
	if(ke.keyCode==101||ke.keyCode==69){
		let result=evaluateBoard();
		showDialogo(result);
	}

}
function showDialogo(result){
	var imgE=dialogo.children[0];
	var textC=dialogo.children[1];
	if(result){
		dialogo.style.background="green"
		imgE.src="";
		textC.innerText="¡¡Ganaste!!";
	}
	else{
		dialogo.style.background="red"
		imgE.src="";
		textC.innerText="¡¡Perdiste!!";
		
	}
	dialogo.style.display="block";
}
function evaluateBoard(){
	var cells =cell.children;
	for(cel of cells){
		let piecee=cel.children[0];
		if(piecee.dataset.position!=cel.dataset.position){
			return false;
		}

	}
	return true;
}
function returnPieces(){

	let cells =cell.children;
	let cellPieces= piezas.children;
	let ran=GererarRan();
	let i=-1;
	for(cel of cells){
		i++;
		let piece=cel.children[0];
		piezas.children[ran[i]].appendChild(piece);
	}
}
function reinciar(){
	dialogo.style.display="none";
	returnPieces();
}