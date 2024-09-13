import { backapi } from "../backapi";

class SalesGetService {
  Get = async (params: any): Promise<any | false> => {

    const config = {
      headers: params,  
    };
    const response = await backapi.get(`/sales`, config);
    return response;
  };
}

const postBrokerLead = new SalesGetService();
export default postBrokerLead;
