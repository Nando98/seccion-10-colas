//  Comando para establecer la conexión
var socket = io();
var searchParams = new URLSearchParams(window.location.search);

console.log(searchParams.has('escritorio'));

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario.');
}

var escritorio = searchParams.get('escritorio'); // Obtiene el valor del parametro
var label = $('small');

$('h1').text('Escritorio ' + escritorio);

$('button').on('click', function() {

    socket.emit('atenderTicket', {
        escritorio: escritorio
    }, function(resp) {
        if (resp === 'No hay tickets por atender') {
            alert(resp)
            label.text(resp);
            return;
        }
        label.text('Ticket ' + resp.numero);
    });
});