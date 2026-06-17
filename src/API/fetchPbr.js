import fetchWrapper from "./fetchWrapper";

class fetchPbr {
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

export default fetchPbr;
