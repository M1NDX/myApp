

let usuarios  = [];
cargardatos();

function cargardatos(){
  let xhr = new XMLHttpRequest();
  xhr.open('GET','/usuarios');
  xhr.send();
  xhr.onload = function () {
      if(xhr.status != 200){
          usuarios.push(new User("Juan","test@test.com", "1234","M",["Futbol","natación"]) );
          usuarios.push(new User("Ana","testA@test.com", "A1234","F") );
      }else{
        usuarios = JSON.parse(xhr.response);
      }
      actualizarHTML(usuarios);
  }
}



console.log(usuarios);

$('#modelId').on('shown.bs.modal', function() {
  $('#username').focus();
})

bBuscar.onclick = filtrarUsuarios; //sin paréntesis
bBuscar.addEventListener('click', () => console.log("buscando"));
bNuevo.addEventListener('click', establecerModoRegistro);

let modoRegistro = true;
let usuarioEdit;
function establecerModoRegistro(){
  document.querySelector('#modelId h5.modal-title')
          .innerText =  "Registrar Usu ario";
  modoRegistro = true;
  document.querySelector('form').reset();
  document.querySelector('#username').focus();
}

function guardarDatos(user){
   let xhr = new XMLHttpRequest();
   xhr.open('POST','/usuarios');
   xhr.setRequestHeader('Content-Type','application/json');
  xhr.send(JSON.stringify(user));
  xhr.onload = function() {
      if(xhr.status != 201){
          console.log("error al guardar usuario");
      }else{
         usuarios = JSON.parse(xhr.response);
         actualizarHTML(usuarios);
      }
  }
}

function registrarUsuario(){

    console.log("guardando");
    let username = document.querySelector('#username').value;
    let email = document.querySelector('#email').value;
    let psw = document.querySelector('#psw').value;
    let hobbies = document.querySelector('#hobbies').value;
    let sx =document.querySelector('#sxf').checked ? 'F':'M'
     if(modoRegistro){
      let nUser = new User(username,email,psw,sx,hobbies.split('\n'));
      usuarios.push(nUser);
      guardarDatos(nUser);
    }else{
      usuarioEdit.username = username;
      usuarioEdit.email = email;
      usuarioEdit.password = psw;
      usuarioEdit.hobbies = hobbies.split('\n');
    }
   
    actualizarHTML(usuarios);
     $('#modelId').modal('hide');
}

function borrarUsuario(id){
   console.log("se borrará el usuario "+id);
   let pos = usuarios.findIndex(usr => usr.id == id);
   usuarios.splice(pos,1); //borrar un usuario, el de la posición pos
  actualizarHTML(usuarios);
}

function editarUsuario(id){
  let user = usuarios.find(usr => usr.id == id);
  if(user){
    modoRegistro= false;
    usuarioEdit = user;
    document.querySelector('#modelId h5.modal-title').innerText = "Editar Usuario";
    document.getElementById('imagenR').src = user.url;
    document.querySelector('#username').value = user.username;
    document.querySelector('#email').value = user.email;
    //document.querySelector('#psw').hidden = true;
    document.querySelector('#psw').value = user.password;
    document.querySelector('#sxf').checked = user.sexo =='F';
    document.querySelector('#sxm').checked = user.sexo =='M';
    document.querySelector('#hobbies').value= user.hobbies.join('\n');
  }

}

function filtrarUsuarios(){
  console.log("usuarios filtrados");
  let campoBusqueda = document.getElementById('search');
  let valor = campoBusqueda.value;
  let filtro = usuarios.filter(usr => usr.username.toUpperCase().includes(valor.toUpperCase()));
  actualizarHTML(filtro);
}

function actualizarHTML(arreglo){
     //let user0html = userToHTML(usuarios[0]);
    //document.querySelector('ul').insertAdjacentHTML('beforeend', user0html);
    let lista = document.querySelector('ul');
    let html = arreglo.map(user => userToHTML(user)).join(' ');
    lista.innerHTML = html;

    /*arreglo.forEach(user => document.querySelector('ul')
                            .insertAdjacentHTML('beforeend',
                            userToHTML(user)));*/

}

function userToHTML(user){
    let html = /*html*/
    `<li class="list-group-item">
    <div class="row">
      <div class="col-2">
        <img src="${user.url}" width="80" alt="">
      </div>
      <div class="col-8">
          <p>id: ${user.id} <br>
          Username: ${user.username} <br> 
          Email: ${user.email} <br>
          Hobbies: ${user.hobbies} <br>
        </p>
      </div>
      <div class="col-2 "> 
        <div class="row mb-2">
            <div class="col-6 btn btn-primary" data-toggle="modal" data-target="#modelId" onclick="editarUsuario(${user.id})">
              <i class="fas fa-pencil-alt    "></i>
            </div>
          </div>
        <div class="row">
          <div class="col-6 btn btn-danger" onclick="borrarUsuario(${user.id})"> <!-- llamar función de borrar -->
            <i class="fas fa-trash    "></i>
          </div>
        </div>
      </div>
    </div>
  </li>`;

    return html;

}
