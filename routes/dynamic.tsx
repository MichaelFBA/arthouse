import { asset, Head } from "$fresh/runtime.ts";
import FullscreenVideo from "../islands/FullscreenVideo.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<string[] | null> = {
  async GET(_, ctx) {
    const videos = await (await fetch(`http://localhost:8000/api/list-videos`)).json();
    return ctx.render(videos);
  },
};

export default function Dynamic(ctx: PageProps<string[]>) {
  const { data } = ctx;
  const fileName = ctx.url.searchParams.get('filename')
  return (
    <>
      <Head>
        <title>Art House</title>
        <link rel="stylesheet" href={asset("/styles/global.css")} />
        <link rel="stylesheet" href={asset("https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200")} />
        <script src={asset("https://wicg.github.io/spatial-navigation/polyfill/spatial-navigation-polyfill.js")}></script>
      </Head>
        <FullscreenVideo
          videos={data}
          current={fileName}
        />
    </>
  );
}
