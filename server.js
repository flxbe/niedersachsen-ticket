const endpoint = "http://localhost:8000/";

async function request() {
  const url = endpoint;

  const result = await fetch(url, {
    method: "GET",
    // in mode no-cors the response object will always have status: 0, ok: false and message: '', https://stackoverflow.com/questions/40182785/why-fetch-return-a-response-with-status-0
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return result;
}
