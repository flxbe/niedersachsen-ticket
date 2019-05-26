const inputForm = document.getElementById("form");
const adultInput = document.getElementById("adults");
const childrenInput = document.getElementById("children");

const summaryContainer = document.getElementById("summary");
const ticketContainer = document.getElementById("tickets");

inputForm.onsubmit = event => {
  const adults = parseInt(adultInput.value);
  const children = parseInt(childrenInput.value);

  const tickets = calculateTickets(adults, children);
  printTickets(tickets);
  printSummary(tickets);

  return false;
};

function printTickets(tickets) {
  ticketContainer.innerHTML = "";

  for (const ticket of tickets) {
    ticketNode = printTicket(ticket);
    ticketContainer.appendChild(ticketNode);
  }
}

function printTicket(ticket) {
  const ticketNode = document.createElement("div");
  ticketNode.className = "col-md-6 col-lg-4 mb-3";

  const normalPassengersHtml = ticket.seats
    .map(function(seat) {
      if (seat === "CHILD") return printChild();
      return printAdult();
    })
    .join("");
  const freePassengersHtml = printChild().repeat(
    ticket.getFreePassengerCount()
  );

  ticketNode.innerHTML = `
    <div class="card bg-light">
      <div class="card-body">
        <h5 class="text-dark">
          Ticket
          <span class="ml-1 font-weight-light text-secondary">${getTicketPrice(
            ticket
          )}€</span>
        </h5>
        <hr />
        <div class="row">
          <div class="col">
            <h6 class="font-weight-light text-dark">${ticket.getPassengerCount()} Vollzahler</h6>
            ${normalPassengersHtml}
          </div>
          <div class="col">
            <h6 class="font-weight-light text-dark">${ticket.getFreePassengerCount()} Gratisplätze</h6>
            ${freePassengersHtml}
          </div>
        </div>
      </div>
    </div>
  `;

  return ticketNode;
}

function printAdult() {
  return `<img class="passenger-icon" src="./icons/iconfinder_user_1608727.png"/>`;
}

function printChild() {
  return `<img class="passenger-icon" src="./icons/iconfinder_child_1608628.png"/>`;
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

const BASE_PRICE = 24;
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
    <h3 class="text-dark">
      <span class="badge badge-danger mr-1">${tickets.length}</span>
      Ticket${tickets.length > 1 ? "s" : ""}
      <span class="text-secondary font-weight-light ml-1">${price}€</span>
    </h3>
  `;
}
