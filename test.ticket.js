const expect = chai.expect;

describe("filling tickets", () => {
  describe("for 5 adults and 3 children", () => {
    it("should fill exactly one ticket", () => {
      const adults = 5;
      const children = 1;

      const tickets = calculateTickets(adults, children);

      expect(tickets).to.have.lengthOf(1);
    });
  });
});
