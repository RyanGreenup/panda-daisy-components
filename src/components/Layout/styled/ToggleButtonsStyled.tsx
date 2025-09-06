import { JSX } from "solid-js";
import { css, cx } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { 
  ToggleButton, 
  DrawerToggle, 
  NavbarToggle, 
  RightDrawerToggle, 
  BtmDrawerToggle, 
  BtmDashToggle,
  ToggleButtonProps 
} from "../ToggleButtons";

const toggleItemStyles = {
  display: "flex",
  flexDirection: "column" as const,
  alignItems: "center",
  gap: "0.25rem",
  padding: "0.5rem",
  cursor: "pointer",
  fontSize: "xs",
  color: "base.content",
  opacity: 0.8,
  transition: "opacity 0.15s ease",
  "&:hover": {
    opacity: 1,
  },
};

const checkedStyle = {
  opacity: 1,
  color: "primary",
  backgroundColor: "primary/10",
  borderRadius: "sm",
};

export interface StyledToggleButtonProps extends ToggleButtonProps {
  variant?: "default";
}

export const ToggleButtonStyled = (props: StyledToggleButtonProps) => {
  const styledClass = css({
    ...toggleItemStyles,
  });

  return (
    <ToggleButton 
      {...props}
      class={cx(styledClass, props.class)}
    />
  );
};

export const DrawerToggleStyled = (props: Omit<StyledToggleButtonProps, "name">) => (
  <ToggleButtonStyled 
    name="drawer" 
    {...props}
    class={cx(
      css({
        ...toggleItemStyles,
        _drawerChecked: {
          ...checkedStyle,
        },
      }),
      props.class
    )}
  />
);

export const NavbarToggleStyled = (props: Omit<StyledToggleButtonProps, "name">) => (
  <ToggleButtonStyled 
    name="navbar" 
    {...props}
    class={cx(
      css({
        ...toggleItemStyles,
        _navbarChecked: {
          ...checkedStyle,
        },
      }),
      props.class
    )}
  />
);

export const RightDrawerToggleStyled = (props: Omit<StyledToggleButtonProps, "name">) => (
  <ToggleButtonStyled 
    name="rightDrawer" 
    {...props}
    class={cx(
      css({
        ...toggleItemStyles,
        _rightDrawerChecked: {
          ...checkedStyle,
        },
      }),
      props.class
    )}
  />
);

export const BtmDrawerToggleStyled = (props: Omit<StyledToggleButtonProps, "name">) => (
  <ToggleButtonStyled 
    name="btmDrawer" 
    {...props}
    class={cx(
      css({
        ...toggleItemStyles,
        _btmDrawerChecked: {
          ...checkedStyle,
        },
      }),
      props.class
    )}
  />
);

export const BtmDashToggleStyled = (props: Omit<StyledToggleButtonProps, "name">) => (
  <ToggleButtonStyled 
    name="btmDash" 
    {...props}
    class={cx(
      css({
        ...toggleItemStyles,
        _btmDashChecked: {
          ...checkedStyle,
        },
      }),
      props.class
    )}
  />
);