import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class PropositionService {
	post(body) {
		return axios.post(`${getBaseUrl()}propositions`, body).then(({ data }) => data);
	}

	getLast() {
		return axios.get(`${getBaseUrl()}propositions/last`).then(({ data }) => data);
	}

	applyDecision(id, body) {
		return axios.put(`${getBaseUrl()}propositions/${id}`, body).then(({ data }) => data);
	}
}
