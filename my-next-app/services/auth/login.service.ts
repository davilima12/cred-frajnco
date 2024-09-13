import { backapi } from "../backapi";

class LoginService {
  Login = async (data: any): Promise<any | false> => {
    const response = await backapi.post(`/login`, data);
    return response;
  };
}

const postBrokerLead = new LoginService();
export default postBrokerLead;
