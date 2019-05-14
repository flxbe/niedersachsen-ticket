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
