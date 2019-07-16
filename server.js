const endpoint = env.ENDPOINT_URL;
const fetchMode = env.FETCH_MODE || "same-origin";

async function postDeviceInfo() {
  const url = endpoint + "server/";

  let data = { platform: navigator.platform, userAgent: navigator.userAgent };

  return await fetch(url, {
    method: "POST",
    mode: fetchMode,
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  });
}

function setEndpoint() {
  return location.protocol + "//" + location.host + "/";
}
