import type { NextApiRequest, NextApiResponse } from "next";
import Get from "../../../../services/sales/get.service"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      const response = await Get.Get(req.headers);
      res.status(200).json(response.data);
    } catch (error: any) {
      console.log('asdasda', error.response.data)
      res.status(422).json(error?.response?.data);
    }
  }
}
