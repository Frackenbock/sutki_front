import fetchWrapper from "./fetchWrapper";

class apiLogs {
  getDataForLogsVirab(data) {
    return fetchWrapper(`logs/getvirablogs`, {
      method:'POST',
      body:JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
  geleteAllDataLogsVirab() {
    return fetchWrapper(`logs/deletevirablogs`, {
      method:'DELETE',
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

};
export default apiLogs;
