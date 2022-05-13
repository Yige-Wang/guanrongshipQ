import request from "./request.js";

export function login(params) {
	return request("admin/login", "POST", params);
}
export function shipDynamicsList(params){
	return request("shipDynamics/list","GET",params);
}