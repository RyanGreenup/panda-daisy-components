import { For, Show, children, createEffect, createMemo, createSignal, onCleanup, onMount, splitProps } from "solid-js";
import { css, cva, cx, sva } from "@ryangreenup/panda-daisy-components-styled-system/css";
import { layout } from "@ryangreenup/panda-daisy-components-styled-system/recipes";
import { Combobox } from "@kobalte/core/combobox";
import Check from "lucide-solid/icons/check";
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import X from "lucide-solid/icons/x";
import { Transition } from "solid-transition-group";
import { styled } from "@ryangreenup/panda-daisy-components-styled-system/jsx";
import { createSolidTable, flexRender, getCoreRowModel, getFilteredRowModel, getSortedRowModel } from "@tanstack/solid-table";
import { createVirtualizer } from "@tanstack/solid-virtual";
import ChevronUp from "lucide-solid/icons/chevron-up";
import ChevronDown from "lucide-solid/icons/chevron-down";

//#region src/components/Layout/styles.ts
const classesFromRecipe = layout({
	storybook: true,
	btmDash: "mobileOnly"
});

//#endregion
//#region node_modules/@pandacss/dev/dist/index.mjs
function defineRecipe(config) {
	return config;
}
function defineSlotRecipe(config) {
	return config;
}
function definePreset(preset$1) {
	return preset$1;
}
function defineAnimationStyles(definition) {
	return definition;
}

