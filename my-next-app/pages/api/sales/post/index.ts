import type { NextApiRequest, NextApiResponse } from "next";
import Post from "../../../../services/sales/post.service"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const response = await Post.Post(req.body, req.headers);
      res.status(200).json(response.data);
    } catch (error: any) {
      res.status(422).json(error?.response?.data);
    }
  }
}
