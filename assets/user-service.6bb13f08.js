import{a as e,g as r}from"./settings-service.24687b8f.js";class o{getAll(){return e.get(`${r()}users`).then(({data:s})=>s)}assignPoints(s,t){return e.put(`${r()}users/assignPoints/${s}`,{coins:t}).then(({data:a})=>a)}}export{o as U};
