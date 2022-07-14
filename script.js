/* 
El proyecto pretende hacer un simulador de Black Jack, mediante el uso de JavaScript, HTML y Sass. 
Hasta el momento el simulador permite:

    -  Permite que el usuario ingrese un monto de dinero, mediante un simulador de tarjeta de crédito, si no lo desea puede jugar gratis
    -  Realice una apuesta de 5, 10, 25 o 50
    -  Entrega cartas al jugador y al crupier
    -  Permite que el usuario pida cartas
    -  Permite que el usuario Doble la apuesta
    -  Permite plantarse, y si el puntaje es menor a 21 jugara el crupier
    -  Se decide si gana o pierde la casa , y por lo tanto sube el saldo del jugador o es restado.
    -  Permite que el jugador vuelva a apostar
*/



const palos = ["♠︎ ","♣︎","♥︎","♦︎"];
let barajaOriginal=[];

class cartas{
	constructor(numero, palo){
		this.numero = numero;
        this.palo = palo;
    }
    preguntarPalo(){
        console.log(this.numero + palos[this.palo]);
    }
}

//Funcion que genera N cantidad de baraja de cartas, con su correspondiente numero y palo, devuelve array con el mazo
function generarMazo(baraja, cantidadDeMazos){
    // genera Z mazos de cartas
    for(let z=0; z<cantidadDeMazos; z++){
        for(let j=0; j<4; j++){
            for(let i=1; i<14; i++) {
                let carta = new cartas(i,j);
                barajaOriginal.push(carta);
                //carta.preguntarPalo(this);
            }
        }
    }
   
        
    // mezcla N mazos de cartas
    while(barajaOriginal.length>0){
        let pos = parseInt(Math.random()*(barajaOriginal.length)) ;
        baraja.push(barajaOriginal[pos]);        
        barajaOriginal.splice(pos,1);
    }
    // imprime la baraja generada

    /*for(let i=0 ; i<baraja.length ; i++){
        baraja[i].preguntarPalo(this);
    }*/
    
}
// Funcion que entrega N cantidad de cartas a quien se la solicite, devuelve un arrat con als cartas
function pedirCartas(cantidad, baraja,cartasJugador){
    for(let i=0; i<cantidad; i++){
        cartasJugador.push(baraja[i]);
    }
    return cartasJugador;
}
// Suma los puntos de las cartas que se le paso como parametro, devulve el puntaje entero
function sumarPuntos(cartasJugador){
    let puntos=0;
    // Busca las cartas que no son ASES y suma el valor de la carta al puntaje
    for(let i = 0 ; i<cartasJugador.length; i++){
        if(cartasJugador[i].numero>=2){
            cartasJugador[i].numero>=10 ? puntos+=10 : puntos+=cartasJugador[i].numero;   
        }
    }
    // Busca las cartas que son ASES y suma 11 si al sumar la carta el puntaje es 
    // menor a 21 , en caso contrario suma 1
    for(let i = 0 ; i<cartasJugador.length; i++){
        if(cartasJugador[i].numero==1){
            (puntos+11 <= 21)? puntos+=11: puntos++;
        }
    }
    return puntos;
};
//Funcion que controla cuando juega el jugador 
function juegaJugador(mazo, cartasJugador){
    let cant;
    let puntosActual=0;
    
    if(cartasJugador.length==0){
        // Entrega dos cartas para iniciar a jugar
        cartasJugador = pedirCartas(2, mazo, cartasJugador);
        //elimina del mazo la cartas usadas
        for(let i=0; i<2; i++){
            mazo.shift();
        }
    }
    else{
        //Partida ya en curso
        cartasJugador = pedirCartas(1, mazo, cartasJugador);
        //elimina del mazo la cartas usadas
        mazo.shift();
    }
    puntosActual = sumarPuntos(cartasJugador);
    return cartasJugador;
}
//Funcion que controla cuando juega el crupier
function juegaCrupier(mazo, cartasCrupier, puntosJugador){
    let cant;
    let puntosCrupier=0;
    if(cartasCrupier.length==0){
         // Entrega dos cartas para iniciar a jugar
         cartasCrupier = pedirCartas(1, mazo, cartasCrupier);   
        //elimina del mazo la cartas usadas    
        mazo.shift();
        return cartasCrupier;
    }
    puntosCrupier = sumarPuntos(cartasCrupier);  
    // Si el puntaje es menor a 21 pregunta al jugador si quiere plantarse o pide carta
    if(puntosCrupier<puntosJugador){
        while(puntosCrupier<17 && puntosCrupier<puntosJugador){
            cartasCrupier = pedirCartas(1, mazo, cartasCrupier);
            //elimina del mazo la cartas usadas
            mazo.shift();      
            puntosCrupier = sumarPuntos(cartasCrupier);
            // Soluciona el problema de que el crupier sume 17 con un AS entre sus cartas
            cartasCrupier.forEach ( (carta)=>{
                if(puntosCrupier < puntosJugador && puntosCrupier>=17 && carta.numero==1){
                    cartasCrupier = pedirCartas(1, mazo, cartasCrupier);
                    mazo.shift();
                    puntosCrupier = sumarPuntos(cartasCrupier);
                }
            });                      
        }
     }
    return cartasCrupier;
}
//Decide quien gana y muestra en pantalla el cartel del resultado
//   retorna 1 si Gana la casa 
//   retorna 2 si pierde la casa 
//   retorna 3 si es empate
function eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde){
    if(puntosJugador<=21){
        if(puntosCrupier<=21){
            if(puntosCrupier>puntosJugador){
                cartelGanaPierde.className="CartelGanaPierde CartelGana";
                return 1;
            }
            if(puntosCrupier<puntosJugador){
                cartelGanaPierde.className="CartelGanaPierde CartelPierde";
                return 2;
            }
            if(puntosCrupier===puntosJugador){
                cartelGanaPierde.className="CartelGanaPierde CartelEmpate";
                return 3;
            }
        }
        else{
            cartelGanaPierde.className="CartelGanaPierde CartelPierde";
            return 2;
        }
    }
    else{
        cartelGanaPierde.className="CartelGanaPierde CartelGana";
        return 1;
    }
        
}
// La funcion realiza:
//     Revisa si hay que crear nuevos espacios para cartas (DIV)
//     Actualiza las cartas en pantalla
//     Borra los espacios extras al reiniciar una partida (Borra los DIVS creados)
function actualizaCartas(mazoJugador,cartasCrupier,reiniciar, juegaCrupier){
    let figuraCrupier =[];
    let figuraJugador =[];
    let j=1;
    figuraCrupier=document.getElementsByClassName("cartaCrup"); 
    figuraJugador=document.getElementsByClassName("cartaJug"); 
    // Revisa si la cantidad de cartas en la pantalla ("CANTIDAD DE DIVS") es mayor a la cantidad de 
    // cartas por mazo de jugador y crupier. Si la CANT es menor se crea nuevos divs
    if(figuraJugador.length < mazoJugador.length || figuraCrupier.length < cartasCrupier.length){
        if(figuraJugador.length < mazoJugador.length ){
            const cartaNueva = document.getElementById("divMesaJugador");
            let modeloCarta = document.createElement("div");
            modeloCarta.className = "col  m-3 "; 
            modeloCarta.innerHTML = ` <div class="carta cartaJug" >
                                      </div>
                                     `;
            cartaNueva.appendChild(modeloCarta);
        }
        if(figuraCrupier.length < cartasCrupier.length){
            const repe = cartasCrupier.length-figuraCrupier.length
            
            for(let i=0; i< repe ; i++) {
                let cartaNueva = document.getElementById("divMesaCrup");
                let modeloCarta = document.createElement("div");
                modeloCarta.className = "col  m-3 "; 
                modeloCarta.innerHTML = ` <div class="carta cartaCrup" >
                                        </div>
                                        `;                    
                cartaNueva.appendChild(modeloCarta);
            }
                
        }
    }
    // Pregunta si el usuario apreto el boton Reiniciar 
    // reiniciar = 0 actualiza las cartas en tablero
    // reiniciar = 1 borra las cartas del tablero y devuelve la cantidad de figuras de cartas a 4 para el jugador y el crupier
    // Cada vez que se llama a mueveCarta se le envian los siguientes parametros:
    // mueveCartas(nodoCarta,X,Y,Z,rotate_X,rotate_Y,time)
    //             CartaAMover: nodoCarta
    //             X: vector ofset en X
    //             Y: vector ofset en Y
    //             Z: vector ofset en Z
    //             rotate_X: vector rotate_X
    //             rotate_Y: vector rotate_Y
    //             time: tiempo de duracion de la animacion
    if(reiniciar==0){
        if(mazoJugador.length == 2 && cartasCrupier.length == 1){
            figuraJugador[0].className = "carta cartaJug" + " "+"cart"+mazoJugador[0].numero+"-"+mazoJugador[0].palo;
            mueveCartas(figuraJugador[0],[0, 100],[-1000, 0],[0,0],[0,0],[0,0],500);
            figuraJugador[1].className = "carta cartaJug" + " "+"cart"+mazoJugador[1].numero+"-"+mazoJugador[1].palo; 
            mueveCartas(figuraJugador[1],[0, -50],[-1000, 0],[0,0],[0,0],[0,0],500); 
        }
        else if(cartasCrupier.length == 1){
            const num = mazoJugador.length - 1;
            figuraJugador[num].className = "carta cartaJug" + " "+"cart"+mazoJugador[num].numero+"-"+mazoJugador[num].palo; 
            mueveCartas(figuraJugador[num],[0, -num*100*1.1],[-1000, 0],[0,0],[0,0],[0,0],500);
        }
        const num = cartasCrupier.length;
        for (let i = 1; i < num; i++) {
            figuraCrupier[i].className = "carta cartaCrup" + " "+"cart"+cartasCrupier[i].numero+"-"+cartasCrupier[i].palo;      
            i==1? mueveCartas(figuraCrupier[i],[0, -50],[0, 0],[0,0],[0, 180],[0, 180],300) :
                  mueveCartas(figuraCrupier[i],[0, -i*100*1.1],[-1000, 0],[0,0],[0,0],[0,0],500+i*100);
        }
        if(cartasCrupier.length==1 && juegaCrupier == 1){
            figuraCrupier[0].className = "carta cartaCrup" + " "+"cart"+cartasCrupier[0].numero+"-"+cartasCrupier[0].palo;
            mueveCartas(figuraCrupier[0],[0, 100],[-1000, 0],[0,0],[0,0],[0,0],500); 	
            figuraCrupier[1].className = "carta cartaCrup"+ " "+"backCarta";
            mueveCartas(figuraCrupier[1],[0, -50],[-1000, 0],[0,0],[0,0],[0,0],500); 		
        }   
    }
    else{
        const contenedor = document.getElementById("contenedorDeCartas");
        //Devuelve el html al estado inicial
        contenedor.innerHTML= ` <div class="row mesa mesaCrup  " id="divMesaCrup">
                                    <div class="col m-3  ">
                                        <div class="carta cartaCrup" >

                                        </div>
                                    </div>
                                    <div class="col  m-3  ">
                                        <div class="carta cartaCrup" >

                                        </div>
                                    </div>

                                </div>

                                <div class="row mesa mesaJugador " id="divMesaJugador">
                                        <div class="col  m-3  ">
                                            <div class="carta cartaJug" >

                                            </div>
                                        </div>
                                        <div class="col  m-3  ">
                                            <div class="carta cartaJug" >

                                            </div>
                                        </div>
                                        
                                </div>`; 
    }
}
// Funcion que mueve las cartas de una posicion a otra utilizando la libreria Anime.js
function mueveCartas(nodoCarta,X,Y,Z,rotate_X,rotate_Y,time){
    anime({
        targets: nodoCarta,
        translateX: X,
        translateY: Y,
        translateZ: Z,
        rotateX: rotate_X,
        rotateY: rotate_Y,
        easing: 'easeInOutQuad',
        duration: time,
    }) 
}
// La funcion actualiza los carteles de Saldo y Monto apostado
function actualizarMontos(montoApostado,saldoActual){
    if(document.getElementsByClassName("cartel").length == 0){
        const div = document.createElement("div");
        div.className   = "contenedorSaldos";
        const cartelSaldo = document.createElement("h3");
        cartelSaldo.innerHTML = `Saldo actual ${saldoActual}$$`;
        cartelSaldo.className = "cartel";
        cartelSaldo.id = "cartelSaldo";
        const cartelApostando = document.createElement("h3");
        cartelApostando.innerHTML = `Saldo apostado ${montoApostado}$$`;
        cartelApostando.className = "cartel";
        cartelApostando.id = "cartelApostando";
        div.append(cartelSaldo,cartelApostando);
        listaApuestas.append(div); 
    }
    let cartel = document.getElementById("cartelSaldo");
    cartel.innerHTML = `Saldo actual ${saldoActual}$$`;
    cartel = document.getElementById("cartelApostando");
    cartelApostando.innerHTML = `Saldo apostado ${montoApostado}$$`;
}
//Funcion que maneja el localStorage item Saldo
//Si se envida un valor numerico mayor a cero se lo guarda
//si se envia -1 retorna el saldo actual
function saldoLocalStorage(escribe) {
    let saldoActual;
    //Se retorna el saldo actual
    if(escribe == -1){
        saldoActual = localStorage.getItem("saldo");
        if(saldoActual === null){
            saldoActual = 0 ;
            localStorage.setItem("saldo",0);
        }
        else{
            saldoActual = parseInt(localStorage.getItem("saldo"));
        }

        return saldoActual;
    }
    else{
        //Se actualiza el saldo en el localStorage
        localStorage.setItem("saldo",escribe);
    }  
}
//Funcion que administra los ingresos de saldo 
function administrPago(){
    const montoINPUT = document.getElementById("montoDepositar");
    const numeroTarjetaINPUT = document.getElementById("numeroTarjeta");
    const mesINPUT = document.getElementById("MM");
    const añoINUPUT = document.getElementById("YY");
    const ccvINPUT = document.getElementById("CCV");
    const nombreINPUT = document.getElementById("nombreTarjeta");
    const guardarINPUT = document.getElementById("guardarTarjeta");
    const CANCELAR = document.getElementById("botonCancelar");
    const PAGAR = document.getElementById("botonPagar");
    const saldoLABEL = document.getElementById("cartelSaldo");

    PAGAR.onclick = () => {
        if(parseInt(montoINPUT.value)>0){
            //Cartel Confirmar Pago
            Swal.fire({
                title: 'Confirmar Pago',
                text: '¿Deseas confirmar el pago?',
                icon: 'warning',
                confirmButtonText: 'Aceptar',
                showCancelButton: true,
                cancelButtonText: 'Cancelar',
                }).then((result) => {
                    if(result.isConfirmed){
                        Swal.fire('Pago confirmado', '', 'success');
                        const saldoNuevo = saldoLocalStorage(-1) + parseInt(montoINPUT.value);
                        saldoLocalStorage(saldoNuevo);
                        saldoLABEL.innerHTML = `Saldo actual ${saldoNuevo}$$`;
                        montoINPUT.value = "";
                    }
                    else{
                        Swal.fire('Pago cancelado', '', 'error');
                        montoINPUT.value = "";
                    }
                });
        }
        else{
            montoINPUT.value = "";  
            Swal.fire('Pago cancelado', 'El monto ingresado no es valido', 'error');
        }    
    }
    CANCELAR.onclick = () => {
        montoINPUT.value = "";
        numeroTarjetaINPUT.value = "";
        añoINUPUT.value = "";
        mesINPUT.value = "";
        ccvINPUT.value = "";
        nombreINPUT.value = "";
    }
}