//#endregion
//#region node_modules/@pandacss/preset-panda/dist/index.mjs
var breakpoints = {
	sm: "640px",
	md: "768px",
	lg: "1024px",
	xl: "1280px",
	"2xl": "1536px"
};
var containerSizes = {
	xs: "320px",
	sm: "384px",
	md: "448px",
	lg: "512px",
	xl: "576px",
	"2xl": "672px",
	"3xl": "768px",
	"4xl": "896px",
	"5xl": "1024px",
	"6xl": "1152px",
	"7xl": "1280px",
	"8xl": "1440px"
};
var keyframes$1 = {
	spin: { to: { transform: "rotate(360deg)" } },
	ping: { "75%, 100%": {
		transform: "scale(2)",
		opacity: "0"
	} },
	pulse: { "50%": { opacity: ".5" } },
	bounce: {
		"0%, 100%": {
			transform: "translateY(-25%)",
			animationTimingFunction: "cubic-bezier(0.8,0,1,1)"
		},
		"50%": {
			transform: "none",
			animationTimingFunction: "cubic-bezier(0,0,0.2,1)"
		}
	}
};
var animations = {
	spin: { value: "spin 1s linear infinite" },
	ping: { value: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite" },
	pulse: { value: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite" },
	bounce: { value: "bounce 1s infinite" }
};
var aspectRatios = {
	square: { value: "1 / 1" },
	landscape: { value: "4 / 3" },
	portrait: { value: "3 / 4" },
	wide: { value: "16 / 9" },
	ultrawide: { value: "18 / 5" },
	golden: { value: "1.618 / 1" }
};
var borders = { none: { value: "none" } };
var colors$1 = {
	current: { value: "currentColor" },
	black: { value: "#000" },
	white: { value: "#fff" },
	transparent: { value: "rgb(0 0 0 / 0)" },
	rose: {
		50: { value: "#fff1f2" },
		100: { value: "#ffe4e6" },
		200: { value: "#fecdd3" },
		300: { value: "#fda4af" },
		400: { value: "#fb7185" },
		500: { value: "#f43f5e" },
		600: { value: "#e11d48" },
		700: { value: "#be123c" },
		800: { value: "#9f1239" },
		900: { value: "#881337" },
		950: { value: "#4c0519" }
	},
	pink: {
		50: { value: "#fdf2f8" },
		100: { value: "#fce7f3" },
		200: { value: "#fbcfe8" },
		300: { value: "#f9a8d4" },
		400: { value: "#f472b6" },
		500: { value: "#ec4899" },
		600: { value: "#db2777" },
		700: { value: "#be185d" },
		800: { value: "#9d174d" },
		900: { value: "#831843" },
		950: { value: "#500724" }
	},
	fuchsia: {
		50: { value: "#fdf4ff" },
		100: { value: "#fae8ff" },
		200: { value: "#f5d0fe" },
		300: { value: "#f0abfc" },
		400: { value: "#e879f9" },
		500: { value: "#d946ef" },
		600: { value: "#c026d3" },
		700: { value: "#a21caf" },
		800: { value: "#86198f" },
		900: { value: "#701a75" },
		950: { value: "#4a044e" }
	},
	purple: {
		50: { value: "#faf5ff" },
		100: { value: "#f3e8ff" },
		200: { value: "#e9d5ff" },
		300: { value: "#d8b4fe" },
		400: { value: "#c084fc" },
		500: { value: "#a855f7" },
		600: { value: "#9333ea" },
		700: { value: "#7e22ce" },
		800: { value: "#6b21a8" },
		900: { value: "#581c87" },
		950: { value: "#3b0764" }
	},
	violet: {
		50: { value: "#f5f3ff" },
		100: { value: "#ede9fe" },
		200: { value: "#ddd6fe" },
		300: { value: "#c4b5fd" },
		400: { value: "#a78bfa" },
		500: { value: "#8b5cf6" },
		600: { value: "#7c3aed" },
		700: { value: "#6d28d9" },
		800: { value: "#5b21b6" },
		900: { value: "#4c1d95" },
		950: { value: "#2e1065" }
	},
	indigo: {
		50: { value: "#eef2ff" },
		100: { value: "#e0e7ff" },
		200: { value: "#c7d2fe" },
		300: { value: "#a5b4fc" },
		400: { value: "#818cf8" },
		500: { value: "#6366f1" },
		600: { value: "#4f46e5" },
		700: { value: "#4338ca" },
		800: { value: "#3730a3" },
		900: { value: "#312e81" },
		950: { value: "#1e1b4b" }
	},
	blue: {
		50: { value: "#eff6ff" },
		100: { value: "#dbeafe" },
		200: { value: "#bfdbfe" },
		300: { value: "#93c5fd" },
		400: { value: "#60a5fa" },
		500: { value: "#3b82f6" },
		600: { value: "#2563eb" },
		700: { value: "#1d4ed8" },
		800: { value: "#1e40af" },
		900: { value: "#1e3a8a" },
		950: { value: "#172554" }
	},
	sky: {
		50: { value: "#f0f9ff" },
		100: { value: "#e0f2fe" },
		200: { value: "#bae6fd" },
		300: { value: "#7dd3fc" },
		400: { value: "#38bdf8" },
		500: { value: "#0ea5e9" },
		600: { value: "#0284c7" },
		700: { value: "#0369a1" },
		800: { value: "#075985" },
		900: { value: "#0c4a6e" },
		950: { value: "#082f49" }
	},
	cyan: {
		50: { value: "#ecfeff" },
		100: { value: "#cffafe" },
		200: { value: "#a5f3fc" },
		300: { value: "#67e8f9" },
		400: { value: "#22d3ee" },
		500: { value: "#06b6d4" },
		600: { value: "#0891b2" },
		700: { value: "#0e7490" },
		800: { value: "#155e75" },
		900: { value: "#164e63" },
		950: { value: "#083344" }
	},
	teal: {
		50: { value: "#f0fdfa" },
		100: { value: "#ccfbf1" },
		200: { value: "#99f6e4" },
		300: { value: "#5eead4" },
		400: { value: "#2dd4bf" },
		500: { value: "#14b8a6" },
		600: { value: "#0d9488" },
		700: { value: "#0f766e" },
		800: { value: "#115e59" },
		900: { value: "#134e4a" },
		950: { value: "#042f2e" }
	},
	emerald: {
		50: { value: "#ecfdf5" },
		100: { value: "#d1fae5" },
		200: { value: "#a7f3d0" },
		300: { value: "#6ee7b7" },
		400: { value: "#34d399" },
		500: { value: "#10b981" },
		600: { value: "#059669" },
		700: { value: "#047857" },
		800: { value: "#065f46" },
		900: { value: "#064e3b" },
		950: { value: "#022c22" }
	},
	green: {
		50: { value: "#f0fdf4" },
		100: { value: "#dcfce7" },
		200: { value: "#bbf7d0" },
		300: { value: "#86efac" },
		400: { value: "#4ade80" },
		500: { value: "#22c55e" },
		600: { value: "#16a34a" },
		700: { value: "#15803d" },
		800: { value: "#166534" },
		900: { value: "#14532d" },
		950: { value: "#052e16" }
	},
	lime: {
		50: { value: "#f7fee7" },
		100: { value: "#ecfccb" },
		200: { value: "#d9f99d" },
		300: { value: "#bef264" },
		400: { value: "#a3e635" },
		500: { value: "#84cc16" },
		600: { value: "#65a30d" },
		700: { value: "#4d7c0f" },
		800: { value: "#3f6212" },
		900: { value: "#365314" },
		950: { value: "#1a2e05" }
	},
	yellow: {
		50: { value: "#fefce8" },
		100: { value: "#fef9c3" },
		200: { value: "#fef08a" },
		300: { value: "#fde047" },
		400: { value: "#facc15" },
		500: { value: "#eab308" },
		600: { value: "#ca8a04" },
		700: { value: "#a16207" },
		800: { value: "#854d0e" },
		900: { value: "#713f12" },
		950: { value: "#422006" }
	},
	amber: {
		50: { value: "#fffbeb" },
		100: { value: "#fef3c7" },
		200: { value: "#fde68a" },
		300: { value: "#fcd34d" },
		400: { value: "#fbbf24" },
		500: { value: "#f59e0b" },
		600: { value: "#d97706" },
		700: { value: "#b45309" },
		800: { value: "#92400e" },
		900: { value: "#78350f" },
		950: { value: "#451a03" }
	},
	orange: {
		50: { value: "#fff7ed" },
		100: { value: "#ffedd5" },
		200: { value: "#fed7aa" },
		300: { value: "#fdba74" },
		400: { value: "#fb923c" },
		500: { value: "#f97316" },
		600: { value: "#ea580c" },
		700: { value: "#c2410c" },
		800: { value: "#9a3412" },
		900: { value: "#7c2d12" },
		950: { value: "#431407" }
	},
	red: {
		50: { value: "#fef2f2" },
		100: { value: "#fee2e2" },
		200: { value: "#fecaca" },
		300: { value: "#fca5a5" },
		400: { value: "#f87171" },
		500: { value: "#ef4444" },
		600: { value: "#dc2626" },
		700: { value: "#b91c1c" },
		800: { value: "#991b1b" },
		900: { value: "#7f1d1d" },
		950: { value: "#450a0a" }
	},
	neutral: {
		50: { value: "#fafafa" },
		100: { value: "#f5f5f5" },
		200: { value: "#e5e5e5" },
		300: { value: "#d4d4d4" },
		400: { value: "#a3a3a3" },
		500: { value: "#737373" },
		600: { value: "#525252" },
		700: { value: "#404040" },
		800: { value: "#262626" },
		900: { value: "#171717" },
		950: { value: "#0a0a0a" }
	},
	stone: {
		50: { value: "#fafaf9" },
		100: { value: "#f5f5f4" },
		200: { value: "#e7e5e4" },
		300: { value: "#d6d3d1" },
		400: { value: "#a8a29e" },
		500: { value: "#78716c" },
		600: { value: "#57534e" },
		700: { value: "#44403c" },
		800: { value: "#292524" },
		900: { value: "#1c1917" },
		950: { value: "#0c0a09" }
	},
	zinc: {
		50: { value: "#fafafa" },
		100: { value: "#f4f4f5" },
		200: { value: "#e4e4e7" },
		300: { value: "#d4d4d8" },
		400: { value: "#a1a1aa" },
		500: { value: "#71717a" },
		600: { value: "#52525b" },
		700: { value: "#3f3f46" },
		800: { value: "#27272a" },
		900: { value: "#18181b" },
		950: { value: "#09090b" }
	},
	gray: {
		50: { value: "#f9fafb" },
		100: { value: "#f3f4f6" },
		200: { value: "#e5e7eb" },
		300: { value: "#d1d5db" },
		400: { value: "#9ca3af" },
		500: { value: "#6b7280" },
		600: { value: "#4b5563" },
		700: { value: "#374151" },
		800: { value: "#1f2937" },
		900: { value: "#111827" },
		950: { value: "#030712" }
	},
	slate: {
		50: { value: "#f8fafc" },
		100: { value: "#f1f5f9" },
		200: { value: "#e2e8f0" },
		300: { value: "#cbd5e1" },
		400: { value: "#94a3b8" },
		500: { value: "#64748b" },
		600: { value: "#475569" },
		700: { value: "#334155" },
		800: { value: "#1e293b" },
		900: { value: "#0f172a" },
		950: { value: "#020617" }
	}
};
var shadows = {
	"2xs": { value: "0 1px rgb(0 0 0 / 0.05)" },
	xs: { value: "0 1px 2px 0 rgb(0 0 0 / 0.05)" },
	sm: { value: ["0 1px 3px 0 rgb(0 0 0 / 0.1)", "0 1px 2px -1px rgb(0 0 0 / 0.1)"] },
	md: { value: ["0 4px 6px -1px rgb(0 0 0 / 0.1)", "0 2px 4px -2px rgb(0 0 0 / 0.1)"] },
	lg: { value: ["0 10px 15px -3px rgb(0 0 0 / 0.1)", "0 4px 6px -4px rgb(0 0 0 / 0.1)"] },
	xl: { value: ["0 20px 25px -5px rgb(0 0 0 / 0.1)", "0 8px 10px -6px rgb(0 0 0 / 0.1)"] },
	"2xl": { value: "0 25px 50px -12px rgb(0 0 0 / 0.25)" },
	"inset-2xs": { value: "inset 0 1px rgb(0 0 0 / 0.05)" },
	"inset-xs": { value: "inset 0 1px 1px rgb(0 0 0 / 0.05)" },
	"inset-sm": { value: "inset 0 2px 4px rgb(0 0 0 / 0.05)" }
};
var spacing$2 = {
	0: { value: "0rem" },
	.5: { value: "0.125rem" },
	1: { value: "0.25rem" },
	1.5: { value: "0.375rem" },
	2: { value: "0.5rem" },
	2.5: { value: "0.625rem" },
	3: { value: "0.75rem" },
	3.5: { value: "0.875rem" },
	4: { value: "1rem" },
	4.5: { value: "1.125rem" },
	5: { value: "1.25rem" },
	6: { value: "1.5rem" },
	7: { value: "1.75rem" },
	8: { value: "2rem" },
	9: { value: "2.25rem" },
	10: { value: "2.5rem" },
	11: { value: "2.75rem" },
	12: { value: "3rem" },
	14: { value: "3.5rem" },
	16: { value: "4rem" },
	20: { value: "5rem" },
	24: { value: "6rem" },
	28: { value: "7rem" },
	32: { value: "8rem" },
	36: { value: "9rem" },
	40: { value: "10rem" },
	44: { value: "11rem" },
	48: { value: "12rem" },
	52: { value: "13rem" },
	56: { value: "14rem" },
	60: { value: "15rem" },
	64: { value: "16rem" },
	72: { value: "18rem" },
	80: { value: "20rem" },
	96: { value: "24rem" }
};
var largeSizes = {
	xs: { value: "20rem" },
	sm: { value: "24rem" },
	md: { value: "28rem" },
	lg: { value: "32rem" },
	xl: { value: "36rem" },
	"2xl": { value: "42rem" },
	"3xl": { value: "48rem" },
	"4xl": { value: "56rem" },
	"5xl": { value: "64rem" },
	"6xl": { value: "72rem" },
	"7xl": { value: "80rem" },
	"8xl": { value: "90rem" },
	prose: { value: "65ch" }
};
var sizes = {
	...spacing$2,
	...largeSizes,
	full: { value: "100%" },
	min: { value: "min-content" },
	max: { value: "max-content" },
	fit: { value: "fit-content" }
};
var fontSizes$1 = {
	"2xs": { value: "0.5rem" },
	xs: { value: "0.75rem" },
	sm: { value: "0.875rem" },
	md: { value: "1rem" },
	lg: { value: "1.125rem" },
	xl: { value: "1.25rem" },
	"2xl": { value: "1.5rem" },
	"3xl": { value: "1.875rem" },
	"4xl": { value: "2.25rem" },
	"5xl": { value: "3rem" },
	"6xl": { value: "3.75rem" },
	"7xl": { value: "4.5rem" },
	"8xl": { value: "6rem" },
	"9xl": { value: "8rem" }
};
var fontWeights = {
	thin: { value: "100" },
	extralight: { value: "200" },
	light: { value: "300" },
	normal: { value: "400" },
	medium: { value: "500" },
	semibold: { value: "600" },
	bold: { value: "700" },
	extrabold: { value: "800" },
	black: { value: "900" }
};
var letterSpacings = {
	tighter: { value: "-0.05em" },
	tight: { value: "-0.025em" },
	normal: { value: "0em" },
	wide: { value: "0.025em" },
	wider: { value: "0.05em" },
	widest: { value: "0.1em" }
};
var lineHeights = {
	none: { value: "1" },
	tight: { value: "1.25" },
	snug: { value: "1.375" },
	normal: { value: "1.5" },
	relaxed: { value: "1.625" },
	loose: { value: "2" }
};
var fonts = {
	sans: { value: [
		"ui-sans-serif",
		"system-ui",
		"-apple-system",
		"BlinkMacSystemFont",
		"\"Segoe UI\"",
		"Roboto",
		"\"Helvetica Neue\"",
		"Arial",
		"\"Noto Sans\"",
		"sans-serif",
		"\"Apple Color Emoji\"",
		"\"Segoe UI Emoji\"",
		"\"Segoe UI Symbol\"",
		"\"Noto Color Emoji\""
	] },
	serif: { value: [
		"ui-serif",
		"Georgia",
		"Cambria",
		"\"Times New Roman\"",
		"Times",
		"serif"
	] },
	mono: { value: [
		"ui-monospace",
		"SFMono-Regular",
		"Menlo",
		"Monaco",
		"Consolas",
		"\"Liberation Mono\"",
		"\"Courier New\"",
		"monospace"
	] }
};
var textStyles = {
	xs: { value: {
		fontSize: "0.75rem",
		lineHeight: "calc(1 / 0.75)"
	} },
	sm: { value: {
		fontSize: "0.875rem",
		lineHeight: "calc(1.25 / 0.875)"
	} },
	md: { value: {
		fontSize: "1rem",
		lineHeight: "calc(1.5 / 1)"
	} },
	lg: { value: {
		fontSize: "1.125rem",
		lineHeight: "calc(1.75 / 1.125)"
	} },
	xl: { value: {
		fontSize: "1.25rem",
		lineHeight: "calc(1.75 / 1.25)"
	} },
	"2xl": { value: {
		fontSize: "1.5rem",
		lineHeight: "calc(2 / 1.5)"
	} },
	"3xl": { value: {
		fontSize: "1.875rem",
		lineHeight: "calc(2.25 / 1.875)"
	} },
	"4xl": { value: {
		fontSize: "2.25rem",
		lineHeight: "calc(2.5 / 2.25)"
	} },
	"5xl": { value: {
		fontSize: "3rem",
		lineHeight: "1"
	} },
	"6xl": { value: {
		fontSize: "3.75rem",
		lineHeight: "1"
	} },
	"7xl": { value: {
		fontSize: "4.5rem",
		lineHeight: "1"
	} },
	"8xl": { value: {
		fontSize: "6rem",
		lineHeight: "1"
	} },
	"9xl": { value: {
		fontSize: "8rem",
		lineHeight: "1"
	} }
};
var defineTokens = (v) => v;
var tokens = defineTokens({
	aspectRatios,
	borders,
	easings: {
		default: { value: "cubic-bezier(0.4, 0, 0.2, 1)" },
		linear: { value: "linear" },
		in: { value: "cubic-bezier(0.4, 0, 1, 1)" },
		out: { value: "cubic-bezier(0, 0, 0.2, 1)" },
		"in-out": { value: "cubic-bezier(0.4, 0, 0.2, 1)" }
	},
	durations: {
		fastest: { value: "50ms" },
		faster: { value: "100ms" },
		fast: { value: "150ms" },
		normal: { value: "200ms" },
		slow: { value: "300ms" },
		slower: { value: "400ms" },
		slowest: { value: "500ms" }
	},
	radii: {
		xs: { value: "0.125rem" },
		sm: { value: "0.25rem" },
		md: { value: "0.375rem" },
		lg: { value: "0.5rem" },
		xl: { value: "0.75rem" },
		"2xl": { value: "1rem" },
		"3xl": { value: "1.5rem" },
		"4xl": { value: "2rem" },
		full: { value: "9999px" }
	},
	fontWeights,
	lineHeights,
	fonts,
	letterSpacings,
	fontSizes: fontSizes$1,
	shadows,
	colors: colors$1,
	blurs: {
		xs: { value: "4px" },
		sm: { value: "8px" },
		md: { value: "12px" },
		lg: { value: "16px" },
		xl: { value: "24px" },
		"2xl": { value: "40px" },
		"3xl": { value: "64px" }
	},
	spacing: spacing$2,
	sizes,
	animations
});
var definePreset$1 = (config) => config;
var preset = definePreset$1({
	name: "@pandacss/preset-panda",
	theme: {
		keyframes: keyframes$1,
		breakpoints,
		tokens,
		textStyles,
		containerSizes
	}
});
var index_default = preset;

//#endregion
//#region src/presets/layout/recipes/layout.recipe.tsx
const mainAreaSty = {
	display: "flex",
	flexDirection: "row",
	position: "relative",
	flex: 1,
	minHeight: 0,
	_navbarChecked: { mt: "calc(0px - {sizes.navbar.height})" },
	_btmDashChecked: { mb: "calc(0px - {sizes.btmDash.height})" },
	transition: ["margin-top {durations.navbar} {easings.navbar}", "margin-bottom {durations.btmDash} {easings.btmDash}"].join(", ")
};
const overlayBaseSty = {
	position: "absolute",
	top: 0,
	left: 0,
	right: 0,
	bottom: 0,
	backgroundColor: "black/60",
	backdropFilter: "blur(2px)",
	zIndex: "0",
	opacity: 0,
	visibility: "hidden",
	pointerEvents: "none",
	transition: "opacity 0.3s ease, visibility 0.3s ease, backdrop-filter 0.3s ease",
	cursor: "pointer"
};
const overlaySty = {
	...overlayBaseSty,
	_drawerChecked: {
		opacity: 1,
		visibility: "visible",
		pointerEvents: "auto",
		zIndex: "overlay"
	}
};
const sidebarSty = {
	position: "absolute",
	width: "drawer.width",
	height: "100%",
	zIndex: "drawer",
	top: 0,
	left: 0,
	transform: "translateX(-100%)",
	transition: "transform {durations.drawer} {easings.drawer}, width {durations.sidebar} {easings.sidebar}",
	_sidebarResizing: { transition: "transform 0s" },
	_drawerChecked: { transform: "translateX(0)" }
};
const rightSidebarSty = {
	position: "absolute",
	width: "rightDrawer.width",
	height: "100%",
	zIndex: "rightDrawer",
	top: 0,
	right: 0,
	transform: "translateX(100%)",
	transition: "transform {durations.drawer} {easings.drawer}",
	_rightDrawerChecked: { transform: "translateX(0)" }
};
const rightDrawerOverlaySty = {
	...overlayBaseSty,
	_rightDrawerChecked: {
		opacity: 1,
		visibility: "visible",
		pointerEvents: "auto",
		zIndex: "rightDrawerOverlay"
	}
};
const btmDrawerSty = {
	position: "absolute",
	height: "btmDrawer.height",
	width: "100%",
	left: "50%",
	transform: {
		base: "translateX(-50%) translateY(calc(100% + {sizes.btmDash.height}))",
		_btmDrawerChecked: "translateX(-50%) translateY(0)"
	},
	zIndex: "btmDrawer",
	bottom: "0",
	transition: ["transform", "height"].join(" {durations.btmDash} {easings.btmDash}, ")
};
const btmDrawerOverlaySty = {
	...overlayBaseSty,
	_btmDrawerChecked: {
		opacity: 1,
		visibility: "visible",
		pointerEvents: "auto",
		zIndex: "btmDrawerOverlay"
	}
};
const btmDashSty = {
	height: "{sizes.btmDash.height}",
	minHeight: "{sizes.btmDash.height}",
	flexShrink: 0,
	bottom: "0",
	position: "relative",
	transition: "transform {durations.btmDash} {easings.btmDash}",
	_btmDashChecked: { transform: "translateY({sizes.btmDash.height})" },
	zIndex: "btmDrawer"
};
const layoutContainerSty = {
	display: "flex",
	flexDirection: "column",
	gap: "0",
	height: "100dvh",
	position: "relative",
	overflow: "hidden"
};
const navbarSty = {
	zIndex: "navbar",
	height: "navbar.height",
	minHeight: "navbar.height",
	flexShrink: 0,
	top: "0",
	position: "relative",
	transition: "transform {durations.navbar} {easings.navbar}",
	_navbarChecked: { transform: `[translateY(calc(0px - {sizes.navbar.height}))]` }
};
const mainContentSty = {
	width: "100%",
	height: "100%",
	overflow: "hidden",
	position: "relative",
	transition: ["margin-left {durations.drawer} {easings.drawer}"].join(", ")
};
const LayoutRecipe = defineSlotRecipe({
	className: "mainLayout",
	description: "The main Layout",
	slots: [
		"mainContent",
		"btmDash",
		"overlay",
		"rightDrawerOverlay",
		"navbar",
		"layoutContainer",
		"mainArea",
		"sidebar",
		"rightSidebar",
		"btmDrawerOverlay",
		"btmDrawer"
	],
	base: {
		sidebar: sidebarSty,
		mainArea: mainAreaSty,
		layoutContainer: layoutContainerSty,
		navbar: navbarSty,
		mainContent: mainContentSty,
		btmDash: btmDashSty,
		overlay: overlaySty,
		rightDrawerOverlay: rightDrawerOverlaySty,
		rightSidebar: rightSidebarSty,
		btmDrawerOverlay: btmDrawerOverlaySty,
		btmDrawer: btmDrawerSty
	},
	defaultVariants: {
		navbar: true,
		leftSidebar: "responsive"
	},
	variants: {
		navbar: { false: {
			navbar: {
				transform: "translateY(-100%)",
				display: "none"
			},
			mainArea: { mt: "calc(0px - {sizes.navbar.height})" }
		} },
		btmDash: {
			none: {
				btmDash: {
					display: "none",
					transform: "translateY({sizes.btmDash.height})"
				},
				mainArea: { mb: "calc(0px - {sizes.btmDash.height})" }
			},
			mobileOnly: {
				mainArea: { minWidthBtmDash: { mb: "calc(0px - {sizes.btmDash.height})" } },
				btmDash: { minWidthBtmDash: { transform: "translateY({sizes.btmDash.height})" } }
			},
			all: {}
		},
		leftSidebar: {
			none: {
				sidebar: {
					transform: "translateX(-100%)",
					display: "none"
				},
				mainContent: { ml: "0" },
				overlay: { display: "none" }
			},
			responsive: {
				overlay: { minWidthDrawer: { display: "none" } },
				sidebar: { minWidthDrawer: {
					transition: "transform {durations.sidebar} {easings.sidebar}",
					width: "sidebar.width",
					zIndex: "sidebar"
				} },
				mainContent: { minWidthDrawer: {
					flex: 1,
					zIndex: "mainContent",
					transition: "margin-left {durations.sidebar} {easings.sidebar}",
					_drawerChecked: { ml: "{sizes.sidebar.width}" },
					_sidebarResizing: { transition: "transform 0s " }
				} }
			}
		},
		storybook: { true: { layoutContainer: {
			height: "100%",
			position: "relative"
		} } }
	}
});

//#endregion
//#region src/presets/daisy/recipes/article.recipe.ts
const articleRecipe = defineRecipe({
	className: "article",
	description: "Professional article layout with typography",
	base: {
		maxWidth: "65ch",
		marginX: "auto",
		paddingX: {
			base: "1.5rem",
			md: "2rem",
			lg: "3rem"
		},
		paddingY: {
			base: "2rem",
			md: "3rem",
			lg: "4rem"
		},
		fontSize: {
			base: "1rem",
			lg: "1.125rem"
		},
		lineHeight: "1.75",
		color: "base.content",
		backgroundColor: "base.100",
		"& h1, & h2, & h3, & h4, & h5, & h6": {
			color: "base.content",
			fontWeight: "600",
			lineHeight: "1.4"
		},
		"& h1": {
			fontSize: {
				base: "2.25rem",
				md: "2.5rem",
				lg: "3rem"
			},
			fontWeight: "800",
			lineHeight: "1.2",
			marginTop: "0",
			marginBottom: "2rem"
		},
		"& h2": {
			fontSize: {
				base: "1.875rem",
				md: "2rem",
				lg: "2.25rem"
			},
			fontWeight: "700",
			lineHeight: "1.3",
			marginTop: "3rem",
			marginBottom: "1.5rem"
		},
		"& h3": {
			fontSize: {
				base: "1.5rem",
				md: "1.625rem",
				lg: "1.75rem"
			},
			marginTop: "2.5rem",
			marginBottom: "1rem"
		},
		"& h4": {
			fontSize: {
				base: "1.25rem",
				md: "1.375rem",
				lg: "1.5rem"
			},
			marginTop: "2rem",
			marginBottom: "0.75rem"
		},
		"& h5": {
			fontSize: {
				base: "1.125rem",
				md: "1.25rem",
				lg: "1.375rem"
			},
			fontWeight: "500",
			marginTop: "1.75rem",
			marginBottom: "0.5rem"
		},
		"& h6": {
			fontSize: {
				base: "1rem",
				md: "1.125rem",
				lg: "1.25rem"
			},
			fontWeight: "500",
			marginTop: "1.5rem",
			marginBottom: "0.5rem"
		},
		"& p": {
			marginBottom: "1.5rem",
			textAlign: "justify",
			hyphens: "auto"
		},
		"& a": {
			color: "link.default",
			textDecoration: "underline",
			textDecorationColor: "link.underline",
			textUnderlineOffset: "0.125rem",
			transition: "all 0.2s",
			_hover: {
				color: "link.hover",
				textDecorationColor: "link.default"
			}
		},
		"& ul, & ol": {
			marginTop: "1.25rem",
			marginBottom: "1.25rem",
			marginLeft: "1.5rem",
			paddingLeft: "1.625em"
		},
		"& ul": { listStyleType: "disc" },
		"& ol": { listStyleType: "decimal" },
		"& ul ul, & ul ol, & ol ul, & ol ol": {
			marginTop: "0.75rem",
			marginBottom: "0.75rem"
		},
		"& li": {
			marginTop: "0.5rem",
			marginBottom: "0.5rem",
			paddingLeft: "0.375em"
		},
		"& li::marker": {
			color: "text.tertiary",
			fontWeight: "400"
		},
		"& ul > li::marker": {
			fontSize: "1em",
			lineHeight: "0"
		},
		"& ol > li::marker": { fontWeight: "400" },
		"& ul ul": { listStyleType: "circle" },
		"& ul ul ul": { listStyleType: "square" },
		"& dl": {
			marginTop: "1.25rem",
			marginBottom: "1.25rem"
		},
		"& dt": {
			marginTop: "1.25rem",
			fontWeight: "600",
			color: "base.content"
		},
		"& dd": {
			marginTop: "0.5rem",
			marginLeft: "1.625em",
			color: "text.secondary"
		},
		"& pre": {
			backgroundColor: "text.code.bg",
			color: "text.code.content",
			borderRadius: "0.5rem",
			padding: "1.5rem",
			marginBottom: "1.5rem",
			overflowX: "auto",
			fontSize: "0.875rem",
			lineHeight: "1.5"
		},
		"& code": {
			backgroundColor: "bg.code",
			padding: "0.125rem 0.375rem",
			borderRadius: "0.25rem",
			fontSize: "0.875em",
			fontFamily: "monospace"
		},
		"& pre code": {
			backgroundColor: "transparent",
			padding: "0",
			fontSize: "inherit"
		},
		"& blockquote": {
			borderLeftWidth: "4px",
			borderLeftColor: "border.default",
			paddingLeft: "1.5rem",
			marginY: "2rem",
			fontStyle: "italic",
			color: "text.secondary"
		},
		"& hr": {
			marginY: "3rem",
			borderColor: "border.default"
		},
		"& table": {
			width: "100%",
			marginBottom: "2rem",
			borderCollapse: "collapse"
		},
		"& th": {
			borderBottomWidth: "2px",
			borderColor: "border.strong",
			padding: "0.75rem",
			textAlign: "left",
			fontWeight: "600"
		},
		"& td": {
			borderBottomWidth: "1px",
			borderColor: "border.subtle",
			padding: "0.75rem"
		},
		"& .note": {
			backgroundColor: "bg.accent",
			borderLeftWidth: "4px",
			borderLeftColor: "link.default",
			borderRadius: "0.5rem",
			padding: "1rem 1.5rem",
			marginY: "2rem",
			"& .title": {
				fontWeight: "600",
				marginBottom: "0.5rem",
				color: "link.default"
			}
		},
		"& .footnotes": {
			marginTop: "4rem",
			paddingTop: "2rem",
			borderTopWidth: "1px",
			borderColor: "border.default",
			fontSize: "0.875rem"
		},
		"@media print": {
			fontSize: "11pt",
			lineHeight: "1.5",
			color: "black",
			backgroundColor: "white"
		}
	}
});

//#endregion
//#region src/presets/daisy/themes/dracula.ts
const dracula = {
	base: {
		100: { value: "oklch(28.822% 0.022 277.508)" },
		200: { value: "oklch(26.805% 0.02 277.508)" },
		300: { value: "oklch(24.787% 0.019 277.508)" },
		content: { value: "oklch(97.747% 0.007 106.545)" }
	},
	content: {
		primary: { value: "oklch(15.092% 0.036 346.812)" },
		secondary: { value: "oklch(14.84% 0.029 301.883)" },
		accent: { value: "oklch(16.678% 0.024 66.558)" },
		neutral: { value: "oklch(87.889% 0.006 275.524)" },
		info: { value: "oklch(17.652% 0.018 212.846)" },
		success: { value: "oklch(17.419% 0.043 148.024)" },
		warning: { value: "oklch(19.106% 0.026 112.757)" },
		error: { value: "oklch(13.644% 0.041 24.43)" }
	},
	primary: { value: "oklch(75.461% 0.183 346.812)" },
	secondary: { value: "oklch(74.202% 0.148 301.883)" },
	accent: { value: "oklch(83.392% 0.124 66.558)" },
	neutral: { value: "oklch(39.445% 0.032 275.524)" },
	info: { value: "oklch(88.263% 0.093 212.846)" },
	success: { value: "oklch(87.099% 0.219 148.024)" },
	warning: { value: "oklch(95.533% 0.134 112.757)" },
	error: { value: "oklch(68.22% 0.206 24.43)" },
	radius: {
		selector: { value: "0.5rem" },
		field: { value: "0.5rem" },
		box: { value: "1rem" }
	},
	size: {
		selector: { value: "0.25rem" },
		field: { value: "0.25rem" }
	},
	border: { value: "1px" },
	depth: { value: "0" },
	noise: { value: "0" }
};
var dracula_default = dracula;

//#endregion
//#region src/presets/daisy/themes/light.ts
const LightTheme = {
	base: {
		100: { value: "oklch(100% 0 0)" },
		200: { value: "oklch(98% 0 0)" },
		300: { value: "oklch(95% 0 0)" },
		content: { value: "oklch(21% 0.006 285.885)" }
	},
	content: {
		primary: { value: "oklch(93% 0.034 272.788)" },
		secondary: { value: "oklch(94% 0.028 342.258)" },
		accent: { value: "oklch(38% 0.063 188.416)" },
		neutral: { value: "oklch(92% 0.004 286.32)" },
		info: { value: "oklch(29% 0.066 243.157)" },
		success: { value: "oklch(37% 0.077 168.94)" },
		warning: { value: "oklch(41% 0.112 45.904)" },
		error: { value: "oklch(27% 0.105 12.094)" }
	},
	primary: { value: "oklch(45% 0.24 277.023)" },
	secondary: { value: "oklch(65% 0.241 354.308)" },
	accent: { value: "oklch(77% 0.152 181.912)" },
	neutral: { value: "oklch(14% 0.005 285.823)" },
	info: { value: "oklch(74% 0.16 232.661)" },
	success: { value: "oklch(76% 0.177 163.223)" },
	warning: { value: "oklch(82% 0.189 84.429)" },
	error: { value: "oklch(71% 0.194 13.428)" },
	radius: {
		selector: { value: "0.5rem" },
		field: { value: "0.25rem" },
		box: { value: "0.5rem" }
	},
	size: {
		selector: { value: "0.25rem" },
		field: { value: "0.25rem" }
	},
	border: { value: "1px" },
	depth: { value: "1" },
	noise: { value: "0" }
};
var light_default = LightTheme;

//#endregion
//#region src/presets/daisy/themes/night.ts
const night = {
	base: {
		100: { value: "oklch(20.768% 0.039 265.754)" },
		200: { value: "oklch(19.314% 0.037 265.754)" },
		300: { value: "oklch(17.86% 0.034 265.754)" },
		content: { value: "oklch(84.153% 0.007 265.754)" }
	},
	content: {
		primary: { value: "oklch(15.07% 0.027 232.661)" },
		secondary: { value: "oklch(13.602% 0.031 276.934)" },
		accent: { value: "oklch(14.472% 0.035 350.048)" },
		neutral: { value: "oklch(85.589% 0.007 260.03)" },
		info: { value: "oklch(0% 0 0)" },
		success: { value: "oklch(15.69% 0.026 181.911)" },
		warning: { value: "oklch(16.648% 0.027 82.95)" },
		error: { value: "oklch(14.357% 0.034 13.118)" }
	},
	primary: { value: "oklch(75.351% 0.138 232.661)" },
	secondary: { value: "oklch(68.011% 0.158 276.934)" },
	accent: { value: "oklch(72.36% 0.176 350.048)" },
	neutral: { value: "oklch(27.949% 0.036 260.03)" },
	info: { value: "oklch(68.455% 0.148 237.251)" },
	success: { value: "oklch(78.452% 0.132 181.911)" },
	warning: { value: "oklch(83.242% 0.139 82.95)" },
	error: { value: "oklch(71.785% 0.17 13.118)" },
	radius: {
		selector: { value: "1rem" },
		field: { value: "0.5rem" },
		box: { value: "1rem" }
	},
	size: {
		selector: { value: "0.25rem" },
		field: { value: "0.25rem" }
	},
	border: { value: "1px" },
	depth: { value: "0" },
	noise: { value: "0" }
};
var night_default = night;

//#endregion
//#region src/presets/daisy/themes/synthwave.ts
const synthwave = {
	base: {
		100: { value: "oklch(15% 0.09 281.288)" },
		200: { value: "oklch(20% 0.09 281.288)" },
		300: { value: "oklch(25% 0.09 281.288)" },
		content: { value: "oklch(78% 0.115 274.713)" }
	},
	content: {
		primary: { value: "oklch(28% 0.109 3.907)" },
		secondary: { value: "oklch(29% 0.066 243.157)" },
		accent: { value: "oklch(26% 0.079 36.259)" },
		neutral: { value: "oklch(87% 0.065 274.039)" },
		info: { value: "oklch(29% 0.066 243.157)" },
		success: { value: "oklch(27% 0.046 192.524)" },
		warning: { value: "oklch(42% 0.095 57.708)" },
		error: { value: "oklch(23.501% 0.096 290.329)" }
	},
	primary: { value: "oklch(71% 0.202 349.761)" },
	secondary: { value: "oklch(82% 0.111 230.318)" },
	accent: { value: "oklch(75% 0.183 55.934)" },
	neutral: { value: "oklch(45% 0.24 277.023)" },
	info: { value: "oklch(74% 0.16 232.661)" },
	success: { value: "oklch(77% 0.152 181.912)" },
	warning: { value: "oklch(90% 0.182 98.111)" },
	error: { value: "oklch(73.7% 0.121 32.639)" },
	radius: {
		selector: { value: "1rem" },
		field: { value: "0.5rem" },
		box: { value: "1rem" }
	},
	size: {
		selector: { value: "0.25rem" },
		field: { value: "0.25rem" }
	},
	border: { value: "1px" },
	depth: { value: "0" },
	noise: { value: "0" }
};
var synthwave_default = synthwave;

//#endregion
//#region src/presets/daisy/daisy.ts
const prefersDarkTheme = dracula_default;
const darkTheme = night_default;
const defaultTheme = light_default;
const keyframes = {
	comboboxContentShow: {
		from: {
			opacity: 0,
			transform: "translateY(-8px)"
		},
		to: {
			opacity: 1,
			transform: "translateY(0)"
		}
	},
	comboboxContentHide: {
		from: {
			opacity: 1,
			transform: "translateY(0)"
		},
		to: {
			opacity: 0,
			transform: "translateY(-8px)"
		}
	}
};
const fontSizes = { field: { value: "sm" } };
const backgroundTransition = "background-color 0.2s ease, color 0.2s ease";
const animationStyles = defineAnimationStyles({ contentShow: { value: {
	transformOrigin: "var(--kb-combobox-content-transform-origin)",
	animationDuration: "0.3s",
	_expanded: { animationName: "contentShow" }
} } });
const spacing$1 = { navbar: {
	x: { value: "1rem" },
	y: { value: "0.75rem" }
} };
const descriptions = {
	box: "card, modal, alert",
	selector: "checkbox, toggle, badge",
	field: "button, input, select, tab"
};
const colors = {
	base: {
		100: {
			value: {
				base: defaultTheme.base[100].value,
				_synthwaveTheme: synthwave_default.base[100].value,
				_dark: darkTheme.base[100].value,
				_osDark: prefersDarkTheme.base[100].value
			},
			description: "Adaptive lightest base color"
		},
		200: {
			value: {
				base: defaultTheme.base[200].value,
				_dark: darkTheme.base[200].value,
				_osDark: prefersDarkTheme.base[200].value,
				_synthwaveTheme: synthwave_default.base[200].value
			},
			description: "Adaptive light base color"
		},
		300: {
			value: {
				base: defaultTheme.base[300].value,
				_dark: darkTheme.base[300].value,
				_osDark: prefersDarkTheme.base[300].value,
				_synthwaveTheme: synthwave_default.base[300].value
			},
			description: "Adaptive medium base color"
		},
		content: {
			value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value,
				_synthwaveTheme: synthwave_default.base.content.value
			},
			description: "Adaptive base content color"
		},
		hover: { value: "{colors.primary/20}" }
	},
	border: { default: { value: "{colors.base.content/20}" } },
	content: {
		primary: { value: {
			base: defaultTheme.content.primary.value,
			_dark: darkTheme.content.primary.value,
			_osDark: prefersDarkTheme.content.primary.value,
			_synthwaveTheme: synthwave_default.content.primary.value
		} },
		placeholder: { value: "{colors.base.content/80}" },
		secondary: { value: {
			base: defaultTheme.content.secondary.value,
			_dark: darkTheme.content.secondary.value,
			_osDark: prefersDarkTheme.content.secondary.value,
			_synthwaveTheme: synthwave_default.content.secondary.value
		} },
		accent: { value: {
			base: defaultTheme.content.accent.value,
			_dark: darkTheme.content.accent.value,
			_osDark: prefersDarkTheme.content.accent.value,
			_synthwaveTheme: synthwave_default.content.accent.value
		} },
		neutral: { value: {
			base: defaultTheme.content.neutral.value,
			_dark: darkTheme.content.neutral.value,
			_osDark: prefersDarkTheme.content.neutral.value,
			_synthwaveTheme: synthwave_default.content.neutral.value
		} },
		info: { value: {
			base: defaultTheme.content.info.value,
			_dark: darkTheme.content.info.value,
			_synthwaveTheme: synthwave_default.content.info.value
		} },
		success: { value: {
			base: defaultTheme.content.success.value,
			_dark: darkTheme.content.success.value,
			_synthwaveTheme: synthwave_default.content.success.value
		} },
		warning: { value: {
			base: defaultTheme.content.warning.value,
			_dark: darkTheme.content.warning.value,
			_synthwaveTheme: synthwave_default.content.warning.value
		} },
		error: { value: {
			base: defaultTheme.content.error.value,
			_dark: darkTheme.content.error.value,
			_synthwaveTheme: synthwave_default.content.error.value
		} }
	},
	primary: {
		value: {
			base: defaultTheme.primary.value,
			_dark: darkTheme.primary.value,
			_osDark: prefersDarkTheme.primary.value,
			_synthwaveTheme: synthwave_default.primary.value
		},
		description: "Adaptive primary brand color"
	},
	secondary: {
		value: {
			base: defaultTheme.secondary.value,
			_dark: darkTheme.secondary.value,
			_osDark: prefersDarkTheme.secondary.value,
			_synthwaveTheme: synthwave_default.secondary.value
		},
		description: "Adaptive secondary brand color"
	},
	accent: {
		value: {
			base: defaultTheme.accent.value,
			_dark: darkTheme.accent.value,
			_osDark: prefersDarkTheme.accent.value,
			_synthwaveTheme: synthwave_default.accent.value
		},
		description: "Adaptive accent brand color"
	},
	neutral: {
		value: {
			base: defaultTheme.neutral.value,
			_dark: darkTheme.neutral.value,
			_osDark: prefersDarkTheme.neutral.value,
			_synthwaveTheme: synthwave_default.neutral.value
		},
		description: "Adaptive neutral brand color"
	},
	info: {
		value: {
			base: defaultTheme.info.value,
			_dark: darkTheme.info.value,
			_osDark: prefersDarkTheme.info.value,
			_synthwaveTheme: synthwave_default.info.value
		},
		description: "Adaptive info brand color"
	},
	success: {
		value: {
			base: defaultTheme.success.value,
			_dark: darkTheme.success.value,
			_osDark: prefersDarkTheme.success.value,
			_synthwaveTheme: synthwave_default.success.value
		},
		description: "Adaptive success brand color"
	},
	warning: {
		value: {
			base: defaultTheme.warning.value,
			_dark: darkTheme.warning.value,
			_osDark: prefersDarkTheme.warning.value,
			_synthwaveTheme: synthwave_default.warning.value
		},
		description: "Adaptive warning brand color"
	},
	error: {
		value: {
			base: defaultTheme.error.value,
			_dark: darkTheme.error.value,
			_osDark: prefersDarkTheme.error.value,
			_synthwaveTheme: synthwave_default.error.value
		},
		description: "Adaptive error brand color"
	},
	link: {
		default: {
			value: {
				base: "oklch(0.55 0.15 264)",
				_dark: "oklch(0.75 0.12 264)",
				_osDark: "oklch(0.75 0.12 264)"
			},
			description: "Interactive link color"
		},
		hover: {
			value: {
				base: "oklch(0.50 0.18 264)",
				_dark: "oklch(0.70 0.15 264)",
				_osDark: "oklch(0.70 0.15 264)"
			},
			description: "Link hover state color"
		},
		underline: {
			value: {
				base: "oklch(0.85 0.05 264)",
				_dark: "oklch(0.40 0.18 264)",
				_osDark: "oklch(0.40 0.18 264)"
			},
			description: "Link underline decoration color"
		}
	},
	text: {
		headings: {
			1: { value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value
			} },
			2: { value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value
			} },
			3: { value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value
			} },
			4: { value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value
			} },
			5: { value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value
			} },
			6: { value: {
				base: defaultTheme.base.content.value,
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value
			} }
		},
		code: {
			bg: { value: {
				base: "oklch(0.35 0.02 264)",
				_dark: darkTheme.base[200].value,
				_osDark: prefersDarkTheme.base[200].value,
				_synthwaveTheme: synthwave_default.base[200].value
			} },
			content: { value: {
				base: "oklch(0.95 0.02 264)",
				_dark: darkTheme.base.content.value,
				_osDark: prefersDarkTheme.base.content.value,
				_synthwaveTheme: synthwave_default.base.content.value
			} }
		}
	},
	dev: {
		1: { value: "bg.blue.600/50" },
		2: { value: "bg.red.600/50" },
		3: { value: "bg.green.600/50" },
		4: { value: "bg.purple.600/50" },
		5: { value: "bg.orange.600/50" },
		6: { value: "bg.pink.600/50" },
		7: { value: "bg.yellow.600/50" }
	}
};
const DaisyPreset = definePreset({
	name: "my-preset",
	presets: [index_default],
	conditions: {
		light: "[data-color-mode=light] &",
		dark: "[data-color-mode=dark] &",
		synthwaveTheme: "[data-theme=synthwave] &"
	},
	globalCss: {
		"html, body": {
			backgroundColor: "base.100",
			color: "base.content",
			minHeight: "100dvh"
		},
		"*": { transition: backgroundTransition }
	},
	theme: {
		extend: {
			keyframes,
			tokens: {
				spacing: spacing$1,
				foo: {}
			},
			semanticTokens: {
				fontSizes,
				colors,
				shadows: {
					selector: {
						value: "md",
						description: descriptions.selector
					},
					field: {
						value: "md",
						description: descriptions.field
					},
					box: {
						value: "md",
						description: descriptions.box
					}
				},
				radii: {
					selector: {
						value: "0.5rem",
						description: descriptions.selector
					},
					field: {
						value: "0.25rem",
						description: descriptions.field
					},
					box: {
						value: "0.5rem",
						description: descriptions.box
					},
					depth: { value: 0 },
					noise: { value: 0 }
				},
				sizes: {
					border: {
						value: { base: "1px" },
						description: "Width of a Border"
					},
					selector: { value: {
						base: "0.25rem",
						description: `This is for ??? ${descriptions.selector}`
					} },
					field: {
						value: { base: "0.25rem" },
						description: `This is for ??? ${descriptions.field}`
					}
				},
				borders: {
					default: {
						value: "{sizes.border} solid {colors.border.default}",
						description: "Border to be used for input fields like an input for a combobox or a text area"
					},
					box: {
						value: "{borders.default}",
						description: `Border to be used for ${descriptions.box}`
					},
					field: {
						value: "{borders.default}",
						description: `Border to be used for ${descriptions.field}`
					},
					selector: {
						value: "{borders.field}",
						description: `Border to be used for ${descriptions.selector}`
					}
				}
			}
		},
		recipes: { article: articleRecipe }
	}
});

