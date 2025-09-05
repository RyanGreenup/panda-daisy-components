import { Button } from "@ryangreenup/panda-daisy-components";
import { css } from "../../../styled-system/css";

export default function Home() {
  return (
    <div
      class={css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100dvh",
        bg: "base.100",
      })}
    >
      <Button variant="primary">Hello World!</Button>
    </div>
  );
}