let mazo=[];
let cartasCrupier=[];
let cartasJugador=[];


//localStorage.setItem("saldo",100);
// Revisa si tiene saldo anterior, sino lo pone en 0
saldoLocalStorage(-1);
// -----------------BUSCA LOS ELEMENTOS DEL DOM QUE SE ALTERAN DURANTE EL JUEGO---------------------------------------------------

const botonPedir=document.getElementById("pedir");
const botonDoblar=document.getElementById("doblar");
const botonPlantarse=document.getElementById("plantarse");
const botonReiniciar=document.getElementById("reiniciar");
const cartelGanaPierde=document.getElementById("GanaPierde");
const menuDeApuestas = document.getElementById("listaApuestas");
const menuDeBotones = document.getElementById("listaDeBotones");
const cartelCargarDinero = document.getElementById("credit-card-div");
const mesaDeApuestas = document.getElementById("mesaDeApuestas");
const mesaDeJuego = document.getElementById("mesaDeJuego");
// ------------------INICIALIZA VARIABLES----------------------------------------------
const cantidadDeMazos = 1;
let puntosJugador=0;
let puntosCrupier=0; 
let ganador;
let montoApostado=0;
let cantidadDeSaldosPagar=2;

// ------------------Crea la lista botones de apuestas (MONEDAS)----------------------------------------------
//Muestra las apuestas y espera la seleccion
const apuestas = [5,10,25,50,-5,-10,-25,-50];
const listaApuestas = document.getElementById("listaApuestas");
apuestas.forEach( (apuesta) => {
    const botonApuesta = document.createElement("button");
    botonApuesta.innerHTML = apuesta;
    botonApuesta.className = "botonApuesta";
    listaApuestas.appendChild(botonApuesta); 
    botonApuesta.onclick = () => {
        if(montoApostado+apuesta>=0 && saldoLocalStorage(-1)-apuesta>=0) {
            montoApostado+=apuesta;
            saldoLocalStorage(saldoLocalStorage(-1)-apuesta); 
            actualizarMontos(montoApostado,saldoLocalStorage(-1))
        }
    }
}); 
actualizarMontos(montoApostado,saldoLocalStorage(-1));
const botonApostar = document.createElement('button');
botonApostar.innerHTML = 'Apostar';
botonApostar.className = "botonApostar btn btn-danger";
listaApuestas.appendChild(botonApostar);
botonApostar.onclick = () => { 
    mesaDeApuestas.className = " MesaDeApuestas container d-none ";
    mesaDeJuego.className = " container-fluid MesaDeJuego";
}
// GENERNERA LOS EVENT LISTENER DE LOS PAGOS
administrPago();