//#endregion
//#region src/presets/layout/layout.ts
const createPeerId = (name) => `${name}-toggle`;
const createPeerCondition = (name) => `[data-peer=${name}]:checked ~ div &`;
const peerNames = [
	"navbar",
	"btmDash",
	"drawer",
	"rightDrawer",
	"btmDrawer"
];
const peerConditions = Object.fromEntries(peerNames.map((name) => [`${name}Checked`, createPeerCondition(name)]));
const spacing = { navbar: {
	x: { value: "1rem" },
	y: { value: "0.75rem" },
	height: { value: "4rem" }
} };
const durations = {
	fast: { value: "0.1s" },
	md: { value: "0.3s" },
	slow: { value: "0.5s" }
};
const easings = {
	drawer: { value: "ease" },
	navbar: { value: "ease" },
	btmDash: { value: "ease" },
	sidebar: { value: "ease-in-out" }
};
const layoutPreset = definePreset({
	name: "layout-preset",
	presets: [index_default, DaisyPreset],
	conditions: { extend: {
		...peerConditions,
		sidebarResizing: "[data-resizing] &"
	} },
	theme: {
		extend: {
			breakpoints: {
				minWidthDrawer: "{breakpoints.md}",
				minWidthBtmDash: "{breakpoints.sm}"
			},
			tokens: {
				spacing,
				durations
			},
			semanticTokens: {
				easings,
				durations: {
					drawer: { value: "{durations.fast}" },
					navbar: { value: "{durations.md}" },
					btmDash: { value: "{durations.md}" },
					overlay: { value: "{durations.md}" },
					sidebar: { value: "{durations.md}" }
				},
				sizes: {
					navbar: { height: { value: "4rem" } },
					btmDash: { height: { value: "4rem" } },
					drawer: { width: { value: "clamp(5rem, 30rem, 75%)" } },
					rightDrawer: { width: { value: "clamp(5rem, 30rem, 75%)" } },
					btmDrawer: { height: { value: "clamp(5rem, 32rem, 85%)" } },
					sidebar: {
						width: { value: "20rem" },
						handle: {
							grab: { width: { value: "2rem" } },
							display: {
								height: { value: "3.75rem" },
								width: { value: "0.375rem" },
								hover: {
									height: { value: "5rem" },
									width: { value: "0.5rem" }
								}
							}
						}
					}
				},
				zIndex: {
					drawer: {
						value: "60",
						description: "Z-index for drawer component, highest to overlay other elements. The sidebar becomes a drawer on smaller displays"
					},
					overlay: {
						value: "59",
						description: "Z-index for the Drawer Layer"
					},
					rightDrawer: {
						value: "50",
						description: "Z-index for the Right drawer component This is considered secondary to the primary drawer"
					},
					rightDrawerOverlay: {
						value: "49",
						description: "Z-index for the Right Drawer Layer"
					},
					btmDash: {
						value: "40",
						description: "Z-index for bottom dashboard component"
					},
					btmDrawer: {
						value: "30",
						description: "Z-index for the Bottom drawer component This is higher than the side drawers"
					},
					btmDrawerOverlay: {
						value: "29",
						description: "Z-index for the Right Drawer Layer"
					},
					navbar: {
						value: "20",
						description: "Z-index for navigation bar"
					},
					sidebar: {
						value: "11",
						description: "Z-index for sidebar component"
					},
					mainContent: {
						value: "10",
						description: "Z-index for main content area, lowest layer"
					}
				}
			}
		},
		slotRecipes: { layout: LayoutRecipe }
	}
});

