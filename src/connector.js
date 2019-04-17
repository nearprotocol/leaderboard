class Connector {
  constructor() {

  }
  // returns promise to get that tasty data inside
  getDataFromAPI (url, id="") {
    return axios.get(`${url}/${id}`);
  }

  postDataToAPI (url, requestBody) {
    return axios.post(`${url}`, requestBody);
  }
}