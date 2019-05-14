/**
 * Create a list of tickets which minimizes the total cost.
 *
 * Each ticket can have up to 5 passengers and 3 free children.
 *
 * - create enough tickets for all adults
 * - fill all free seats with children
 * - if possible: use empty seats for remaining children
 * - if not: first create new ticket, use all free seats
 */

function calculateTickets(adults, children) {
  let tickets = createTicketsForAdults(adults);
  children = fillFreeSeatsWithChildren(tickets, children);
  tickets = createTicketsForChildren(tickets, children);

  return tickets;
}

function createTicketsForAdults(adults) {
  const tickets = [];

  while (adults > 0) {
    const ticket = new Ticket();
    adults = fillSeatsWithAdults(ticket, adults);

    tickets.push(ticket);
  }

  return tickets;
}

function fillFreeSeatsWithChildren(tickets, children) {
  for (let ticket of tickets) {
    if (children == 0) {
      return children;
    }

    children = fillFreeSeats(ticket, children);
  }

  return children;
}

function fillFreeSeats(ticket, children) {
  while (ticket.hasEmptyFreeSeat() && children > 0) {
    ticket.addFreeChild();
    children--;
  }

  return children;
}

function fillSeatsWithAdults(ticket, adults) {
  while (ticket.hasEmptySeat() && adults > 0) {
    ticket.addAdult();
    adults--;
  }

  return adults;
}

function createTicketsForChildren(tickets, children) {
  if (children == 0) {
    return tickets;
  }

  if (tickets.length == 0) {
    children = addChildTicket(tickets, children);
  }

  if (tickets)
    while (children > 0) {
      const lastTicket = tickets[tickets.length - 1];

      if (lastTicket.getEmptySeats() >= children) {
        children = fillSeatsWithChildren(lastTicket, children);
      } else {
        children = addChildTicket(tickets, children);
        children = fillSeatsWithChildren(lastTicket, children);
      }
    }

  return tickets;
}

function addChildTicket(tickets, children) {
  const ticket = new Ticket();
  ticket.addChild();
  children--;
  children = fillFreeSeats(ticket, children);

  tickets.push(ticket);

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

  getEmptySeats() {
    return 5 - this.getPassengerCount();
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
