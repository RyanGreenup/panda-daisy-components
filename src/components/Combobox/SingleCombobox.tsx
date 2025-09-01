import { Combobox } from "@kobalte/core/combobox";

// @ts-ignore
import Check from "lucide-solid/icons/check";
import { createSignal, For, createEffect, JSX } from "solid-js";

// @ts-ignore
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { comboboxStyles } from "./style";

const styles = comboboxStyles();

interface SingleComboboxProps {
  options: string[];
  placeholder?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  ref?: (el: HTMLInputElement) => void;
}

export function SingleCombobox(props: SingleComboboxProps): JSX.Element {
  const [value, setValue] = createSignal(props.value || "");

  // Sync internal state with prop changes
  createEffect(() => {
    setValue(props.value || "");
  });

  const handleChange = (newValue: string | null) => {
    const val = newValue || "";
    setValue(val);
    props.onChange?.(val);
  };

  return (
    <div style={{ width: "100%", "max-width": "20rem" }}>
      <Combobox<string>
        multiple={false}
        options={props.options}
        value={value()}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        triggerMode="manual"
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
          class={styles.control}
          aria-label={props.label || "Selection"}
        >
          {(state) => (
            <>
              <div class={styles.inputContainer}>
                <Combobox.Input ref={props.ref} class={styles.input} />
              </div>
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
    </div>
  );
}
