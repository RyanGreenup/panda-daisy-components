import { mergeProps } from "solid-js";

import { css } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { Button } from "../src/components/Button";

export interface HeaderProps {
  user?: { name: string } | undefined;
  onLogin: () => void;
  onLogout: () => void;
  onCreateAccount: () => void;
  [key: string]: any;
}

export const Header = (_props: HeaderProps) => {
  const props = mergeProps({ user: undefined }, _props);

  return (
    <header
      class={css({
        bg: "base.200",
        shadow: "md",
        border: "default",
      })}
    >
      <div
        class={css({
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "default",
          padding: "15px 20px",
        })}
      >
        <div
          class={css({
            display: "inline-block",
            verticalAlign: "top",
          })}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill="none" fill-rule="evenodd">
              <path
                d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z"
                fill="#FFF"
              />
              <path
                d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z"
                fill="#555AB9"
              />
              <path
                d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z"
                fill="#91BAF8"
              />
            </g>
          </svg>
          <h1
            class={css({
              display: "inline-block",
              verticalAlign: "top",
            })}
          >
            Acme
          </h1>
        </div>
        <div>
          {props.user ? (
            <>
              <span
                class={css({
                  mr: "10px",
                  color: "base.content",
                })}
              >
                Welcome, <b>{props.user.name}</b>!
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={props.onLogout}
                class={css({ ml: "10px" })}
              >
                Log Out
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                onClick={props.onLogin}
                class={css({ ml: "10px" })}
                variant="ghost"
              >
                Sign In
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={props.onCreateAccount}
                class={css({ ml: "10px" })}
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
