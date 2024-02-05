import fetchWrapper from "./fetchWrapper";

class fetchAdmin {
  getDataUVB(data) {
    return fetchWrapper(`admin/getdatauvb`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  deleteUVBRecord(data){
    return fetchWrapper(`admin/deleterecorduvb`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  addUVBRecord(data){
    return fetchWrapper(`admin/addrecorduvb`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  getDataNapors(data) {
    return fetchWrapper(`admin/getdatanapors`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  deleteNaporRecord(data){
    return fetchWrapper(`admin/deleterecordnapor`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  addNaporRecord(data){
    return fetchWrapper(`admin/addrecordnapor`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataRashods(data){
    return fetchWrapper(`admin/getdatarashods`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

};


export default fetchAdmin;