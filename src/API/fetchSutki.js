import fetchWrapper from "./fetchWrapper";

class fetchSutki {
  getDataGen(date) {
    return fetchWrapper(`sutki/getdatagen`, {
      method:'POST',
      body:JSON.stringify(date),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataRashod(data) {
    return fetchWrapper(`sutki/getdatarashod`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataTime(data) {
    return fetchWrapper(`sutki/getdatatime`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};


export default fetchSutki;