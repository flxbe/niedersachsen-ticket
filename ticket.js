/**
 * Create a list of tickets which minimizes the total cost.
 *
 * Each ticket can have up to 5 passengers and 3 free children.
 */

function calculateTickets(adults, children) {
  const tickets = [];

  while (emptySeats(tickets) < adults + children) {
    console.log(tickets, emptySeats(tickets), adults, children);
    const result = createMinimalTicket(adults, children);

    adults = result.adults;
    children = result.children;
    tickets.push(result.ticket);
  }

  fillEmptySeats(tickets, adults, children);

  return tickets;
}

function emptySeats(tickets) {
  let emptySeats = 0;

  for (let ticket of tickets) {
    emptySeats += ticket.getEmptySeats();
  }

  return emptySeats;
}

function createMinimalTicket(adults, children) {
  assert(adults + children > 0);
  const ticket = new Ticket();

  if (adults > 0) {
    ticket.addAdult();
    adults--;
  } else {
    ticket.addChild();
    children--;
  }

  children = fillFreeSeats(ticket, children);

  return {
    ticket,
    adults,
    children
  };
}

function fillFreeSeats(ticket, children) {
  while (ticket.hasEmptyFreeSeat() && children > 0) {
    ticket.addFreeChild();
    children--;
  }

  return children;
}

function fillEmptySeats(tickets, adults, children) {
  for (let ticket of tickets) {
    adults = fillEmptySeatsWithAdults(ticket, adults);
    children = fillEmptySeatsWithChildren(ticket, children);
  }

  assert(adults == 0);
  assert(children == 0);
}

function fillEmptySeatsWithAdults(ticket, adults) {
  while (!ticket.isFull() && adults > 0) {
    ticket.addAdult();
    adults--;
  }

  return adults;
}

function fillEmptySeatsWithChildren(ticket, children) {
  while (!ticket.isFull() && children > 0) {
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

  getEmptySeats() {
    return 5 - this.getPassengerCount();
  }

  isAdultSeat(index) {
    return this.isSeatEmpty(index) || this.seats[index] == ADULT;
  }

  isEmpty() {
    return this.seats.length == 0;
  }

  isFull() {
    return this.getEmptySeats() == 0;
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
