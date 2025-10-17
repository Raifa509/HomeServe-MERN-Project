import axios from "axios";
const commonAPI=async(httpMethod,url,reqBody,regHeader)=>{
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody,
        headers:regHeader
    }

    return await axios(reqConfig).then(res=>{
        return res
    }).catch(err=>{
        return err
    })
}

export default commonAPI