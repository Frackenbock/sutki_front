import fetchWrapper from "./fetchWrapper";

class fetchItog {
  getDataItog(date) {
    return fetchWrapper(`itog/getdataitog`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  saveDataItog(date) {
    return fetchWrapper(`itog/savetime`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};


export default fetchItog;