describe("Sending request to server", () => {
  it("should return ok", async () => {
    const result = await postDeviceInfo();

    expect(result.status).to.equal(200);
  });
});
