import { backapi } from "../backapi";

class UsersGetService {
  Get = async (params: any): Promise<any | false> => {

    const config = {
      headers: params,  
    };
    console.log(config)
    const response = await backapi.get(`/users`, config);

    return response;
  };
}

const postBrokerLead = new UsersGetService();
export default postBrokerLead;
