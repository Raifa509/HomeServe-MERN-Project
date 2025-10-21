import commonAPI from "./commonAPI";
import SERVERURL from "./server";
//guest users


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


//authorised users- admin
    //add career -api
    //update profile
    //view users
    //view services
    //approve bookings
     
