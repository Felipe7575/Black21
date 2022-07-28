//Script necesario para recibir el precio del DOLAR mediante la API

const etiqueta = document.getElementById("tag_cotiza");
fetch("https://www.dolarsi.com/api/api.php?type=valoresprincipales").then(response => 
        response.json()).then(data => {
            const h2 = document.createElement("h2");
            for(let i = 0; i < 2; i++){
                const {
                    casa: {
                        nombre,
                        compra
                    }
                } = data[i];
                h2.innerHTML += `<span class="cot${i}">${nombre} :  ${compra} </span>  `;
        }
        h2.className = "primero";
        etiqueta.innerHTML=h2.outerHTML;

    });
