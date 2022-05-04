const btnVaciar = document.getElementById('vaciar');
const divProductos = document.getElementById("divProductos");
const PRODUCTOS = [];
const carrito = [];

//fetch para mostrar mis productos de mi json
function pintarCards(){
    fetch ('DDBB/DDBB.json')
    .then (res => res.json())
    .then (data => {
        
        for (let i = 0; i < data.length; i++) { 

            let card = document.createElement("div");
            card.innerHTML = `
                <div
                    class="col-3 col-md-6">
                    <img src="${data[i].img}" alt="" />
                    <h5> ${data[i].nombre}</h5>
                    <h5>${data[i].marca}</h5>
                    <p> Precio: $${data[i].precio}</p>
                    <p> cantidad: ${data[i].cantidad}</p>                        
                    <button class = "btn btn-primary" id="btnCarro${data[i].id}" onclick = "agregarCarro(${i+1})">Agregar</button>
                </div>
            `
            divProductos.appendChild(card);
        }
        
        PRODUCTOS.push(data);
        console.log(data);
    })
}
console.log(PRODUCTOS);
//pinto en el html 
pintarCards();

//funcion para agregar al carrito
function agregarCarro (i) {
    let prod = PRODUCTOS [i];
    // let existe = false ;
    // for (let i = 0; i < carrito.length; i++) {
    //     if (carrito[i].id === prod.id){
    //         existe = true;
    //         carrito[i].cantidad ++;

    //     }
        
    // }
    // if (!existe){
    //     PRODUCTOS.cantidad =1;
    //     carrito.push(prod)
    //     console.log(carrito);
    // }
    console.log('clickeaste');
    
    carrito.push(prod);
    console.log(carrito);


}