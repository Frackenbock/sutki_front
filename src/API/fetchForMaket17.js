import fetchWrapper from "./fetchWrapper";

class Maket {
  sendMaketDataPost(data) {
    return fetchWrapper(`maket/sendmaket`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  sendMaketDataToBD(data) {
    return fetchWrapper(`maket/savemaket`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getMaketDataFromBD(data) {
    return fetchWrapper(`maket/getmaket`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataEmails() {
    return fetchWrapper(`maket/getemails`, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  addNewEmail(data) {
    return fetchWrapper(`maket/addnewemail`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  deleteEmail(data) {
    return fetchWrapper(`maket/deleteemail`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataPower(data) {
    return fetchWrapper(`maket/getproduction`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  saveNewIp(data) {
    return fetchWrapper(`maket/saveip`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  saveNewName(data) {
    return fetchWrapper(`maket/savename`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  saveNewPassw(data) {
    return fetchWrapper(`maket/savepassw`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getAllParams() {
    return fetchWrapper(`maket/getallparams`, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
export default Maket;
