describe("Sending request to server", () => {
  it("should return ok", async () => {
    const test = 3;

    const result = await request();

    console.log("request", request);
    console.log("request: ", result);
    expect(test).to.equal(3);
  });
});
