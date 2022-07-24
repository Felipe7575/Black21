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
                    //Si se acepta el pago se acreta el saldo, caso contrario se borra el valor ingresado
                    if(result.isConfirmed){
                        APIdePago().then(()=>{
                            Swal.fire('Pago confirmado', '', 'success');
                            const saldoNuevo = saldoLocalStorage(-1) + parseInt(montoINPUT.value);
                            saldoLocalStorage(saldoNuevo);
                            saldoLABEL.innerHTML = `Saldo actual:   <h1 id="saldoViejo"> ${saldoNuevo} </h1>$$`;
                            montoINPUT.value = "";
                        }).catch(()=>{
                            Swal.fire('Pago cancelado', 'La API de Pago cancelo su pago', 'error');
                            montoINPUT.value = "";
                        }); //
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


function APIdePago (){
    return new Promise ((resolve, reject) => {
        Swal.fire({
            title: 'Realizado pago',
            didOpen: () => {
                Swal.showLoading();
            }
        });
        if(Math.random() > 0.4){
                setTimeout(()=>{
                    resolve();
                },1000);
                
            }
            else{
                setTimeout(()=>{
                    reject();
                },2000);
            }   
        }
    ); 
}

