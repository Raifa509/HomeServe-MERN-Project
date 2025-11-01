import commonAPI from "./commonAPI";
import SERVERURL from "./server";


//------------------------------guest users----------------------------------

//-login api
export const loginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/login`, reqBody)
}
//-register api
export const registerAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/register`, reqBody)
}
//-google api
export const googleLoginAPI = async (reqBody) => {
    return await commonAPI("POST", `${SERVERURL}/google-login`, reqBody)
}

//get-career-api
export const getAllJobsUserAPI=async()=>{
    return await commonAPI("GET",`${SERVERURL}/all-jobs/openings`)
}


//service-api
//emergency-service-api


//authorised users- user

//-booking-api
//view-details-api
//profile update
//view all bookings


//------------------------------------authorised users- admin-------------------------


//add service-api - called by admin-service component
export const addServiceAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/add-service`, reqBody, reqHeader)
}
//view services
export const getAllAdminServicesAPI = async (search, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/admin/services?search=${search}`, {}, reqHeader)
}

//delete service
export const deleteAdminServiceAPI = async (serviceId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/admin/service/${serviceId}/delete`, {}, reqHeader)
}
//add career -api
export const addJobAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/add-job`, reqBody, reqHeader)
}

//get jobs-api
export const getAllJobsAPI = async (searchKey,reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-jobs?search=${searchKey}`,{},reqHeader)
}

//remove-job -api
export const deleteJobAPI = async (jobId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/remove/job/${jobId}`, {}, reqHeader)
}

//close-job -api
export const closeJobAPI = async (jobId, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/close-job/${jobId}`, {}, reqHeader)
}

//update profile
export const updateAdminProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/admin-profile/edit`, reqBody, reqHeader)
}

//view users
export const getAllUsersAdminAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/admin/all-users`, {}, reqHeader)
}

//approve bookings

