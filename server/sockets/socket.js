const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketCtrl = new TicketControl();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketCtrl.siguienteTicket();
        console.log(siguiente);
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketCtrl.getUltimoTicket(),
        ultimos4tickets: ticketCtrl.getUltimos4Tickets()
    });

    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            return callback({ err: true, mensaje: 'El escritorio es necesario.' });
        }

        let atenderTicket = ticketCtrl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //  Actualizar / notificar cambios en los ultimos 4 tickets


        client.broadcast.emit('ultimos4tickets', {
            ultimos4tickets: ticketCtrl.getUltimos4Tickets()
        });
    });
});