//-----------------------APARTIR DE ACA INICIA LAS PARTIDAS--------------------------------------------------
generarMazo(mazo, cantidadDeMazos);
cartasCrupier = juegaCrupier(mazo, cartasCrupier,puntosJugador);

//Boton de pedir (solo funciona si el jugador no a tocado el boton de plantarse)
botonPedir.onclick = () => {
    if(cartasCrupier.length==1){
        puntosJugador=sumarPuntos(cartasJugador);
        if(puntosJugador<21){
            cartasJugador = juegaJugador(mazo, cartasJugador);
            actualizaCartas(cartasJugador,cartasCrupier,0,0);
            if(cartasJugador.length==2)
                actualizaCartas(cartasJugador,cartasCrupier,0,1);
            puntosJugador=sumarPuntos(cartasJugador);
            if(puntosJugador>21){
                ganador = eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde);
            }
        }      
    }
}
//Boton de doblar (solo funciona si el jugador no a tocado el boton de plantarse)
botonDoblar.onclick = () => {
    if(cartasJugador.length>0 && cartasCrupier.length==1){
        if(puntosJugador<21 && saldoLocalStorage(-1)>=montoApostado){
            cantidadDeSaldosPagar+=2;
            saldoLocalStorage(saldoLocalStorage(-1)-montoApostado);
            actualizarMontos(montoApostado,saldoLocalStorage(-1));
            juegaJugador(mazo, cartasJugador);
            actualizaCartas(cartasJugador,cartasCrupier,0,0);
            puntosJugador=sumarPuntos(cartasJugador);
            puntosJugador > 21 ? ganador = eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde) : botonPlantarse.onclick();
        }
        else{
            Swal.fire('Saldo insuficiente', '', 'error');
        }
    }

}
    
