import {
  createPeerCondition,
  createPeerId,
  PeerName,
} from "../../../presets/layout/layout";
import { children, JSX, splitProps } from "solid-js";
import { cx, css } from "../../../../styled-system/css";

export const InputHidden = (props: { name: PeerName }) => {
  return (
    <input
      type="checkbox"
      id={createPeerId(props.name)}
      data-peer={props.name}
      class={css({
        srOnly: true,
      })}
    />
  );
};

export const Label = (
  props: JSX.IntrinsicElements["label"] & { name: PeerName },
) => {
  const [local, others] = splitProps(props, ["class", "children", "name"]);
  const safeChildren = children(() => local.children);

  return (
    <label
      {...others}
      for={createPeerId(local.name)}
      class={cx(css({ userSelect: "none" }), local.class)}
    >
      {safeChildren()}
    </label>
  );
};
