import request from "./request.js";

export function login(params) {
	return request("admin/login", "POST", params);
}
export function shipDynamicsList(params){
	return request("shipDynamics/list","GET",params);
}

export function shipDynamicsfindById(params){
	return request("shipDynamics/findById","GET",params);
}
export function shipDynamicsUpdate(params){
	return request("shipDynamics/update","POST",params);
}