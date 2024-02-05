import fetchWrapper from "./fetchWrapper";

class fetchPbrAiiskue {
  getDataPbr(date) {
    return fetchWrapper(`pbr/getdatapbr`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

export default fetchPbrAiiskue;
