const expect = chai.expect;

describe("Creating a minimal ticket", () => {
  describe("with enough adults and children", () => {
    const adults = 1;
    const children = 3;

    const result = createMinimalTicket(adults, children);

    it("should use 1 adult and 3 children", () => {
      const { ticket } = result;

      expect(ticket.getPassengerCount()).to.equal(1);
      expect(ticket.isAdultSeat(0)).to.be.true;
      expect(ticket.getFreePassengerCount()).to.equal(3);
    });

    it("should return the correct amount of remaining adults", () => {
      const { adults } = result;

      expect(adults).to.equal(0);
    });

    it("should return the correct amount of remaining children", () => {
      const { children } = result;

      expect(children).to.equal(0);
    });
  });
});

describe("filling tickets", () => {
  describe("for 5 adults and 3 children", () => {
    const adults = 5;
    const children = 1;
    const tickets = calculateTickets(adults, children);

    it("should use only one ticket", () => {
      expect(tickets).to.have.lengthOf(1);
    });
  });

  describe("for 10 children", () => {
    const adults = 0;
    const children = 10;
    const tickets = calculateTickets(adults, children);

    it("should use two tickets", () => {
      expect(tickets).to.have.lengthOf(2);
    });

    it("should use all 6 free seats", () => {
      expect(tickets[0].getFreePassengerCount()).to.equal(3);
      expect(tickets[1].getFreePassengerCount()).to.equal(3);
    });
  });

  describe("for 4 adults and 6 children", () => {
    const adults = 4;
    const children = 6;
    const tickets = calculateTickets(adults, children);

    it("should use two tickets", () => {
      expect(tickets).to.have.lengthOf(2);
    });

    it("should use all 6 free seats", () => {
      expect(tickets[0].getFreePassengerCount()).to.equal(3);
      expect(tickets[1].getFreePassengerCount()).to.equal(3);
    });
  });
});
