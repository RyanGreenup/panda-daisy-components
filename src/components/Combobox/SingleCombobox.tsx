import { Combobox } from "@kobalte/core/combobox";
// @ts-ignore
import Check from "lucide-solid/icons/check";
// @ts-ignore
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import { createSignal, createEffect, JSX } from "solid-js";
import { css } from "../../../styled-system/css";

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
      <Combobox
        options={props.options}
        value={value()}
        onChange={handleChange}
        placeholder={props.placeholder || "Search..."}
        itemComponent={itemProps => (
          <Combobox.Item 
            item={itemProps.item} 
            class={css({
              fontSize: '16px',
              color: 'gray.800',
              borderRadius: '4px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              height: '32px',
              px: '8px',
              cursor: 'pointer',
              outline: 'none',
              _hover: { bg: 'blue.500', color: 'white' },
              '&[data-highlighted]': { bg: 'blue.500', color: 'white' }
            })}
          >
            <Combobox.ItemLabel>{itemProps.item.rawValue}</Combobox.ItemLabel>
            <Combobox.ItemIndicator class={css({ w: '20px', h: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' })}>
              <Check class={css({ w: '16px', h: '16px' })} />
            </Combobox.ItemIndicator>
          </Combobox.Item>
        )}
      >
        <Combobox.Control 
          class={css({
            display: 'inline-flex',
            justifyContent: 'space-between',
            width: '200px',
            borderRadius: '6px',
            fontSize: '16px',
            bg: 'white',
            border: '1px solid',
            borderColor: 'gray.300',
            color: 'gray.800'
          })} 
          aria-label={props.label || "Selection"}
        >
          <Combobox.Input 
            ref={props.ref} 
            class={css({
              appearance: 'none',
              display: 'inline-flex',
              minWidth: '0',
              minHeight: '40px',
              pl: '16px',
              fontSize: '16px',
              bg: 'transparent',
              borderTopLeftRadius: '6px',
              borderBottomLeftRadius: '6px',
              outline: 'none',
              _placeholder: { color: 'gray.500' }
            })} 
          />
          <Combobox.Trigger 
            class={css({
              appearance: 'none',
              display: 'inline-flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none',
              borderTopRightRadius: '6px',
              borderBottomRightRadius: '6px',
              px: '10px',
              bg: 'gray.100',
              borderLeft: '1px solid',
              borderLeftColor: 'gray.300',
              color: 'gray.800',
              fontSize: '16px',
              cursor: 'pointer'
            })}
          >
            <Combobox.Icon class={css({ w: '20px', h: '20px' })}>
              <ChevronsUpDown />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content 
            class={css({
              bg: 'white',
              borderRadius: '6px',
              border: '1px solid',
              borderColor: 'gray.300',
              boxShadow: 'lg',
              zIndex: 50
            })}
          >
            <Combobox.Listbox 
              class={css({
                overflowY: 'auto',
                maxHeight: '360px',
                p: '8px',
                _focus: { outline: 'none' }
              })} 
            />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>
  );
}
