import fetchWrapper from "./fetchWrapper";

class fetchRaport {
  getDataPbr(date) {
    return fetchWrapper(`raport/getdatapbr`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};

export default fetchRaport;