//Boton de plantarse (solo funciona si el jugador a jugado al menos una vez)
botonPlantarse.onclick = () => {
    if(cartasJugador.length>0 && cartasCrupier.length==1){
        if(puntosJugador<=21 ){
            puntosJugador=sumarPuntos(cartasJugador);
            cartasCrupier = juegaCrupier(mazo, cartasCrupier,puntosJugador);
            puntosCrupier = sumarPuntos(cartasCrupier);
            actualizaCartas(cartasJugador,cartasCrupier,0,1);
            ganador = eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde);      
        }
        else{
            ganador = eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde);
        }
    }        
}
//boton de reiniciar partida (solo funciona si la partida fue terminada)
botonReiniciar.onclick = () => {
    if(ganador===1||ganador===2||ganador===3){
        switch(ganador){
            //GANA LA CASA
            case 1:
                break;
            //PIERDE LA CASA
            case 2:
                saldoLocalStorage(saldoLocalStorage(-1)+ cantidadDeSaldosPagar * montoApostado);
                break;
            //EMPATE
            case 3:
                saldoLocalStorage(saldoLocalStorage(-1)+ (cantidadDeSaldosPagar-1) * montoApostado);
                break;
        }    
        //Actualiza el cartel de saldo actual y apostado, sumandole o restandole la apuesta dependiendo del resultado
        montoApostado=0;
        actualizarMontos(montoApostado,saldoLocalStorage(-1));

        //Reinica las variables para iniciar otra partida
        mazo=[]; cartasCrupier=[]; cartasJugador=[]; 
        puntosJugador=0; puntosCrupier=0; ganador = 0;
        cantidadDeSaldosPagar=2; 

        generarMazo(mazo, cantidadDeMazos);
        cartasCrupier = juegaCrupier(mazo, cartasCrupier,puntosJugador);

        //Borra las cartas de las partidas anteriores
        actualizaCartas(cartasJugador,cartasCrupier,1,0);
        cartelGanaPierde.className="CartelGanaPierdeHide ";

        cartelCargarDinero.className = "credit-card-div";
        mesaDeApuestas.className = " MesaDeApuestas container  ";
        mesaDeJuego.className = " container-fluid MesaDeJuego d-none";
       
    }
}

















    

    
