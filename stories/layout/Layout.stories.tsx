import { css } from "../../styled-system/css";
import type { Meta, StoryObj } from "storybook-solidjs-vite";

import Box from "lucide-solid/icons/box";
import Menu from "lucide-solid/icons/menu";
import PanelBottom from "lucide-solid/icons/panel-bottom";
import PanelLeft from "lucide-solid/icons/panel-left";
import PanelRight from "lucide-solid/icons/panel-right";

import {
  BtmDash,
  BtmDashContainer,
  BtmDrawer,
  HamburgerIcon,
  LayoutContainer,
  Main,
  MainArea,
  Navbar,
  NavbarContent,
  NavbarEnd,
  NavbarStart,
  RightSidebar,
  Sidebar,
} from "../../src/components/Layout";
import { useResizeKeybindings } from "../../src/components/Layout/utilities/useResizeKeybindings";

import {
  colors,
  ContentPlaceholder,
  DrawerPlaceHolder,
  LayoutButtons,
  MainContentPlaceholder,
  SidebarContainer,
  SidebarPlaceHolder,
} from "./PlaceholderComponents";

import { circle, flex } from "../../styled-system/patterns";

const LayoutComponent = () => (
  <div>Layout Component - Use individual stories to see compositions</div>
);

const meta = {
  title: "Example/Layout/Compositions",
  component: LayoutComponent,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div class={css({ m: 4, minHeight: "90vh" })}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof LayoutComponent>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FullLayout: Story = {
  render: () => {
    const { isActive } = useResizeKeybindings({
      cssVariable: "--sizes-sidebar-width",
      minWidth: 200,
      maxWidth: 600,
      defaultWidth: 320,
      stepSize: 50,
    });

    return (
      <LayoutContainer>
        <Navbar class={colors[2]}>
          <NavbarContent>
            <NavbarStart>
              <HamburgerIcon name="drawer" />
            </NavbarStart>
            <NavbarContent>
              <LayoutButtons />
            </NavbarContent>
            <NavbarEnd>
              <div
                class={circle({
                  w: "8",
                  h: "8",
                  bgGradient: "to-r",
                  gradientFrom: "primary",
                  gradientTo: "secondary",
                })}
              ></div>
            </NavbarEnd>
          </NavbarContent>
        </Navbar>
        <MainArea class={css({ border: "4px solid orange" })}>
          <Sidebar class={colors[4]}>
            <SidebarContainer>
              <SidebarPlaceHolder />
            </SidebarContainer>
          </Sidebar>
          <Main class={colors[5]}>
            <MainContentPlaceholder />
          </Main>
          <RightSidebar class={colors[6]}>
            <SidebarContainer>
              <SidebarPlaceHolder />
            </SidebarContainer>
          </RightSidebar>
          <BtmDrawer class={colors[7]}>
            <DrawerPlaceHolder />
          </BtmDrawer>
        </MainArea>
        <BtmDash class={colors[8]}>
          <BtmDashContainer>
            <LayoutButtons />
          </BtmDashContainer>
        </BtmDash>
      </LayoutContainer>
    );
  },
};

export const MinimalLayout: Story = {
  render: () => (
    <LayoutContainer>
      <Navbar class={colors[2]}></Navbar>
      <MainArea>
        <Main class={css({ p: "6" })}>
          <div class={css({ textAlign: "center", py: "20" })}>
            <h1 class={css({ fontSize: "3xl", fontWeight: "bold", mb: 4 })}>
              Welcome to the App
            </h1>
            <p class={css({ color: "gray.600" })}>
              This is a minimal layout with just navbar and main content.
            </p>
          </div>
        </Main>
      </MainArea>
    </LayoutContainer>
  ),
};

export const WithSidebar: Story = {
  render: () => (
    <LayoutContainer>
      <Navbar class={colors[2]}>
        <NavbarContent>
          <NavbarStart>
            <HamburgerIcon name="drawer" />
            <span class={css({ ml: 2, fontWeight: "bold" })}>Dashboard</span>
          </NavbarStart>
        </NavbarContent>
      </Navbar>
      <MainArea>
        <Sidebar class={colors[4]}>
          <SidebarContainer>
            <div
              class={css({
                p: 2,
                fontWeight: "bold",
                borderBottom: "1px solid",
                borderColor: "gray.200",
              })}
            >
              Navigation
            </div>
            <ContentPlaceholder height="16" />
            <ContentPlaceholder height="16" />
            <ContentPlaceholder height="16" />
          </SidebarContainer>
        </Sidebar>
        <Main class={css({ p: "6" })}>
          <MainContentPlaceholder />
        </Main>
      </MainArea>
    </LayoutContainer>
  ),
};

export const WithBottomDash: Story = {
  render: () => (
    <LayoutContainer>
      <Navbar class={colors[2]}>
        <NavbarContent>
          <NavbarStart>
            <HamburgerIcon name="drawer" />
            <span class={css({ ml: 2, fontWeight: "bold" })}>Media Player</span>
          </NavbarStart>
        </NavbarContent>
      </Navbar>
      <MainArea>
        <Main class={css({ p: "6" })}>
          <MainContentPlaceholder />
        </Main>
      </MainArea>
      <BtmDash class={colors[8]}>
        <BtmDashContainer>
          <div class={css({ display: "flex", alignItems: "center", gap: 2 })}>
            <ContentPlaceholder height="10" width="10" />
            <span class={css({ fontSize: "sm" })}>Now Playing</span>
          </div>
          <div class={css({ display: "flex", gap: 2 })}>
            <ContentPlaceholder height="8" width="8" />
            <ContentPlaceholder height="8" width="8" />
            <ContentPlaceholder height="8" width="8" />
          </div>
        </BtmDashContainer>
      </BtmDash>
    </LayoutContainer>
  ),
};

export const CustomNavbar: Story = {
  render: () => {
    const grad = css.raw({
      bgGradient: "to-r",
      gradientFrom: "primary",
      gradientTo: "secondary",
    });
    return (
      <LayoutContainer>
        <Navbar class={css(grad)}>
          <NavbarContent>
            <NavbarStart>
              <HamburgerIcon name="DISABLED" />
              <div
                class={css({
                  ml: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                })}
              >
                <div
                  class={css({ w: 8, h: 8, bg: "white", rounded: "full" })}
                />
                <span class={css({ fontWeight: "bold", fontSize: "lg" })}>
                  Brand
                </span>
              </div>
            </NavbarStart>
          </NavbarContent>
        </Navbar>
        <MainArea>
          <Main
            class={css({
              p: "6",
            })}
          >
            <div class={css({ textAlign: "center", py: "20" })}>
              <h1
                class={css(
                  css.raw({
                    fontSize: "3xl",
                    fontWeight: "bold",
                    mb: 4,
                    backgroundClip: "text",
                    color: "transparent",
                  }),
                  grad,
                )}
              >
                Custom Branded Layout
              </h1>
              <p class={css({ color: "gray.600" })}>
                Example with custom navbar styling and branding.
              </p>
            </div>
          </Main>
        </MainArea>
      </LayoutContainer>
    );
  },
};

const toggleItemStyles = {
  display: "flex",
  flexDirection: "column",
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

