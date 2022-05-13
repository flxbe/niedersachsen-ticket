const inputForm = document.getElementById("form");
const adultInput = document.getElementById("adults");
const childrenInput = document.getElementById("children");
const typeInputs = document.getElementsByName("type");

const summaryContainer = document.getElementById("summary");
const ticketContainer = document.getElementById("tickets");

inputForm.onsubmit = (event) => {
  const adults = parseInt(adultInput.value);
  const children = parseInt(childrenInput.value);
  const type = getType();

  const tickets = calculateTickets(adults, children);
  printSummary(tickets, type);
  printTickets(tickets, type);

  return false;
};

function getType() {
  for (const typeInput of typeInputs) {
    if (typeInput.checked) {
      return typeInput.value;
    }
  }

  console.error("Could not find active typeInput");
  return "default";
}

function printTickets(tickets, type) {
  ticketContainer.innerHTML = "";

  for (const ticket of tickets) {
    ticketNode = printTicket(ticket, type);
    ticketContainer.appendChild(ticketNode);
  }
}

function printTicket(ticket, type) {
  const ticketNode = document.createElement("div");
  ticketNode.className = "col-md-6 col-lg-4 mb-3";

  const normalPassengersHtml = ticket.seats
    .map(function (seat) {
      if (seat === "CHILD") return printChild();
      return printAdult();
    })
    .join("");
  const freePassengersHtml = printChild().repeat(
    ticket.getFreePassengerCount()
  );

  const ticketPrice = getTicketPrice(ticket, type);

  ticketNode.innerHTML = `
    <div class="card bg-light">
      <div class="card-body">
        <h5 class="text-dark">
          Ticket
          <span class="ml-1 font-weight-light text-secondary">${formatCurrency(
            ticketPrice
          )}</span>
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

const BASE_PRICE = {
  default: 24,
  plusOstharz: 33,
  plusGroningen: 30,
};

const INC_PRICE = {
  default: 5,
  plusOstharz: 9,
  plusGroningen: 6.5,
};

function getTicketPrice(ticket, type) {
  if (ticket.isEmpty()) return 0;
  else {
    return (
      BASE_PRICE[type] + INC_PRICE[type] * (ticket.getPassengerCount() - 1)
    );
  }
}

function printSummary(tickets, type) {
  let price = 0;

  for (let ticket of tickets) {
    price += getTicketPrice(ticket, type);
  }

  summaryContainer.innerHTML = `
    <h3 class="text-dark">
      <span class="badge badge-danger mr-1">${tickets.length}</span>
      Ticket${tickets.length > 1 ? "s" : ""}
      <span class="text-secondary font-weight-light ml-1">${formatCurrency(
        price
      )}</span>
    </h3>
  `;
}

function formatCurrency(value) {
  return value.toLocaleString("de-DE", { style: "currency", currency: "EUR" });
}