//#endregion
//#region src/components/Layout/Drawers.tsx
const RightDrawerOverlay = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <label {...others} for={createPeerId("rightDrawer")} class={cx(classesFromRecipe.rightDrawerOverlay, local.class)} />;
};
const BtmDrawerOverlay = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <label {...others} for={createPeerId("btmDrawer")} class={cx(classesFromRecipe.btmDrawerOverlay, local.class)} />;
};
const RightSidebar = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <aside {...others} class={cx(classesFromRecipe.rightSidebar, local.class)}>
      {safeChildren()}
    </aside>;
};
const BtmDrawer = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <aside {...others} class={cx(classesFromRecipe.btmDrawer, local.class)}>
      {safeChildren()}
    </aside>;
};

//#endregion
//#region src/components/Layout/Sidebar.tsx
const Overlay = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <label {...others} for={createPeerId("drawer")} class={cx(classesFromRecipe.overlay, local.class)} />;
};
const Sidebar = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <aside {...others} class={cx(classesFromRecipe.sidebar, local.class)}>
      {safeChildren()}
      <SidebarHandle />
    </aside>;
};
const SidebarHandle = (props) => {
	return <div use:resize={{
		cssVariable: "--sizes-sidebar-width",
		minWidth: 200,
		maxWidth: 600,
		defaultWidth: 320
	}} class={cx("group", css({
		display: "none",
		minWidthDrawer: {
			position: "absolute",
			width: "0px",
			right: "0px",
			_drawerChecked: {
				width: "sidebar.handle.grab.width",
				right: "calc(0px - {sizes.sidebar.handle.grab.width})"
			},
			transition: "right 0.3s ease",
			top: "0",
			height: "100%",
			cursor: "col-resize",
			display: "flex",
			alignItems: "center",
			justifyContent: "center",
			background: "transparent"
		}
	}))}>
      <div class={css({
		position: "absolute",
		left: "0",
		height: "sidebar.handle.display.height",
		width: "sidebar.handle.display.width",
		background: "gray.400",
		borderRadius: "3px",
		opacity: 0,
		transition: [
			"opacity",
			"width",
			"height",
			"transform"
		].join(" 0.3s ease, "),
		transform: {
			base: "translateX(-100%)",
			_drawerChecked: "translateX(0%)"
		},
		_groupHover: {
			opacity: 1,
			height: "sidebar.handle.display.hover.height",
			width: "sidebar.handle.display.hover.width"
		},
		_sidebarResizing: {
			opacity: 1,
			height: "sidebar.handle.display.hover.height",
			width: "sidebar.handle.display.hover.width"
		}
	})}></div>
    </div>;
};

