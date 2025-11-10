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


//--------------------------------authorised user-------------------------


//apply job
export const addApplicationAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/apply-job`, reqBody, reqHeader)
}

//view-service-api
export const getAllUserServicesAPI = async (searchKey) => {
    return await commonAPI("GET", `${SERVERURL}/all-services?search=${searchKey}`)
}

//view-details-api
export const getServiceDetailsAPI = async (serviceId, reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/service/${serviceId}/details`, {}, reqHeader)
}

//get services for booking 
export const getServicesBookingAPI = async () => {
    return await commonAPI("GET", `${SERVERURL}/services`)
}

//-booking-api
export const addBookingAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/make-bookings`, reqBody, reqHeader)
}


//emergency-service-api


//authorised users- user



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

//update services
export const updateServiceAPI = async (serviceId,reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/update-service/${serviceId}`, reqBody, reqHeader)
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

//get job applications api
export const getAllApplicationsAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/job-application/view`,{},reqHeader)
}

//update application status api
export const updateApplicationStatusAPI = async (jobId,reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/application/status/${jobId}`, reqBody, reqHeader)
}

//update profile
export const updateAdminProfileAPI = async (reqBody, reqHeader) => {
    return await commonAPI("PUT", `${SERVERURL}/admin-profile/edit`, reqBody, reqHeader)
}

//view users
export const getAllUsersAdminAPI = async (searchKey,reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/admin/all-users?search=${searchKey}`, {}, reqHeader)
}

//add service provider
export const addProviderAPI = async (reqBody, reqHeader) => {
    return await commonAPI("POST", `${SERVERURL}/add-provider`, reqBody, reqHeader)
}

//get service provider
export const getAllProviderAPI = async (searchKey,reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-provider?search=${searchKey}`, {}, reqHeader)
}

//remove service provider
export const deleteProviderAPI = async (providerId, reqHeader) => {
    return await commonAPI("DELETE", `${SERVERURL}/remove/provider/${providerId}`, {}, reqHeader)
}

//update service provider
export const updateProviderAPI=async(providerId,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/update/provider/${providerId}`,reqBody,reqHeader)
}

//get all bookings
export const getAllBookingsAPI = async (searchKey,reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/all-bookings?search=${searchKey}`, {}, reqHeader)
}

//get providers -booking
export const getProviderBookingAPI = async (reqHeader) => {
    return await commonAPI("GET", `${SERVERURL}/booking-provider`, {}, reqHeader)
}

//assign provider -booking
export const assignProviderAPI=async(id,reqBody,reqHeader)=>{
    return await commonAPI("PUT",`${SERVERURL}/${id}/assign-provider`,reqBody,reqHeader)
}

//approve bookings

