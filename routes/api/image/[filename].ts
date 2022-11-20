import { HandlerContext } from "$fresh/server.ts";
import { exists } from "../../../services/exists.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Image } from "https://deno.land/x/imagescript/mod.ts";

const { IMAGE_DIR } = config();

export const handler = async (
  request: Request,
  ctx: HandlerContext,
): Promise<Response> => {
  let fileToReturn;
  const imagePath = `${IMAGE_DIR}/${ctx.params.filename}`;
  const imageThumbPath = `cache/${ctx.params.filename}`;
  
  if (await exists(imageThumbPath)) {
    fileToReturn = await Deno.readFile(imageThumbPath);
  } else {
    const image = await Image.decode(await Deno.readFile(new URL(imagePath, import.meta.url)));
    image.resize(400, Image.RESIZE_AUTO);
    fileToReturn = await image.encodeJPEG(90);
    await Deno.writeFile(imageThumbPath, fileToReturn);
  }

  return new Response(fileToReturn, {
    status: 200,
    headers: {
      "content-type": "image/jpeg",
    },
  });
};
