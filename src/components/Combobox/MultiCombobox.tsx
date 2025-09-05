import { Combobox, ComboboxTriggerMode } from "@kobalte/core/combobox";
// @ts-ignore
import Check from "lucide-solid/icons/check";
// @ts-ignore
import X from "lucide-solid/icons/x";
import { createSignal, For, JSXElement, Show, JSX } from "solid-js";
import { Transition } from "solid-transition-group";

import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { comboboxStyles } from "./style";
import { css, cx } from "../../../styled-system/css";

const styles = comboboxStyles();

interface MultiComboboxProps {
  options: string[];
  placeholder?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
  triggerMode?: ComboboxTriggerMode;
}

export function MultiCombobox(props: MultiComboboxProps): JSX.Element {
  const [value, setValue] = createSignal(props.value || []);

  const handleChange = (newValue: string[]) => {
    setValue(newValue);
    props.onChange?.(newValue);
  };

  return (
    <div style={{ width: "100%", "max-width": "20rem" }}>
      <Combobox<string>
        multiple={true}
        options={props.options}
        value={value()}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        triggerMode={props.triggerMode ?? "input"}
        itemComponent={(itemProps) => (
          <Combobox.Item item={itemProps.item} class={styles.item}>
            <Combobox.ItemLabel>{itemProps.item.rawValue}</Combobox.ItemLabel>
            <Combobox.ItemIndicator class={styles.itemIndicator}>
              <Check class={styles.icon} />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        )}
      >
        <Combobox.Control<string>
          class={cx(styles.control, styles.controlMulti)}
          aria-label={props.label || "Selection"}
        >
          {(state) => (
            <>
              <div class={cx(styles.inputContainer, css({px: "0.25rem", py: "0.5rem" }))}>
                <For each={state.selectedOptions()}>
                  {(option) => (
                    <span
                      class={styles.tag}
                      onPointerDown={(e) => e.stopPropagation()}
                    >
                      {option}
                      <button
                        class={styles.tagButton}
                        onClick={() => state.remove(option)}
                        type="button"
                      >
                        <X class="w-3 h-3" />
                      </button>
                    </span>
                  )}
                </For>
                <Combobox.Input ref={props.ref} class={styles.input} />
              </div>
              <TransitionAnim>
                <Show when={state.selectedOptions().length > 0}>
                  <button
                    class={`${styles.clearButton} transition-all duration-200 ease-out`}
                    onPointerDown={(e) => e.stopPropagation()}
                    onClick={state.clear}
                    type="button"
                  >
                    <X class={styles.icon} />
                  </button>
                </Show>
              </TransitionAnim>
              <Combobox.Trigger class={styles.trigger}>
                <Combobox.Icon>
                  <ChevronsUpDown class={styles.icon} />
                </Combobox.Icon>
              </Combobox.Trigger>
            </>
          )}
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class={styles.content}>
            <Combobox.Listbox class={styles.listbox} />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>

      <p class={styles.description}>Selected: {value().join(", ") || "None"}</p>
    </div>
  );
}

const TransitionAnim = (props: { children: JSXElement }) => (
  <Transition
    enterClass="opacity-0 scale-75 -translate-x-2"
    enterToClass="opacity-100 scale-100 translate-x-0"
    exitClass="opacity-100 scale-100 translate-x-0"
    exitToClass="opacity-0 scale-75 -translate-x-2"
    enterDuration={200}
    exitDuration={150}
  >
    {props.children}
  </Transition>
);
