import { asset, Head } from "$fresh/runtime.ts";
import Interactive from "../islands/Interactive.tsx";
import Image from "../islands/Image.tsx";
import Video from "../islands/Video.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";

export const handler: Handlers<Record<string, string[]> | null> = {
  async GET(_, ctx) {
    const images = await (await fetch(`http://localhost:8000/api/list-images`))
      .json();
    const videos = await (await fetch(`http://localhost:8000/api/list-videos`))
      .json();
    const interactive =
      await (await fetch(`http://localhost:8000/api/list-interactive`)).json();
    return ctx.render({
      images,
      videos,
      interactive,
    });
  },
};

export default function Home(ctx: PageProps<Record<string, string[]>>) {
  const { data: { images, videos, interactive } } = ctx;
  return (
    <>
      <Head>
        <title>Art House</title>
        <link rel="stylesheet" href={asset("/styles/global.css")} />
        <link
          rel="stylesheet"
          href={asset(
            "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200",
          )}
        />
        <script type="module" src={asset("/scripts/navigation.js")}></script>
      </Head>

      <section>
        <header>
          <h2>Static</h2>
        </header>

        <ul class="horizontal-media-scroller">
          {images.map((imageSrc) => (
            <li>
              <a href="#">
                <figure>
                  <picture>
                    <Image src={imageSrc} />
                  </picture>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <header>
          <h2>Dynamic</h2>
        </header>

        <ul class="horizontal-media-scroller">
          {videos.map((videoSrc) => (
            <li>
              <a href="#">
                <figure>
                  <Video src={videoSrc} />
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <header>
          <h2>Static</h2>
        </header>

        <ul class="horizontal-media-scroller">
          {images.map((imageSrc) => (
            <li>
              <a href="#">
                <figure>
                  <picture>
                    <Image src={imageSrc} />
                  </picture>
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* <section>
        <header>
          <h2>Interactive</h2>
        </header>

        <ul class="horizontal-media-scroller">
          {interactive.map((interactiveSrc) => (
            <li>
              <a href="#">
                <figure>
                  <Interactive src={interactiveSrc} />
                </figure>
              </a>
            </li>
          ))}
        </ul>
      </section> */}
    </>
  );
}
