// import { HandlerContext } from "$fresh/server.ts";
// import { exists } from "../../../services/exists.ts";
// import { config } from "https://deno.land/x/dotenv/mod.ts";
// import { Image } from "https://deno.land/x/imagescript/mod.ts";


// export const handler = async (
//   request: Request,
//   ctx: HandlerContext,
// ): Promise<Response> => {
//   let fileToReturn;
//   const imagePath = `${IMAGE_DIR}/${ctx.params.filename}`;
//   const imageThumbPath = `${IMAGE_DIR}/thumbnails/${ctx.params.filename}`;
  
//   if (await exists(imageThumbPath)) {
//     fileToReturn = await Deno.readFile(imageThumbPath);
//   } else {
//     const image = await Image.decode(await Deno.readFile(new URL(imagePath, import.meta.url)));
//     image.resize(2000, Image.RESIZE_AUTO);
//     fileToReturn = await image.encodeJPEG(90);
//     await Deno.writeFile(imageThumbPath, fileToReturn);
//   }

//   return new Response(fileToReturn, {
//     status: 200,
//     headers: {
//       "content-type": "image/jpeg",
//     },
//   });
// };


import { HandlerContext } from "$fresh/server.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
const { VIDEO_DIR } = config();


export const handler = async (
  request: Request,
  _ctx: HandlerContext,
): Promise<Response> => {
  const fileName = `${VIDEO_DIR}/${_ctx.params.filename}`;
  const range = request.headers.get("range");

  // const fileName = "../../static/demo.mp4";
  const videoSize = (await Deno.stat(new URL(fileName, import.meta.url))).size;
  if (!range) {
    const body = await Deno.readFile(new URL(fileName, import.meta.url));
    return new Response(body, {
      status: 206,
      headers: {
        "content-length": `${videoSize}`,
        "content-type": "video/mp4",
      },
    });
  } else {
    let [start, end] = range.replace(/bytes=/, "").split("-");
    start = parseInt(start, 10);
    end = end ? parseInt(end, 10) : videoSize - 1;
    const maxChunk = 1024 * 1024;
    if ((end - start + 1) > maxChunk) {
      end = start + maxChunk - 1;
    }

    let seek;
    if (start === 0) {
      seek = Deno.SeekMode.Start;
    } else if (end === videoSize - 1) {
      seek = Deno.SeekMode.End;
    } else {
      seek = Deno.SeekMode.Current;
    }

    const file = await Deno.open(new URL(fileName, import.meta.url), {
      read: true,
    });
    await Deno.seek(file.rid, start, seek);
    const content = new Uint8Array(end - start + 1);
    await file.read(content);
    file.close();

    return new Response(content, {
      status: 206,
      headers: {
        "content-range": `bytes ${start}-${end}/${videoSize}`,
        "accept-ranges": "bytes",
        "content-length": `${(end - start) + 1}`,
        "content-type": "video/mp4",
      },
    });
  }
};
