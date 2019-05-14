const inputForm = document.getElementById("form");
const adultInput = document.getElementById("adults");
const childrenInput = document.getElementById("children");

const summaryContainer = document.getElementById("summary");
const ticketContainer = document.getElementById("tickets");

inputForm.onsubmit = event => {
  const adults = adultInput.value;
  const children = childrenInput.value;

  const tickets = calculateTickets(adults, children);
  printTickets(tickets);
  printSummary(tickets);

  return false;
};

function calculateTickets(adults, children) {
  const tickets = [];

  while (adults + children > 0) {
    const result = fillTicket(adults, children);

    adults = result.adults;
    children = result.children;
    tickets.push(result.ticket);
  }

  return tickets;
}

function fillTicket(adults, children) {
  const ticket = new Ticket();

  adults = fillSeatsWithAdults(ticket, adults);

  if (ticket.isEmpty()) {
    ticket.addChild();
    children--;
  }

  children = fillFreeSeats(ticket, children);
  children = fillSeatsWithChildren(ticket, children);

  return {
    ticket,
    adults,
    children
  };
}

function fillSeatsWithAdults(ticket, adults) {
  while (ticket.hasEmptySeat() && adults > 0) {
    ticket.addAdult();
    adults--;
  }

  return adults;
}

function fillFreeSeats(ticket, children) {
  while (ticket.hasEmptyFreeSeat() && children > 0) {
    ticket.addFreeChild();
    children--;
  }

  return children;
}

function fillSeatsWithChildren(ticket, children) {
  while (ticket.hasEmptySeat() && children > 0) {
    ticket.addChild();
    children--;
  }

  return children;
}

const ADULT = "ADULT";
const CHILD = "CHILDREN";

class Ticket {
  constructor() {
    this.seats = [];
    this.usedFreeSeats = 0;
  }

  getPassengerCount() {
    return this.seats.length;
  }

  getFreePassengerCount() {
    return this.usedFreeSeats;
  }

  isAdultSeat(index) {
    return this.isSeatEmpty(index) || this.seats[index] == ADULT;
  }

  isEmpty() {
    return this.seats.length == 0;
  }

  isSeatEmpty(index) {
    return this.seats.length <= index;
  }

  isFreeSeatEmpty(index) {
    return this.usedFreeSeats <= index;
  }

  addAdult() {
    this._add(ADULT);
  }

  addChild() {
    this._add(CHILD);
  }

  addFreeChild() {
    assert(!this.isEmpty());
    assert(this.hasEmptyFreeSeat());

    this.usedFreeSeats++;
  }

  hasEmptyFreeSeat() {
    return this.usedFreeSeats < 3;
  }

  _add(passenger) {
    assert(this.hasEmptySeat());
    this.seats.push(passenger);
  }

  hasEmptySeat() {
    return this.seats.length < 5;
  }
}

function assert(expression) {
  if (!expression) {
    throw new Error("Assertion Error");
  }
}

function printTickets(tickets) {
  ticketContainer.innerHTML = "";

  for (const ticket of tickets) {
    ticketNode = printTicket(ticket);
    ticketContainer.appendChild(ticketNode);
  }
}

function printTicket(ticket) {
  const ticketNode = document.createElement("div");
  ticketNode.className = "col-sm-6 col-md-4 col-lg-3";

  ticketNode.innerHTML = `
  <div class="card text-center mb-5">
    <div class="card-header">
      Passagiere: ${ticket.getPassengerCount()}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${getSeatDescription(ticket, 0)}</li>
      <li class="list-group-item">${getSeatDescription(ticket, 1)}</li>
      <li class="list-group-item">${getSeatDescription(ticket, 2)}</li>
      <li class="list-group-item">${getSeatDescription(ticket, 3)}</li>
      <li class="list-group-item">${getSeatDescription(ticket, 4)}</li>
    </ul>

    <div class="card-header">
      Gratisfahrer: ${ticket.getFreePassengerCount()}
    </div>
    <ul class="list-group list-group-flush">
      <li class="list-group-item">${getFreeSeatDescription(ticket, 0)}</li>
      <li class="list-group-item">${getFreeSeatDescription(ticket, 1)}</li>
      <li class="list-group-item">${getFreeSeatDescription(ticket, 2)}</li>
    </ul>
    <div class="card-footer text-muted">
      Preis: ${getTicketPrice(ticket)}€
    </div>
  </div>
  `;

  return ticketNode;
}

function getSeatDescription(ticket, index) {
  if (ticket.isSeatEmpty(index)) return "--------";
  else if (ticket.isAdultSeat(index)) return "Erwachsener";
  else return "Kind";
}

function getFreeSeatDescription(ticket, index) {
  if (ticket.isFreeSeatEmpty(index)) return "--------";
  else return "Kind";
}

const BASE_PRICE = 25;
const INC_PRICE = 5;

function getTicketPrice(ticket) {
  if (ticket.isEmpty()) return 0;
  else {
    return BASE_PRICE + INC_PRICE * (ticket.getPassengerCount() - 1);
  }
}

function printSummary(tickets) {
  let price = 0;

  for (let ticket of tickets) {
    price += getTicketPrice(ticket);
  }

  summaryContainer.innerHTML = `
    <h3><span class="text-muted">Tickets:</span> ${tickets.length}</h3>
    <h3><span class="text-muted">Preis:</span> ${price}€</h3>
  `;
}
