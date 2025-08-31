import { JSX } from "solid-js";
import { InputHidden, Label } from "./utilities/PeerInputs";
import { PeerName } from "../../presets/layout/layout";

export interface ToggleButtonProps extends Omit<JSX.LabelHTMLAttributes<HTMLLabelElement>, "for"> {
  name: PeerName;
  children?: JSX.Element;
}

export const ToggleButton = (props: ToggleButtonProps) => {
  return (
    <>
      <InputHidden name={props.name} />
      <Label {...props}>
        {props.children}
      </Label>
    </>
  );
};

export const DrawerToggle = (props: Omit<ToggleButtonProps, "name">) => (
  <ToggleButton name="drawer" {...props} />
);

export const NavbarToggle = (props: Omit<ToggleButtonProps, "name">) => (
  <ToggleButton name="navbar" {...props} />
);

export const RightDrawerToggle = (props: Omit<ToggleButtonProps, "name">) => (
  <ToggleButton name="rightDrawer" {...props} />
);

export const BtmDrawerToggle = (props: Omit<ToggleButtonProps, "name">) => (
  <ToggleButton name="btmDrawer" {...props} />
);

export const BtmDashToggle = (props: Omit<ToggleButtonProps, "name">) => (
  <ToggleButton name="btmDash" {...props} />
);