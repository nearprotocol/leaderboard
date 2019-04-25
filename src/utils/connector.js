import axios from "axios";

export default class Connector {
  constructor() {
  }
  // returns promise to get that tasty data inside
  getDataFromAPI (url, id="") {
    return axios.get(url);
  }

  postDataToAPI (url, requestBody) {
  }
}