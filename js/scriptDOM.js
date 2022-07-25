//Scripts que modifican el DOM de la pagina web 


// -----------------BUSCA LOS ELEMENTOS DEL DOM QUE SE ALTERAN DURANTE EL JUEGO---------------------------------------------------
const botonPedir=document.getElementById("pedir");
const botonDoblar=document.getElementById("doblar");
const botonPlantarse=document.getElementById("plantarse");
const botonReiniciar=document.getElementById("reiniciar");
const cartelGanaPierde=document.getElementById("GanaPierde");
const menuDeApuestas = document.getElementById("listaApuestas");
const menuDeBotones = document.getElementById("listaDeBotones");
const mesaDeApuestas = document.getElementById("mesaDeApuestas");
const mesaDeJuego = document.getElementById("mesaDeJuego");
const formTarjeta = document.getElementById("collapseExample");


// Funcion que cambia entre mesa de apuestas y mesa de juego
function cambiaMesaJuego_Apuesta (modo){
    if(modo){
        cartelGanaPierde.className="CartelGanaPierdeHide ";
       
        mesaDeApuestas.className = "MesaDeApuestas container align-items-center";
        mesaDeJuego.className = " container-fluid MesaDeJuego d-none";
        formTarjeta.className = "collapse";
    }
    else{
        mesaDeApuestas.className = " MesaDeApuestas container d-none ";
        mesaDeJuego.className = " container-fluid MesaDeJuego";
    }
    
}

// Funcion que mueve el cartel de gana o pierde la casa
function mueveCartel(cartelGanaPierde){
    anime(
        {
            targets: cartelGanaPierde,
            translateY: [-1000, 50],
            
            duration: 1000
        }
    );
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
        cartelSaldo.innerHTML = `Saldo actual:   <h1 id="saldoViejo"> ${saldoActual} </h1>$$`;
        cartelSaldo.className = "cartel";
        cartelSaldo.id = "cartelSaldo";
        const cartelApostando = document.createElement("h3");
        cartelApostando.innerHTML = `Saldo apostado:   <h1 id="apostadoViejo">  ${montoApostado} </h1>$$`;
        cartelApostando.className = "cartel";
        cartelApostando.id = "cartelApostando";
        div.append(cartelSaldo,cartelApostando);
        listaApuestas.append(div); 
    }
    const saldoViejo = document.getElementById("saldoViejo");
    const apostadoViejo = document.getElementById("apostadoViejo");
    
    let viejo = parseInt(saldoViejo.innerHTML);
    if(viejo != saldoActual){
        //saldoViejo.innerHTML = saldoActual;
        
        anime({
            targets: saldoViejo,
            innerHTML: [viejo,saldoActual],
            round: 1,
            easing: 'easeInOutExpo'
          });
    }
    viejo = parseInt(apostadoViejo.innerHTML);
    if(viejo != montoApostado){
        //apostadoViejo.innerHTML = montoApostado;     
        anime({
            targets: apostadoViejo,
            innerHTML: [viejo, montoApostado],
            round: 1,
            easing: 'easeInOutExpo'
          });
    }    
}