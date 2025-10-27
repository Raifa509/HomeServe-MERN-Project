import commonAPI from "./commonAPI";
import SERVERURL from "./server";


//------------------------------guest users----------------------------------

    //-login api
    export const loginAPI=async(reqBody)=>{
        return await commonAPI("POST",`${SERVERURL}/login`,reqBody)
    }
    //-register api
    export const registerAPI=async(reqBody)=>{
        return await commonAPI("POST",`${SERVERURL}/register`,reqBody)
    }
    //-google api
    export const googleLoginAPI=async(reqBody)=>{
        return await commonAPI("POST",`${SERVERURL}/google-login`,reqBody)
    }

    //service-api
    //emergency-service-api
    //career-api

//authorised users- user

    //-booking-api
    //view-details-api
    //profile update
    //view all bookings


//------------------------------------authorised users- admin-------------------------


    //add service-api - called by admin-service component
    export const addServiceAPI=async(reqBody,reqHeader)=>{
        return await commonAPI("POST",`${SERVERURL}/add-service`,reqBody,reqHeader)
    }
    //view services
    export const getAllAdminServicesAPI=async(search,reqHeader)=>{
        return await commonAPI("GET",`${SERVERURL}/admin/services?search=${search}`,{},reqHeader)
    }
    
    //delete service
    export const deleteAdminServiceAPI=async(serviceId,reqHeader)=>{
        return await commonAPI("DELETE",`${SERVERURL}/admin/service/${serviceId}/delete`,{},reqHeader)
    }
    //add career -api
    //update profile
    //view users
 
    //approve bookings
     