//#endregion
//#region src/components/Layout/utilities/useKeybinding.ts
/**
* Unified keybinding hook that supports both global and focused keybindings.
* If no ref is provided, creates a global keybinding.
* If a ref is provided, creates a focused keybinding that only works when the element has focus.
*
* @param keyPress - The key configuration object containing key and modifiers
* @param keyPress.key - The key to listen for (case-insensitive)
* @param keyPress.ctrl - Whether Ctrl (or Cmd on Mac) must be pressed
* @param keyPress.shift - Whether Shift must be pressed
* @param keyPress.alt - Whether Alt must be pressed
* @param callback - Function to execute when the keybinding is triggered
* @param options - Configuration options for behavior and targeting
* @param options.ref - Optional reference to element for focused keybindings
* @param options.preventDefault - Whether to prevent the default browser behavior
*/
function useKeybinding(keyPress, callback, options = {}) {
	const { ref, preventDefault = true } = options;
	const { key, ctrl = false, shift = false, alt = false } = keyPress;
	onMount(() => {
		const handleKeyDown = (ev) => {
			if (ref) {
				const element = ref();
				if (!element || document.activeElement !== element) return;
			}
			const keyMatch = ev.key.toLowerCase() === key.toLowerCase();
			if (!keyMatch) return;
			const ctrlMatch = ctrl ? ev.ctrlKey || ev.metaKey : !ev.ctrlKey && !ev.metaKey;
			if (!ctrlMatch) return;
			const shiftMatch = shift ? ev.shiftKey : !ev.shiftKey;
			if (!shiftMatch) return;
			const altMatch = alt ? ev.altKey : !ev.altKey;
			if (!altMatch) return;
			if (keyMatch && ctrlMatch && shiftMatch && altMatch) {
				if (preventDefault) ev.preventDefault();
				callback(ev);
			}
		};
		let target;
		if (ref) {
			const element = ref();
			if (!element) return;
			target = element;
		} else target = document;
		target.addEventListener("keydown", handleKeyDown);
		onCleanup(() => {
			target.removeEventListener("keydown", handleKeyDown);
		});
	});
}

//#endregion
//#region src/components/Layout/utilities/keyboardShortcuts.ts
function kb(key, description, ctrl = false, shift = false, alt = false) {
	return {
		keyPress: {
			key,
			ctrl,
			shift,
			alt
		},
		description
	};
}
const KEYBINDINGS = {
	layout: {
		TOGGLE_NAVBAR: kb("1", "Toggle navbar", true, false),
		TOGGLE_DRAWER: kb("2", "Toggle drawer", true, false),
		TOGGLE_BTM_DASH: kb("3", "Toggle bottom dash", true, false),
		TOGGLE_BTM_DRAWER: kb("4", "Toggle bottom dash", true, false),
		TOGGLE_RIGHT_DRAWER: kb("5", "Toggle bottom dash", true, false),
		TOGGLE_STYLED: kb("s", "Toggle Styled", true, false),
		CLOSE_DRAWER: kb("Escape", "Close drawer overlay")
	},
	resize: {
		DECREASE_WIDTH: kb("[", "Decrease sidebar width", false, false, true),
		INCREASE_WIDTH: kb("]", "Increase sidebar width", false, false, true)
	}
};
const layoutKeys = KEYBINDINGS.layout;
const resizeKeys = KEYBINDINGS.resize;
const ALL_SHORTCUTS = [...Object.values(KEYBINDINGS.layout), ...Object.values(KEYBINDINGS.resize)];

//#endregion
//#region src/components/Layout/utilities/useLayoutKeybindings.ts
function useLayoutKeybindings(options = {}) {
	const { enabled = true } = options;
	const toggleElement = (name) => {
		const elementId = createPeerId(name);
		const element = document.getElementById(elementId);
		if (element) element.checked = !element.checked;
	};
	const closeDrawerIfOverlayVisible = () => {
		const drawerInput = document.getElementById(createPeerId("drawer"));
		if (drawerInput && drawerInput.checked) {
			const overlay = document.querySelector("[data-peer=\"drawer\"]:checked ~ div [for=\"drawer-toggle\"]");
			if (overlay && getComputedStyle(overlay).visibility === "visible") {
				drawerInput.checked = false;
				return true;
			}
		}
		return false;
	};
	if (enabled) {
		useKeybinding(layoutKeys.TOGGLE_NAVBAR.keyPress, () => toggleElement("navbar"));
		useKeybinding(layoutKeys.TOGGLE_DRAWER.keyPress, () => toggleElement("drawer"));
		useKeybinding(layoutKeys.TOGGLE_BTM_DASH.keyPress, () => toggleElement("btmDash"));
		useKeybinding(layoutKeys.TOGGLE_BTM_DRAWER.keyPress, () => toggleElement("btmDrawer"));
		useKeybinding(layoutKeys.TOGGLE_RIGHT_DRAWER.keyPress, () => toggleElement("rightDrawer"));
		useKeybinding(layoutKeys.CLOSE_DRAWER.keyPress, closeDrawerIfOverlayVisible, { preventDefault: false });
	}
	return { toggleElement };
}

//#endregion
//#region src/components/Layout/utilities/PeerInputs.tsx
const InputHidden = (props) => {
	return <input type="checkbox" id={createPeerId(props.name)} data-peer={props.name} class={css({ srOnly: true })} />;
};
const Label = (props) => {
	const [local, others] = splitProps(props, [
		"class",
		"children",
		"name"
	]);
	const safeChildren = children(() => local.children);
	return <label {...others} for={createPeerId(local.name)} class={cx(css({ userSelect: "none" }), local.class)}>
      {safeChildren()}
    </label>;
};

//#endregion
//#region src/components/Layout/Layout.tsx
const LayoutContainer = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	useLayoutKeybindings();
	return <>
      {}
      <InputHidden name="navbar" />
      <InputHidden name="btmDash" />
      <InputHidden name="drawer" />
      <InputHidden name="rightDrawer" />
      <InputHidden name="btmDrawer" />

      <div {...others} class={cx(classesFromRecipe.layoutContainer, local.class)}>
        {safeChildren()}
      </div>
    </>;
};
const Navbar = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <nav {...others} class={cx(classesFromRecipe.navbar, local.class)} />;
};
const MainArea = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <div {...others} class={cx(classesFromRecipe.mainArea, local.class)}>
      {safeChildren()}
      <Overlay />
      <BtmDrawerOverlay />
      <RightDrawerOverlay />
    </div>;
};
const BtmDash = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <footer {...others} class={cx(classesFromRecipe.btmDash, local.class)}></footer>;
};
const Main = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <main {...others} class={cx(classesFromRecipe.mainContent, local.class)}>
      {safeChildren()}
    </main>;
};

//#endregion
//#region src/components/Layout/NavbarContent.tsx
const createNavbarComponent = (baseStyles) => (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <div {...others} class={cx(baseStyles, local.class)}>
        {safeChildren()}
      </div>;
};
const styles$3 = {
	content: css({
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		padding: "0 1rem",
		height: "100%"
	}),
	section: css({
		display: "flex",
		alignItems: "center",
		gap: "0.75rem"
	}),
	link: css({
		textDecoration: "none",
		color: "inherit",
		transition: "all 0.15s ease",
		"&:hover": { opacity: .7 }
	})
};
const NavbarContent = createNavbarComponent(styles$3.content);
const NavbarStart = createNavbarComponent(styles$3.section);
const NavbarCenter = createNavbarComponent(cx(styles$3.section, css({ gap: "2rem" })));
const NavbarEnd = createNavbarComponent(styles$3.section);
const NavbarLink = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <a {...others} class={cx(styles$3.link, local.class)}>
      {safeChildren()}
    </a>;
};

