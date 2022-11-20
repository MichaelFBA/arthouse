import { asset, Head } from "$fresh/runtime.ts";

interface ImageProps {
  src: string;
}

export default function Video(props: ImageProps) {
  const keypress = (e, src: string) => {
    if (e.code === "Enter") {
      window.location.assign(`/dynamic?filename=${src}`);
    }
  };
  const focused = (e) => {
    e.target.play();
  };
  const blur = (e) => {
    e.target.pause();
  };
  return (
    <video
      onKeyPress={(e) => keypress(e, props.src)}
      onFocus={focused}
      onBlur={blur}
      class="item focusable"
      src={`/api/video/${props.src}`}
      muted
      loop
    />
  );
}
