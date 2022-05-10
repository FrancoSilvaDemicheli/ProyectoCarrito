const inputBuscar = document.getElementById('buscar');
const btnBuscar = document.getElementById('btnBuscar');
const btnVaciar = document.getElementById('vaciar');
const divProductos = document.getElementById("divProductos");
const PRODUCTOS = [];
const carrito = [];

//fetch para mostrar mis productos del json
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
        duration: 3000        
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
        carrito.push(prod)        
    }

    
    console.log('clickeaste');    
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
    carrito.splice(i, 1);
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

localStorage.setItem('producto', 'inodoro');

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