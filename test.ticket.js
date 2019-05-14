const expect = chai.expect;

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
});
