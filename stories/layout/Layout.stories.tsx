import type { Meta, StoryObj } from "storybook-solidjs-vite";
import { createSignal } from "solid-js";
// misc comment

// @ts-ignore
import Box from "lucide-solid/icons/box";
// @ts-ignore
import Menu from "lucide-solid/icons/menu";
// @ts-ignore
import PanelBottom from "lucide-solid/icons/panel-bottom";
// @ts-ignore
import PanelLeft from "lucide-solid/icons/panel-left";
// @ts-ignore
import PanelRight from "lucide-solid/icons/panel-right";

import { BtmDashStyled, Button, HamburgerIcon, LayoutContainer, Main, MainArea, NavbarContent, NavbarEnd, NavbarStart } from "@ryangreenup/panda-daisy-components";

import {
  BtmDash,
  BtmDashContainer,
  BtmDrawer,
  Navbar,
  RightSidebar,
  Sidebar,
} from "@ryangreenup/panda-daisy-components";
import { useResizeKeybindings } from "@ryangreenup/panda-daisy-components";
import { VirtualPhotoGrid } from "@ryangreenup/panda-daisy-components";

import {
  colors,
  ContentPlaceholder,
  DrawerPlaceHolder,
  LayoutButtons,
  MainContentPlaceholder,
  SidebarContainer,
  SidebarPlaceHolder,
} from "./PlaceholderComponents";

import { circle, flex } from "@ryangreenup/panda-daisy-components-styled-system/patterns";
import {
  BtmDrawerStyled,
  NavbarStyled,
  RightDrawerStyled,
  SidebarStyled,
} from "@ryangreenup/panda-daisy-components";
import { css } from "@ryangreenup/panda-daisy-components-styled-system/css";

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

export const StyledFullLayout: Story = {
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
        <NavbarStyled>
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
        </NavbarStyled>
        <MainArea >
          <SidebarStyled>
            <SidebarContainer>
              <SidebarPlaceHolder />
            </SidebarContainer>
          </SidebarStyled>
          <Main>
            <MainContentPlaceholder />
          </Main>
          {/* TODO RightSidebar should be renamed as RightDrawer */}
          <RightDrawerStyled>
            <SidebarContainer>
              <SidebarPlaceHolder />
            </SidebarContainer>
          </RightDrawerStyled>
          <BtmDrawerStyled class={colors[7]}>
            <DrawerPlaceHolder />
          </BtmDrawerStyled>
        </MainArea>
        <BtmDashStyled>
          <BtmDashContainer>
            <LayoutButtons />
          </BtmDashContainer>
        </BtmDashStyled>
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

export const PhotoGallery: Story = {
  render: () => {
    const [selectedPhoto, setSelectedPhoto] = createSignal<string | undefined>();

    // Generate demo photos from Lorem Picsum
    const photos = Array.from({ length: 1000 }, (_, i) => ({
      id: `photo-${i}`,
      url: `https://picsum.photos/300/200?random=${i}`,
      title: `Photo ${i + 1}`,
      date: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toLocaleDateString()
    }));

    return (
      <LayoutContainer>
        <Navbar class={css({ bg: "base.200", borderBottom: "1px solid", borderColor: "base.300" })}>
          <NavbarContent>
            <NavbarStart>
              <span class={css({ fontWeight: "bold", fontSize: "lg" })}>
                Photo Gallery
              </span>
            </NavbarStart>
            <NavbarEnd>
              <span class={css({ fontSize: "sm", color: "content.neutral" })}>
                {photos.length} photos
              </span>
            </NavbarEnd>
          </NavbarContent>
        </Navbar>
        <MainArea>
          <Main class={css({ p: 0 })}>
            <VirtualPhotoGrid
              photos={photos}
              height="calc(100vh - 80px)"
              selectedPhotoId={selectedPhoto()}
              onPhotoClick={(photo) => setSelectedPhoto(photo.id)}
              onPhotoDblClick={(photo) => {
                console.log("Opening photo:", photo.title);
                setSelectedPhoto(photo.id);
              }}
            />
          </Main>
        </MainArea>
      </LayoutContainer>
    );
  },
};
