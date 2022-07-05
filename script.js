/* La idea del programa es generar un simulador de BlackJack 
Hasta el momento el codigo permite :
    -Permite que el usuario pida cartas 
    -Reparte un total de hasta 4 cartas (Tengo que ver como solucionar esto)
    - Suma los puntos de las cartas entregadas
    - Cartel de quien gana el juego 
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
            if(cartasJugador[i].numero>=10){
                puntos+=10;
            }
            else{
                puntos+=cartasJugador[i].numero; 
            }
            
        }
    }
    // Busca las cartas que son ASES y suma 11 si al sumar la carta el puntaje es 
    // menor a 21 , en caso contrario suma 1
    for(let i = 0 ; i<cartasJugador.length; i++){
        if(cartasJugador[i].numero==1){
            if(puntos+11 <= 21){
                puntos+=11;
            }
            else{
                puntos++;
            }
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
        for(let i=0; i<cartasJugador.length; i++){
            cartasJugador[i].preguntarPalo(this);
        }
        for(let i=0; i<2; i++){
            //elimina del mazo la cartas usadas
            mazo.shift();
        }
        
        console.log("--------------------------");
    }
    else{
        //Partida ya en curso
        cartasJugador = pedirCartas(1, mazo, cartasJugador);
        //elimina del mazo la cartas usadas
        mazo.shift();
                //Debugging muestra cartas del jugador
                /*for(let i=0; i<cartasJugador.length; i++){
                    cartasJugador[i].preguntarPalo(this);
                }
                console.log("--------------------------");
                */
    }
    puntosActual = sumarPuntos(cartasJugador);
    
    puntosActual = sumarPuntos(cartasJugador);
    console.log(puntosActual);
    //console.log("------------------------");
    return cartasJugador;
}
//Funcion que controla cuando juega el crupier
function juegaCrupier(mazo, cartasCrupier, puntosJugador){
    let cant;
    let puntosCrupier=0;
    if(cartasCrupier.length==0){
         // Entrega dos cartas para iniciar a jugar
         cartasCrupier = pedirCartas(1, mazo, cartasCrupier);   

             //Debugging muestra cartas del jugador
            /*console.log("------Carta Crupier-------");
            cartasCrupier[0].preguntarPalo(this);
            console.log("------------------------");*/

        //elimina del mazo la cartas usadas    
        mazo.shift();
        return cartasCrupier;
    }
    puntosCrupier = sumarPuntos(cartasCrupier);  
    // Si el puntaje es menor a 21 pregunta al jugador si quiere plantarse o pide carta
    if(puntosCrupier<puntosJugador){
        while(puntosCrupier<17 && puntosCrupier<puntosJugador){
            //console.clear();
            cartasCrupier = pedirCartas(1, mazo, cartasCrupier);
            //elimina del mazo la cartas usadas
            mazo.shift();

                //Debugging muestra cartas del jugador
                /*
                console.log("--------------------------");
                for(let i=0; i<cartasCrupier.length; i++){
                    cartasCrupier[i].preguntarPalo(this);
                }*/
        
            puntosCrupier = sumarPuntos(cartasCrupier);  
            //console.log("--------------------------");

           
            
        }
     }

    return cartasCrupier;
}
//Decide quien gana y muestra en pantalla el cartel del resultado
function eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde){
    if(puntosCrupier<=21){
        if(puntosCrupier>puntosJugador){
            cartelGanaPierde.className="CartelGanaPierdeNoHide CartelGana";
            console.log("Gana la casa");
        }
        if(puntosCrupier<puntosJugador){
            cartelGanaPierde.className="CartelGanaPierdeNoHide CartelPierde";
            console.log("Pierde la casa");
        }
        if(puntosCrupier===puntosJugador){
            cartelGanaPierde.className="CartelGanaPierdeNoHide CartelEmpate";
            console.log("EMPATE");
        }
    }
    else{
        console.log("Pierde la casa"); 
        cartelGanaPierde.className="CartelGanaPierdeNoHide CartelPierde";
        
    }
}
// La funcion realiza:
//     Revisa si hay que crear nuevos espacios para cartas (DIV)
//     Actualiza las cartas en pantalla
//     Borra los espacios extras al reiniciar una partida (Borra los DIVS creados)
function actualizaCartas(mazoJugador,mazoCrupier,reiniciar){
    let figuraCrupier =[];
    let figuraJugador =[];
    let j=1;
    figuraCrupier=document.getElementsByClassName("cartaCrup"); 
    figuraJugador=document.getElementsByClassName("cartaJug"); 
    // Revisa si la cantidad de cartas en la pantalla ("CANTIDAD DE DIVS") es mayor a la cantidad de 
    // cartas por mazo de jugador y crupier. Si la CANT es menor se crea nuevos divs
    console.log("Cantidad de posiciones"+ figuraCrupier.length + " cantidad de cartas " + mazoCrupier.length);
    if(figuraJugador.length < mazoJugador.length || figuraCrupier.length < mazoCrupier.length){
        if(figuraJugador.length < mazoJugador.length ){
            const cartaNueva = document.getElementById("divMesaJugador");
            let modeloCarta = document.createElement("div");
            modeloCarta.className = "col  m-3 "; 
            modeloCarta.innerHTML = ` <div class="carta cartaJug" >
                                      </div>
                                     `;
            cartaNueva.appendChild(modeloCarta);
        }
        if(figuraCrupier.length < mazoCrupier.length){
            const repe = mazoCrupier.length-figuraCrupier.length
            console.log(repe);
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
    if(reiniciar==0){
        for(let i=0;i<mazoJugador.length; i++){
            figuraJugador[i].className = "carta cartaJug" + " "+"cart"+mazoJugador[i].numero+"-"+mazoJugador[i].palo; 
        }
        for(let i=0;i<mazoCrupier.length; i++){  
            figuraCrupier[i].className = "carta cartaCrup" + " "+"cart"+mazoCrupier[i].numero+"-"+mazoCrupier[i].palo;
        }
        if(mazoCrupier.length==1){
            figuraCrupier[1].className = "carta cartaCrup"+ " "+"backCarta";
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

let mazo=[];
let mazoCrupier=[];
let cartasJugador=[];
let botonPedir, botonPlantarse,cartelGanaPierde,botonReiniciar;



window.onload = () => {
    botonPedir=document.getElementById("pedir");
    botonPlantarse=document.getElementById("plantarse");
    botonReiniciar=document.getElementById("reiniciar");
    cartelGanaPierde=document.getElementById("GanaPierde");

    const cantidadDeMazos = 1;
    let puntosJugador=0;
    let puntosCrupier=0; 
    let partidaTerminada=0;

    generarMazo(mazo, cantidadDeMazos);
    mazoCrupier = juegaCrupier(mazo, mazoCrupier,puntosJugador);

    //Boton de pedir (solo funciona si el jugador no a tocado el boton de plantarse)
    botonPedir.onclick = () => {
        if(mazoCrupier.length==1){
            puntosJugador=sumarPuntos(cartasJugador);
            if(puntosJugador<21)
                cartasJugador = juegaJugador(mazo, cartasJugador);

            actualizaCartas(cartasJugador,mazoCrupier,0);

            puntosJugador=sumarPuntos(cartasJugador);
            if(puntosJugador>21){
                console.log("Gana la casa");
                partidaTerminada=1;
                cartelGanaPierde.className="CartelGanaPierdeNoHide CartelGana";
            }
        }
    }
    //Boton de plantarse (solo funciona si el jugador a jugado al menos una vez)
    botonPlantarse.onclick = () => {
        if(cartasJugador.length>0){
            if(puntosJugador<=21){
                puntosJugador=sumarPuntos(cartasJugador);
                mazoCrupier = juegaCrupier(mazo, mazoCrupier,puntosJugador);
                puntosCrupier = sumarPuntos(mazoCrupier);
                actualizaCartas(cartasJugador,mazoCrupier,0);
                eligeGanador(puntosJugador,puntosCrupier,cartelGanaPierde);
                partidaTerminada=1;
            }
            else{
                cartelGanaPierde.className="CartelGana";
                cartelGanaPierde.className="CartelGanaPierdeNoHide CartelGana";
                console.log("Gana la casa");
                partidaTerminada=1;
            }
        }        
    }
    //boton de reiniciar partida (solo funciona si la partida fue terminada)
    botonReiniciar.onclick = () => {
        if(partidaTerminada==1){
            mazo=[];
            mazoCrupier=[];
            cartasJugador=[];
            puntosJugador=0;
            puntosCrupier=0; 
            generarMazo(mazo, cantidadDeMazos);
            mazoCrupier = juegaCrupier(mazo, mazoCrupier,puntosJugador);
            actualizaCartas(cartasJugador,mazoCrupier,1);
            cartelGanaPierde.className="CartelGanaPierdeHide ";
            partidaTerminada=0;
        }
    }



}













    

    
