
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
