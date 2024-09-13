import { backapi } from "../backapi";

class SalesPostService {
  Post = async (data: any, params: any): Promise<any | false> => {

    const config = {
      headers: {
        Authorization: params.authorization, 
      },
    };

    const response = await backapi.post(`/sales`,data, config);

    return response;
  };
}

const postBrokerLead = new SalesPostService();
export default postBrokerLead;
