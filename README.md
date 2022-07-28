# Black JACK

## Deployment en Versel 
https://black21.vercel.app/index.html

## Introducción
El proyecto pretende hacer un simulador de Black Jack, mediante el uso de JavaScript, HTML y Sass.
Hasta el momento el simulador permite:

 - Permite que el usuario ingrese un monto de dinero, mediante un simulador de tarjeta de crédito, si no lo desea puede jugar gratis. El simulador de tarjeta de crédito acepta el 80% de los ingresos, simulando un fallo de parte del banco.
 - Realice una apuesta de 5, 10, 25 o 50 
 - Entrega cartas al jugador y al crupier
 - Permite que el usuario pida cartas
 - Permite que el usuario Doble la apuesta 
 - Permite plantarse, y si el puntaje es menor a 21 jugara el crupier
 - Se decide si gana o pierde la casa , y por lo tanto sube el saldo del jugador o es restado.
 - Permite que el jugador vuelva a apostar

##  Archivos JS
 - script.js: Es el archivo principal del main , se encarga de llamar al resto de funciones del resto de  archivos. Tambien tiene la logica del juego de black jack (Repartir cartas, generar el mazo , etc)
 - ingresarDolar.js: Es el archivo Js principal de la pagina pagos.html. Se encarga de tomar los los pagos que se realicen con tarjeta de credito
 - dolarApi.js: Se encarga de pedir la cotizacion del dolar a una API.
 - localStorage.js: Se encuentran las funciones relacionadas con el localStorage, el valor  que se guarda es el saldo del jugador.
 - scriptDOM.js: Se encuentran las funciones relacionadas con el DOM.


##  Reglas Básicas del BlackJack
El objetivo de cualquier mano de BlackJack es derrotar a la banca. Para esto, debes tener una mano que puntúe más alto que la mano de la banca, pero que no supere los 21 puntos en valor total. O bien, puedes ganar con una puntuación inferior a 22 cuando la mano de la banca supera los 21 puntos. Cuando el valor total de tu mano es de 22 o más, esto se conoce comúnmente como "bancarrota", y automáticamente perderás cualquier dinero apostado
En el BlackJack, los dieces, las jotas, las reinas y los reyes tienen un valor de 10 cada una. Los ases pueden tener dos valores diferentes: uno u once (puedes elegir cuál). Por ejemplo, cuando combinas un as y un cuatro, la mano puede valer 5 o 15.
La opción de **doblar** te permite doblar tu apuesta inicial

## Funcionamiento del programa
### Librerias utilizadas 
 - AnimeJs 3.2.1: Se utilizo para la entrega de cartas durante el juego 
 - SweetAlert: Se utilizo para los carteles de errores 
### Funciones propias
La función generarMazo es el encargado de generar un Mazo de cartas españolas, lo que corresponde a un vector de 52 cartas. Con 4 palos: las espadas, los diamantes, los tréboles y los corazones.
Cada vez que se entrega una carta al Jugador o al Crupier, se borra una carta del Mazo.
Al Jugador y al Crupier se le entregan cartas mediante la función pedirCartas(cantidadDeCartas, VectorMazo, VectorCartas). Esta función devuelve el vector enviados mas la cantidad de cartas pedidas:

    cartasJugador = pedirCartas(1, mazo, cartasJugador);
    //elimina del mazo la cartas usadas
    mazo.shift();
   La función sumarPuntos devuelve la cantidad de puntos que le corresponden al vector de cartas que se le envié. 

    puntosActual = sumarPuntos(cartasJugador);
   
La función eligeGanador se invoca cada vez que se termine una partida (ya sea porque supero los 21 o se plante el usuario). Esta misma decide si gana o pierde la casa y establece el cartel de "Gana la casa" o "Pierde la casa". Esta función devuelve: 

 -  Retorna 1 si Gana la casa
 - Retorna 2 si pierde la casa
 - Retorna 3 si es empate

La función actualizaCartas es la encargada de cambiar el código HTML para que el usuario pueda ver sus cartas. Las cartas están conformadas por un div cuya clase al ser modificada determina su numero y palo. A la funcion se le envía el mazo del jugador , del crupier y una variable entera que cumple la funcion de bandera. Si esta se encuentra en 1 se borran las cartas de la meza y se reinicia el código HTML, caso contrario se actualizan las cartas de la meza 
La funcion administrPago simula el ingreso de dinero mediante una tarjeta de credito. El simulador rechaza el 20% de los ingresos aleatoriamente. 
La función saldoLocalStorage es la encargada de guardar los saldos del jugador. Parámetros de la función:

 - Si se envía un monto: Este será guardado en LocalStorage con el id saldo
 - Si se envia "-1" la misma devuelve el saldo del jugador 

.

    //Al saldo almacenado previamente se le resta la apuesta y se almacena nuevamente 
    saldoLocalStorage(saldoLocalStorage(-1)-apuesta);

 
 


 
