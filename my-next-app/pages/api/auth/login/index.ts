import type { NextApiRequest, NextApiResponse } from "next";
import Login from "../../../../services/auth/login.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await Login.Login(req.body);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.log('asdasda', error.response.data)
      res.status(422).json(error?.response?.data);
    }
  }
}