//#endregion
//#region src/components/Layout/BtmDashContent.tsx
const styles$2 = {
	container: css({
		display: "flex",
		alignItems: "center",
		justifyContent: "space-around",
		height: "100%",
		padding: "0 0.5rem",
		maxWidth: "30rem",
		margin: "0 auto"
	}),
	item: css({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		gap: "0.25rem",
		padding: "0.5rem",
		borderRadius: "lg",
		cursor: "pointer",
		transition: "all 0.15s ease",
		color: "base.content",
		fontSize: "xs",
		fontWeight: "medium",
		minWidth: "4rem",
		"&:hover": { backgroundColor: "base.300" },
		"&:active": { scale: .95 }
	}),
	styled: css({
		backgroundColor: "base.200",
		borderTop: "default",
		boxShadow: "0 -4px 6px -1px rgb(0 0 0 / 0.1)"
	})
};
const BtmDashContainer = (props) => {
	const [local, others] = splitProps(props, ["class", "children"]);
	const safeChildren = children(() => local.children);
	return <div {...others} class={cx(styles$2.container, local.class)}>
      {safeChildren()}
    </div>;
};
const BtmDashItem = (props) => {
	const [local, others] = splitProps(props, [
		"class",
		"children",
		"icon",
		"label"
	]);
	const safeChildren = children(() => local.children);
	return <button type="button" {...others} class={cx(styles$2.item, local.class)}>
      {local.icon}
      {local.label && <span>{local.label}</span>}
      {safeChildren()}
    </button>;
};

//#endregion
//#region src/components/Layout/ToggleButtons.tsx
const ToggleButton = (props) => {
	return <>
      <InputHidden name={props.name} />
      <Label {...props}>
        {props.children}
      </Label>
    </>;
};
const DrawerToggle = (props) => <ToggleButton name="drawer" {...props} />;
const NavbarToggle = (props) => <ToggleButton name="navbar" {...props} />;
const RightDrawerToggle = (props) => <ToggleButton name="rightDrawer" {...props} />;
const BtmDrawerToggle = (props) => <ToggleButton name="btmDrawer" {...props} />;
const BtmDashToggle = (props) => <ToggleButton name="btmDash" {...props} />;

//#endregion
//#region src/components/Layout/HamburgerIcon.tsx
const hamburgerIconStyles = css({
	width: "6",
	height: "6",
	display: "flex",
	flexDirection: "column",
	justifyContent: "space-around",
	cursor: "pointer",
	"& span": {
		width: "full",
		height: "0.5",
		backgroundColor: "base.content",
		borderRadius: "sm",
		transition: "all 0.3s ease"
	},
	"[data-peer=drawer]:checked ~ * &": {
		"& span:nth-child(1)": { transform: "rotate(45deg) translate(5px, 5px)" },
		"& span:nth-child(2)": { opacity: "0" },
		"& span:nth-child(3)": { transform: "rotate(-45deg) translate(7px, -6px)" }
	}
});
const HamburgerIcon = (props) => {
	const [local, others] = splitProps(props, ["class", "name"]);
	return <Label name={local.name || "drawer"} class={cx(hamburgerIconStyles, local.class)} {...others}>
      <span />
      <span />
      <span />
    </Label>;
};

//#endregion
//#region src/components/Layout/index.ts
const LayoutComponents = {
	Navbar,
	MainArea,
	Sidebar,
	RightSidebar,
	BtmDrawer,
	Main,
	BtmDash,
	LayoutContainer
};
const NavbarComponents = {
	NavbarContent,
	NavbarStart,
	NavbarCenter,
	NavbarEnd,
	NavbarLink
};
const BtmDashComponents = {
	BtmDashContainer,
	BtmDashItem
};
const ToggleComponents = {
	ToggleButton,
	DrawerToggle,
	NavbarToggle,
	RightDrawerToggle,
	BtmDrawerToggle,
	BtmDashToggle
};

//#endregion
//#region src/components/Layout/styled/NavbarStyled.tsx
const navbarDaisyStyles = css({
	backgroundColor: "base.200",
	borderBottom: "default",
	gap: "2",
	boxShadow: "lg"
});
const NavbarStyled = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <Navbar {...others} class={cx(classesFromRecipe.navbar, navbarDaisyStyles, local.class)} />;
};

//#endregion
//#region src/components/Layout/styled/BtmDashStyled.tsx
const btmDashDaisyStyles = css({
	backgroundColor: "base.200",
	borderTop: "default",
	gap: "2",
	boxShadow: "lg"
});
const BtmDashStyled = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <BtmDash {...others} class={cx(classesFromRecipe.btmDash, btmDashDaisyStyles, local.class)} />;
};

//#endregion
//#region src/components/Layout/styled/BtmDrawerStyled.tsx
const btmDrawerDaisyStyles = css({
	backgroundColor: "base.200",
	borderTop: "default",
	borderRadius: "lg lg 0 0",
	boxShadow: "2xl",
	roundedBottom: "0",
	roundedTop: "lg",
	margin: "0 auto",
	backdropFilter: "blur(8px)"
});
const BtmDrawerStyled = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <BtmDrawer {...others} class={cx(classesFromRecipe.btmDrawer, btmDrawerDaisyStyles, local.class)} />;
};

//#endregion
//#region src/components/Layout/styled/RightDrawerStyled.tsx
const rightDrawerStyles = css({
	backgroundColor: "base.200",
	borderLeft: "default",
	borderRadius: "lg 0 0 lg",
	boxShadow: "2xl",
	backdropFilter: "blur(8px)"
});
const RightDrawerStyled = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <RightSidebar {...others} class={cx(classesFromRecipe.rightSidebar, rightDrawerStyles, local.class)} />;
};

//#endregion
//#region src/components/Layout/styled/SidebarStyled.tsx
const sidebarDaisyStyles = css({
	backgroundColor: "base.200",
	borderRight: "default",
	boxShadow: "xl",
	backdropFilter: "blur(8px)"
});
const SidebarStyled = (props) => {
	const [local, others] = splitProps(props, ["class"]);
	return <Sidebar {...others} class={cx(classesFromRecipe.sidebar, sidebarDaisyStyles, local.class)} />;
};

//#endregion
//#region src/components/Layout/styled/ToggleButtonsStyled.tsx
const toggleItemStyles = {
	display: "flex",
	flexDirection: "column",
	alignItems: "center",
	gap: "0.25rem",
	padding: "0.5rem",
	cursor: "pointer",
	fontSize: "xs",
	color: "base.content",
	opacity: .8,
	transition: "opacity 0.15s ease",
	"&:hover": { opacity: 1 }
};
const checkedStyle = {
	opacity: 1,
	color: "primary",
	backgroundColor: "primary/10",
	borderRadius: "sm"
};
const ToggleButtonStyled = (props) => {
	const styledClass = css({ ...toggleItemStyles });
	return <ToggleButton {...props} class={cx(styledClass, props.class)} />;
};
const DrawerToggleStyled = (props) => <ToggleButtonStyled name="drawer" {...props} class={cx(css({
	...toggleItemStyles,
	_drawerChecked: { ...checkedStyle }
}), props.class)} />;
const NavbarToggleStyled = (props) => <ToggleButtonStyled name="navbar" {...props} class={cx(css({
	...toggleItemStyles,
	_navbarChecked: { ...checkedStyle }
}), props.class)} />;
const RightDrawerToggleStyled = (props) => <ToggleButtonStyled name="rightDrawer" {...props} class={cx(css({
	...toggleItemStyles,
	_rightDrawerChecked: { ...checkedStyle }
}), props.class)} />;
const BtmDrawerToggleStyled = (props) => <ToggleButtonStyled name="btmDrawer" {...props} class={cx(css({
	...toggleItemStyles,
	_btmDrawerChecked: { ...checkedStyle }
}), props.class)} />;
const BtmDashToggleStyled = (props) => <ToggleButtonStyled name="btmDash" {...props} class={cx(css({
	...toggleItemStyles,
	_btmDashChecked: { ...checkedStyle }
}), props.class)} />;

//#endregion
//#region src/components/Layout/styled/index.ts
const StyledLayout = {
	Navbar: NavbarStyled,
	MainArea,
	Sidebar: SidebarStyled,
	RightSidebar: RightDrawerStyled,
	BtmDrawer: BtmDrawerStyled,
	Main,
	BtmDash: BtmDashStyled,
	LayoutContainer
};
const StyledToggleComponents = {
	ToggleButton: ToggleButtonStyled,
	DrawerToggle: DrawerToggleStyled,
	NavbarToggle: NavbarToggleStyled,
	RightDrawerToggle: RightDrawerToggleStyled,
	BtmDrawerToggle: BtmDrawerToggleStyled,
	BtmDashToggle: BtmDashToggleStyled
};

//#endregion
//#region src/components/Combobox/style.ts
const comboboxStyles = () => ({
	control: css({
		display: "inline-flex",
		justifyContent: "space-between",
		w: "full",
		outline: "none",
		bg: "base.100",
		border: "field",
		borderRadius: "field",
		color: "base.content",
		transition: "border-color 0.3s, color 0.3s"
	}),
	controlMulti: css({ flexWrap: "wrap" }),
	inputContainer: css({
		display: "flex",
		flexWrap: "wrap",
		alignItems: "center",
		gap: "0.25rem",
		flex: "1"
	}),
	input: css({
		appearance: "none",
		display: "inline-flex",
		outline: "none",
		minWidth: "0",
		minHeight: "2rem",
		paddingLeft: "1rem",
		fontSize: "md",
		background: "transparent",
		borderTopLeftRadius: "field",
		borderBottomLeftRadius: "field",
		_placeholder: { color: "content.placeholder" }
	}),
	trigger: css({
		appearance: "none",
		display: "inline-flex",
		justifyContent: "center",
		alignItems: "center",
		width: "auto",
		outline: "none",
		borderTopRightRadius: "field",
		borderBottomRightRadius: "field",
		paddingX: "2",
		backgroundColor: "base.300",
		lineHeight: "0",
		borderLeft: "field",
		color: "base.content",
		transition: "0.3 background-color"
	}),
	clearButton: css({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		w: "1.5rem",
		h: "1.5rem",
		bg: "transparent",
		border: "none",
		borderRadius: "selector",
		cursor: "pointer",
		flexShrink: "0",
		transition: "all 0.15s ease-in-out",
		_hover: { bg: "base.200" }
	}),
	tag: css({
		display: "inline-flex",
		alignItems: "center",
		gap: "0.25rem",
		px: "0.5rem",
		py: "0.125rem",
		bg: "secondary",
		color: "content.secondary",
		fontSize: "0.75rem",
		fontWeight: "medium",
		borderRadius: "selector",
		flexShrink: "0"
	}),
	tagButton: css({
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		w: "1rem",
		h: "1rem",
		bg: "transparent",
		border: "none",
		borderRadius: "50%",
		cursor: "pointer",
		transition: "all 0.15s ease-in-out",
		_hover: {
			bg: "base.content",
			opacity: "0.2"
		}
	}),
	content: css({
		backgroundColor: "base.200",
		borderRadius: "selector",
		border: "selector",
		boxShadow: "lg",
		transformOrigin: "var(--kb-combobox-content-transform-origin)",
		animation: "comboboxContentHide 250ms ease-in forwards",
		_expanded: { animation: "comboboxContentShow 250ms ease-out" }
	}),
	listbox: css({
		overflowY: "auto",
		maxHeight: "clamp(5rem, 20rem, calc(100vh/2 - 2rem))",
		maxWidth: "clamp(5rem, full, calc(100vw/2 - 2rem))",
		padding: "1rem",
		_focus: { outline: "none" }
	}),
	item: css({
		color: "base.content",
		borderRadius: "selector",
		display: "flex",
		alignItems: "center",
		justifyContent: "space-between",
		height: "32px",
		paddingX: "8px",
		position: "relative",
		userSelect: "none",
		outline: "none",
		_disabled: {
			opacity: "0.5",
			pointerEvents: "none",
			color: "secondary"
		},
		_highlighted: {
			outline: "none",
			bg: "primary",
			color: "content.primary"
		}
	}),
	itemIndicator: css({
		h: "20px",
		w: "20px",
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center"
	}),
	icon: css({
		height: "20px",
		width: "20px",
		flex: "0 0 20px"
	}),
	description: css({
		fontSize: "0.875rem",
		color: "base.content",
		opacity: "0.7",
		mt: "0.5rem"
	}),
	errorMessage: css({
		fontSize: "0.875rem",
		color: "error",
		mt: "0.5rem",
		display: "none",
		_invalid: { display: "block" }
	})
});

//#endregion
//#region src/components/Combobox/SingleCombobox.tsx
const styles$1 = comboboxStyles();
function SingleCombobox(props) {
	const [value, setValue] = createSignal(props.value || "");
	createEffect(() => {
		setValue(props.value || "");
	});
	const handleChange = (newValue) => {
		const val = newValue || "";
		setValue(val);
		props.onChange?.(val);
	};
	return <div style={{
		width: "100%",
		"max-width": "20rem"
	}}>
      <Combobox multiple={false} options={props.options} value={value()} onChange={handleChange} placeholder={props.placeholder || "Search..."} triggerMode={props.triggerMode ?? "input"} itemComponent={(itemProps) => <Combobox.Item item={itemProps.item} class={styles$1.item}>
            <Combobox.ItemLabel>{itemProps.item.rawValue}</Combobox.ItemLabel>
            <Combobox.ItemIndicator class={styles$1.itemIndicator}>
              <Check />
            </Combobox.ItemIndicator>
          </Combobox.Item>}>
        <Show when={props.label}>
          <Combobox.Label>{props.label}</Combobox.Label>
        </Show>
        <Combobox.Control class={styles$1.control} aria-label="Fruit">
          <Combobox.Input class={styles$1.input} ref={props.ref} />
          <Combobox.Trigger class={styles$1.trigger}>
            <Combobox.Icon class={styles$1.icon}>
              <ChevronsUpDown />
            </Combobox.Icon>
          </Combobox.Trigger>
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class={styles$1.content}>
            <Combobox.Arrow />
            <Combobox.Listbox class={styles$1.listbox} />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>
    </div>;
}

