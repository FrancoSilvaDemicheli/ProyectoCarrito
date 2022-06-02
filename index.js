const inputBuscar = document.getElementById('buscar');
const btnBuscar = document.getElementById('btnBuscar');
const btnVaciar = document.getElementById('eliminar');
const divProductos = document.getElementById("divProductos");
let btnComprar= document.getElementById('btnComprar');
let btnVaciarCarro = document.getElementById('btnVaciar')
const PRODUCTOS = [];
let carrito = [];

if(localStorage.getItem('carro') != null){
    carrito = JSON.parse(localStorage.getItem('carro'));
    let carro = document.getElementById('tbody');
    carro.innerHTML=''; // lo limpio cada vez que hago click y agrego cada elemento del carrito de nuevo

    for (let i = 0; i < carrito.length; i++) {
        const element = carrito [i];

        carro.innerHTML += `
        <tr>
            <td>${element.cantidad}</td>
            <td>${element.nombre}</td>
            <td>${element.marca}</td>
            <td>${element.precio}</td>            
            <td><button class="btn btn-danger" onclick = "btnEliminar(${i})">X</button></td>
        </tr>
    `
    }

}

//fetch para pintar mis productos del json
function pintarCards(){
    fetch ('DDBB/DDBB.json')
    .then (res => res.json())
    .then (data => {
        
        for (let i = 0; i < data.length; i++) { 
            
            PRODUCTOS.push(data[i]);

            let card = document.createElement("div");
            card.innerHTML = `
                
                
                <div class="card border-primary mb-6">
                <img src="${data[i].img}" class="card-img-top" />
                    <div class="card-body">  
                        
                        <h5 class="card-title"> ${data[i].nombre}</h5>
                        <h5 class="card-title">${data[i].marca}</h5>
                        <p class="card-text"> Precio: $${data[i].precio}</p>
                        <p class="card-text"> cantidad: ${data[i].cantidad}</p>                        
                        <button class = "btn btn-primary" id="btnCarro${data[i].id}" onclick = "agregarCarro(${i})">Agregar</button>
                    </div>
                </div>
                
                   
            `
            divProductos.appendChild(card);
        }       
        
        console.log(data);
    })
}

console.log(PRODUCTOS);
console.log(carrito);

//pinto en el html 
pintarCards();

//funcion para agregar al carrito + llamar a la fc pintarlo
function agregarCarro (i) {
    
    Toastify({
        text: "Agegado al carrito",        
        duration: 1000        
    }).showToast();
    
    let prod = PRODUCTOS [i];
    let existe = false ; //variable interruptor

    for (let i = 0; i < carrito.length; i++) {
        if (carrito[i].id === prod.id){ // si el id del que clickie es igual al id de algun producto de mi carrito, quiere decir que existe
            existe = true;              // y entonces pongo mi variable en true 
            carrito[i].cantidad ++;     // y le sumo uno a la cantidad        

        }
        
    }
    if (!existe){                       //Si no existe le pongo cantidad 1 y lo pusheo al carrito
        PRODUCTOS.cantidad =1;
        carrito.push(prod);
    }   
       
    localStorage.setItem('carro', JSON.stringify(carrito));
    console.log(carrito);
    pintarCarrito();
}

//Funcion pintar en el carro
function pintarCarrito() {
    let carro = document.getElementById('tbody');
    carro.innerHTML=''; // lo limpio cada vez que hago click y agrego cada elemento del carrito de nuevo

    for (let i = 0; i < carrito.length; i++) {
        const element = carrito [i];

        carro.innerHTML += `
        <tr>
            <td>${element.cantidad}</td>
            <td>${element.nombre}</td>
            <td>${element.marca}</td>
            <td>${element.precio}</td>            
            <td><button class="btn btn-danger" onclick = "btnEliminar(${i})">X</button></td>
        </tr>
    `
    }
}

//funcion boton eliminar del carro

function btnEliminar(i){
    if (carrito[i].cantidad >1){
        carrito[i].cantidad =1;

    }
    carrito.splice(i, 1);
    localStorage.setItem('carro', JSON.stringify(carrito));
    let carro = document.getElementById('tbody');

    carro.innerHTML=''; //lo limpio de nuevo para que me muestre solo lo que tengo en el carrito

    for (let i = 0; i < carrito.length; i++) {
        const element = carrito [i];

        carro.innerHTML += `
        <tr>
            <td>${element.cantidad}</td>
            <td>${element.nombre}</td>
            <td>${element.marca}</td>
            <td>${element.precio}</td>            
            <td><button class="btn btn-danger" onclick = "btnEliminar(${i})">X</button></td>
        </tr>
    `
    }
    console.log(carrito);
}

