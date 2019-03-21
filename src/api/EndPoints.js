export const signUpUrl = ()=>{
    return "http://localhost:3001/signUp";
};

export const validateEmailUrl = ()=>{
    return "http://127.0.0.1:8080/user/validateEmail"
};

export const createUserUrl = ()=>{
    return "http://127.0.0.1:8080/user/create"
}
export const AppUser = {
    baseURL:"http://127.0.0.1:8080",
    verifyPassword:"/user/verifyPassword"
};

export const DustbinRestController = {
    baseURL:"http://127.0.0.1:8080",
    addUrl:"/dustbin/add",
    getAllUrl:"/dustbin/all",
    findByDateUrl:"/dustbin/findByDate",
    findStatsInfoUrl:"/dustbin/stats",
    generateRoutesUrl:"/dustbin/solve"
};

export const VehicleController ={
    baseURL:"http://127.0.0.1:8080",
    fetchVehicleInfoUrl : "/vehicle/getRoutes"
}




