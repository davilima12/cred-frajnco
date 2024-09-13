import type { NextApiRequest, NextApiResponse } from "next";
import Logout from "../../../../services/auth/logout.service";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await Logout.Logout(req.headers);

      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(422).json(error?.response?.data);
    }
  }
}
