import { HandlerContext } from "$fresh/server.ts";
import { exists } from "../../../services/exists.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const { INTERACTIVE_DIR } = config();

export const handler = async (
  request: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  let fileToReturn;
  const indexFile = `${INTERACTIVE_DIR}/${ctx.params.folder}`;
  if (await exists(indexFile)) {
    fileToReturn = await Deno.readFile(indexFile);
  }

  return new Response(fileToReturn, {
    status: 200,
    headers: {
      "content-type": "text/html",
    },
  });
};
