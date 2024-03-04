import { commonrequest }  from "./APIcall";
import { BACKEND_URL } from "./helper";


export const compileSourceCode = async(data) => {
    return await commonrequest("POST", `${BACKEND_URL}/api/compile`, data)
}

