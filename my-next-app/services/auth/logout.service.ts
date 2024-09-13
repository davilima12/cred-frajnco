import { backapi } from "../backapi";

class LogoutService {
  Logout = async (params: any): Promise<any | false> => {

    const config = {
      headers: params,  
    };

    const response = await backapi.post(`/logout`, {}, config);
    console.log("asda", response)
    return response;
  };
}

const postBrokerLead = new LogoutService();
export default postBrokerLead;
