import fetchWrapper from "./fetchWrapper";

class fetchRaport {
  getAllDataRaport(date) {
    return fetchWrapper(`raport/getalldataraport`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  saveAllDataRaport(date) {
    return fetchWrapper(`raport/savealldataraport`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };


};

export default fetchRaport;