//#endregion
//#region src/components/Badge.tsx
const badgeStyle = cva({
	base: {
		display: "inline-flex",
		alignItems: "center",
		px: "0.625rem",
		py: "0.125rem",
		borderRadius: "selector",
		fontWeight: "medium"
	},
	variants: { variant: {
		default: {
			bg: "secondary",
			color: "content.secondary"
		},
		success: {
			bg: "success",
			color: "content.success"
		},
		warning: {
			bg: "warning",
			color: "content.warning"
		},
		error: {
			bg: "error",
			color: "content.error"
		},
		neutral: {
			bg: "base.300",
			color: "base.content"
		}
	} },
	defaultVariants: { variant: "default" }
});
const Badge = styled("span", badgeStyle);

//#endregion
//#region src/components/Combobox/MultiCombobox.tsx
const styles = comboboxStyles();
function MultiCombobox(props) {
	const [value, setValue] = createSignal(props.value || []);
	const handleChange = (newValue) => {
		setValue(newValue);
		props.onChange?.(newValue);
	};
	return <div style={{
		width: "100%",
		"max-width": "20rem"
	}}>
      <Combobox multiple={true} options={props.options} value={value()} onChange={handleChange} placeholder={props.placeholder || "Search..."} triggerMode={props.triggerMode ?? "input"} itemComponent={(itemProps) => <Combobox.Item item={itemProps.item} class={styles.item}>
            <Combobox.ItemLabel>{itemProps.item.rawValue}</Combobox.ItemLabel>
            <Combobox.ItemIndicator class={styles.itemIndicator}>
              <Check class={styles.icon} />
            </Combobox.ItemIndicator>
          </Combobox.Item>}>
        <Combobox.Control class={cx(styles.control, styles.controlMulti)} aria-label={props.label || "Selection"}>
          {(state) => <>
              <div class={cx(styles.inputContainer, css({
		px: "0.25rem",
		py: "0.5rem"
	}))}>
                <For each={state.selectedOptions()}>
                  {(option) => <Badge onPointerDown={(e) => e.stopPropagation()} class={css({ fontSize: "0.75rem" })}>
                      {option}
                      <button class={styles.tagButton} onClick={() => state.remove(option)} type="button">
                        <X class="w-3 h-3" />
                      </button>
                    </Badge>}
                </For>
                <Combobox.Input ref={props.ref} class={styles.input} />
              </div>
              <TransitionAnim>
                <Show when={state.selectedOptions().length > 0}>
                  <button class={`${styles.clearButton} transition-all duration-200 ease-out`} onPointerDown={(e) => e.stopPropagation()} onClick={state.clear} type="button">
                    <X class={styles.icon} />
                  </button>
                </Show>
              </TransitionAnim>
              <Combobox.Trigger class={styles.trigger}>
                <Combobox.Icon>
                  <ChevronsUpDown class={styles.icon} />
                </Combobox.Icon>
              </Combobox.Trigger>
            </>}
        </Combobox.Control>
        <Combobox.Portal>
          <Combobox.Content class={styles.content}>
            <Combobox.Listbox class={styles.listbox} />
          </Combobox.Content>
        </Combobox.Portal>
      </Combobox>

      <p class={styles.description}>Selected: {value().join(", ") || "None"}</p>
    </div>;
}
const TransitionAnim = (props) => <Transition enterClass="opacity-0 scale-75 -translate-x-2" enterToClass="opacity-100 scale-100 translate-x-0" exitClass="opacity-100 scale-100 translate-x-0" exitToClass="opacity-0 scale-75 -translate-x-2" enterDuration={200} exitDuration={150}>
    {props.children}
  </Transition>;

//#endregion
//#region src/components/Layout/utilities/directives/resize-utils.ts
const getRemInPixels = () => {
	const fontSize = getComputedStyle(document.documentElement).fontSize;
	return parseFloat(fontSize) || 16;
};
const remToPx = (rem) => rem * getRemInPixels();
const pxToRem = (px) => px / getRemInPixels();
const getCurrentWidth = (cssVariable, defaultWidth = 320) => {
	const cssValue = getComputedStyle(document.documentElement).getPropertyValue(cssVariable).trim();
	if (cssValue.endsWith("rem")) return remToPx(parseFloat(cssValue));
	if (cssValue.endsWith("px")) return parseFloat(cssValue);
	return defaultWidth;
};
const updateWidthVariable = (cssVariable, widthPx) => {
	document.documentElement.style.setProperty(cssVariable, `${pxToRem(widthPx)}rem`);
};
const clampWidth = (widthPx, minWidth = 200, maxWidth = 600) => {
	return Math.max(minWidth, Math.min(maxWidth, widthPx));
};

//#endregion
//#region src/components/Layout/utilities/useResizeKeybindings.ts
function useResizeKeybindings(options) {
	const [isActive, setIsActive] = createSignal(false);
	const getOptions = () => ({
		stepSize: 20,
		enabled: true,
		...options
	});
	const ensureSidebarOpen = () => {
		const drawerInput = document.getElementById(createPeerId("drawer"));
		if (drawerInput && !drawerInput.checked) drawerInput.checked = true;
	};
	const resize = (direction) => {
		const opts = getOptions();
		if (!opts.enabled) return;
		if (!!opts.autoOpen && opts.autoOpen()) ensureSidebarOpen();
		opts.onResizeStart?.();
		const currentWidth = getCurrentWidth(opts.cssVariable, opts.defaultWidth);
		const delta = direction === "increase" ? opts.stepSize : -opts.stepSize;
		const newWidth = clampWidth(currentWidth + delta, opts.minWidth, opts.maxWidth);
		if (newWidth !== currentWidth) {
			updateWidthVariable(opts.cssVariable, newWidth);
			opts.onResize?.(newWidth);
		}
	};
	const handleKeyDown = (e) => {
		const opts = getOptions();
		if (!opts.enabled) return;
		if (e.altKey && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
			if (e.code === "BracketLeft") {
				e.preventDefault();
				resize("decrease");
				setIsActive(true);
			} else if (e.code === "BracketRight") {
				e.preventDefault();
				resize("increase");
				setIsActive(true);
			}
		}
	};
	const handleKeyUp = (e) => {
		if (e.code === "BracketLeft" || e.code === "BracketRight") setIsActive(false);
	};
	onMount(() => {
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		createEffect(() => {
			if (isActive()) document.documentElement.setAttribute("data-resizing", "true");
			else document.documentElement.removeAttribute("data-resizing");
		});
		onCleanup(() => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
			document.documentElement.removeAttribute("data-resizing");
		});
	});
	return {
		isActive,
		resize
	};
}

//#endregion
//#region src/components/Input.tsx
const inputStyle = cva({
	base: {
		border: "default",
		borderRadius: "field",
		fontSize: "field",
		px: 2,
		py: 1,
		_placeholder: { color: "content.placeholder" },
		_focus: {
			outline: "none",
			borderColor: "primary"
		}
	},
	variants: { variant: {
		primary: { borderColor: "primary" },
		secondary: { borderColor: "secondary" },
		ghost: { borderColor: "transparent" },
		accent: { bg: "accent" },
		neutral: { borderColor: "neutral" },
		info: { borderColor: "info" },
		success: { borderColor: "success" },
		warning: { borderColor: "warning" },
		error: { borderColor: "error" }
	} }
});
const Input = styled("input", inputStyle);

//#endregion
//#region src/components/DataTables/styles.ts
const tableStyles = { sortButton: css({
	display: "flex",
	alignItems: "center",
	gap: 1,
	bg: "transparent",
	cursor: "pointer",
	fontSize: "sm",
	fontWeight: "semibold",
	color: "base.content",
	whiteSpace: "nowrap",
	w: "full",
	px: 4,
	paddingTop: 2,
	_hover: {
		color: "base.content/80",
		transform: "scale(1.05)",
		transition: "transform 0.3s ease-in-out, color 0.3s ease-in-out"
	},
	_disabled: {
		cursor: "not-allowed",
		color: "content.placeholder"
	}
}) };
const table = sva({
	slots: [
		"outerHeader",
		"header",
		"row",
		"cell",
		"th",
		"outerFooter",
		"body",
		"table",
		"globalSearchInput",
		"container"
	],
	base: {
		container: {
			bg: "base.100",
			rounded: "box",
			border: "default",
			shadow: "box"
		},
		globalSearchInput: {
			w: "full",
			maxW: "20rem"
		},
		table: {
			borderCollapse: "separate",
			borderSpacing: "0"
		},
		body: { bg: "base.100" },
		outerFooter: {
			px: 4,
			py: 3,
			borderTop: "default",
			bg: "base.200",
			fontSize: "sm",
			color: "base.content",
			textAlign: "center",
			roundedBottom: "box"
		},
		outerHeader: {
			p: 4,
			rounded: "box"
		},
		row: { _hover: {
			bg: "base.hover",
			transition: "background 0.3s ease"
		} },
		cell: {
			px: 4,
			py: 3,
			display: "flex",
			alignItems: "center"
		},
		th: {
			px: 4,
			py: 3,
			textAlign: "left",
			fontSize: "sm",
			fontWeight: "semibold",
			color: "base.content",
			display: "flex",
			alignItems: "center",
			borderBottom: "default"
		}
	},
	variants: {
		darkHeader: {
			true: {
				outerHeader: { bg: "base.200" },
				header: { bg: "base.200" }
			},
			false: {
				outerHeader: { bg: "base.100" },
				header: { bg: "base.100" }
			}
		},
		striped: {
			true: { row: { bg: {
				_even: "base.100",
				_odd: "color-mix(in sRGB, var(--colors-base-100) 90%, var(--colors-base-content))"
			} } },
			false: { row: { bg: "base.100" } }
		},
		horizontalBorder: { true: { row: { borderBottom: "default" } } },
		verticalBorders: { true: {
			outerHeader: {
				bg: "base.200",
				borderBottom: "default"
			},
			header: { bg: "base.200" },
			cell: {
				borderRight: "default",
				_last: { borderRight: "none" }
			},
			th: {
				borderRight: "default",
				_last: { borderRight: "none" }
			}
		} },
		noFooter: { true: { outerFooter: { display: "none" } } },
		noHeader: { true: { outerHeader: { display: "none" } } }
	},
	defaultVariants: {
		darkHeader: true,
		horizontalBorder: true
	}
});

