/* La idea del programa es generar un simulador de BlackJack 
Hasta el momento el codigo permite :
    - Que el usuario pida cartas hasta ingresar -1 o que supere 21
    - Suma los puntos de las cartas entregadas
Por consola se puede ver las cartas entregadas y al dejar de pedir o superar los 21 se 
devuelve la cantidad de puntos.
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
function pedirCartas(cantidad, baraja,cartasJugador){
    for(let i=0; i<cantidad; i++){
        cartasJugador.push(baraja[i]);
    }
    return cartasJugador;
}



function sumarPuntos(cartasJugador){
    let puntos=0;
    
    
    // Busca las cartas que no son ASES y suma el valor de la carta al puntaje
    for(let i = 0 ; i<cartasJugador.length; i++){
        if(cartasJugador[i].numero>=2){
            puntos+=cartasJugador[i].numero;
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
    
function juegaJugador(mazo){
    let cant;
    let cartasJugador = [];
    let puntosActual=0;

    // Entrega dos cartas para iniciar a jugar
    cartasJugador = pedirCartas(2, mazo, cartasJugador);
    for(let i=0; i<cartasJugador.length; i++){
        cartasJugador[i].preguntarPalo(this);
    }
    for(let i=0; i<2; i++){
        mazo.shift();
    }
    puntosActual = sumarPuntos(cartasJugador);  
    console.log("--------------------------");
    // Si el puntaje es menor a 21 pregunta al jugador si quiere plantarse o pide carta
    if(puntosActual<21){
        cant=prompt("Plantarse =-1 Carta = 1?");
        while(cant!=-1 && puntosActual<21){
            //console.clear();
            cartasJugador = pedirCartas(cant, mazo, cartasJugador);
            for(let i=0; i<cant; i++){
                mazo.shift();
            }
            for(let i=0; i<cartasJugador.length; i++){
                cartasJugador[i].preguntarPalo(this);
            }
        
            puntosActual = sumarPuntos(cartasJugador);  
            console.log("--------------------------");

            if(puntosActual<21){
                cant=prompt("Plantarse =-1 Carta = 1?"); 
            }
        }
     }

    return puntosActual;
}




let mazo=[];
const cantidadDeMazos = 1;
let puntosJugador=0;

generarMazo(mazo, cantidadDeMazos);

puntosJugador = juegaJugador(mazo);
console.log(puntosJugador)







    

    
