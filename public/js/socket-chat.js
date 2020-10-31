let socket = io();

let params = new URLSearchParams(window.location.search)

if (!params.has('name')) { 
    window.location = 'index.html'
    throw new Error ('Name necesary')
}

let user = {
    name: params.get('name')
}
 

socket.on('connect', function() {
    console.log('Conectado al servidor');

    socket.emit('enterChat', user, function (resp) {
        console.log('users connected',resp)
    })
});

// escuchar
socket.on('disconnect', function() {

    console.log('Perdimos conexión con el servidor');

});


// Enviar información
socket.emit('enviarMensaje', {
    usuario: 'Fernando',
    mensaje: 'Hola Mundo'
}, function(resp) {
    console.log('respuesta server: ', resp);
});

// Escuchar información
socket.on('creteMessage', function(message) {

    console.log('Servidor:', message);

});

//changes on the list of the room
socket.on('personList', function (usersOnChat) { 
    console.log(usersOnChat)
})