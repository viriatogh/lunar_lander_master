
//ENTORNO
var g = 1.622;
var dt = 0.016683;
var timer = null;
var timerFuel = null;
//NAVE
var y = 10; // altura inicial y0=10%, debe leerse al iniciar si queremos que tenga alturas diferentes dependiendo del dispositivo
var v = 0;
var c = 100;
var a = g; //la aceleración cambia cuando se enciende el motor de a=g a a=-g (simplificado)
//MARCADORES
var velocidad = null;
var altura = null;
var combustible = null;
var visible = false;
var landing = false;
var msg="LE COMUNICAMOS QUE TODA SU TRIPULACIÓN HA PERECIDO";
var deviceWidth = window.innerWidth;


//al cargar por completo la página...
window.onload = function(){
	
	velocidad = document.getElementById("velocidad");
	altura = document.getElementById("altura");
	combustible = document.getElementById("fuel");

	
	//definición de eventos
	//mostrar menú móvil
    	document.getElementById("showm").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "block";
		motorOff();
		stop();
	}
	//ocultar menú móvil
	document.getElementById("hidem").onclick = function () {
		document.getElementsByClassName("c")[0].style.display = "none";
		start();
	}
	//encender/apagar el motor al hacer click en la pantalla
	document.onclick = function () {
 	  if (a==g){
  		motorOn()
 	  } else {
  		motorOff();
 	  }
	}
	//encender/apagar al apretar/soltar una tecla
	document.onkeyup = function (e) {
		if (e.keyCode == 32) {
			motorOff();
		}
	}
	document.onkeydown = function (e) {
		if (e.keyCode == 32) {
			motorOn();
		}
	}
	//Empezar a mover la nave justo después de cargar la página
	start();
}

//Definición de funciones

function reiniciar() {
	if (confirm("El juego se perdera y tendras que empezar de nuevo ?")) {
		location.href = "./index.html"
	}
}

function estadonave() {
	if (v <= 5) {
		document.getElementById("Nave").src = 'img/nave.png';
		msg="BUEN VUELO, HAS ATERRIZADO CON ÉXITO";
		window.alert(msg)
	} else {
		document.getElementById("Nave").src = 'img/boom.gif';
		window.alert(msg);
	}
}

function start(){
	//cada intervalo de tiempo mueve la nave
	timer=setInterval(function(){ moverNave(); }, dt*1000);
}

function stop(){
	clearInterval(timer);
}

function moverNave(){
	//cambiar velocidad y posicion
	v +=a*dt;
	y +=v*dt;
	//actualizar marcadores
	velocidad.innerHTML=v.toFixed(2);
	altura.innerHTML=y.toFixed(2);
	
	//mover hasta que top sea un 70% de la pantalla
	if (y<70){ 
		document.getElementById("nave").style.top = y+"%"; 
	} else {
		landing = true;
		stop();
		estadonave();
	}
}

function motorOn() {
	if (c <= 0) {
		motorOff()
	} else {
		if (landing) {
		motorOff()
	} else  {
		if (!visible) {
			document.getElementById("Nave").src = './img/nave2.png';
		//el motor da aceleración a la nave
		a = -g;
		//mientras el motor esté activado gasta combustible
		if (timerFuel == null) {
			timerFuel = setInterval(function () {
			actualizarFuel();
			}, 10);
		}
		}
	}
	}
}

function motorOff() {
	a = g;
	clearInterval(timerFuel);
	timerFuel = null;
	if (!landing) {
		document.getElementById("Nave").src = 'img/nave.png'
	}
}

function actualizarFuel(){
	//Restamos combustible hasta que se agota
	c -=0.1;
	if (c <= 0 ) {
		motorOff();
		c=0;
	}
		combustible.innerHTML=c.toFixed(2);
}
