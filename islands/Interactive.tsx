import { asset, Head } from "$fresh/runtime.ts";

interface InteractiveProps {
  src: string;
}

export default function Interactive(props: InteractiveProps) {
  const keypress = (e, src: string) => {
    if (e.code === "Enter") {
      window.location.assign(`/interactive?path=${src}`);
    }
  };
  return (
    <iframe
      onKeyPress={(e) => keypress(e, props.src)}
      loading="lazy"
      src={`/api/interactive/${props.src}/index.html`}
    />
  );
}
