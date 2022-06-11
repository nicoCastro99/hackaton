import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class UserService {
	getAll() {
		return axios.get(`${getBaseUrl()}users`).then(({ data }) => data);
	}
}