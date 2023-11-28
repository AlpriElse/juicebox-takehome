const BASE_URL = "/v1/news";

export function getTopNews() {
  return fetch(`${BASE_URL}/top`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });
}

export function getNewsContent(url) {
  return fetch(`${BASE_URL}/content`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url,
    }),
  }).then((res) => {
    return res.json();
  });
}
