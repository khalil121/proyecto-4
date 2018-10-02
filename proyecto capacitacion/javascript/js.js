let nav = document.querySelectorAll(".inav")
let seccionesMain = document.querySelectorAll(".SEC")
let headerL = document.getElementById("headerLogo")

botones()

function botones(){
			for (var i = 0 ; i < nav.length; i++) {
				botones2(i)
			}
}

headerL.addEventListener("click",function(){
        for (let i = 1; i < nav.length; i++) {
             seccionesMain[i].classList.add("hide")
        }
        seccionesMain[0].classList.remove("hide")
})

function botones2(arg){
				nav[arg].addEventListener("click",function(){
          for (let i = 0; i < nav.length; i++) {
             seccionesMain[i].classList.add("hide")
          }
        seccionesMain[arg].classList.remove("hide")
  })
}

var enviar = document.getElementById("Submit")
var info = document.querySelector("form")
var infoContactos = []

function contacto(nombre,apellido,telefono,mail,cp,mensaje){
  this.nombre = nombre
  this.apellido = apellido
  this.telefono = telefono
  this.mail = mail
  this.cp = cp
  this.mj = mensaje
}

function validateEmail(email) {
  // var re = (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(info[3].value)
  // return re.test(email)
}
enviar.addEventListener("click",function(e){

  if( ( (info[0].value)&&(info[1].value)&&(info[2].value)&&(info[4].value)&&(info[3].value) != null )&&(info[5].value != "") ){
      let contactoo = info[0].value + '\r\n' + info[1].value + '\r\n' + info[2].value + '\r\n' + info[3].value + '\r\n' + info[4].value + '\r\n' + info[5].value
    // Unix timestamp (in seconds)
  downloadContent(Math.round(+new Date()/1000)+".txt", contactoo);
  //window.URL.revokeObjectURL(objectURL);
  }

  // let contactoo = info[0].value + '\r\n' + info[1].value + '\r\n' + info[2].value + '\r\n' + info[3].value + '\r\n' + info[4].value + '\r\n' + info[5].value
  //   // Unix timestamp (in seconds)
  // downloadContent(Math.round(+new Date()/1000)+".txt", contactoo);
  // //window.URL.revokeObjectURL(objectURL);
})

function downloadContent(name, content) {
  var atag = document.createElement("a");
  var file = new Blob([content], {type: 'text/plain'});
  atag.href = URL.createObjectURL(file);
  atag.download = name;
  document.body.appendChild(atag);
  atag.click();
  setTimeout(function(){
        document.body.removeChild(atag);
        window.URL.revokeObjectURL(file);
    }, 100);
}

let catalogo = seccionesMain[1]
var xhr = new XMLHttpRequest()
xhr.open("GET","https://alandooz.github.io/cualquiera/products.json")
xhr.addEventListener("load",function(){
  if (xhr.status == 200) {
    let lista = JSON.parse(xhr.responseText)
    for (var i = 0; i < lista.length; i++) {

      let id = lista[i].id
      let name = lista[i].name
      let photo = "catalogo/" + id + ".PNG"
      let description = lista[i].description

      let div = document.createElement("div")
      let h2datos = document.createElement("h2")
      let img = document.createElement("img")
      let p = document.createElement("p")

      h2datos.innerText = name
      img.src = photo
      p.innerText = description

      div.appendChild(h2datos)
      div.appendChild(img)
      div.appendChild(p)

      div.classList.add("product");
      h2datos.classList.add("producttitle");

      catalogo.appendChild(div)
    }
  }
})
xhr.send()