//#endregion
//#region src/components/DataTables/VirtualizedDatatable.tsx
const newTableStyles = table({ darkHeader: true });
function VirtualizedDataTable(props) {
	let parentRef;
	const [sorting, setSorting] = createSignal([]);
	const [columnFilters, setColumnFilters] = createSignal([]);
	const [globalFilter, setGlobalFilter] = createSignal("");
	const table$1 = createMemo(() => createSolidTable({
		get data() {
			return props.data;
		},
		get columns() {
			return props.columns;
		},
		state: {
			get sorting() {
				return props.enableSorting !== false ? sorting() : [];
			},
			get columnFilters() {
				return props.enableColumnFilters !== false ? columnFilters() : [];
			},
			get globalFilter() {
				return props.enableGlobalFilter !== false ? globalFilter() : "";
			}
		},
		onSortingChange: props.enableSorting !== false ? setSorting : () => {},
		onColumnFiltersChange: props.enableColumnFilters !== false ? setColumnFilters : () => {},
		onGlobalFilterChange: props.enableGlobalFilter !== false ? setGlobalFilter : () => {},
		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: props.enableSorting !== false ? getSortedRowModel() : getCoreRowModel(),
		getFilteredRowModel: props.enableGlobalFilter !== false || props.enableColumnFilters !== false ? getFilteredRowModel() : getCoreRowModel()
	}));
	const filteredRows = createMemo(() => table$1().getRowModel().rows);
	const rowVirtualizer = createMemo(() => createVirtualizer({
		get count() {
			return filteredRows().length;
		},
		getScrollElement: () => parentRef,
		estimateSize: props.estimateSize || (() => 48),
		overscan: props.overscan || 5
	}));
	return <div class={newTableStyles.container}>
      {props.enableGlobalFilter !== false && <div class={newTableStyles.outerHeader}>
          <Input value={globalFilter()} onInput={(e) => setGlobalFilter(e.currentTarget.value)} placeholder={props.searchPlaceholder || "Search all columns..."} class={newTableStyles.globalSearchInput} />
        </div>}

      <div style={{
		overflow: "scroll",
		"overflow-y": "hidden"
	}}>
        <table style={{ width: "100%" }} class={newTableStyles.table}>
          <thead class={newTableStyles.header} style={{
		width: "100%",
		display: "block"
	}}>
            <For each={table$1().getHeaderGroups()}>
              {(headerGroup) => <tr style={{
		display: "flex",
		width: "100%"
	}}>
                  <For each={headerGroup.headers}>
                    {(header) => <th class={newTableStyles.th} style={{
		width: header.column.columnDef.size ? `${header.column.columnDef.size}px` : "auto",
		flex: header.column.columnDef.size ? "none" : "1"
	}}>
                        {header.isPlaceholder ? null : <div style={{
		display: "flex",
		"flex-direction": "column",
		overflow: "hidden",
		gap: "0.25rem"
	}}>
                            <button class={tableStyles.sortButton} onClick={header.column.getToggleSortingHandler()} disabled={!header.column.getCanSort() || props.enableSorting === false}>
                              <span>
                                {flexRender(header.column.columnDef.header, header.getContext())}
                              </span>
                              {props.enableSorting !== false && header.column.getIsSorted() === "asc" && <ChevronUp size={16} />}
                              {props.enableSorting !== false && header.column.getIsSorted() === "desc" && <ChevronDown size={16} />}
                            </button>
                            <Show when={props.enableColumnFilters !== false && header.column.getCanFilter()}>
                              <Input style={{ flex: "1" }} type="text" value={header.column.getFilterValue() || ""} onInput={(e) => header.column.setFilterValue(e.currentTarget.value)} placeholder={"Filter..."} />
                            </Show>
                          </div>}
                      </th>}
                  </For>
                </tr>}
            </For>
          </thead>

          <tbody ref={parentRef} style={{
		display: "block",
		overflow: "auto",
		position: "relative",
		height: props.height || "400px"
	}} class={newTableStyles.body}>
            <For each={rowVirtualizer().getVirtualItems()}>
              {(virtualItem) => {
		const row = filteredRows()[virtualItem.index];
		if (!row) return null;
		return <tr class={newTableStyles.row} style={{
			height: `${virtualItem.size}px`,
			transform: `translateY(${virtualItem.start}px)`,
			position: "absolute",
			top: "0",
			left: "0",
			width: "100%",
			display: "flex"
		}}>
                    <For each={row.getVisibleCells()}>
                      {(cell) => <td class={newTableStyles.cell} style={{
			width: cell.column.columnDef.size ? `${cell.column.columnDef.size}px` : "auto",
			flex: cell.column.columnDef.size ? "none" : "1"
		}}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </td>}
                    </For>
                  </tr>;
	}}
            </For>

            {}
            <tr style={{
		height: `${rowVirtualizer().getTotalSize()}px`,
		visibility: "hidden"
	}}>
              <td style={{ display: "block" }} />
            </tr>
          </tbody>
        </table>
      </div>

      <div class={newTableStyles.outerFooter}>
        Showing {filteredRows().length} of {props.data.length} rows
      </div>
    </div>;
}

//#endregion
//#region src/components/VirtualList.tsx
function VirtualList(props) {
	let parentRef;
	const rowVirtualizer = createMemo(() => createVirtualizer({
		count: props.count(),
		getScrollElement: () => parentRef,
		estimateSize: props.estimateSize || (() => 35),
		overscan: props.overscan || 5
	}));
	return <div ref={parentRef} style={{
		height: props.height || "400px",
		overflow: "auto"
	}}>
      <div style={{
		height: `${rowVirtualizer().getTotalSize()}px`,
		width: "100%",
		position: "relative"
	}}>
        <For each={rowVirtualizer().getVirtualItems()}>
          {(virtualItem) => <div style={{
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: `${virtualItem.size}px`,
		transform: `translateY(${virtualItem.start}px)`
	}}>
              {props.renderItemCallback(virtualItem.index, virtualItem.size)}
            </div>}
        </For>
      </div>
    </div>;
}

//#endregion
//#region src/components/VirtualPhotoGrid.tsx
function VirtualPhotoGrid(props) {
	const getColumnsForViewport = () => {
		if (typeof window === "undefined") return 2;
		const width = window.innerWidth;
		if (width >= 1280) return 5;
		if (width >= 1024) return 4;
		if (width >= 768) return 3;
		return 2;
	};
	const [columns, setColumns] = createSignal(props.columns || getColumnsForViewport());
	const rowHeight = 220;
	const gap = 16;
	let parentRef;
	const handleResize = () => {
		if (!props.columns) setColumns(getColumnsForViewport());
	};
	onMount(() => {
		if (!props.columns) {
			window.addEventListener("resize", handleResize);
			onCleanup(() => window.removeEventListener("resize", handleResize));
		}
	});
	const rowCount = createMemo(() => Math.ceil(props.photos.length / columns()));
	const rowVirtualizer = createMemo(() => createVirtualizer({
		count: rowCount(),
		getScrollElement: () => parentRef,
		estimateSize: () => rowHeight + gap,
		overscan: props.overscan || 3
	}));
	const getPhotosForRow = (rowIndex) => {
		const start = rowIndex * columns();
		const end = Math.min(start + columns(), props.photos.length);
		return props.photos.slice(start, end);
	};
	return <div ref={parentRef} class={css({
		height: props.height || "100%",
		overflow: "auto",
		bg: "base.100"
	})}>
      <div style={{
		height: `${rowVirtualizer().getTotalSize()}px`,
		width: "100%",
		position: "relative"
	}}>
        {rowVirtualizer().getVirtualItems().map((virtualRow) => <div style={{
		position: "absolute",
		top: 0,
		left: 0,
		width: "100%",
		height: `${rowHeight}px`,
		transform: `translateY(${virtualRow.start}px)`,
		padding: `0 0 ${gap}px 0`
	}}>
              <div class={css({
		display: "grid",
		gap: 4,
		height: `${rowHeight - gap}px`,
		px: 4
	})} style={{ "grid-template-columns": `repeat(${columns()}, 1fr)` }}>
                <For each={getPhotosForRow(virtualRow.index)}>
                  {(photo) => <div class={css({
		height: `${rowHeight - gap}px`,
		width: "100%",
		bg: props.selectedPhotoId === photo.id ? "primary" : "base.200",
		borderRadius: "box",
		overflow: "hidden",
		cursor: "pointer",
		transition: "all 0.2s ease",
		_hover: {
			transform: "scale(1.02)",
			boxShadow: "lg"
		},
		border: props.selectedPhotoId === photo.id ? "2px solid" : "1px solid",
		borderColor: props.selectedPhotoId === photo.id ? "primary" : "base.300"
	})} onClick={() => props.onPhotoClick?.(photo)} onDblClick={() => props.onPhotoDblClick?.(photo)} onMouseDown={(e) => {
		if (e.button === 1) {
			e.preventDefault();
			props.onPhotoDblClick?.(photo);
		}
	}}>
                      <div class={css({
		position: "relative",
		height: "100%"
	})}>
                        <img src={photo.url} alt={photo.title} class={css({
		width: "100%",
		height: "70%",
		objectFit: "cover"
	})} loading="lazy" />
                        <div class={css({
		p: 2,
		height: "30%",
		display: "flex",
		flexDirection: "column",
		justifyContent: "center"
	})}>
                          <h3 class={css({
		fontSize: "sm",
		fontWeight: "semibold",
		color: props.selectedPhotoId === photo.id ? "white" : "base.content",
		mb: 1,
		overflow: "hidden",
		textOverflow: "ellipsis",
		whiteSpace: "nowrap"
	})}>
                            {photo.title}
                          </h3>
                          {photo.date && <p class={css({
		fontSize: "xs",
		color: props.selectedPhotoId === photo.id ? "white" : "content.neutral"
	})}>
                              {photo.date}
                            </p>}
                        </div>
                      </div>
                    </div>}
                </For>
              </div>
            </div>)}
      </div>
    </div>;
}

//#endregion
//#region src/components/Progress.tsx
const progressStyle = cva({
	base: {
		bg: "base.300",
		borderRadius: "full",
		overflow: "hidden",
		position: "relative"
	},
	variants: { size: {
		sm: { h: "0.25rem" },
		md: { h: "0.5rem" },
		lg: { h: "0.75rem" }
	} },
	defaultVariants: { size: "md" }
});
const progressBarStyle = cva({
	base: {
		h: "full",
		borderRadius: "full",
		transition: "all 0.3s ease"
	},
	variants: { variant: {
		default: { bg: "primary" },
		success: { bg: "success" },
		warning: { bg: "warning" },
		error: { bg: "error" }
	} },
	defaultVariants: { variant: "default" }
});
const ProgressContainer = styled("div", progressStyle);
const ProgressBar = styled("div", progressBarStyle);
function Progress(props) {
	const percentage = () => Math.min(Math.max(props.value() / (props.max?.() || 100) * 100, 0), 100);
	return <div style={{
		display: "flex",
		"align-items": "center",
		gap: "0.5rem"
	}}>
      <ProgressContainer size={props.size} class={props.class} style={{ flex: "1" }}>
        <ProgressBar variant={props.variant} style={{ width: `${percentage()}%` }} />
      </ProgressContainer>
      <Show when={props.showLabel?.()}>
        <span style={{
		"font-size": "0.75rem",
		color: "var(--colors-base-content)",
		"min-width": "2rem",
		"text-align": "right"
	}}>
          {Math.round(percentage())}%
        </span>
      </Show>
      {props.children}
    </div>;
}

//#endregion
//#region src/components/Button.tsx
const buttonStyle = cva({
	base: {
		display: "inline-flex",
		alignItems: "center",
		justifyContent: "center",
		fontWeight: "medium",
		borderRadius: "field",
		shadow: "md",
		cursor: "pointer",
		userSelect: "none",
		_focus: {
			outline: "none",
			ringWidth: "2px",
			ringColor: "primary",
			ringOffset: "2px"
		},
		transition: "all 0.2s ease",
		_hover: {
			transform: "scale(1.05)",
			opacity: .9
		},
		_active: { opacity: .8 },
		_disabled: {
			opacity: .5,
			cursor: "not-allowed",
			pointerEvents: "none"
		}
	},
	variants: {
		variant: {
			primary: {
				bg: "primary",
				color: "content.primary"
			},
			secondary: {
				bg: "secondary",
				color: "content.secondary"
			},
			accent: {
				bg: "accent",
				color: "content.accent"
			},
			neutral: {
				bg: "neutral",
				color: "content.neutral"
			},
			info: {
				bg: "info",
				color: "content.info"
			},
			success: {
				bg: "success",
				color: "content.success"
			},
			warning: {
				bg: "warning",
				color: "content.warning"
			},
			error: {
				bg: "error",
				color: "content.error"
			},
			ghost: {
				bg: "transparent",
				color: "base.content",
				shadow: "none",
				_hover: {
					bg: "base.200",
					opacity: 1
				},
				_active: {
					bg: "base.300",
					opacity: 1
				}
			},
			outline: {
				bg: "transparent",
				color: "primary",
				border: "1px solid",
				borderColor: "primary",
				_hover: {
					bg: "primary",
					color: "content.primary",
					opacity: 1
				},
				_active: {
					bg: "primary",
					color: "content.primary",
					opacity: .8
				}
			},
			link: {
				bg: "transparent",
				color: "link.default",
				textDecoration: "underline",
				textDecorationColor: "link.underline",
				_hover: {
					color: "link.hover",
					textDecorationColor: "link.hover",
					opacity: 1
				},
				_active: { color: "link.hover" },
				_focus: {
					ringWidth: "2px",
					ringColor: "link.default"
				}
			}
		},
		size: {
			xs: {
				px: 2,
				py: 1,
				fontSize: "xs",
				minH: "6"
			},
			sm: {
				px: 3,
				py: 1.5,
				fontSize: "sm",
				minH: "8"
			},
			md: {
				px: 4,
				py: 2,
				fontSize: "sm",
				minH: "10"
			},
			lg: {
				px: 6,
				py: 3,
				fontSize: "base",
				minH: "12"
			},
			xl: {
				px: 8,
				py: 4,
				fontSize: "lg",
				minH: "14"
			}
		},
		fullWidth: { true: { width: "full" } }
	},
	defaultVariants: {
		variant: "primary",
		size: "md"
	}
});
const Button = styled("button", buttonStyle);

//#endregion
export { Badge, BtmDash, BtmDashComponents, BtmDashContainer, BtmDashItem, BtmDashStyled, BtmDashToggle, BtmDashToggleStyled, BtmDrawer, BtmDrawerStyled, BtmDrawerToggle, BtmDrawerToggleStyled, Button, SingleCombobox as Combobox, DrawerToggle, DrawerToggleStyled, HamburgerIcon, LayoutComponents, LayoutContainer, Main, MainArea, MultiCombobox, Navbar, NavbarCenter, NavbarComponents, NavbarContent, NavbarEnd, NavbarLink, NavbarStart, NavbarStyled, NavbarToggle, NavbarToggleStyled, Progress, RightDrawerStyled, RightDrawerToggle, RightDrawerToggleStyled, RightSidebar, Sidebar, SidebarStyled, SingleCombobox, StyledLayout, StyledToggleComponents, ToggleButton, ToggleButtonStyled, ToggleComponents, VirtualList, VirtualPhotoGrid, VirtualizedDataTable, useResizeKeybindings };