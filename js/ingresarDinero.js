
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
        event.preventDefault();
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


//Simula el Api de pago, en promedio 2 de cada 10 pagos son rechazados
function APIdePago (){
    return new Promise ((resolve, reject) => {
        Swal.fire({
            title: 'Realizado pago',
            didOpen: () => {
                Swal.showLoading();
            }
        });
        if(Math.random() > 0.2){
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




