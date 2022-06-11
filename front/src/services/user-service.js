import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class UserService {
	post(body) {
		return axios.post(`${getBaseUrl()}users`, body).then(({ data }) => data);
	}

	getAll() {
		return axios.get(`${getBaseUrl()}users`).then(({ data }) => data);
	}

	getPlayers(playerId) {
		return axios.get(`${getBaseUrl()}users/players/${playerId}`).then(({ data }) => data);
	}

	getOne(playerId) {
		return axios.get(`${getBaseUrl()}users/${playerId}`).then(({ data }) => data);
	}
}
