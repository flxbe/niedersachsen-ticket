const endpoint = "http://localhost:8000/";

async function request() {
  const url = endpoint;

  const result = await fetch(url, {
    method: "GET",
    mode: "no-cors",
    headers: {
      "Content-Type": "application/json"
    }
  });

  return result;
}
