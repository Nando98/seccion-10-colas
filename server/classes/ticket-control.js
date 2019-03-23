const fs = require('fs');

class Ticket {
    constructor(numero, escritorio) {
        this.numero = numero;
        this.escritorio = escritorio
    }
}

class TicketControl {

    constructor() {
        this.ultimo = 0;
        this.hoy = new Date().getDate();
        this.ticketsPendientes = [];
        this.ultimos4tickets = [];

        let data = require('../data/data.json');

        if (data.hoy === this.hoy) {
            this.ultimo = data.ultimo;
            this.ticketsPendientes = data.pendientes;
            this.ultimos4tickets = data.ultimos4tickets;
        } else {
            this.reiniciarTicketera();
        }
    }

    siguienteTicket() {
        this.ultimo += 1;
        let ticketPendiente = new Ticket(this.ultimo, null);
        this.ticketsPendientes.push(ticketPendiente);
        this.guardarArchivo();

        return `Ticket ${this.ultimo}`;
    }

    getUltimoTicket() {
        return `Ticket ${this.ultimo}`;
    }

    getUltimos4Tickets() {
        return this.ultimos4tickets;
    }

    atenderTicket(escritorio) {
        if (this.ticketsPendientes.length === 0) {
            return 'No hay tickets por atender';
        }

        let numeroTicket = this.ticketsPendientes[0].numero;
        this.ticketsPendientes.shift();

        let atenderTicket = new Ticket(numeroTicket, escritorio);

        console.log(atenderTicket)

        this.ultimos4tickets.unshift(atenderTicket);

        if (this.ultimos4tickets.length > 4) {
            this.ultimos4tickets.splice(-1, 1); //   Elimina el ultimo elemento
        }

        console.log('Ultimos 4 tickets');
        console.log(this.ultimos4tickets);

        this.guardarArchivo();

        return atenderTicket;
    }

    reiniciarTicketera() {
        this.ultimo = 0;
        this.ticketsPendientes = [];
        this.ultimos4tickets = [];
        this.guardarArchivo();
    }

    guardarArchivo() {
        let jsonData = {
            ultimo: this.ultimo,
            hoy: this.hoy,
            pendientes: this.ticketsPendientes,
            ultimos4tickets: this.ultimos4tickets
        };

        let jsonDataString = JSON.stringify(jsonData);
        fs.writeFileSync('./server/data/data.json', jsonDataString);
    }

}

module.exports = {
    TicketControl
}