import fetchWrapper from "./fetchWrapper";

class fetchPbrAiiskue {
  getDataPower(date) {
    return fetchWrapper(`pbr_aiiskue/getdatapower`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataProduction(date){
    return fetchWrapper(`pbr_aiiskue/getdataproduction`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

};

export default fetchPbrAiiskue;