//Configuracion del boton para buscar
btnBuscar.addEventListener('click', buscar);

function buscar() {
    let valor = inputBuscar.value;
    console.log('clickeaste');

    if (valor.length == 0){
        swal ('CAMPO VACÍO')
    }else{
        let ENCONTRADOS = PRODUCTOS.filter ( producto => (producto.nombre.includes(valor) || producto.marca.includes(valor)))
        console.log(ENCONTRADOS);        
    }
};

//funcion Vaciar el carro
btnVaciarCarro.addEventListener('click', vaciarCarro);
function vaciarCarro(){
    carrito = [];
    console.log(carrito);

    localStorage.clear();
    let carro = document.getElementById('tbody');
    carro.innerHTML='';
        for (let i = 0; i < carrito.length; i++) {
        const element = carrito [i];

        carro.innerHTML += `
        <tr>
            <td>${element.cantidad}</td>
            <td>${element.nombre}</td>
            <td>${element.marca}</td>
            <td>${element.precio}</td>            
            <td><button class="btn btn-danger" onclick = "btnEliminar(${i})">X</button></td>
        </tr>
    `
    }

}

//funcion Comprar y checkout
btnComprar.addEventListener('click', comprar);
function comprar(){
    let total = 0 ;
    for ( let prod of carrito){
        total = total + parseFloat (prod.precio*prod.cantidad);
    }

    swal ({ title: `Total a pagar $${total}`, 
        buttons: {
          cancel: "Cancelar!",
          unPago: {
            text: "Tarjeta de crédito en un solo pago",
            value: "unPago",
          },
          cuotas: {
              text : "Tarjeta de crédito en cuotas"
          }
        },
      }).then((value) => {
        switch (value) {
        
            case "cuotas":
            swal({
                text: 'Ingrese número de tarjeta',
                content: "input",
                button: {
                  text: "Pagar!"                  
                }
            }).then(tarjeta=>{
                if (tarjeta){
                    swal ("Selecciones Cantidad de cuotas", {
                        buttons : {
                            3 : "3",
                            6 : "6",
                            12 : "12",
                            18 : "18"

                        }
                    }).then(cantidad =>{
                        switch(cantidad){
                            case "3": swal({
                                title: "5% de recargo",
                                text: `Desea pagar ${total*1.05} en 3 cuotas de ${(total*1.05)/3}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((pagar) => {
                                if (pagar) {
                                  swal("Muchas gracias", "Pago exitoso", {
                                    icon: "success",
                                  });
                                } else {
                                  swal("Operación cancelada");
                                }
                              });
                        }switch(cantidad){
                            case "6": swal({
                                title: "8% de recargo",
                                text: `Desea pagar ${total*1.08} en 6 cuotas de ${(total*1.08)/6}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((pagar) => {
                                if (pagar) {
                                  swal("Muchas gracias", "Pago exitoso", {
                                    icon: "success",
                                  });
                                } else {
                                  swal("Operación cancelada");
                                }
                              });
                        }switch(cantidad){
                            case "12": swal({
                                title: "12% de recargo",
                                text: `Desea pagar ${total*1.12} en 12 cuotas de ${(total*1.12)/12}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((pagar) => {
                                if (pagar) {
                                  swal("Muchas gracias", "Pago exitoso", {
                                    icon: "success",
                                  });
                                } else {
                                  swal("Operación cancelada");
                                }
                              });
                        }switch(cantidad){
                            case "18": swal({
                                title: "16% de recargo",
                                text: `Desea pagar ${total*1.16} en 18 cuotas de ${(total*1.16)/18}`,
                                icon: "warning",
                                buttons: true,
                                dangerMode: true,
                              })
                              .then((pagar) => {
                                if (pagar) {
                                  swal("Muchas gracias", "Pago exitoso", {
                                    icon: "success",
                                  });
                                } else {
                                  swal("Operación cancelada");
                                }
                              });
                        }
                    })
                }
            });
            break;
        
            case "unPago":
            swal({
                text: 'Ingrese número de tarjeta',
                content: "input",
                button: {
                    text: "Pagar!"                  
                }
            }).then( pago => {
            if (pago) {swal("Pago exitoso", `Pagaste $${total} en un pago, muchas gracias`, "success")}});
            break;
        
            default:
            swal("Operacion cancelada");
        }
})
}