import fetchWrapper from "./fetchWrapper";

class VSP {
  getDataForMagazineIntepol(data) {
    return fetchWrapper(`vsp/getdatavspmagazineinterpol`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  getDataForMagazineRecords(data) {
    return fetchWrapper(`vsp/getrecordsvsp`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  setEditedRecordDataForMagazine(data) {
    return fetchWrapper(`vsp/seteditedrecordsvsp`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  setDataForMagazine(data) {
    return fetchWrapper(`vsp/setdatarecordvsp`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataForVspRashodSutki(data) {
    return fetchWrapper(`vsp/getdataforrashod`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  deleteRecordMagazine(data) {
    return fetchWrapper(`vsp/deleterecordmagazine`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getDataForHourRecordsMagazine(data) {
    return fetchWrapper(`vsp/getdataforhourrecordsvsp`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  getAllInterpolationData() {
    return fetchWrapper(`vsp/getallinterpolationdata`, {
      method:'GET',
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  getUVBDataForMAgazine(data) {
    return fetchWrapper(`vsp/getuvbdatavormagazine`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
export default VSP;
