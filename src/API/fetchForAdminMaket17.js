import fetchWrapper from "./fetchWrapper";

class AdminPanelMaket {
  getMaketData(data) {
    return fetchWrapper(`adminmaket/getmaketdata`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
};
export default AdminPanelMaket;
