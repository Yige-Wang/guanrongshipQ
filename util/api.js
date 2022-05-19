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
export function shipDynamicsAdd(params){
	return request("shipDynamics/create","POST",params);
}
export function shipBasicInformationAll(params){
	return request("shipBasicInformation/findAll","GET",params);
}
export function shipBasicInformationList(params){
	return request("shipBasicInformation/list","GET",params);
}