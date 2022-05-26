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
export function shipDynamicsDelete(params){
	return request("shipDynamics/delete","GET",params);
}
export function shipBasicInformationFindById(params){
	return request("/shipBasicInformation/findById","GET",params);
}
export function getLocation(params){
	return request("/shipBasicInformation/getLocation","GET",params);
}
export function shipBasicInformationUpdate(params){
	return request("/shipBasicInformation/update","POST",params);
}
export function shipBasicInformationAdd(params){
	return request("/shipBasicInformation/creat","POST",params);
}
export function shipBasicDelete(params){
	return request("/shipBasicInformation/delete","GET",params);
}
export function crewList(params){
	return request("/crew/list","GET",params);
}
export function crewFindById(params){
	return request("/crew/findById","GET",params);
}
export function crewUpdate(params){
	return request("/crew/update","POST",params);
}
export function crewAdd(params){
	return request("/crew/create","POST",params);
}
export function crewDelete(params){
	return request("/crew/delete","GET",params);
}