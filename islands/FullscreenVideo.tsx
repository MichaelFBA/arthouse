import { asset, Head } from "$fresh/runtime.ts";
import { useEffect, useState } from "preact/hooks";

interface FullscreenProps {
  videos: string[];
  current: string | null;
}

export default function FullscreenVideo(props: FullscreenProps) {
  let [progress, setProgress] = useState(0);
  const total = 100;

  // useEffect(() => {
  //   if (progress <= total + 1) {
  //     window.requestAnimationFrame(() => {
  //       setProgress(progress + 0.1);
  //       if (progress >= total) {
  //         navigate(next());
  //       }
  //     });
  //   }
  // }, [progress]);

  // Move image
  window.addEventListener("keydown", (event) => {
    if (event.code === "ArrowLeft") {
      navigate(previous());
    }
    if (event.code === "ArrowRight") {
      navigate(next());
    }
    if (event.code === "Backspace") {
      window.location.assign('/')
    }
  });
  const getIndex = () =>
    props.videos.findIndex((fileName) => fileName === props.current);
  const navigate = (pageIndex: number) =>
    window.location.assign(`/dynamic?filename=${props.videos.at(pageIndex)}`);
  const previous = () =>
    getIndex() === 0 ? props.videos.length - 1 : getIndex() - 1;
  const next = () => props.videos.length === getIndex() ? 0 : getIndex() + 1;

  return (
    <>
      <Head>
        <link rel="stylesheet" href={asset("/styles/fullscreen.css")} />
      </Head>
      <main class="fullscreen">
        <div class="fullscreen__progress" style={`width: ${progress}%`}></div>
        <video
          class="fullscreen__video"
          src={`/api/video/${props.current}`}
          autoPlay
          loop
        ></video>
      </main>
    </>
  );
}
