import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class UserService {
	getAll() {
		return axios.get(`${getBaseUrl()}users`).then(({ data }) => data);
	}
  assignPoints(playerId, coins) {
		return axios.put(`${getBaseUrl()}users/assignPoints/${playerId}`, {"coins": coins}).then(({ data }) => data);
	}
}
