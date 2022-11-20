import { asset, Head } from "$fresh/runtime.ts";

interface ImageProps {
  src: string;
}

export default function Image(props: ImageProps) {
  const keypress = (e, src: string) => {
    if (e.code === "Enter") {
      window.location.assign(`/static?image=${src}`);
    }
  };
  return (
    <img
      onKeyPress={(e) => keypress(e, props.src)}
      loading="lazy"
      src={`/api/image/${props.src}`}
    />
  );
}
