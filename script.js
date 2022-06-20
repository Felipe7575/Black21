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
            for(let i=0; i<13; i++) {
                let carta = new cartas(i,j);
                barajaOriginal.push(carta);
                //carta.preguntarPalo(this);
            }
        }
    }
   
        
    // mezcla el mazo de cartas
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
function pedirCartas(cantidad, baraja){
    for(let i=0; i<cantidad; i++){
        baraja[i].preguntarPalo(this);
    }
}
    


let mazo=[];
const cantidadDeMazos = 2;
generarMazo(mazo, cantidadDeMazos);

let cant;


do{
    cant=prompt("Cuantas cartas deseas?");
}while(cant>52 || cant<0);

pedirCartas(cant, mazo);


    

    
