const palos = ["♠︎ ","♣︎","♥︎","♦︎"];
let barajaOriginal=[];
let barajaJuego=[];


class cartas{
    constructor(numero, palo){
        this.numero = numero;
        this.palo = palo;
    }
    preguntarPalo(){
        console.log(this.numero + palos[this.palo]);
    }
}


function generarMazo(){
    // genera el mazo de cartas
    for(let j=0; j<4; j++){
        for(let i=0; i<13; i++) {
            let carta = new cartas(i,j);
            barajaOriginal.push(carta);
            //carta.preguntarPalo(this);
        }
    }
   
    // mezcla el mazo de cartas
    
    while(barajaOriginal.length>0){
        let pos = parseInt(Math.random()*(barajaOriginal.length)) ;
        barajaJuego.push(barajaOriginal[pos]);        
        barajaOriginal.splice(pos,1);
    }

    // imprime el mazo de cartas
    for(let i=0; i<barajaJuego.length; i++) {
       // barajaJuego[i].preguntarPalo(this);
    }
   
}
function pedirCartas(cantidad){
    for(let i=0; i<cantidad; i++){
        barajaJuego[i].preguntarPalo(this);
    }
}
    
generarMazo();

let cant;

do{
    cant=prompt("Cuantas cartas deseas?");
}while(cant>52 || cant<0);


pedirCartas(cant);
