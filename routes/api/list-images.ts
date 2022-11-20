import { HandlerContext } from "$fresh/server.ts";
import { recursiveReaddir } from "../../services/read-directory.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { IMAGE_DIR } = config()

export const handler = async (
  request: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const files = await recursiveReaddir(IMAGE_DIR, ".jpg");

  const body = files.map((file: string) => {
    return file.split('/').at(-1)
  })
  return new Response(JSON.stringify(body), {
    status: 200,
    headers: {
      "content-type": "application/json",
    },
  });
};
