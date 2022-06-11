import axios from "axios";
import { getBaseUrl } from "./settings-service";

export default class MissionServices {
    addMission(name, state, reward) {
        return axios.post(`${getBaseUrl()}missions/`, {
            name: name,
            state: state,
            reward: reward,
        }).then(({ data }) => data);
    }
    updateMission(name, state) {
        return axios.put(`${getBaseUrl()}missions/${name}`, {
            state: state,
        }).then(({ data }) => data);
    }
    getMission(name) {
        return axios.get(`${getBaseUrl()}missions/${name}`).then(({ data }) => data);
    }
}
