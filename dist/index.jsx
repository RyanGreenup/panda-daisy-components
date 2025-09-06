import { For, Show, children, createComponent, createComputed, createEffect, createMemo, createSignal, mergeProps, onCleanup, onMount, splitProps } from "solid-js";
import { Combobox } from "@kobalte/core/combobox";
import Check from "lucide-solid/icons/check";
import ChevronsUpDown from "lucide-solid/icons/chevrons-up-down";
import X from "lucide-solid/icons/x";
import { Transition } from "solid-transition-group";
import { Dynamic, createComponent as createComponent$1 } from "solid-js/web";
import { createStore } from "solid-js/store";
import { createVirtualizer } from "@tanstack/solid-virtual";
import ChevronUp from "lucide-solid/icons/chevron-up";
import ChevronDown from "lucide-solid/icons/chevron-down";

//#region styled-system/helpers.js
function isObject(value) {
	return typeof value === "object" && value != null && !Array.isArray(value);
}
var isObjectOrArray = (obj) => typeof obj === "object" && obj !== null;
function compact(value) {
	return Object.fromEntries(Object.entries(value ?? {}).filter(([_, value2]) => value2 !== void 0));
}
var isBaseCondition = (v) => v === "base";
function filterBaseConditions(c) {
	return c.slice().filter((v) => !isBaseCondition(v));
}
function toChar(code) {
	return String.fromCharCode(code + (code > 25 ? 39 : 97));
}
function toName(code) {
	let name = "";
	let x;
	for (x = Math.abs(code); x > 52; x = x / 52 | 0) name = toChar(x % 52) + name;
	return toChar(x % 52) + name;
}
function toPhash(h, x) {
	let i = x.length;
	while (i) h = h * 33 ^ x.charCodeAt(--i);
	return h;
}
function toHash(value) {
	return toName(toPhash(5381, value) >>> 0);
}
var importantRegex = /\s*!(important)?/i;
function isImportant(value) {
	return typeof value === "string" ? importantRegex.test(value) : false;
}
function withoutImportant(value) {
	return typeof value === "string" ? value.replace(importantRegex, "").trim() : value;
}
function withoutSpace(str) {
	return typeof str === "string" ? str.replaceAll(" ", "_") : str;
}
var memo$1 = (fn) => {
	const cache = /* @__PURE__ */ new Map();
	const get = (...args) => {
		const key = JSON.stringify(args);
		if (cache.has(key)) return cache.get(key);
		const result = fn(...args);
		cache.set(key, result);
		return result;
	};
	return get;
};
var MERGE_OMIT = /* @__PURE__ */ new Set([
	"__proto__",
	"constructor",
	"prototype"
]);
function mergeProps$1(...sources) {
	return sources.reduce((prev, obj) => {
		if (!obj) return prev;
		Object.keys(obj).forEach((key) => {
			if (MERGE_OMIT.has(key)) return;
			const prevValue = prev[key];
			const value = obj[key];
			if (isObject(prevValue) && isObject(value)) prev[key] = mergeProps$1(prevValue, value);
			else prev[key] = value;
		});
		return prev;
	}, {});
}
var isNotNullish = (element) => element != null;
function walkObject(target, predicate, options = {}) {
	const { stop, getKey } = options;
	function inner(value, path = []) {
		if (isObjectOrArray(value)) {
			const result = {};
			for (const [prop, child] of Object.entries(value)) {
				const key = getKey?.(prop, child) ?? prop;
				const childPath = [...path, key];
				if (stop?.(value, childPath)) return predicate(value, path);
				const next = inner(child, childPath);
				if (isNotNullish(next)) result[key] = next;
			}
			return result;
		}
		return predicate(value, path);
	}
	return inner(target);
}
function mapObject(obj, fn) {
	if (Array.isArray(obj)) return obj.map((value) => fn(value));
	if (!isObject(obj)) return fn(obj);
	return walkObject(obj, (value) => fn(value));
}
function toResponsiveObject(values, breakpoints$1) {
	return values.reduce((acc, current, index) => {
		const key = breakpoints$1[index];
		if (current != null) acc[key] = current;
		return acc;
	}, {});
}
function normalizeStyleObject(styles$4, context$1, shorthand = true) {
	const { utility, conditions: conditions$1 } = context$1;
	const { hasShorthand, resolveShorthand: resolveShorthand$1 } = utility;
	return walkObject(styles$4, (value) => {
		return Array.isArray(value) ? toResponsiveObject(value, conditions$1.breakpoints.keys) : value;
	}, {
		stop: (value) => Array.isArray(value),
		getKey: shorthand ? (prop) => hasShorthand ? resolveShorthand$1(prop) : prop : void 0
	});
}
var fallbackCondition = {
	shift: (v) => v,
	finalize: (v) => v,
	breakpoints: { keys: [] }
};
var sanitize = (value) => typeof value === "string" ? value.replaceAll(/[\n\s]+/g, " ") : value;
function createCss(context$1) {
	const { utility, hash, conditions: conds = fallbackCondition } = context$1;
	const formatClassName = (str) => [utility.prefix, str].filter(Boolean).join("-");
	const hashFn = (conditions$1, className) => {
		let result;
		if (hash) {
			const baseArray = [...conds.finalize(conditions$1), className];
			result = formatClassName(utility.toHash(baseArray, toHash));
		} else {
			const baseArray = [...conds.finalize(conditions$1), formatClassName(className)];
			result = baseArray.join(":");
		}
		return result;
	};
	return memo$1(({ base,...styles$4 } = {}) => {
		const styleObject = Object.assign(styles$4, base);
		const normalizedObject = normalizeStyleObject(styleObject, context$1);
		const classNames = /* @__PURE__ */ new Set();
		walkObject(normalizedObject, (value, paths) => {
			if (value == null) return;
			const important = isImportant(value);
			const [prop, ...allConditions] = conds.shift(paths);
			const conditions$1 = filterBaseConditions(allConditions);
			const transformed = utility.transform(prop, withoutImportant(sanitize(value)));
			let className = hashFn(conditions$1, transformed.className);
			if (important) className = `${className}!`;
			classNames.add(className);
		});
		return Array.from(classNames).join(" ");
	});
}
function compactStyles(...styles$4) {
	return styles$4.flat().filter((style) => isObject(style) && Object.keys(compact(style)).length > 0);
}
function createMergeCss(context$1) {
	function resolve(styles$4) {
		const allStyles = compactStyles(...styles$4);
		if (allStyles.length === 1) return allStyles;
		return allStyles.map((style) => normalizeStyleObject(style, context$1));
	}
	function mergeCss$1(...styles$4) {
		return mergeProps$1(...resolve(styles$4));
	}
	function assignCss$1(...styles$4) {
		return Object.assign({}, ...resolve(styles$4));
	}
	return {
		mergeCss: memo$1(mergeCss$1),
		assignCss: assignCss$1
	};
}
var wordRegex = /([A-Z])/g;
var msRegex = /^ms-/;
var hypenateProperty = memo$1((property) => {
	if (property.startsWith("--")) return property;
	return property.replace(wordRegex, "-$1").replace(msRegex, "-ms-").toLowerCase();
});
var fns = [
	"min",
	"max",
	"clamp",
	"calc"
];
var fnRegExp = /* @__PURE__ */ new RegExp(`^(${fns.join("|")})\\(.*\\)`);
var isCssFunction = (v) => typeof v === "string" && fnRegExp.test(v);
var lengthUnits = "cm,mm,Q,in,pc,pt,px,em,ex,ch,rem,lh,rlh,vw,vh,vmin,vmax,vb,vi,svw,svh,lvw,lvh,dvw,dvh,cqw,cqh,cqi,cqb,cqmin,cqmax,%";
var lengthUnitsPattern = `(?:${lengthUnits.split(",").join("|")})`;
var lengthRegExp = /* @__PURE__ */ new RegExp(`^[+-]?[0-9]*.?[0-9]+(?:[eE][+-]?[0-9]+)?${lengthUnitsPattern}$`);
var isCssUnit = (v) => typeof v === "string" && lengthRegExp.test(v);
var isCssVar = (v) => typeof v === "string" && /^var\(--.+\)$/.test(v);
var patternFns = {
	map: mapObject,
	isCssFunction,
	isCssVar,
	isCssUnit
};
var getPatternStyles = (pattern, styles$4) => {
	if (!pattern?.defaultValues) return styles$4;
	const defaults$1 = typeof pattern.defaultValues === "function" ? pattern.defaultValues(styles$4) : pattern.defaultValues;
	return Object.assign({}, defaults$1, compact(styles$4));
};
var getSlotRecipes = (recipe = {}) => {
	const init = (slot) => ({
		className: [recipe.className, slot].filter(Boolean).join("__"),
		base: recipe.base?.[slot] ?? {},
		variants: {},
		defaultVariants: recipe.defaultVariants ?? {},
		compoundVariants: recipe.compoundVariants ? getSlotCompoundVariant(recipe.compoundVariants, slot) : []
	});
	const slots = recipe.slots ?? [];
	const recipeParts = slots.map((slot) => [slot, init(slot)]);
	for (const [variantsKey, variantsSpec] of Object.entries(recipe.variants ?? {})) for (const [variantKey, variantSpec] of Object.entries(variantsSpec)) recipeParts.forEach(([slot, slotRecipe]) => {
		slotRecipe.variants[variantsKey] ??= {};
		slotRecipe.variants[variantsKey][variantKey] = variantSpec[slot] ?? {};
	});
	return Object.fromEntries(recipeParts);
};
var getSlotCompoundVariant = (compoundVariants, slotName) => compoundVariants.filter((compoundVariant) => compoundVariant.css[slotName]).map((compoundVariant) => ({
	...compoundVariant,
	css: compoundVariant.css[slotName]
}));
function splitProps$1(props, ...keys) {
	const descriptors = Object.getOwnPropertyDescriptors(props);
	const dKeys = Object.keys(descriptors);
	const split = (k) => {
		const clone = {};
		for (let i = 0; i < k.length; i++) {
			const key = k[i];
			if (descriptors[key]) {
				Object.defineProperty(clone, key, descriptors[key]);
				delete descriptors[key];
			}
		}
		return clone;
	};
	const fn = (key) => split(Array.isArray(key) ? key : dKeys.filter(key));
	return keys.map(fn).concat(split(dKeys));
}
var uniq = (...items) => {
	const set = items.reduce((acc, currItems) => {
		if (currItems) currItems.forEach((item) => acc.add(item));
		return acc;
	}, /* @__PURE__ */ new Set([]));
	return Array.from(set);
};
var htmlProps = [
	"htmlSize",
	"htmlTranslate",
	"htmlWidth",
	"htmlHeight"
];
function convert(key) {
	return htmlProps.includes(key) ? key.replace("html", "").toLowerCase() : key;
}
function normalizeHTMLProps(props) {
	return Object.fromEntries(Object.entries(props).map(([key, value]) => [convert(key), value]));
}
normalizeHTMLProps.keys = htmlProps;

//#endregion
//#region styled-system/css/conditions.js
const conditionsStr = "_light,_dark,_synthwaveTheme,_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_complete,_incomplete,_dragging,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_grabbed,_underValue,_overValue,_atValue,_default,_optional,_open,_closed,_fullscreen,_loading,_hidden,_current,_currentPage,_currentStep,_today,_unavailable,_rangeStart,_rangeEnd,_now,_topmost,_motionReduce,_motionSafe,_print,_landscape,_portrait,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_icon,_starting,_noscript,_invertedColors,_navbarChecked,_btmDashChecked,_drawerChecked,_rightDrawerChecked,_btmDrawerChecked,_sidebarResizing,sm,smOnly,smDown,md,mdOnly,mdDown,lg,lgOnly,lgDown,xl,xlOnly,xlDown,2xl,2xlOnly,2xlDown,minWidthDrawer,minWidthDrawerOnly,minWidthDrawerDown,minWidthBtmDash,minWidthBtmDashOnly,minWidthBtmDashDown,smToMd,smToLg,smToXl,smTo2xl,smToMinWidthDrawer,smToMinWidthBtmDash,mdToLg,mdToXl,mdTo2xl,mdToMinWidthDrawer,mdToMinWidthBtmDash,lgToXl,lgTo2xl,lgToMinWidthDrawer,lgToMinWidthBtmDash,xlTo2xl,xlToMinWidthDrawer,xlToMinWidthBtmDash,2xlToMinWidthDrawer,2xlToMinWidthBtmDash,minWidthDrawerToMinWidthBtmDash,@/xs,@/sm,@/md,@/lg,@/xl,@/2xl,@/3xl,@/4xl,@/5xl,@/6xl,@/7xl,@/8xl,base";
const conditions = new Set(conditionsStr.split(","));
const conditionRegex = /^@|&|&$/;
function isCondition(value) {
	return conditions.has(value) || conditionRegex.test(value);
}
const underscoreRegex = /^_/;
const conditionsSelectorRegex = /&|@/;
function finalizeConditions(paths) {
	return paths.map((path) => {
		if (conditions.has(path)) return path.replace(underscoreRegex, "");
		if (conditionsSelectorRegex.test(path)) return `[${withoutSpace(path.trim())}]`;
		return path;
	});
}
function sortConditions(paths) {
	return paths.sort((a, b) => {
		const aa = isCondition(a);
		const bb = isCondition(b);
		if (aa && !bb) return 1;
		if (!aa && bb) return -1;
		return 0;
	});
}

//#endregion
//#region styled-system/css/css.js
const utilities = "aspectRatio:asp,boxDecorationBreak:bx-db,zIndex:z,boxSizing:bx-s,objectPosition:obj-p,objectFit:obj-f,overscrollBehavior:ovs-b,overscrollBehaviorX:ovs-bx,overscrollBehaviorY:ovs-by,position:pos/1,top:top,left:left,inset:inset,insetInline:inset-x/insetX,insetBlock:inset-y/insetY,insetBlockEnd:inset-be,insetBlockStart:inset-bs,insetInlineEnd:inset-e/insetEnd/end,insetInlineStart:inset-s/insetStart/start,right:right,bottom:bottom,float:float,visibility:vis,display:d,hideFrom:hide,hideBelow:show,flexBasis:flex-b,flex:flex,flexDirection:flex-d/flexDir,flexGrow:flex-g,flexShrink:flex-sh,gridTemplateColumns:grid-tc,gridTemplateRows:grid-tr,gridColumn:grid-c,gridRow:grid-r,gridColumnStart:grid-cs,gridColumnEnd:grid-ce,gridAutoFlow:grid-af,gridAutoColumns:grid-ac,gridAutoRows:grid-ar,gap:gap,gridGap:grid-g,gridRowGap:grid-rg,gridColumnGap:grid-cg,rowGap:rg,columnGap:cg,justifyContent:jc,alignContent:ac,alignItems:ai,alignSelf:as,padding:p/1,paddingLeft:pl/1,paddingRight:pr/1,paddingTop:pt/1,paddingBottom:pb/1,paddingBlock:py/1/paddingY,paddingBlockEnd:pbe,paddingBlockStart:pbs,paddingInline:px/paddingX/1,paddingInlineEnd:pe/1/paddingEnd,paddingInlineStart:ps/1/paddingStart,marginLeft:ml/1,marginRight:mr/1,marginTop:mt/1,marginBottom:mb/1,margin:m/1,marginBlock:my/1/marginY,marginBlockEnd:mbe,marginBlockStart:mbs,marginInline:mx/1/marginX,marginInlineEnd:me/1/marginEnd,marginInlineStart:ms/1/marginStart,spaceX:sx,spaceY:sy,outlineWidth:ring-w/ringWidth,outlineColor:ring-c/ringColor,outline:ring/1,outlineOffset:ring-o/ringOffset,focusRing:focus-ring,focusVisibleRing:focus-v-ring,focusRingColor:focus-ring-c,focusRingOffset:focus-ring-o,focusRingWidth:focus-ring-w,focusRingStyle:focus-ring-s,divideX:dvd-x,divideY:dvd-y,divideColor:dvd-c,divideStyle:dvd-s,width:w/1,inlineSize:w-is,minWidth:min-w/minW,minInlineSize:min-w-is,maxWidth:max-w/maxW,maxInlineSize:max-w-is,height:h/1,blockSize:h-bs,minHeight:min-h/minH,minBlockSize:min-h-bs,maxHeight:max-h/maxH,maxBlockSize:max-b,boxSize:size,color:c,fontFamily:ff,fontSize:fs,fontSizeAdjust:fs-a,fontPalette:fp,fontKerning:fk,fontFeatureSettings:ff-s,fontWeight:fw,fontSmoothing:fsmt,fontVariant:fv,fontVariantAlternates:fv-alt,fontVariantCaps:fv-caps,fontVariationSettings:fv-s,fontVariantNumeric:fv-num,letterSpacing:ls,lineHeight:lh,textAlign:ta,textDecoration:td,textDecorationColor:td-c,textEmphasisColor:te-c,textDecorationStyle:td-s,textDecorationThickness:td-t,textUnderlineOffset:tu-o,textTransform:tt,textIndent:ti,textShadow:tsh,textShadowColor:tsh-c/textShadowColor,textOverflow:tov,verticalAlign:va,wordBreak:wb,textWrap:tw,truncate:trunc,lineClamp:lc,listStyleType:li-t,listStylePosition:li-pos,listStyleImage:li-img,listStyle:li-s,backgroundPosition:bg-p/bgPosition,backgroundPositionX:bg-p-x/bgPositionX,backgroundPositionY:bg-p-y/bgPositionY,backgroundAttachment:bg-a/bgAttachment,backgroundClip:bg-cp/bgClip,background:bg/1,backgroundColor:bg-c/bgColor,backgroundOrigin:bg-o/bgOrigin,backgroundImage:bg-i/bgImage,backgroundRepeat:bg-r/bgRepeat,backgroundBlendMode:bg-bm/bgBlendMode,backgroundSize:bg-s/bgSize,backgroundGradient:bg-grad/bgGradient,backgroundLinear:bg-linear/bgLinear,backgroundRadial:bg-radial/bgRadial,backgroundConic:bg-conic/bgConic,textGradient:txt-grad,gradientFromPosition:grad-from-pos,gradientToPosition:grad-to-pos,gradientFrom:grad-from,gradientTo:grad-to,gradientVia:grad-via,gradientViaPosition:grad-via-pos,borderRadius:bdr/rounded,borderTopLeftRadius:bdr-tl/roundedTopLeft,borderTopRightRadius:bdr-tr/roundedTopRight,borderBottomRightRadius:bdr-br/roundedBottomRight,borderBottomLeftRadius:bdr-bl/roundedBottomLeft,borderTopRadius:bdr-t/roundedTop,borderRightRadius:bdr-r/roundedRight,borderBottomRadius:bdr-b/roundedBottom,borderLeftRadius:bdr-l/roundedLeft,borderStartStartRadius:bdr-ss/roundedStartStart,borderStartEndRadius:bdr-se/roundedStartEnd,borderStartRadius:bdr-s/roundedStart,borderEndStartRadius:bdr-es/roundedEndStart,borderEndEndRadius:bdr-ee/roundedEndEnd,borderEndRadius:bdr-e/roundedEnd,border:bd,borderWidth:bd-w,borderTopWidth:bd-t-w,borderLeftWidth:bd-l-w,borderRightWidth:bd-r-w,borderBottomWidth:bd-b-w,borderBlockStartWidth:bd-bs-w,borderBlockEndWidth:bd-be-w,borderColor:bd-c,borderInline:bd-x/borderX,borderInlineWidth:bd-x-w/borderXWidth,borderInlineColor:bd-x-c/borderXColor,borderBlock:bd-y/borderY,borderBlockWidth:bd-y-w/borderYWidth,borderBlockColor:bd-y-c/borderYColor,borderLeft:bd-l,borderLeftColor:bd-l-c,borderInlineStart:bd-s/borderStart,borderInlineStartWidth:bd-s-w/borderStartWidth,borderInlineStartColor:bd-s-c/borderStartColor,borderRight:bd-r,borderRightColor:bd-r-c,borderInlineEnd:bd-e/borderEnd,borderInlineEndWidth:bd-e-w/borderEndWidth,borderInlineEndColor:bd-e-c/borderEndColor,borderTop:bd-t,borderTopColor:bd-t-c,borderBottom:bd-b,borderBottomColor:bd-b-c,borderBlockEnd:bd-be,borderBlockEndColor:bd-be-c,borderBlockStart:bd-bs,borderBlockStartColor:bd-bs-c,opacity:op,boxShadow:bx-sh/shadow,boxShadowColor:bx-sh-c/shadowColor,mixBlendMode:mix-bm,filter:filter,brightness:brightness,contrast:contrast,grayscale:grayscale,hueRotate:hue-rotate,invert:invert,saturate:saturate,sepia:sepia,dropShadow:drop-shadow,blur:blur,backdropFilter:bkdp,backdropBlur:bkdp-blur,backdropBrightness:bkdp-brightness,backdropContrast:bkdp-contrast,backdropGrayscale:bkdp-grayscale,backdropHueRotate:bkdp-hue-rotate,backdropInvert:bkdp-invert,backdropOpacity:bkdp-opacity,backdropSaturate:bkdp-saturate,backdropSepia:bkdp-sepia,borderCollapse:bd-cl,borderSpacing:bd-sp,borderSpacingX:bd-sx,borderSpacingY:bd-sy,tableLayout:tbl,transitionTimingFunction:trs-tmf,transitionDelay:trs-dly,transitionDuration:trs-dur,transitionProperty:trs-prop,transition:trs,animation:anim,animationName:anim-n,animationTimingFunction:anim-tmf,animationDuration:anim-dur,animationDelay:anim-dly,animationPlayState:anim-ps,animationComposition:anim-comp,animationFillMode:anim-fm,animationDirection:anim-dir,animationIterationCount:anim-ic,animationRange:anim-r,animationState:anim-s,animationRangeStart:anim-rs,animationRangeEnd:anim-re,animationTimeline:anim-tl,transformOrigin:trf-o,transformBox:trf-b,transformStyle:trf-s,transform:trf,rotate:rotate,rotateX:rotate-x,rotateY:rotate-y,rotateZ:rotate-z,scale:scale,scaleX:scale-x,scaleY:scale-y,translate:translate,translateX:translate-x/x,translateY:translate-y/y,translateZ:translate-z/z,accentColor:ac-c,caretColor:ca-c,scrollBehavior:scr-bhv,scrollbar:scr-bar,scrollbarColor:scr-bar-c,scrollbarGutter:scr-bar-g,scrollbarWidth:scr-bar-w,scrollMargin:scr-m,scrollMarginLeft:scr-ml,scrollMarginRight:scr-mr,scrollMarginTop:scr-mt,scrollMarginBottom:scr-mb,scrollMarginBlock:scr-my/scrollMarginY,scrollMarginBlockEnd:scr-mbe,scrollMarginBlockStart:scr-mbt,scrollMarginInline:scr-mx/scrollMarginX,scrollMarginInlineEnd:scr-me,scrollMarginInlineStart:scr-ms,scrollPadding:scr-p,scrollPaddingBlock:scr-py/scrollPaddingY,scrollPaddingBlockStart:scr-pbs,scrollPaddingBlockEnd:scr-pbe,scrollPaddingInline:scr-px/scrollPaddingX,scrollPaddingInlineEnd:scr-pe,scrollPaddingInlineStart:scr-ps,scrollPaddingLeft:scr-pl,scrollPaddingRight:scr-pr,scrollPaddingTop:scr-pt,scrollPaddingBottom:scr-pb,scrollSnapAlign:scr-sa,scrollSnapStop:scrs-s,scrollSnapType:scrs-t,scrollSnapStrictness:scrs-strt,scrollSnapMargin:scrs-m,scrollSnapMarginTop:scrs-mt,scrollSnapMarginBottom:scrs-mb,scrollSnapMarginLeft:scrs-ml,scrollSnapMarginRight:scrs-mr,scrollSnapCoordinate:scrs-c,scrollSnapDestination:scrs-d,scrollSnapPointsX:scrs-px,scrollSnapPointsY:scrs-py,scrollSnapTypeX:scrs-tx,scrollSnapTypeY:scrs-ty,scrollTimeline:scrtl,scrollTimelineAxis:scrtl-a,scrollTimelineName:scrtl-n,touchAction:tch-a,userSelect:us,overflow:ov,overflowWrap:ov-wrap,overflowX:ov-x,overflowY:ov-y,overflowAnchor:ov-a,overflowBlock:ov-b,overflowInline:ov-i,overflowClipBox:ovcp-bx,overflowClipMargin:ovcp-m,overscrollBehaviorBlock:ovs-bb,overscrollBehaviorInline:ovs-bi,fill:fill,stroke:stk,strokeWidth:stk-w,strokeDasharray:stk-dsh,strokeDashoffset:stk-do,strokeLinecap:stk-lc,strokeLinejoin:stk-lj,strokeMiterlimit:stk-ml,strokeOpacity:stk-op,srOnly:sr,debug:debug,appearance:ap,backfaceVisibility:bfv,clipPath:cp-path,hyphens:hy,mask:msk,maskImage:msk-i,maskSize:msk-s,textSizeAdjust:txt-adj,container:cq,containerName:cq-n,containerType:cq-t,cursor:cursor,textStyle:textStyle";
const classNameByProp = /* @__PURE__ */ new Map();
const shorthands = /* @__PURE__ */ new Map();
utilities.split(",").forEach((utility) => {
	const [prop, meta] = utility.split(":");
	const [className, ...shorthandList] = meta.split("/");
	classNameByProp.set(prop, className);
	if (shorthandList.length) shorthandList.forEach((shorthand) => {
		shorthands.set(shorthand === "1" ? className : shorthand, prop);
	});
});
const resolveShorthand = (prop) => shorthands.get(prop) || prop;
const context = {
	conditions: {
		shift: sortConditions,
		finalize: finalizeConditions,
		breakpoints: { keys: [
			"base",
			"sm",
			"md",
			"lg",
			"xl",
			"2xl",
			"minWidthDrawer",
			"minWidthBtmDash"
		] }
	},
	utility: {
		transform: (prop, value) => {
			const key = resolveShorthand(prop);
			const propKey = classNameByProp.get(key) || hypenateProperty(key);
			return { className: `${propKey}_${withoutSpace(value)}` };
		},
		hasShorthand: true,
		toHash: (path, hashFn) => hashFn(path.join(":")),
		resolveShorthand
	}
};
const cssFn = createCss(context);
const css = (...styles$4) => cssFn(mergeCss(...styles$4));
css.raw = (...styles$4) => mergeCss(...styles$4);
const { mergeCss, assignCss } = createMergeCss(context);

//#endregion
//#region styled-system/css/cx.js
function cx() {
	let str = "", i = 0, arg;
	for (; i < arguments.length;) if ((arg = arguments[i++]) && typeof arg === "string") {
		str && (str += " ");
		str += arg;
	}
	return str;
}

//#endregion
//#region styled-system/css/cva.js
const defaults = (conf) => ({
	base: {},
	variants: {},
	defaultVariants: {},
	compoundVariants: [],
	...conf
});
function cva(config) {
	const { base, variants, defaultVariants, compoundVariants } = defaults(config);
	const getVariantProps$1 = (variants$1) => ({
		...defaultVariants,
		...compact(variants$1)
	});
	function resolve(props = {}) {
		const computedVariants = getVariantProps$1(props);
		let variantCss = { ...base };
		for (const [key, value] of Object.entries(computedVariants)) if (variants[key]?.[value]) variantCss = mergeCss(variantCss, variants[key][value]);
		const compoundVariantCss = getCompoundVariantCss(compoundVariants, computedVariants);
		return mergeCss(variantCss, compoundVariantCss);
	}
	function merge(__cva) {
		const override = defaults(__cva.config);
		const variantKeys$1 = uniq(__cva.variantKeys, Object.keys(variants));
		return cva({
			base: mergeCss(base, override.base),
			variants: Object.fromEntries(variantKeys$1.map((key) => [key, mergeCss(variants[key], override.variants[key])])),
			defaultVariants: mergeProps$1(defaultVariants, override.defaultVariants),
			compoundVariants: [...compoundVariants, ...override.compoundVariants]
		});
	}
	function cvaFn(props) {
		return css(resolve(props));
	}
	const variantKeys = Object.keys(variants);
	function splitVariantProps(props) {
		return splitProps$1(props, variantKeys);
	}
	const variantMap = Object.fromEntries(Object.entries(variants).map(([key, value]) => [key, Object.keys(value)]));
	return Object.assign(memo$1(cvaFn), {
		__cva__: true,
		variantMap,
		variantKeys,
		raw: resolve,
		config,
		merge,
		splitVariantProps,
		getVariantProps: getVariantProps$1
	});
}
function getCompoundVariantCss(compoundVariants, variantMap) {
	let result = {};
	compoundVariants.forEach((compoundVariant) => {
		const isMatching = Object.entries(compoundVariant).every(([key, value]) => {
			if (key === "css") return true;
			const values = Array.isArray(value) ? value : [value];
			return values.some((value$1) => variantMap[key] === value$1);
		});
		if (isMatching) result = mergeCss(result, compoundVariant.css);
	});
	return result;
}
function assertCompoundVariant(name, compoundVariants, variants, prop) {
	if (compoundVariants.length > 0 && typeof variants?.[prop] === "object") throw new Error(`[recipe:${name}:${prop}] Conditions are not supported when using compound variants.`);
}

//#endregion
//#region styled-system/css/sva.js
function sva(config) {
	const slots = Object.entries(getSlotRecipes(config)).map(([slot, slotCva]) => [slot, cva(slotCva)]);
	const defaultVariants = config.defaultVariants ?? {};
	const classNameMap = slots.reduce((acc, [slot, cvaFn]) => {
		if (config.className) acc[slot] = cvaFn.config.className;
		return acc;
	}, {});
	function svaFn(props) {
		const result = slots.map(([slot, cvaFn]) => [slot, cx(cvaFn(props), classNameMap[slot])]);
		return Object.fromEntries(result);
	}
	function raw(props) {
		const result = slots.map(([slot, cvaFn]) => [slot, cvaFn.raw(props)]);
		return Object.fromEntries(result);
	}
	const variants = config.variants ?? {};
	const variantKeys = Object.keys(variants);
	function splitVariantProps(props) {
		return splitProps$1(props, variantKeys);
	}
	const getVariantProps$1 = (variants$1) => ({
		...defaultVariants,
		...compact(variants$1)
	});
	const variantMap = Object.fromEntries(Object.entries(variants).map(([key, value]) => [key, Object.keys(value)]));
	return Object.assign(memo$1(svaFn), {
		__cva__: false,
		raw,
		config,
		variantMap,
		variantKeys,
		classNameMap,
		splitVariantProps,
		getVariantProps: getVariantProps$1
	});
}

//#endregion
//#region styled-system/recipes/create-recipe.js
const createRecipe = (name, defaultVariants, compoundVariants) => {
	const getVariantProps$1 = (variants) => {
		return {
			[name]: "__ignore__",
			...defaultVariants,
			...compact(variants)
		};
	};
	const recipeFn = (variants, withCompoundVariants = true) => {
		const transform = (prop, value) => {
			assertCompoundVariant(name, compoundVariants, variants, prop);
			if (value === "__ignore__") return { className: name };
			value = withoutSpace(value);
			return { className: `${name}--${prop}_${value}` };
		};
		const recipeCss = createCss({
			conditions: {
				shift: sortConditions,
				finalize: finalizeConditions,
				breakpoints: { keys: [
					"base",
					"sm",
					"md",
					"lg",
					"xl",
					"2xl",
					"minWidthDrawer",
					"minWidthBtmDash"
				] }
			},
			utility: {
				toHash: (path, hashFn) => hashFn(path.join(":")),
				transform
			}
		});
		const recipeStyles = getVariantProps$1(variants);
		if (withCompoundVariants) {
			const compoundVariantStyles = getCompoundVariantCss(compoundVariants, recipeStyles);
			return cx(recipeCss(recipeStyles), css(compoundVariantStyles));
		}
		return recipeCss(recipeStyles);
	};
	return {
		recipeFn,
		getVariantProps: getVariantProps$1,
		__getCompoundVariantCss__: (variants) => {
			return getCompoundVariantCss(compoundVariants, getVariantProps$1(variants));
		}
	};
};
const mergeRecipes = (recipeA, recipeB) => {
	if (recipeA && !recipeB) return recipeA;
	if (!recipeA && recipeB) return recipeB;
	const recipeFn = (...args) => cx(recipeA(...args), recipeB(...args));
	const variantKeys = uniq(recipeA.variantKeys, recipeB.variantKeys);
	const variantMap = variantKeys.reduce((acc, key) => {
		acc[key] = uniq(recipeA.variantMap[key], recipeB.variantMap[key]);
		return acc;
	}, {});
	return Object.assign(recipeFn, {
		__recipe__: true,
		__name__: `${recipeA.__name__} ${recipeB.__name__}`,
		raw: (props) => props,
		variantKeys,
		variantMap,
		splitVariantProps(props) {
			return splitProps$1(props, variantKeys);
		}
	});
};

//#endregion
//#region styled-system/recipes/article.js
const articleFn = /* @__PURE__ */ createRecipe("article", {}, []);
const articleVariantMap = {};
const articleVariantKeys = Object.keys(articleVariantMap);
const article = /* @__PURE__ */ Object.assign(memo$1(articleFn.recipeFn), {
	__recipe__: true,
	__name__: "article",
	__getCompoundVariantCss__: articleFn.__getCompoundVariantCss__,
	raw: (props) => props,
	variantKeys: articleVariantKeys,
	variantMap: articleVariantMap,
	merge(recipe) {
		return mergeRecipes(this, recipe);
	},
	splitVariantProps(props) {
		return splitProps$1(props, articleVariantKeys);
	},
	getVariantProps: articleFn.getVariantProps
});

//#endregion
//#region styled-system/recipes/layout.js
const layoutDefaultVariants = {
	"navbar": true,
	"leftSidebar": "responsive"
};
const layoutCompoundVariants = [];
const layoutSlotNames = [
	["mainContent", "mainLayout__mainContent"],
	["btmDash", "mainLayout__btmDash"],
	["overlay", "mainLayout__overlay"],
	["rightDrawerOverlay", "mainLayout__rightDrawerOverlay"],
	["navbar", "mainLayout__navbar"],
	["layoutContainer", "mainLayout__layoutContainer"],
	["mainArea", "mainLayout__mainArea"],
	["sidebar", "mainLayout__sidebar"],
	["rightSidebar", "mainLayout__rightSidebar"],
	["btmDrawerOverlay", "mainLayout__btmDrawerOverlay"],
	["btmDrawer", "mainLayout__btmDrawer"]
];
const layoutSlotFns = /* @__PURE__ */ layoutSlotNames.map(([slotName, slotKey]) => [slotName, createRecipe(slotKey, layoutDefaultVariants, getSlotCompoundVariant(layoutCompoundVariants, slotName))]);
const layoutFn = memo$1((props = {}) => {
	return Object.fromEntries(layoutSlotFns.map(([slotName, slotFn]) => [slotName, slotFn.recipeFn(props)]));
});
const layoutVariantKeys = [
	"navbar",
	"btmDash",
	"leftSidebar",
	"storybook"
];
const getVariantProps = (variants) => ({
	...layoutDefaultVariants,
	...compact(variants)
});
const layout = /* @__PURE__ */ Object.assign(layoutFn, {
	__recipe__: false,
	__name__: "layout",
	raw: (props) => props,
	classNameMap: {},
	variantKeys: layoutVariantKeys,
	variantMap: {
		"navbar": ["false"],
		"btmDash": [
			"none",
			"mobileOnly",
			"all"
		],
		"leftSidebar": ["none", "responsive"],
		"storybook": ["true"]
	},
	splitVariantProps(props) {
		return splitProps$1(props, layoutVariantKeys);
	},
	getVariantProps
});

//#endregion
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
//#region styled-system/jsx/is-valid-prop.js
var userGeneratedStr = "css,pos,insetX,insetY,insetEnd,end,insetStart,start,flexDir,p,pl,pr,pt,pb,py,paddingY,paddingX,px,pe,paddingEnd,ps,paddingStart,ml,mr,mt,mb,m,my,marginY,mx,marginX,me,marginEnd,ms,marginStart,ringWidth,ringColor,ring,ringOffset,w,minW,maxW,h,minH,maxH,textShadowColor,bgPosition,bgPositionX,bgPositionY,bgAttachment,bgClip,bg,bgColor,bgOrigin,bgImage,bgRepeat,bgBlendMode,bgSize,bgGradient,bgLinear,bgRadial,bgConic,rounded,roundedTopLeft,roundedTopRight,roundedBottomRight,roundedBottomLeft,roundedTop,roundedRight,roundedBottom,roundedLeft,roundedStartStart,roundedStartEnd,roundedStart,roundedEndStart,roundedEndEnd,roundedEnd,borderX,borderXWidth,borderXColor,borderY,borderYWidth,borderYColor,borderStart,borderStartWidth,borderStartColor,borderEnd,borderEndWidth,borderEndColor,shadow,shadowColor,x,y,z,scrollMarginY,scrollMarginX,scrollPaddingY,scrollPaddingX,aspectRatio,boxDecorationBreak,zIndex,boxSizing,objectPosition,objectFit,overscrollBehavior,overscrollBehaviorX,overscrollBehaviorY,position,top,left,inset,insetInline,insetBlock,insetBlockEnd,insetBlockStart,insetInlineEnd,insetInlineStart,right,bottom,float,visibility,display,hideFrom,hideBelow,flexBasis,flex,flexDirection,flexGrow,flexShrink,gridTemplateColumns,gridTemplateRows,gridColumn,gridRow,gridColumnStart,gridColumnEnd,gridAutoFlow,gridAutoColumns,gridAutoRows,gap,gridGap,gridRowGap,gridColumnGap,rowGap,columnGap,justifyContent,alignContent,alignItems,alignSelf,padding,paddingLeft,paddingRight,paddingTop,paddingBottom,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingInline,paddingInlineEnd,paddingInlineStart,marginLeft,marginRight,marginTop,marginBottom,margin,marginBlock,marginBlockEnd,marginBlockStart,marginInline,marginInlineEnd,marginInlineStart,spaceX,spaceY,outlineWidth,outlineColor,outline,outlineOffset,focusRing,focusVisibleRing,focusRingColor,focusRingOffset,focusRingWidth,focusRingStyle,divideX,divideY,divideColor,divideStyle,width,inlineSize,minWidth,minInlineSize,maxWidth,maxInlineSize,height,blockSize,minHeight,minBlockSize,maxHeight,maxBlockSize,boxSize,color,fontFamily,fontSize,fontSizeAdjust,fontPalette,fontKerning,fontFeatureSettings,fontWeight,fontSmoothing,fontVariant,fontVariantAlternates,fontVariantCaps,fontVariationSettings,fontVariantNumeric,letterSpacing,lineHeight,textAlign,textDecoration,textDecorationColor,textEmphasisColor,textDecorationStyle,textDecorationThickness,textUnderlineOffset,textTransform,textIndent,textShadow,textOverflow,verticalAlign,wordBreak,textWrap,truncate,lineClamp,listStyleType,listStylePosition,listStyleImage,listStyle,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundAttachment,backgroundClip,background,backgroundColor,backgroundOrigin,backgroundImage,backgroundRepeat,backgroundBlendMode,backgroundSize,backgroundGradient,backgroundLinear,backgroundRadial,backgroundConic,textGradient,gradientFromPosition,gradientToPosition,gradientFrom,gradientTo,gradientVia,gradientViaPosition,borderRadius,borderTopLeftRadius,borderTopRightRadius,borderBottomRightRadius,borderBottomLeftRadius,borderTopRadius,borderRightRadius,borderBottomRadius,borderLeftRadius,borderStartStartRadius,borderStartEndRadius,borderStartRadius,borderEndStartRadius,borderEndEndRadius,borderEndRadius,border,borderWidth,borderTopWidth,borderLeftWidth,borderRightWidth,borderBottomWidth,borderBlockStartWidth,borderBlockEndWidth,borderColor,borderInline,borderInlineWidth,borderInlineColor,borderBlock,borderBlockWidth,borderBlockColor,borderLeft,borderLeftColor,borderInlineStart,borderInlineStartWidth,borderInlineStartColor,borderRight,borderRightColor,borderInlineEnd,borderInlineEndWidth,borderInlineEndColor,borderTop,borderTopColor,borderBottom,borderBottomColor,borderBlockEnd,borderBlockEndColor,borderBlockStart,borderBlockStartColor,opacity,boxShadow,boxShadowColor,mixBlendMode,filter,brightness,contrast,grayscale,hueRotate,invert,saturate,sepia,dropShadow,blur,backdropFilter,backdropBlur,backdropBrightness,backdropContrast,backdropGrayscale,backdropHueRotate,backdropInvert,backdropOpacity,backdropSaturate,backdropSepia,borderCollapse,borderSpacing,borderSpacingX,borderSpacingY,tableLayout,transitionTimingFunction,transitionDelay,transitionDuration,transitionProperty,transition,animation,animationName,animationTimingFunction,animationDuration,animationDelay,animationPlayState,animationComposition,animationFillMode,animationDirection,animationIterationCount,animationRange,animationState,animationRangeStart,animationRangeEnd,animationTimeline,transformOrigin,transformBox,transformStyle,transform,rotate,rotateX,rotateY,rotateZ,scale,scaleX,scaleY,translate,translateX,translateY,translateZ,accentColor,caretColor,scrollBehavior,scrollbar,scrollbarColor,scrollbarGutter,scrollbarWidth,scrollMargin,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollMarginBottom,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollPadding,scrollPaddingBlock,scrollPaddingBlockStart,scrollPaddingBlockEnd,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollPaddingBottom,scrollSnapAlign,scrollSnapStop,scrollSnapType,scrollSnapStrictness,scrollSnapMargin,scrollSnapMarginTop,scrollSnapMarginBottom,scrollSnapMarginLeft,scrollSnapMarginRight,scrollSnapCoordinate,scrollSnapDestination,scrollSnapPointsX,scrollSnapPointsY,scrollSnapTypeX,scrollSnapTypeY,scrollTimeline,scrollTimelineAxis,scrollTimelineName,touchAction,userSelect,overflow,overflowWrap,overflowX,overflowY,overflowAnchor,overflowBlock,overflowInline,overflowClipBox,overflowClipMargin,overscrollBehaviorBlock,overscrollBehaviorInline,fill,stroke,strokeWidth,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,srOnly,debug,appearance,backfaceVisibility,clipPath,hyphens,mask,maskImage,maskSize,textSizeAdjust,container,containerName,containerType,cursor,colorPalette,_light,_dark,_synthwaveTheme,_hover,_focus,_focusWithin,_focusVisible,_disabled,_active,_visited,_target,_readOnly,_readWrite,_empty,_checked,_enabled,_expanded,_highlighted,_complete,_incomplete,_dragging,_before,_after,_firstLetter,_firstLine,_marker,_selection,_file,_backdrop,_first,_last,_only,_even,_odd,_firstOfType,_lastOfType,_onlyOfType,_peerFocus,_peerHover,_peerActive,_peerFocusWithin,_peerFocusVisible,_peerDisabled,_peerChecked,_peerInvalid,_peerExpanded,_peerPlaceholderShown,_groupFocus,_groupHover,_groupActive,_groupFocusWithin,_groupFocusVisible,_groupDisabled,_groupChecked,_groupExpanded,_groupInvalid,_indeterminate,_required,_valid,_invalid,_autofill,_inRange,_outOfRange,_placeholder,_placeholderShown,_pressed,_selected,_grabbed,_underValue,_overValue,_atValue,_default,_optional,_open,_closed,_fullscreen,_loading,_hidden,_current,_currentPage,_currentStep,_today,_unavailable,_rangeStart,_rangeEnd,_now,_topmost,_motionReduce,_motionSafe,_print,_landscape,_portrait,_osDark,_osLight,_highContrast,_lessContrast,_moreContrast,_ltr,_rtl,_scrollbar,_scrollbarThumb,_scrollbarTrack,_horizontal,_vertical,_icon,_starting,_noscript,_invertedColors,_navbarChecked,_btmDashChecked,_drawerChecked,_rightDrawerChecked,_btmDrawerChecked,_sidebarResizing,sm,smOnly,smDown,md,mdOnly,mdDown,lg,lgOnly,lgDown,xl,xlOnly,xlDown,2xl,2xlOnly,2xlDown,minWidthDrawer,minWidthDrawerOnly,minWidthDrawerDown,minWidthBtmDash,minWidthBtmDashOnly,minWidthBtmDashDown,smToMd,smToLg,smToXl,smTo2xl,smToMinWidthDrawer,smToMinWidthBtmDash,mdToLg,mdToXl,mdTo2xl,mdToMinWidthDrawer,mdToMinWidthBtmDash,lgToXl,lgTo2xl,lgToMinWidthDrawer,lgToMinWidthBtmDash,xlTo2xl,xlToMinWidthDrawer,xlToMinWidthBtmDash,2xlToMinWidthDrawer,2xlToMinWidthBtmDash,minWidthDrawerToMinWidthBtmDash,@/xs,@/sm,@/md,@/lg,@/xl,@/2xl,@/3xl,@/4xl,@/5xl,@/6xl,@/7xl,@/8xl,textStyle";
var userGenerated = userGeneratedStr.split(",");
var cssPropertiesStr = "WebkitAppearance,WebkitBorderBefore,WebkitBorderBeforeColor,WebkitBorderBeforeStyle,WebkitBorderBeforeWidth,WebkitBoxReflect,WebkitLineClamp,WebkitMask,WebkitMaskAttachment,WebkitMaskClip,WebkitMaskComposite,WebkitMaskImage,WebkitMaskOrigin,WebkitMaskPosition,WebkitMaskPositionX,WebkitMaskPositionY,WebkitMaskRepeat,WebkitMaskRepeatX,WebkitMaskRepeatY,WebkitMaskSize,WebkitOverflowScrolling,WebkitTapHighlightColor,WebkitTextFillColor,WebkitTextStroke,WebkitTextStrokeColor,WebkitTextStrokeWidth,WebkitTouchCallout,WebkitUserModify,WebkitUserSelect,accentColor,alignContent,alignItems,alignSelf,alignTracks,all,anchorName,anchorScope,animation,animationComposition,animationDelay,animationDirection,animationDuration,animationFillMode,animationIterationCount,animationName,animationPlayState,animationRange,animationRangeEnd,animationRangeStart,animationTimeline,animationTimingFunction,appearance,aspectRatio,backdropFilter,backfaceVisibility,background,backgroundAttachment,backgroundBlendMode,backgroundClip,backgroundColor,backgroundImage,backgroundOrigin,backgroundPosition,backgroundPositionX,backgroundPositionY,backgroundRepeat,backgroundSize,blockSize,border,borderBlock,borderBlockColor,borderBlockEnd,borderBlockEndColor,borderBlockEndStyle,borderBlockEndWidth,borderBlockStart,borderBlockStartColor,borderBlockStartStyle,borderBlockStartWidth,borderBlockStyle,borderBlockWidth,borderBottom,borderBottomColor,borderBottomLeftRadius,borderBottomRightRadius,borderBottomStyle,borderBottomWidth,borderCollapse,borderColor,borderEndEndRadius,borderEndStartRadius,borderImage,borderImageOutset,borderImageRepeat,borderImageSlice,borderImageSource,borderImageWidth,borderInline,borderInlineColor,borderInlineEnd,borderInlineEndColor,borderInlineEndStyle,borderInlineEndWidth,borderInlineStart,borderInlineStartColor,borderInlineStartStyle,borderInlineStartWidth,borderInlineStyle,borderInlineWidth,borderLeft,borderLeftColor,borderLeftStyle,borderLeftWidth,borderRadius,borderRight,borderRightColor,borderRightStyle,borderRightWidth,borderSpacing,borderStartEndRadius,borderStartStartRadius,borderStyle,borderTop,borderTopColor,borderTopLeftRadius,borderTopRightRadius,borderTopStyle,borderTopWidth,borderWidth,bottom,boxAlign,boxDecorationBreak,boxDirection,boxFlex,boxFlexGroup,boxLines,boxOrdinalGroup,boxOrient,boxPack,boxShadow,boxSizing,breakAfter,breakBefore,breakInside,captionSide,caret,caretColor,caretShape,clear,clip,clipPath,clipRule,color,colorInterpolationFilters,colorScheme,columnCount,columnFill,columnGap,columnRule,columnRuleColor,columnRuleStyle,columnRuleWidth,columnSpan,columnWidth,columns,contain,containIntrinsicBlockSize,containIntrinsicHeight,containIntrinsicInlineSize,containIntrinsicSize,containIntrinsicWidth,container,containerName,containerType,content,contentVisibility,counterIncrement,counterReset,counterSet,cursor,cx,cy,d,direction,display,dominantBaseline,emptyCells,fieldSizing,fill,fillOpacity,fillRule,filter,flex,flexBasis,flexDirection,flexFlow,flexGrow,flexShrink,flexWrap,float,floodColor,floodOpacity,font,fontFamily,fontFeatureSettings,fontKerning,fontLanguageOverride,fontOpticalSizing,fontPalette,fontSize,fontSizeAdjust,fontSmooth,fontStretch,fontStyle,fontSynthesis,fontSynthesisPosition,fontSynthesisSmallCaps,fontSynthesisStyle,fontSynthesisWeight,fontVariant,fontVariantAlternates,fontVariantCaps,fontVariantEastAsian,fontVariantEmoji,fontVariantLigatures,fontVariantNumeric,fontVariantPosition,fontVariationSettings,fontWeight,forcedColorAdjust,gap,grid,gridArea,gridAutoColumns,gridAutoFlow,gridAutoRows,gridColumn,gridColumnEnd,gridColumnGap,gridColumnStart,gridGap,gridRow,gridRowEnd,gridRowGap,gridRowStart,gridTemplate,gridTemplateAreas,gridTemplateColumns,gridTemplateRows,hangingPunctuation,height,hyphenateCharacter,hyphenateLimitChars,hyphens,imageOrientation,imageRendering,imageResolution,imeMode,initialLetter,initialLetterAlign,inlineSize,inset,insetBlock,insetBlockEnd,insetBlockStart,insetInline,insetInlineEnd,insetInlineStart,interpolateSize,isolation,justifyContent,justifyItems,justifySelf,justifyTracks,left,letterSpacing,lightingColor,lineBreak,lineClamp,lineHeight,lineHeightStep,listStyle,listStyleImage,listStylePosition,listStyleType,margin,marginBlock,marginBlockEnd,marginBlockStart,marginBottom,marginInline,marginInlineEnd,marginInlineStart,marginLeft,marginRight,marginTop,marginTrim,marker,markerEnd,markerMid,markerStart,mask,maskBorder,maskBorderMode,maskBorderOutset,maskBorderRepeat,maskBorderSlice,maskBorderSource,maskBorderWidth,maskClip,maskComposite,maskImage,maskMode,maskOrigin,maskPosition,maskRepeat,maskSize,maskType,masonryAutoFlow,mathDepth,mathShift,mathStyle,maxBlockSize,maxHeight,maxInlineSize,maxLines,maxWidth,minBlockSize,minHeight,minInlineSize,minWidth,mixBlendMode,objectFit,objectPosition,offset,offsetAnchor,offsetDistance,offsetPath,offsetPosition,offsetRotate,opacity,order,orphans,outline,outlineColor,outlineOffset,outlineStyle,outlineWidth,overflow,overflowAnchor,overflowBlock,overflowClipBox,overflowClipMargin,overflowInline,overflowWrap,overflowX,overflowY,overlay,overscrollBehavior,overscrollBehaviorBlock,overscrollBehaviorInline,overscrollBehaviorX,overscrollBehaviorY,padding,paddingBlock,paddingBlockEnd,paddingBlockStart,paddingBottom,paddingInline,paddingInlineEnd,paddingInlineStart,paddingLeft,paddingRight,paddingTop,page,pageBreakAfter,pageBreakBefore,pageBreakInside,paintOrder,perspective,perspectiveOrigin,placeContent,placeItems,placeSelf,pointerEvents,position,positionAnchor,positionArea,positionTry,positionTryFallbacks,positionTryOrder,positionVisibility,printColorAdjust,quotes,r,resize,right,rotate,rowGap,rubyAlign,rubyMerge,rubyPosition,rx,ry,scale,scrollBehavior,scrollMargin,scrollMarginBlock,scrollMarginBlockEnd,scrollMarginBlockStart,scrollMarginBottom,scrollMarginInline,scrollMarginInlineEnd,scrollMarginInlineStart,scrollMarginLeft,scrollMarginRight,scrollMarginTop,scrollPadding,scrollPaddingBlock,scrollPaddingBlockEnd,scrollPaddingBlockStart,scrollPaddingBottom,scrollPaddingInline,scrollPaddingInlineEnd,scrollPaddingInlineStart,scrollPaddingLeft,scrollPaddingRight,scrollPaddingTop,scrollSnapAlign,scrollSnapCoordinate,scrollSnapDestination,scrollSnapPointsX,scrollSnapPointsY,scrollSnapStop,scrollSnapType,scrollSnapTypeX,scrollSnapTypeY,scrollTimeline,scrollTimelineAxis,scrollTimelineName,scrollbarColor,scrollbarGutter,scrollbarWidth,shapeImageThreshold,shapeMargin,shapeOutside,shapeRendering,stopColor,stopOpacity,stroke,strokeDasharray,strokeDashoffset,strokeLinecap,strokeLinejoin,strokeMiterlimit,strokeOpacity,strokeWidth,tabSize,tableLayout,textAlign,textAlignLast,textAnchor,textBox,textBoxEdge,textBoxTrim,textCombineUpright,textDecoration,textDecorationColor,textDecorationLine,textDecorationSkip,textDecorationSkipInk,textDecorationStyle,textDecorationThickness,textEmphasis,textEmphasisColor,textEmphasisPosition,textEmphasisStyle,textIndent,textJustify,textOrientation,textOverflow,textRendering,textShadow,textSizeAdjust,textSpacingTrim,textTransform,textUnderlineOffset,textUnderlinePosition,textWrap,textWrapMode,textWrapStyle,timelineScope,top,touchAction,transform,transformBox,transformOrigin,transformStyle,transition,transitionBehavior,transitionDelay,transitionDuration,transitionProperty,transitionTimingFunction,translate,unicodeBidi,userSelect,vectorEffect,verticalAlign,viewTimeline,viewTimelineAxis,viewTimelineInset,viewTimelineName,viewTransitionName,visibility,whiteSpace,whiteSpaceCollapse,widows,width,willChange,wordBreak,wordSpacing,wordWrap,writingMode,x,y,zIndex,zoom,alignmentBaseline,baselineShift,colorInterpolation,colorRendering,glyphOrientationVertical";
var allCssProperties = cssPropertiesStr.split(",").concat(userGenerated);
var properties = new Map(allCssProperties.map((prop) => [prop, true]));
var cssPropertySelectorRegex = /&|@/;
var isCssProperty = /* @__PURE__ */ memo$1((prop) => {
	return properties.has(prop) || prop.startsWith("--") || cssPropertySelectorRegex.test(prop);
});

//#endregion
//#region styled-system/jsx/factory-helper.js
const defaultShouldForwardProp = (prop, variantKeys) => !variantKeys.includes(prop) && !isCssProperty(prop);
const composeShouldForwardProps = (tag, shouldForwardProp) => tag.__shouldForwardProps__ && shouldForwardProp ? (propName) => tag.__shouldForwardProps__(propName) && shouldForwardProp(propName) : shouldForwardProp;
const composeCvaFn = (cvaA, cvaB) => {
	if (cvaA && !cvaB) return cvaA;
	if (!cvaA && cvaB) return cvaB;
	if (cvaA.__cva__ && cvaB.__cva__ || cvaA.__recipe__ && cvaB.__recipe__) return cvaA.merge(cvaB);
	const error = /* @__PURE__ */ new TypeError("Cannot merge cva with recipe. Please use either cva or recipe.");
	TypeError.captureStackTrace?.(error);
	throw error;
};
const getDisplayName = (Component) => {
	if (typeof Component === "string") return Component;
	return Component?.displayName || Component?.name || "Component";
};

//#endregion
//#region styled-system/jsx/factory.js
function styledFn(element, configOrCva = {}, options = {}) {
	const cvaFn = configOrCva.__cva__ || configOrCva.__recipe__ ? configOrCva : cva(configOrCva);
	const forwardFn = options.shouldForwardProp || defaultShouldForwardProp;
	const shouldForwardProp = (prop) => {
		if (options.forwardProps?.includes(prop)) return true;
		return forwardFn(prop, cvaFn.variantKeys);
	};
	const defaultProps = Object.assign(options.dataAttr && configOrCva.__name__ ? { "data-recipe": configOrCva.__name__ } : {}, options.defaultProps);
	const __cvaFn__ = composeCvaFn(element.__cva__, cvaFn);
	const __shouldForwardProps__ = composeShouldForwardProps(element, shouldForwardProp);
	const StyledComponent = (props) => {
		const mergedProps = mergeProps({ as: element.__base__ || element }, defaultProps, props);
		const [localProps, restProps] = splitProps(mergedProps, [
			"as",
			"unstyled",
			"class",
			"className"
		]);
		const [htmlProps$1, aProps] = splitProps(restProps, normalizeHTMLProps.keys);
		const forwardedKeys = createMemo(() => {
			const keys = Object.keys(aProps);
			return keys.filter((prop) => __shouldForwardProps__(prop));
		});
		const [forwardedProps, variantProps, bProps] = splitProps(aProps, forwardedKeys(), __cvaFn__.variantKeys);
		const cssPropKeys = createMemo(() => {
			const keys = Object.keys(bProps);
			return keys.filter((prop) => isCssProperty(prop));
		});
		const [styleProps, elementProps] = splitProps(bProps, cssPropKeys());
		function recipeClass() {
			const { css: cssStyles,...propStyles } = styleProps;
			const compoundVariantStyles = __cvaFn__.__getCompoundVariantCss__?.(variantProps);
			return cx(__cvaFn__(variantProps, false), css(compoundVariantStyles, propStyles, cssStyles), localProps.class, localProps.className);
		}
		function cvaClass() {
			const { css: cssStyles,...propStyles } = styleProps;
			const cvaStyles = __cvaFn__.raw(variantProps);
			return cx(css(cvaStyles, propStyles, cssStyles), localProps.class, localProps.className);
		}
		const classes = () => {
			if (localProps.unstyled) {
				const { css: cssStyles,...propStyles } = styleProps;
				return cx(css(propStyles, cssStyles), localProps.class, localProps.className);
			}
			return configOrCva.__recipe__ ? recipeClass() : cvaClass();
		};
		if (forwardedProps.className) delete forwardedProps.className;
		return createComponent$1(Dynamic, mergeProps(forwardedProps, elementProps, normalizeHTMLProps(htmlProps$1), {
			get component() {
				return localProps.as;
			},
			get class() {
				return classes();
			}
		}));
	};
	const name = getDisplayName(element);
	StyledComponent.displayName = `styled.${name}`;
	StyledComponent.__cva__ = __cvaFn__;
	StyledComponent.__base__ = element;
	StyledComponent.__shouldForwardProps__ = shouldForwardProp;
	return StyledComponent;
}
function createJsxFactory() {
	const cache = /* @__PURE__ */ new Map();
	return new Proxy(styledFn, {
		apply(_, __, args) {
			return styledFn(...args);
		},
		get(_, el) {
			if (!cache.has(el)) cache.set(el, styledFn(el));
			return cache.get(el);
		}
	});
}
const styled = /* @__PURE__ */ createJsxFactory();

//#endregion
//#region styled-system/patterns/box.js
const boxConfig = { transform(props) {
	return props;
} };
const getBoxStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(boxConfig, styles$4);
	return boxConfig.transform(_styles, patternFns);
};
const box = (styles$4) => css(getBoxStyle(styles$4));
box.raw = getBoxStyle;

//#endregion
//#region styled-system/patterns/flex.js
const flexConfig = { transform(props) {
	const { direction, align, justify, wrap: wrap2, basis, grow, shrink,...rest } = props;
	return {
		display: "flex",
		flexDirection: direction,
		alignItems: align,
		justifyContent: justify,
		flexWrap: wrap2,
		flexBasis: basis,
		flexGrow: grow,
		flexShrink: shrink,
		...rest
	};
} };
const getFlexStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(flexConfig, styles$4);
	return flexConfig.transform(_styles, patternFns);
};
const flex = (styles$4) => css(getFlexStyle(styles$4));
flex.raw = getFlexStyle;

//#endregion
//#region styled-system/patterns/stack.js
const stackConfig = {
	transform(props) {
		const { align, justify, direction, gap,...rest } = props;
		return {
			display: "flex",
			flexDirection: direction,
			alignItems: align,
			justifyContent: justify,
			gap,
			...rest
		};
	},
	defaultValues: {
		direction: "column",
		gap: "10px"
	}
};
const getStackStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(stackConfig, styles$4);
	return stackConfig.transform(_styles, patternFns);
};
const stack = (styles$4) => css(getStackStyle(styles$4));
stack.raw = getStackStyle;

//#endregion
//#region styled-system/patterns/vstack.js
const vstackConfig = {
	transform(props) {
		const { justify, gap,...rest } = props;
		return {
			display: "flex",
			alignItems: "center",
			justifyContent: justify,
			gap,
			flexDirection: "column",
			...rest
		};
	},
	defaultValues: { gap: "10px" }
};
const getVstackStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(vstackConfig, styles$4);
	return vstackConfig.transform(_styles, patternFns);
};
const vstack = (styles$4) => css(getVstackStyle(styles$4));
vstack.raw = getVstackStyle;

//#endregion
//#region styled-system/patterns/hstack.js
const hstackConfig = {
	transform(props) {
		const { justify, gap,...rest } = props;
		return {
			display: "flex",
			alignItems: "center",
			justifyContent: justify,
			gap,
			flexDirection: "row",
			...rest
		};
	},
	defaultValues: { gap: "10px" }
};
const getHstackStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(hstackConfig, styles$4);
	return hstackConfig.transform(_styles, patternFns);
};
const hstack = (styles$4) => css(getHstackStyle(styles$4));
hstack.raw = getHstackStyle;

//#endregion
//#region styled-system/patterns/spacer.js
const spacerConfig = { transform(props, { map }) {
	const { size,...rest } = props;
	return {
		alignSelf: "stretch",
		justifySelf: "stretch",
		flex: map(size, (v) => v == null ? "1" : `0 0 ${v}`),
		...rest
	};
} };
const getSpacerStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(spacerConfig, styles$4);
	return spacerConfig.transform(_styles, patternFns);
};
const spacer = (styles$4) => css(getSpacerStyle(styles$4));
spacer.raw = getSpacerStyle;

//#endregion
//#region styled-system/patterns/square.js
const squareConfig = { transform(props) {
	const { size,...rest } = props;
	return {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: "0 0 auto",
		width: size,
		height: size,
		...rest
	};
} };
const getSquareStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(squareConfig, styles$4);
	return squareConfig.transform(_styles, patternFns);
};
const square = (styles$4) => css(getSquareStyle(styles$4));
square.raw = getSquareStyle;

//#endregion
//#region styled-system/patterns/circle.js
const circleConfig = { transform(props) {
	const { size,...rest } = props;
	return {
		display: "flex",
		alignItems: "center",
		justifyContent: "center",
		flex: "0 0 auto",
		width: size,
		height: size,
		borderRadius: "9999px",
		...rest
	};
} };
const getCircleStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(circleConfig, styles$4);
	return circleConfig.transform(_styles, patternFns);
};
const circle = (styles$4) => css(getCircleStyle(styles$4));
circle.raw = getCircleStyle;

//#endregion
//#region styled-system/patterns/center.js
const centerConfig = { transform(props) {
	const { inline,...rest } = props;
	return {
		display: inline ? "inline-flex" : "flex",
		alignItems: "center",
		justifyContent: "center",
		...rest
	};
} };
const getCenterStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(centerConfig, styles$4);
	return centerConfig.transform(_styles, patternFns);
};
const center = (styles$4) => css(getCenterStyle(styles$4));
center.raw = getCenterStyle;

//#endregion
//#region styled-system/patterns/link-overlay.js
const linkOverlayConfig = { transform(props) {
	return {
		_before: {
			content: "\"\"",
			position: "absolute",
			inset: "0",
			zIndex: "0",
			...props["_before"]
		},
		...props
	};
} };
const getLinkOverlayStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(linkOverlayConfig, styles$4);
	return linkOverlayConfig.transform(_styles, patternFns);
};
const linkOverlay = (styles$4) => css(getLinkOverlayStyle(styles$4));
linkOverlay.raw = getLinkOverlayStyle;

//#endregion
//#region styled-system/patterns/aspect-ratio.js
const aspectRatioConfig = { transform(props, { map }) {
	const { ratio = 4 / 3,...rest } = props;
	return {
		position: "relative",
		_before: {
			content: `""`,
			display: "block",
			height: "0",
			paddingBottom: map(ratio, (r) => `${1 / r * 100}%`)
		},
		"&>*": {
			display: "flex",
			justifyContent: "center",
			alignItems: "center",
			overflow: "hidden",
			position: "absolute",
			inset: "0",
			width: "100%",
			height: "100%"
		},
		"&>img, &>video": { objectFit: "cover" },
		...rest
	};
} };
const getAspectRatioStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(aspectRatioConfig, styles$4);
	return aspectRatioConfig.transform(_styles, patternFns);
};
const aspectRatio = (styles$4) => css(getAspectRatioStyle(styles$4));
aspectRatio.raw = getAspectRatioStyle;

//#endregion
//#region styled-system/patterns/grid.js
const gridConfig = {
	transform(props, { map, isCssUnit: isCssUnit$1 }) {
		const { columnGap, rowGap, gap, columns, minChildWidth,...rest } = props;
		const getValue = (v) => isCssUnit$1(v) ? v : `token(sizes.${v}, ${v})`;
		return {
			display: "grid",
			gridTemplateColumns: columns != null ? map(columns, (v) => `repeat(${v}, minmax(0, 1fr))`) : minChildWidth != null ? map(minChildWidth, (v) => `repeat(auto-fit, minmax(${getValue(v)}, 1fr))`) : void 0,
			gap,
			columnGap,
			rowGap,
			...rest
		};
	},
	defaultValues(props) {
		return { gap: props.columnGap || props.rowGap ? void 0 : "10px" };
	}
};
const getGridStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(gridConfig, styles$4);
	return gridConfig.transform(_styles, patternFns);
};
const grid = (styles$4) => css(getGridStyle(styles$4));
grid.raw = getGridStyle;

//#endregion
//#region styled-system/patterns/grid-item.js
const gridItemConfig = { transform(props, { map }) {
	const { colSpan, rowSpan, colStart, rowStart, colEnd, rowEnd,...rest } = props;
	const spanFn = (v) => v === "auto" ? v : `span ${v}`;
	return {
		gridColumn: colSpan != null ? map(colSpan, spanFn) : void 0,
		gridRow: rowSpan != null ? map(rowSpan, spanFn) : void 0,
		gridColumnStart: colStart,
		gridColumnEnd: colEnd,
		gridRowStart: rowStart,
		gridRowEnd: rowEnd,
		...rest
	};
} };
const getGridItemStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(gridItemConfig, styles$4);
	return gridItemConfig.transform(_styles, patternFns);
};
const gridItem = (styles$4) => css(getGridItemStyle(styles$4));
gridItem.raw = getGridItemStyle;

//#endregion
//#region styled-system/patterns/wrap.js
const wrapConfig = { transform(props) {
	const { columnGap, rowGap, gap = columnGap || rowGap ? void 0 : "10px", align, justify,...rest } = props;
	return {
		display: "flex",
		flexWrap: "wrap",
		alignItems: align,
		justifyContent: justify,
		gap,
		columnGap,
		rowGap,
		...rest
	};
} };
const getWrapStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(wrapConfig, styles$4);
	return wrapConfig.transform(_styles, patternFns);
};
const wrap = (styles$4) => css(getWrapStyle(styles$4));
wrap.raw = getWrapStyle;

//#endregion
//#region styled-system/patterns/container.js
const containerConfig = { transform(props) {
	return {
		position: "relative",
		maxWidth: "8xl",
		mx: "auto",
		px: {
			base: "4",
			md: "6",
			lg: "8"
		},
		...props
	};
} };
const getContainerStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(containerConfig, styles$4);
	return containerConfig.transform(_styles, patternFns);
};
const container = (styles$4) => css(getContainerStyle(styles$4));
container.raw = getContainerStyle;

//#endregion
//#region styled-system/patterns/divider.js
const dividerConfig = {
	transform(props, { map }) {
		const { orientation, thickness, color,...rest } = props;
		return {
			"--thickness": thickness,
			width: map(orientation, (v) => v === "vertical" ? void 0 : "100%"),
			height: map(orientation, (v) => v === "horizontal" ? void 0 : "100%"),
			borderBlockEndWidth: map(orientation, (v) => v === "horizontal" ? "var(--thickness)" : void 0),
			borderInlineEndWidth: map(orientation, (v) => v === "vertical" ? "var(--thickness)" : void 0),
			borderColor: color,
			...rest
		};
	},
	defaultValues: {
		orientation: "horizontal",
		thickness: "1px"
	}
};
const getDividerStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(dividerConfig, styles$4);
	return dividerConfig.transform(_styles, patternFns);
};
const divider = (styles$4) => css(getDividerStyle(styles$4));
divider.raw = getDividerStyle;

//#endregion
//#region styled-system/patterns/float.js
const floatConfig = {
	transform(props, { map }) {
		const { offset, offsetX, offsetY, placement,...rest } = props;
		return {
			display: "inline-flex",
			justifyContent: "center",
			alignItems: "center",
			position: "absolute",
			insetBlockStart: map(placement, (v) => {
				const [side] = v.split("-");
				const map2 = {
					top: offsetY,
					middle: "50%",
					bottom: "auto"
				};
				return map2[side];
			}),
			insetBlockEnd: map(placement, (v) => {
				const [side] = v.split("-");
				const map2 = {
					top: "auto",
					middle: "50%",
					bottom: offsetY
				};
				return map2[side];
			}),
			insetInlineStart: map(placement, (v) => {
				const [, align] = v.split("-");
				const map2 = {
					start: offsetX,
					center: "50%",
					end: "auto"
				};
				return map2[align];
			}),
			insetInlineEnd: map(placement, (v) => {
				const [, align] = v.split("-");
				const map2 = {
					start: "auto",
					center: "50%",
					end: offsetX
				};
				return map2[align];
			}),
			translate: map(placement, (v) => {
				const [side, align] = v.split("-");
				const mapX = {
					start: "-50%",
					center: "-50%",
					end: "50%"
				};
				const mapY = {
					top: "-50%",
					middle: "-50%",
					bottom: "50%"
				};
				return `${mapX[align]} ${mapY[side]}`;
			}),
			...rest
		};
	},
	defaultValues(props) {
		const offset = props.offset || "0";
		return {
			offset,
			offsetX: offset,
			offsetY: offset,
			placement: "top-end"
		};
	}
};
const getFloatStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(floatConfig, styles$4);
	return floatConfig.transform(_styles, patternFns);
};
const float = (styles$4) => css(getFloatStyle(styles$4));
float.raw = getFloatStyle;

//#endregion
//#region styled-system/patterns/bleed.js
const bleedConfig = {
	transform(props, { map, isCssUnit: isCssUnit$1, isCssVar: isCssVar$1 }) {
		const { inline, block,...rest } = props;
		const valueFn = (v) => isCssUnit$1(v) || isCssVar$1(v) ? v : `token(spacing.${v}, ${v})`;
		return {
			"--bleed-x": map(inline, valueFn),
			"--bleed-y": map(block, valueFn),
			marginInline: "calc(var(--bleed-x, 0) * -1)",
			marginBlock: "calc(var(--bleed-y, 0) * -1)",
			...rest
		};
	},
	defaultValues: {
		inline: "0",
		block: "0"
	}
};
const getBleedStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(bleedConfig, styles$4);
	return bleedConfig.transform(_styles, patternFns);
};
const bleed = (styles$4) => css(getBleedStyle(styles$4));
bleed.raw = getBleedStyle;

//#endregion
//#region styled-system/patterns/visually-hidden.js
const visuallyHiddenConfig = { transform(props) {
	return {
		srOnly: true,
		...props
	};
} };
const getVisuallyHiddenStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(visuallyHiddenConfig, styles$4);
	return visuallyHiddenConfig.transform(_styles, patternFns);
};
const visuallyHidden = (styles$4) => css(getVisuallyHiddenStyle(styles$4));
visuallyHidden.raw = getVisuallyHiddenStyle;

//#endregion
//#region styled-system/patterns/cq.js
const cqConfig = {
	transform(props) {
		const { name, type,...rest } = props;
		return {
			containerType: type,
			containerName: name,
			...rest
		};
	},
	defaultValues: { type: "inline-size" }
};
const getCqStyle = (styles$4 = {}) => {
	const _styles = getPatternStyles(cqConfig, styles$4);
	return cqConfig.transform(_styles, patternFns);
};
const cq = (styles$4) => css(getCqStyle(styles$4));
cq.raw = getCqStyle;

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
//#region node_modules/@tanstack/table-core/build/lib/index.mjs
function functionalUpdate(updater, input) {
	return typeof updater === "function" ? updater(input) : updater;
}
function makeStateUpdater(key, instance) {
	return (updater) => {
		instance.setState((old) => {
			return {
				...old,
				[key]: functionalUpdate(updater, old[key])
			};
		});
	};
}
function isFunction(d) {
	return d instanceof Function;
}
function isNumberArray(d) {
	return Array.isArray(d) && d.every((val) => typeof val === "number");
}
function flattenBy(arr, getChildren) {
	const flat = [];
	const recurse = (subArr) => {
		subArr.forEach((item) => {
			flat.push(item);
			const children$1 = getChildren(item);
			if (children$1 != null && children$1.length) recurse(children$1);
		});
	};
	recurse(arr);
	return flat;
}
function memo(getDeps, fn, opts) {
	let deps = [];
	let result;
	return (depArgs) => {
		let depTime;
		if (opts.key && opts.debug) depTime = Date.now();
		const newDeps = getDeps(depArgs);
		const depsChanged = newDeps.length !== deps.length || newDeps.some((dep, index) => deps[index] !== dep);
		if (!depsChanged) return result;
		deps = newDeps;
		let resultTime;
		if (opts.key && opts.debug) resultTime = Date.now();
		result = fn(...newDeps);
		opts == null || opts.onChange == null || opts.onChange(result);
		if (opts.key && opts.debug) {
			if (opts != null && opts.debug()) {
				const depEndTime = Math.round((Date.now() - depTime) * 100) / 100;
				const resultEndTime = Math.round((Date.now() - resultTime) * 100) / 100;
				const resultFpsPercentage = resultEndTime / 16;
				const pad = (str, num) => {
					str = String(str);
					while (str.length < num) str = " " + str;
					return str;
				};
				console.info(`%c⏱ ${pad(resultEndTime, 5)} /${pad(depEndTime, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * resultFpsPercentage, 120))}deg 100% 31%);`, opts == null ? void 0 : opts.key);
			}
		}
		return result;
	};
}
function getMemoOptions(tableOptions, debugLevel, key, onChange) {
	return {
		debug: () => {
			var _tableOptions$debugAl;
			return (_tableOptions$debugAl = tableOptions == null ? void 0 : tableOptions.debugAll) != null ? _tableOptions$debugAl : tableOptions[debugLevel];
		},
		key: process.env.NODE_ENV === "development" && key,
		onChange
	};
}
function createCell(table$1, row, column, columnId) {
	const getRenderValue = () => {
		var _cell$getValue;
		return (_cell$getValue = cell.getValue()) != null ? _cell$getValue : table$1.options.renderFallbackValue;
	};
	const cell = {
		id: `${row.id}_${column.id}`,
		row,
		column,
		getValue: () => row.getValue(columnId),
		renderValue: getRenderValue,
		getContext: memo(() => [
			table$1,
			column,
			row,
			cell
		], (table$2, column$1, row$1, cell$1) => ({
			table: table$2,
			column: column$1,
			row: row$1,
			cell: cell$1,
			getValue: cell$1.getValue,
			renderValue: cell$1.renderValue
		}), getMemoOptions(table$1.options, "debugCells", "cell.getContext"))
	};
	table$1._features.forEach((feature) => {
		feature.createCell == null || feature.createCell(cell, column, row, table$1);
	}, {});
	return cell;
}
function createColumn(table$1, columnDef, depth, parent) {
	var _ref, _resolvedColumnDef$id;
	const defaultColumn = table$1._getDefaultColumnDef();
	const resolvedColumnDef = {
		...defaultColumn,
		...columnDef
	};
	const accessorKey = resolvedColumnDef.accessorKey;
	let id = (_ref = (_resolvedColumnDef$id = resolvedColumnDef.id) != null ? _resolvedColumnDef$id : accessorKey ? typeof String.prototype.replaceAll === "function" ? accessorKey.replaceAll(".", "_") : accessorKey.replace(/\./g, "_") : void 0) != null ? _ref : typeof resolvedColumnDef.header === "string" ? resolvedColumnDef.header : void 0;
	let accessorFn;
	if (resolvedColumnDef.accessorFn) accessorFn = resolvedColumnDef.accessorFn;
	else if (accessorKey) if (accessorKey.includes(".")) accessorFn = (originalRow) => {
		let result = originalRow;
		for (const key of accessorKey.split(".")) {
			var _result;
			result = (_result = result) == null ? void 0 : _result[key];
			if (process.env.NODE_ENV !== "production" && result === void 0) console.warn(`"${key}" in deeply nested key "${accessorKey}" returned undefined.`);
		}
		return result;
	};
	else accessorFn = (originalRow) => originalRow[resolvedColumnDef.accessorKey];
	if (!id) {
		if (process.env.NODE_ENV !== "production") throw new Error(resolvedColumnDef.accessorFn ? `Columns require an id when using an accessorFn` : `Columns require an id when using a non-string header`);
		throw new Error();
	}
	let column = {
		id: `${String(id)}`,
		accessorFn,
		parent,
		depth,
		columnDef: resolvedColumnDef,
		columns: [],
		getFlatColumns: memo(() => [true], () => {
			var _column$columns;
			return [column, ...(_column$columns = column.columns) == null ? void 0 : _column$columns.flatMap((d) => d.getFlatColumns())];
		}, getMemoOptions(table$1.options, "debugColumns", "column.getFlatColumns")),
		getLeafColumns: memo(() => [table$1._getOrderColumnsFn()], (orderColumns$1) => {
			var _column$columns2;
			if ((_column$columns2 = column.columns) != null && _column$columns2.length) {
				let leafColumns = column.columns.flatMap((column$1) => column$1.getLeafColumns());
				return orderColumns$1(leafColumns);
			}
			return [column];
		}, getMemoOptions(table$1.options, "debugColumns", "column.getLeafColumns"))
	};
	for (const feature of table$1._features) feature.createColumn == null || feature.createColumn(column, table$1);
	return column;
}
const debug = "debugHeaders";
function createHeader(table$1, column, options) {
	var _options$id;
	const id = (_options$id = options.id) != null ? _options$id : column.id;
	let header = {
		id,
		column,
		index: options.index,
		isPlaceholder: !!options.isPlaceholder,
		placeholderId: options.placeholderId,
		depth: options.depth,
		subHeaders: [],
		colSpan: 0,
		rowSpan: 0,
		headerGroup: null,
		getLeafHeaders: () => {
			const leafHeaders = [];
			const recurseHeader = (h) => {
				if (h.subHeaders && h.subHeaders.length) h.subHeaders.map(recurseHeader);
				leafHeaders.push(h);
			};
			recurseHeader(header);
			return leafHeaders;
		},
		getContext: () => ({
			table: table$1,
			header,
			column
		})
	};
	table$1._features.forEach((feature) => {
		feature.createHeader == null || feature.createHeader(header, table$1);
	});
	return header;
}
const Headers = { createTable: (table$1) => {
	table$1.getHeaderGroups = memo(() => [
		table$1.getAllColumns(),
		table$1.getVisibleLeafColumns(),
		table$1.getState().columnPinning.left,
		table$1.getState().columnPinning.right
	], (allColumns, leafColumns, left, right) => {
		var _left$map$filter, _right$map$filter;
		const leftColumns = (_left$map$filter = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter : [];
		const rightColumns = (_right$map$filter = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter : [];
		const centerColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
		const headerGroups = buildHeaderGroups(allColumns, [
			...leftColumns,
			...centerColumns,
			...rightColumns
		], table$1);
		return headerGroups;
	}, getMemoOptions(table$1.options, debug, "getHeaderGroups"));
	table$1.getCenterHeaderGroups = memo(() => [
		table$1.getAllColumns(),
		table$1.getVisibleLeafColumns(),
		table$1.getState().columnPinning.left,
		table$1.getState().columnPinning.right
	], (allColumns, leafColumns, left, right) => {
		leafColumns = leafColumns.filter((column) => !(left != null && left.includes(column.id)) && !(right != null && right.includes(column.id)));
		return buildHeaderGroups(allColumns, leafColumns, table$1, "center");
	}, getMemoOptions(table$1.options, debug, "getCenterHeaderGroups"));
	table$1.getLeftHeaderGroups = memo(() => [
		table$1.getAllColumns(),
		table$1.getVisibleLeafColumns(),
		table$1.getState().columnPinning.left
	], (allColumns, leafColumns, left) => {
		var _left$map$filter2;
		const orderedLeafColumns = (_left$map$filter2 = left == null ? void 0 : left.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _left$map$filter2 : [];
		return buildHeaderGroups(allColumns, orderedLeafColumns, table$1, "left");
	}, getMemoOptions(table$1.options, debug, "getLeftHeaderGroups"));
	table$1.getRightHeaderGroups = memo(() => [
		table$1.getAllColumns(),
		table$1.getVisibleLeafColumns(),
		table$1.getState().columnPinning.right
	], (allColumns, leafColumns, right) => {
		var _right$map$filter2;
		const orderedLeafColumns = (_right$map$filter2 = right == null ? void 0 : right.map((columnId) => leafColumns.find((d) => d.id === columnId)).filter(Boolean)) != null ? _right$map$filter2 : [];
		return buildHeaderGroups(allColumns, orderedLeafColumns, table$1, "right");
	}, getMemoOptions(table$1.options, debug, "getRightHeaderGroups"));
	table$1.getFooterGroups = memo(() => [table$1.getHeaderGroups()], (headerGroups) => {
		return [...headerGroups].reverse();
	}, getMemoOptions(table$1.options, debug, "getFooterGroups"));
	table$1.getLeftFooterGroups = memo(() => [table$1.getLeftHeaderGroups()], (headerGroups) => {
		return [...headerGroups].reverse();
	}, getMemoOptions(table$1.options, debug, "getLeftFooterGroups"));
	table$1.getCenterFooterGroups = memo(() => [table$1.getCenterHeaderGroups()], (headerGroups) => {
		return [...headerGroups].reverse();
	}, getMemoOptions(table$1.options, debug, "getCenterFooterGroups"));
	table$1.getRightFooterGroups = memo(() => [table$1.getRightHeaderGroups()], (headerGroups) => {
		return [...headerGroups].reverse();
	}, getMemoOptions(table$1.options, debug, "getRightFooterGroups"));
	table$1.getFlatHeaders = memo(() => [table$1.getHeaderGroups()], (headerGroups) => {
		return headerGroups.map((headerGroup) => {
			return headerGroup.headers;
		}).flat();
	}, getMemoOptions(table$1.options, debug, "getFlatHeaders"));
	table$1.getLeftFlatHeaders = memo(() => [table$1.getLeftHeaderGroups()], (left) => {
		return left.map((headerGroup) => {
			return headerGroup.headers;
		}).flat();
	}, getMemoOptions(table$1.options, debug, "getLeftFlatHeaders"));
	table$1.getCenterFlatHeaders = memo(() => [table$1.getCenterHeaderGroups()], (left) => {
		return left.map((headerGroup) => {
			return headerGroup.headers;
		}).flat();
	}, getMemoOptions(table$1.options, debug, "getCenterFlatHeaders"));
	table$1.getRightFlatHeaders = memo(() => [table$1.getRightHeaderGroups()], (left) => {
		return left.map((headerGroup) => {
			return headerGroup.headers;
		}).flat();
	}, getMemoOptions(table$1.options, debug, "getRightFlatHeaders"));
	table$1.getCenterLeafHeaders = memo(() => [table$1.getCenterFlatHeaders()], (flatHeaders) => {
		return flatHeaders.filter((header) => {
			var _header$subHeaders;
			return !((_header$subHeaders = header.subHeaders) != null && _header$subHeaders.length);
		});
	}, getMemoOptions(table$1.options, debug, "getCenterLeafHeaders"));
	table$1.getLeftLeafHeaders = memo(() => [table$1.getLeftFlatHeaders()], (flatHeaders) => {
		return flatHeaders.filter((header) => {
			var _header$subHeaders2;
			return !((_header$subHeaders2 = header.subHeaders) != null && _header$subHeaders2.length);
		});
	}, getMemoOptions(table$1.options, debug, "getLeftLeafHeaders"));
	table$1.getRightLeafHeaders = memo(() => [table$1.getRightFlatHeaders()], (flatHeaders) => {
		return flatHeaders.filter((header) => {
			var _header$subHeaders3;
			return !((_header$subHeaders3 = header.subHeaders) != null && _header$subHeaders3.length);
		});
	}, getMemoOptions(table$1.options, debug, "getRightLeafHeaders"));
	table$1.getLeafHeaders = memo(() => [
		table$1.getLeftHeaderGroups(),
		table$1.getCenterHeaderGroups(),
		table$1.getRightHeaderGroups()
	], (left, center$1, right) => {
		var _left$0$headers, _left$, _center$0$headers, _center$, _right$0$headers, _right$;
		return [
			...(_left$0$headers = (_left$ = left[0]) == null ? void 0 : _left$.headers) != null ? _left$0$headers : [],
			...(_center$0$headers = (_center$ = center$1[0]) == null ? void 0 : _center$.headers) != null ? _center$0$headers : [],
			...(_right$0$headers = (_right$ = right[0]) == null ? void 0 : _right$.headers) != null ? _right$0$headers : []
		].map((header) => {
			return header.getLeafHeaders();
		}).flat();
	}, getMemoOptions(table$1.options, debug, "getLeafHeaders"));
} };
function buildHeaderGroups(allColumns, columnsToGroup, table$1, headerFamily) {
	var _headerGroups$0$heade, _headerGroups$;
	let maxDepth = 0;
	const findMaxDepth = function(columns, depth) {
		if (depth === void 0) depth = 1;
		maxDepth = Math.max(maxDepth, depth);
		columns.filter((column) => column.getIsVisible()).forEach((column) => {
			var _column$columns;
			if ((_column$columns = column.columns) != null && _column$columns.length) findMaxDepth(column.columns, depth + 1);
		}, 0);
	};
	findMaxDepth(allColumns);
	let headerGroups = [];
	const createHeaderGroup = (headersToGroup, depth) => {
		const headerGroup = {
			depth,
			id: [headerFamily, `${depth}`].filter(Boolean).join("_"),
			headers: []
		};
		const pendingParentHeaders = [];
		headersToGroup.forEach((headerToGroup) => {
			const latestPendingParentHeader = [...pendingParentHeaders].reverse()[0];
			const isLeafHeader = headerToGroup.column.depth === headerGroup.depth;
			let column;
			let isPlaceholder = false;
			if (isLeafHeader && headerToGroup.column.parent) column = headerToGroup.column.parent;
			else {
				column = headerToGroup.column;
				isPlaceholder = true;
			}
			if (latestPendingParentHeader && (latestPendingParentHeader == null ? void 0 : latestPendingParentHeader.column) === column) latestPendingParentHeader.subHeaders.push(headerToGroup);
			else {
				const header = createHeader(table$1, column, {
					id: [
						headerFamily,
						depth,
						column.id,
						headerToGroup == null ? void 0 : headerToGroup.id
					].filter(Boolean).join("_"),
					isPlaceholder,
					placeholderId: isPlaceholder ? `${pendingParentHeaders.filter((d) => d.column === column).length}` : void 0,
					depth,
					index: pendingParentHeaders.length
				});
				header.subHeaders.push(headerToGroup);
				pendingParentHeaders.push(header);
			}
			headerGroup.headers.push(headerToGroup);
			headerToGroup.headerGroup = headerGroup;
		});
		headerGroups.push(headerGroup);
		if (depth > 0) createHeaderGroup(pendingParentHeaders, depth - 1);
	};
	const bottomHeaders = columnsToGroup.map((column, index) => createHeader(table$1, column, {
		depth: maxDepth,
		index
	}));
	createHeaderGroup(bottomHeaders, maxDepth - 1);
	headerGroups.reverse();
	const recurseHeadersForSpans = (headers) => {
		const filteredHeaders = headers.filter((header) => header.column.getIsVisible());
		return filteredHeaders.map((header) => {
			let colSpan = 0;
			let rowSpan = 0;
			let childRowSpans = [0];
			if (header.subHeaders && header.subHeaders.length) {
				childRowSpans = [];
				recurseHeadersForSpans(header.subHeaders).forEach((_ref) => {
					let { colSpan: childColSpan, rowSpan: childRowSpan } = _ref;
					colSpan += childColSpan;
					childRowSpans.push(childRowSpan);
				});
			} else colSpan = 1;
			const minChildRowSpan = Math.min(...childRowSpans);
			rowSpan = rowSpan + minChildRowSpan;
			header.colSpan = colSpan;
			header.rowSpan = rowSpan;
			return {
				colSpan,
				rowSpan
			};
		});
	};
	recurseHeadersForSpans((_headerGroups$0$heade = (_headerGroups$ = headerGroups[0]) == null ? void 0 : _headerGroups$.headers) != null ? _headerGroups$0$heade : []);
	return headerGroups;
}
const createRow = (table$1, id, original, rowIndex, depth, subRows, parentId) => {
	let row = {
		id,
		index: rowIndex,
		original,
		depth,
		parentId,
		_valuesCache: {},
		_uniqueValuesCache: {},
		getValue: (columnId) => {
			if (row._valuesCache.hasOwnProperty(columnId)) return row._valuesCache[columnId];
			const column = table$1.getColumn(columnId);
			if (!(column != null && column.accessorFn)) return void 0;
			row._valuesCache[columnId] = column.accessorFn(row.original, rowIndex);
			return row._valuesCache[columnId];
		},
		getUniqueValues: (columnId) => {
			if (row._uniqueValuesCache.hasOwnProperty(columnId)) return row._uniqueValuesCache[columnId];
			const column = table$1.getColumn(columnId);
			if (!(column != null && column.accessorFn)) return void 0;
			if (!column.columnDef.getUniqueValues) {
				row._uniqueValuesCache[columnId] = [row.getValue(columnId)];
				return row._uniqueValuesCache[columnId];
			}
			row._uniqueValuesCache[columnId] = column.columnDef.getUniqueValues(row.original, rowIndex);
			return row._uniqueValuesCache[columnId];
		},
		renderValue: (columnId) => {
			var _row$getValue;
			return (_row$getValue = row.getValue(columnId)) != null ? _row$getValue : table$1.options.renderFallbackValue;
		},
		subRows: subRows != null ? subRows : [],
		getLeafRows: () => flattenBy(row.subRows, (d) => d.subRows),
		getParentRow: () => row.parentId ? table$1.getRow(row.parentId, true) : void 0,
		getParentRows: () => {
			let parentRows = [];
			let currentRow = row;
			while (true) {
				const parentRow = currentRow.getParentRow();
				if (!parentRow) break;
				parentRows.push(parentRow);
				currentRow = parentRow;
			}
			return parentRows.reverse();
		},
		getAllCells: memo(() => [table$1.getAllLeafColumns()], (leafColumns) => {
			return leafColumns.map((column) => {
				return createCell(table$1, row, column, column.id);
			});
		}, getMemoOptions(table$1.options, "debugRows", "getAllCells")),
		_getAllCellsByColumnId: memo(() => [row.getAllCells()], (allCells) => {
			return allCells.reduce((acc, cell) => {
				acc[cell.column.id] = cell;
				return acc;
			}, {});
		}, getMemoOptions(table$1.options, "debugRows", "getAllCellsByColumnId"))
	};
	for (let i = 0; i < table$1._features.length; i++) {
		const feature = table$1._features[i];
		feature == null || feature.createRow == null || feature.createRow(row, table$1);
	}
	return row;
};
const ColumnFaceting = { createColumn: (column, table$1) => {
	column._getFacetedRowModel = table$1.options.getFacetedRowModel && table$1.options.getFacetedRowModel(table$1, column.id);
	column.getFacetedRowModel = () => {
		if (!column._getFacetedRowModel) return table$1.getPreFilteredRowModel();
		return column._getFacetedRowModel();
	};
	column._getFacetedUniqueValues = table$1.options.getFacetedUniqueValues && table$1.options.getFacetedUniqueValues(table$1, column.id);
	column.getFacetedUniqueValues = () => {
		if (!column._getFacetedUniqueValues) return /* @__PURE__ */ new Map();
		return column._getFacetedUniqueValues();
	};
	column._getFacetedMinMaxValues = table$1.options.getFacetedMinMaxValues && table$1.options.getFacetedMinMaxValues(table$1, column.id);
	column.getFacetedMinMaxValues = () => {
		if (!column._getFacetedMinMaxValues) return void 0;
		return column._getFacetedMinMaxValues();
	};
} };
const includesString = (row, columnId, filterValue) => {
	var _filterValue$toString, _row$getValue;
	const search = filterValue == null || (_filterValue$toString = filterValue.toString()) == null ? void 0 : _filterValue$toString.toLowerCase();
	return Boolean((_row$getValue = row.getValue(columnId)) == null || (_row$getValue = _row$getValue.toString()) == null || (_row$getValue = _row$getValue.toLowerCase()) == null ? void 0 : _row$getValue.includes(search));
};
includesString.autoRemove = (val) => testFalsey(val);
const includesStringSensitive = (row, columnId, filterValue) => {
	var _row$getValue2;
	return Boolean((_row$getValue2 = row.getValue(columnId)) == null || (_row$getValue2 = _row$getValue2.toString()) == null ? void 0 : _row$getValue2.includes(filterValue));
};
includesStringSensitive.autoRemove = (val) => testFalsey(val);
const equalsString = (row, columnId, filterValue) => {
	var _row$getValue3;
	return ((_row$getValue3 = row.getValue(columnId)) == null || (_row$getValue3 = _row$getValue3.toString()) == null ? void 0 : _row$getValue3.toLowerCase()) === (filterValue == null ? void 0 : filterValue.toLowerCase());
};
equalsString.autoRemove = (val) => testFalsey(val);
const arrIncludes = (row, columnId, filterValue) => {
	var _row$getValue4;
	return (_row$getValue4 = row.getValue(columnId)) == null ? void 0 : _row$getValue4.includes(filterValue);
};
arrIncludes.autoRemove = (val) => testFalsey(val);
const arrIncludesAll = (row, columnId, filterValue) => {
	return !filterValue.some((val) => {
		var _row$getValue5;
		return !((_row$getValue5 = row.getValue(columnId)) != null && _row$getValue5.includes(val));
	});
};
arrIncludesAll.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
const arrIncludesSome = (row, columnId, filterValue) => {
	return filterValue.some((val) => {
		var _row$getValue6;
		return (_row$getValue6 = row.getValue(columnId)) == null ? void 0 : _row$getValue6.includes(val);
	});
};
arrIncludesSome.autoRemove = (val) => testFalsey(val) || !(val != null && val.length);
const equals = (row, columnId, filterValue) => {
	return row.getValue(columnId) === filterValue;
};
equals.autoRemove = (val) => testFalsey(val);
const weakEquals = (row, columnId, filterValue) => {
	return row.getValue(columnId) == filterValue;
};
weakEquals.autoRemove = (val) => testFalsey(val);
const inNumberRange = (row, columnId, filterValue) => {
	let [min$1, max$1] = filterValue;
	const rowValue = row.getValue(columnId);
	return rowValue >= min$1 && rowValue <= max$1;
};
inNumberRange.resolveFilterValue = (val) => {
	let [unsafeMin, unsafeMax] = val;
	let parsedMin = typeof unsafeMin !== "number" ? parseFloat(unsafeMin) : unsafeMin;
	let parsedMax = typeof unsafeMax !== "number" ? parseFloat(unsafeMax) : unsafeMax;
	let min$1 = unsafeMin === null || Number.isNaN(parsedMin) ? -Infinity : parsedMin;
	let max$1 = unsafeMax === null || Number.isNaN(parsedMax) ? Infinity : parsedMax;
	if (min$1 > max$1) {
		const temp = min$1;
		min$1 = max$1;
		max$1 = temp;
	}
	return [min$1, max$1];
};
inNumberRange.autoRemove = (val) => testFalsey(val) || testFalsey(val[0]) && testFalsey(val[1]);
const filterFns = {
	includesString,
	includesStringSensitive,
	equalsString,
	arrIncludes,
	arrIncludesAll,
	arrIncludesSome,
	equals,
	weakEquals,
	inNumberRange
};
function testFalsey(val) {
	return val === void 0 || val === null || val === "";
}
const ColumnFiltering = {
	getDefaultColumnDef: () => {
		return { filterFn: "auto" };
	},
	getInitialState: (state) => {
		return {
			columnFilters: [],
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			onColumnFiltersChange: makeStateUpdater("columnFilters", table$1),
			filterFromLeafRows: false,
			maxLeafRowFilterDepth: 100
		};
	},
	createColumn: (column, table$1) => {
		column.getAutoFilterFn = () => {
			const firstRow = table$1.getCoreRowModel().flatRows[0];
			const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
			if (typeof value === "string") return filterFns.includesString;
			if (typeof value === "number") return filterFns.inNumberRange;
			if (typeof value === "boolean") return filterFns.equals;
			if (value !== null && typeof value === "object") return filterFns.equals;
			if (Array.isArray(value)) return filterFns.arrIncludes;
			return filterFns.weakEquals;
		};
		column.getFilterFn = () => {
			var _table$options$filter, _table$options$filter2;
			return isFunction(column.columnDef.filterFn) ? column.columnDef.filterFn : column.columnDef.filterFn === "auto" ? column.getAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table$1.options.filterFns) == null ? void 0 : _table$options$filter2[column.columnDef.filterFn]) != null ? _table$options$filter : filterFns[column.columnDef.filterFn];
		};
		column.getCanFilter = () => {
			var _column$columnDef$ena, _table$options$enable, _table$options$enable2;
			return ((_column$columnDef$ena = column.columnDef.enableColumnFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table$1.options.enableColumnFilters) != null ? _table$options$enable : true) && ((_table$options$enable2 = table$1.options.enableFilters) != null ? _table$options$enable2 : true) && !!column.accessorFn;
		};
		column.getIsFiltered = () => column.getFilterIndex() > -1;
		column.getFilterValue = () => {
			var _table$getState$colum;
			return (_table$getState$colum = table$1.getState().columnFilters) == null || (_table$getState$colum = _table$getState$colum.find((d) => d.id === column.id)) == null ? void 0 : _table$getState$colum.value;
		};
		column.getFilterIndex = () => {
			var _table$getState$colum2, _table$getState$colum3;
			return (_table$getState$colum2 = (_table$getState$colum3 = table$1.getState().columnFilters) == null ? void 0 : _table$getState$colum3.findIndex((d) => d.id === column.id)) != null ? _table$getState$colum2 : -1;
		};
		column.setFilterValue = (value) => {
			table$1.setColumnFilters((old) => {
				const filterFn = column.getFilterFn();
				const previousFilter = old == null ? void 0 : old.find((d) => d.id === column.id);
				const newFilter = functionalUpdate(value, previousFilter ? previousFilter.value : void 0);
				if (shouldAutoRemoveFilter(filterFn, newFilter, column)) {
					var _old$filter;
					return (_old$filter = old == null ? void 0 : old.filter((d) => d.id !== column.id)) != null ? _old$filter : [];
				}
				const newFilterObj = {
					id: column.id,
					value: newFilter
				};
				if (previousFilter) {
					var _old$map;
					return (_old$map = old == null ? void 0 : old.map((d) => {
						if (d.id === column.id) return newFilterObj;
						return d;
					})) != null ? _old$map : [];
				}
				if (old != null && old.length) return [...old, newFilterObj];
				return [newFilterObj];
			});
		};
	},
	createRow: (row, _table) => {
		row.columnFilters = {};
		row.columnFiltersMeta = {};
	},
	createTable: (table$1) => {
		table$1.setColumnFilters = (updater) => {
			const leafColumns = table$1.getAllLeafColumns();
			const updateFn = (old) => {
				var _functionalUpdate;
				return (_functionalUpdate = functionalUpdate(updater, old)) == null ? void 0 : _functionalUpdate.filter((filter) => {
					const column = leafColumns.find((d) => d.id === filter.id);
					if (column) {
						const filterFn = column.getFilterFn();
						if (shouldAutoRemoveFilter(filterFn, filter.value, column)) return false;
					}
					return true;
				});
			};
			table$1.options.onColumnFiltersChange == null || table$1.options.onColumnFiltersChange(updateFn);
		};
		table$1.resetColumnFilters = (defaultState) => {
			var _table$initialState$c, _table$initialState;
			table$1.setColumnFilters(defaultState ? [] : (_table$initialState$c = (_table$initialState = table$1.initialState) == null ? void 0 : _table$initialState.columnFilters) != null ? _table$initialState$c : []);
		};
		table$1.getPreFilteredRowModel = () => table$1.getCoreRowModel();
		table$1.getFilteredRowModel = () => {
			if (!table$1._getFilteredRowModel && table$1.options.getFilteredRowModel) table$1._getFilteredRowModel = table$1.options.getFilteredRowModel(table$1);
			if (table$1.options.manualFiltering || !table$1._getFilteredRowModel) return table$1.getPreFilteredRowModel();
			return table$1._getFilteredRowModel();
		};
	}
};
function shouldAutoRemoveFilter(filterFn, value, column) {
	return (filterFn && filterFn.autoRemove ? filterFn.autoRemove(value, column) : false) || typeof value === "undefined" || typeof value === "string" && !value;
}
const sum = (columnId, _leafRows, childRows) => {
	return childRows.reduce((sum$1, next) => {
		const nextValue = next.getValue(columnId);
		return sum$1 + (typeof nextValue === "number" ? nextValue : 0);
	}, 0);
};
const min = (columnId, _leafRows, childRows) => {
	let min$1;
	childRows.forEach((row) => {
		const value = row.getValue(columnId);
		if (value != null && (min$1 > value || min$1 === void 0 && value >= value)) min$1 = value;
	});
	return min$1;
};
const max = (columnId, _leafRows, childRows) => {
	let max$1;
	childRows.forEach((row) => {
		const value = row.getValue(columnId);
		if (value != null && (max$1 < value || max$1 === void 0 && value >= value)) max$1 = value;
	});
	return max$1;
};
const extent = (columnId, _leafRows, childRows) => {
	let min$1;
	let max$1;
	childRows.forEach((row) => {
		const value = row.getValue(columnId);
		if (value != null) if (min$1 === void 0) {
			if (value >= value) min$1 = max$1 = value;
		} else {
			if (min$1 > value) min$1 = value;
			if (max$1 < value) max$1 = value;
		}
	});
	return [min$1, max$1];
};
const mean = (columnId, leafRows) => {
	let count$1 = 0;
	let sum$1 = 0;
	leafRows.forEach((row) => {
		let value = row.getValue(columnId);
		if (value != null && (value = +value) >= value) ++count$1, sum$1 += value;
	});
	if (count$1) return sum$1 / count$1;
};
const median = (columnId, leafRows) => {
	if (!leafRows.length) return;
	const values = leafRows.map((row) => row.getValue(columnId));
	if (!isNumberArray(values)) return;
	if (values.length === 1) return values[0];
	const mid = Math.floor(values.length / 2);
	const nums = values.sort((a, b) => a - b);
	return values.length % 2 !== 0 ? nums[mid] : (nums[mid - 1] + nums[mid]) / 2;
};
const unique = (columnId, leafRows) => {
	return Array.from(new Set(leafRows.map((d) => d.getValue(columnId))).values());
};
const uniqueCount = (columnId, leafRows) => {
	return new Set(leafRows.map((d) => d.getValue(columnId))).size;
};
const count = (_columnId, leafRows) => {
	return leafRows.length;
};
const aggregationFns = {
	sum,
	min,
	max,
	extent,
	mean,
	median,
	unique,
	uniqueCount,
	count
};
const ColumnGrouping = {
	getDefaultColumnDef: () => {
		return {
			aggregatedCell: (props) => {
				var _toString, _props$getValue;
				return (_toString = (_props$getValue = props.getValue()) == null || _props$getValue.toString == null ? void 0 : _props$getValue.toString()) != null ? _toString : null;
			},
			aggregationFn: "auto"
		};
	},
	getInitialState: (state) => {
		return {
			grouping: [],
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			onGroupingChange: makeStateUpdater("grouping", table$1),
			groupedColumnMode: "reorder"
		};
	},
	createColumn: (column, table$1) => {
		column.toggleGrouping = () => {
			table$1.setGrouping((old) => {
				if (old != null && old.includes(column.id)) return old.filter((d) => d !== column.id);
				return [...old != null ? old : [], column.id];
			});
		};
		column.getCanGroup = () => {
			var _column$columnDef$ena, _table$options$enable;
			return ((_column$columnDef$ena = column.columnDef.enableGrouping) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table$1.options.enableGrouping) != null ? _table$options$enable : true) && (!!column.accessorFn || !!column.columnDef.getGroupingValue);
		};
		column.getIsGrouped = () => {
			var _table$getState$group;
			return (_table$getState$group = table$1.getState().grouping) == null ? void 0 : _table$getState$group.includes(column.id);
		};
		column.getGroupedIndex = () => {
			var _table$getState$group2;
			return (_table$getState$group2 = table$1.getState().grouping) == null ? void 0 : _table$getState$group2.indexOf(column.id);
		};
		column.getToggleGroupingHandler = () => {
			const canGroup = column.getCanGroup();
			return () => {
				if (!canGroup) return;
				column.toggleGrouping();
			};
		};
		column.getAutoAggregationFn = () => {
			const firstRow = table$1.getCoreRowModel().flatRows[0];
			const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
			if (typeof value === "number") return aggregationFns.sum;
			if (Object.prototype.toString.call(value) === "[object Date]") return aggregationFns.extent;
		};
		column.getAggregationFn = () => {
			var _table$options$aggreg, _table$options$aggreg2;
			if (!column) throw new Error();
			return isFunction(column.columnDef.aggregationFn) ? column.columnDef.aggregationFn : column.columnDef.aggregationFn === "auto" ? column.getAutoAggregationFn() : (_table$options$aggreg = (_table$options$aggreg2 = table$1.options.aggregationFns) == null ? void 0 : _table$options$aggreg2[column.columnDef.aggregationFn]) != null ? _table$options$aggreg : aggregationFns[column.columnDef.aggregationFn];
		};
	},
	createTable: (table$1) => {
		table$1.setGrouping = (updater) => table$1.options.onGroupingChange == null ? void 0 : table$1.options.onGroupingChange(updater);
		table$1.resetGrouping = (defaultState) => {
			var _table$initialState$g, _table$initialState;
			table$1.setGrouping(defaultState ? [] : (_table$initialState$g = (_table$initialState = table$1.initialState) == null ? void 0 : _table$initialState.grouping) != null ? _table$initialState$g : []);
		};
		table$1.getPreGroupedRowModel = () => table$1.getFilteredRowModel();
		table$1.getGroupedRowModel = () => {
			if (!table$1._getGroupedRowModel && table$1.options.getGroupedRowModel) table$1._getGroupedRowModel = table$1.options.getGroupedRowModel(table$1);
			if (table$1.options.manualGrouping || !table$1._getGroupedRowModel) return table$1.getPreGroupedRowModel();
			return table$1._getGroupedRowModel();
		};
	},
	createRow: (row, table$1) => {
		row.getIsGrouped = () => !!row.groupingColumnId;
		row.getGroupingValue = (columnId) => {
			if (row._groupingValuesCache.hasOwnProperty(columnId)) return row._groupingValuesCache[columnId];
			const column = table$1.getColumn(columnId);
			if (!(column != null && column.columnDef.getGroupingValue)) return row.getValue(columnId);
			row._groupingValuesCache[columnId] = column.columnDef.getGroupingValue(row.original);
			return row._groupingValuesCache[columnId];
		};
		row._groupingValuesCache = {};
	},
	createCell: (cell, column, row, table$1) => {
		cell.getIsGrouped = () => column.getIsGrouped() && column.id === row.groupingColumnId;
		cell.getIsPlaceholder = () => !cell.getIsGrouped() && column.getIsGrouped();
		cell.getIsAggregated = () => {
			var _row$subRows;
			return !cell.getIsGrouped() && !cell.getIsPlaceholder() && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
		};
	}
};
function orderColumns(leafColumns, grouping, groupedColumnMode) {
	if (!(grouping != null && grouping.length) || !groupedColumnMode) return leafColumns;
	const nonGroupingColumns = leafColumns.filter((col) => !grouping.includes(col.id));
	if (groupedColumnMode === "remove") return nonGroupingColumns;
	const groupingColumns = grouping.map((g) => leafColumns.find((col) => col.id === g)).filter(Boolean);
	return [...groupingColumns, ...nonGroupingColumns];
}
const ColumnOrdering = {
	getInitialState: (state) => {
		return {
			columnOrder: [],
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return { onColumnOrderChange: makeStateUpdater("columnOrder", table$1) };
	},
	createColumn: (column, table$1) => {
		column.getIndex = memo((position) => [_getVisibleLeafColumns(table$1, position)], (columns) => columns.findIndex((d) => d.id === column.id), getMemoOptions(table$1.options, "debugColumns", "getIndex"));
		column.getIsFirstColumn = (position) => {
			var _columns$;
			const columns = _getVisibleLeafColumns(table$1, position);
			return ((_columns$ = columns[0]) == null ? void 0 : _columns$.id) === column.id;
		};
		column.getIsLastColumn = (position) => {
			var _columns;
			const columns = _getVisibleLeafColumns(table$1, position);
			return ((_columns = columns[columns.length - 1]) == null ? void 0 : _columns.id) === column.id;
		};
	},
	createTable: (table$1) => {
		table$1.setColumnOrder = (updater) => table$1.options.onColumnOrderChange == null ? void 0 : table$1.options.onColumnOrderChange(updater);
		table$1.resetColumnOrder = (defaultState) => {
			var _table$initialState$c;
			table$1.setColumnOrder(defaultState ? [] : (_table$initialState$c = table$1.initialState.columnOrder) != null ? _table$initialState$c : []);
		};
		table$1._getOrderColumnsFn = memo(() => [
			table$1.getState().columnOrder,
			table$1.getState().grouping,
			table$1.options.groupedColumnMode
		], (columnOrder, grouping, groupedColumnMode) => (columns) => {
			let orderedColumns = [];
			if (!(columnOrder != null && columnOrder.length)) orderedColumns = columns;
			else {
				const columnOrderCopy = [...columnOrder];
				const columnsCopy = [...columns];
				while (columnsCopy.length && columnOrderCopy.length) {
					const targetColumnId = columnOrderCopy.shift();
					const foundIndex = columnsCopy.findIndex((d) => d.id === targetColumnId);
					if (foundIndex > -1) orderedColumns.push(columnsCopy.splice(foundIndex, 1)[0]);
				}
				orderedColumns = [...orderedColumns, ...columnsCopy];
			}
			return orderColumns(orderedColumns, grouping, groupedColumnMode);
		}, getMemoOptions(table$1.options, "debugTable", "_getOrderColumnsFn"));
	}
};
const getDefaultColumnPinningState = () => ({
	left: [],
	right: []
});
const ColumnPinning = {
	getInitialState: (state) => {
		return {
			columnPinning: getDefaultColumnPinningState(),
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return { onColumnPinningChange: makeStateUpdater("columnPinning", table$1) };
	},
	createColumn: (column, table$1) => {
		column.pin = (position) => {
			const columnIds = column.getLeafColumns().map((d) => d.id).filter(Boolean);
			table$1.setColumnPinning((old) => {
				var _old$left3, _old$right3;
				if (position === "right") {
					var _old$left, _old$right;
					return {
						left: ((_old$left = old == null ? void 0 : old.left) != null ? _old$left : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
						right: [...((_old$right = old == null ? void 0 : old.right) != null ? _old$right : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds]
					};
				}
				if (position === "left") {
					var _old$left2, _old$right2;
					return {
						left: [...((_old$left2 = old == null ? void 0 : old.left) != null ? _old$left2 : []).filter((d) => !(columnIds != null && columnIds.includes(d))), ...columnIds],
						right: ((_old$right2 = old == null ? void 0 : old.right) != null ? _old$right2 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
					};
				}
				return {
					left: ((_old$left3 = old == null ? void 0 : old.left) != null ? _old$left3 : []).filter((d) => !(columnIds != null && columnIds.includes(d))),
					right: ((_old$right3 = old == null ? void 0 : old.right) != null ? _old$right3 : []).filter((d) => !(columnIds != null && columnIds.includes(d)))
				};
			});
		};
		column.getCanPin = () => {
			const leafColumns = column.getLeafColumns();
			return leafColumns.some((d) => {
				var _d$columnDef$enablePi, _ref, _table$options$enable;
				return ((_d$columnDef$enablePi = d.columnDef.enablePinning) != null ? _d$columnDef$enablePi : true) && ((_ref = (_table$options$enable = table$1.options.enableColumnPinning) != null ? _table$options$enable : table$1.options.enablePinning) != null ? _ref : true);
			});
		};
		column.getIsPinned = () => {
			const leafColumnIds = column.getLeafColumns().map((d) => d.id);
			const { left, right } = table$1.getState().columnPinning;
			const isLeft = leafColumnIds.some((d) => left == null ? void 0 : left.includes(d));
			const isRight = leafColumnIds.some((d) => right == null ? void 0 : right.includes(d));
			return isLeft ? "left" : isRight ? "right" : false;
		};
		column.getPinnedIndex = () => {
			var _table$getState$colum, _table$getState$colum2;
			const position = column.getIsPinned();
			return position ? (_table$getState$colum = (_table$getState$colum2 = table$1.getState().columnPinning) == null || (_table$getState$colum2 = _table$getState$colum2[position]) == null ? void 0 : _table$getState$colum2.indexOf(column.id)) != null ? _table$getState$colum : -1 : 0;
		};
	},
	createRow: (row, table$1) => {
		row.getCenterVisibleCells = memo(() => [
			row._getAllVisibleCells(),
			table$1.getState().columnPinning.left,
			table$1.getState().columnPinning.right
		], (allCells, left, right) => {
			const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
			return allCells.filter((d) => !leftAndRight.includes(d.column.id));
		}, getMemoOptions(table$1.options, "debugRows", "getCenterVisibleCells"));
		row.getLeftVisibleCells = memo(() => [row._getAllVisibleCells(), table$1.getState().columnPinning.left], (allCells, left) => {
			const cells = (left != null ? left : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
				...d,
				position: "left"
			}));
			return cells;
		}, getMemoOptions(table$1.options, "debugRows", "getLeftVisibleCells"));
		row.getRightVisibleCells = memo(() => [row._getAllVisibleCells(), table$1.getState().columnPinning.right], (allCells, right) => {
			const cells = (right != null ? right : []).map((columnId) => allCells.find((cell) => cell.column.id === columnId)).filter(Boolean).map((d) => ({
				...d,
				position: "right"
			}));
			return cells;
		}, getMemoOptions(table$1.options, "debugRows", "getRightVisibleCells"));
	},
	createTable: (table$1) => {
		table$1.setColumnPinning = (updater) => table$1.options.onColumnPinningChange == null ? void 0 : table$1.options.onColumnPinningChange(updater);
		table$1.resetColumnPinning = (defaultState) => {
			var _table$initialState$c, _table$initialState;
			return table$1.setColumnPinning(defaultState ? getDefaultColumnPinningState() : (_table$initialState$c = (_table$initialState = table$1.initialState) == null ? void 0 : _table$initialState.columnPinning) != null ? _table$initialState$c : getDefaultColumnPinningState());
		};
		table$1.getIsSomeColumnsPinned = (position) => {
			var _pinningState$positio;
			const pinningState = table$1.getState().columnPinning;
			if (!position) {
				var _pinningState$left, _pinningState$right;
				return Boolean(((_pinningState$left = pinningState.left) == null ? void 0 : _pinningState$left.length) || ((_pinningState$right = pinningState.right) == null ? void 0 : _pinningState$right.length));
			}
			return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
		};
		table$1.getLeftLeafColumns = memo(() => [table$1.getAllLeafColumns(), table$1.getState().columnPinning.left], (allColumns, left) => {
			return (left != null ? left : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
		}, getMemoOptions(table$1.options, "debugColumns", "getLeftLeafColumns"));
		table$1.getRightLeafColumns = memo(() => [table$1.getAllLeafColumns(), table$1.getState().columnPinning.right], (allColumns, right) => {
			return (right != null ? right : []).map((columnId) => allColumns.find((column) => column.id === columnId)).filter(Boolean);
		}, getMemoOptions(table$1.options, "debugColumns", "getRightLeafColumns"));
		table$1.getCenterLeafColumns = memo(() => [
			table$1.getAllLeafColumns(),
			table$1.getState().columnPinning.left,
			table$1.getState().columnPinning.right
		], (allColumns, left, right) => {
			const leftAndRight = [...left != null ? left : [], ...right != null ? right : []];
			return allColumns.filter((d) => !leftAndRight.includes(d.id));
		}, getMemoOptions(table$1.options, "debugColumns", "getCenterLeafColumns"));
	}
};
function safelyAccessDocument(_document) {
	return _document || (typeof document !== "undefined" ? document : null);
}
const defaultColumnSizing = {
	size: 150,
	minSize: 20,
	maxSize: Number.MAX_SAFE_INTEGER
};
const getDefaultColumnSizingInfoState = () => ({
	startOffset: null,
	startSize: null,
	deltaOffset: null,
	deltaPercentage: null,
	isResizingColumn: false,
	columnSizingStart: []
});
const ColumnSizing = {
	getDefaultColumnDef: () => {
		return defaultColumnSizing;
	},
	getInitialState: (state) => {
		return {
			columnSizing: {},
			columnSizingInfo: getDefaultColumnSizingInfoState(),
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			columnResizeMode: "onEnd",
			columnResizeDirection: "ltr",
			onColumnSizingChange: makeStateUpdater("columnSizing", table$1),
			onColumnSizingInfoChange: makeStateUpdater("columnSizingInfo", table$1)
		};
	},
	createColumn: (column, table$1) => {
		column.getSize = () => {
			var _column$columnDef$min, _ref, _column$columnDef$max;
			const columnSize = table$1.getState().columnSizing[column.id];
			return Math.min(Math.max((_column$columnDef$min = column.columnDef.minSize) != null ? _column$columnDef$min : defaultColumnSizing.minSize, (_ref = columnSize != null ? columnSize : column.columnDef.size) != null ? _ref : defaultColumnSizing.size), (_column$columnDef$max = column.columnDef.maxSize) != null ? _column$columnDef$max : defaultColumnSizing.maxSize);
		};
		column.getStart = memo((position) => [
			position,
			_getVisibleLeafColumns(table$1, position),
			table$1.getState().columnSizing
		], (position, columns) => columns.slice(0, column.getIndex(position)).reduce((sum$1, column$1) => sum$1 + column$1.getSize(), 0), getMemoOptions(table$1.options, "debugColumns", "getStart"));
		column.getAfter = memo((position) => [
			position,
			_getVisibleLeafColumns(table$1, position),
			table$1.getState().columnSizing
		], (position, columns) => columns.slice(column.getIndex(position) + 1).reduce((sum$1, column$1) => sum$1 + column$1.getSize(), 0), getMemoOptions(table$1.options, "debugColumns", "getAfter"));
		column.resetSize = () => {
			table$1.setColumnSizing((_ref2) => {
				let { [column.id]: _,...rest } = _ref2;
				return rest;
			});
		};
		column.getCanResize = () => {
			var _column$columnDef$ena, _table$options$enable;
			return ((_column$columnDef$ena = column.columnDef.enableResizing) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table$1.options.enableColumnResizing) != null ? _table$options$enable : true);
		};
		column.getIsResizing = () => {
			return table$1.getState().columnSizingInfo.isResizingColumn === column.id;
		};
	},
	createHeader: (header, table$1) => {
		header.getSize = () => {
			let sum$1 = 0;
			const recurse = (header$1) => {
				if (header$1.subHeaders.length) header$1.subHeaders.forEach(recurse);
				else {
					var _header$column$getSiz;
					sum$1 += (_header$column$getSiz = header$1.column.getSize()) != null ? _header$column$getSiz : 0;
				}
			};
			recurse(header);
			return sum$1;
		};
		header.getStart = () => {
			if (header.index > 0) {
				const prevSiblingHeader = header.headerGroup.headers[header.index - 1];
				return prevSiblingHeader.getStart() + prevSiblingHeader.getSize();
			}
			return 0;
		};
		header.getResizeHandler = (_contextDocument) => {
			const column = table$1.getColumn(header.column.id);
			const canResize = column == null ? void 0 : column.getCanResize();
			return (e) => {
				if (!column || !canResize) return;
				e.persist == null || e.persist();
				if (isTouchStartEvent(e)) {
					if (e.touches && e.touches.length > 1) return;
				}
				const startSize = header.getSize();
				const columnSizingStart = header ? header.getLeafHeaders().map((d) => [d.column.id, d.column.getSize()]) : [[column.id, column.getSize()]];
				const clientX = isTouchStartEvent(e) ? Math.round(e.touches[0].clientX) : e.clientX;
				const newColumnSizing = {};
				const updateOffset = (eventType, clientXPos) => {
					if (typeof clientXPos !== "number") return;
					table$1.setColumnSizingInfo((old) => {
						var _old$startOffset, _old$startSize;
						const deltaDirection = table$1.options.columnResizeDirection === "rtl" ? -1 : 1;
						const deltaOffset = (clientXPos - ((_old$startOffset = old == null ? void 0 : old.startOffset) != null ? _old$startOffset : 0)) * deltaDirection;
						const deltaPercentage = Math.max(deltaOffset / ((_old$startSize = old == null ? void 0 : old.startSize) != null ? _old$startSize : 0), -.999999);
						old.columnSizingStart.forEach((_ref3) => {
							let [columnId, headerSize] = _ref3;
							newColumnSizing[columnId] = Math.round(Math.max(headerSize + headerSize * deltaPercentage, 0) * 100) / 100;
						});
						return {
							...old,
							deltaOffset,
							deltaPercentage
						};
					});
					if (table$1.options.columnResizeMode === "onChange" || eventType === "end") table$1.setColumnSizing((old) => ({
						...old,
						...newColumnSizing
					}));
				};
				const onMove = (clientXPos) => updateOffset("move", clientXPos);
				const onEnd = (clientXPos) => {
					updateOffset("end", clientXPos);
					table$1.setColumnSizingInfo((old) => ({
						...old,
						isResizingColumn: false,
						startOffset: null,
						startSize: null,
						deltaOffset: null,
						deltaPercentage: null,
						columnSizingStart: []
					}));
				};
				const contextDocument = safelyAccessDocument(_contextDocument);
				const mouseEvents = {
					moveHandler: (e$1) => onMove(e$1.clientX),
					upHandler: (e$1) => {
						contextDocument?.removeEventListener("mousemove", mouseEvents.moveHandler);
						contextDocument?.removeEventListener("mouseup", mouseEvents.upHandler);
						onEnd(e$1.clientX);
					}
				};
				const touchEvents = {
					moveHandler: (e$1) => {
						if (e$1.cancelable) {
							e$1.preventDefault();
							e$1.stopPropagation();
						}
						onMove(e$1.touches[0].clientX);
						return false;
					},
					upHandler: (e$1) => {
						var _e$touches$;
						contextDocument?.removeEventListener("touchmove", touchEvents.moveHandler);
						contextDocument?.removeEventListener("touchend", touchEvents.upHandler);
						if (e$1.cancelable) {
							e$1.preventDefault();
							e$1.stopPropagation();
						}
						onEnd((_e$touches$ = e$1.touches[0]) == null ? void 0 : _e$touches$.clientX);
					}
				};
				const passiveIfSupported = passiveEventSupported() ? { passive: false } : false;
				if (isTouchStartEvent(e)) {
					contextDocument?.addEventListener("touchmove", touchEvents.moveHandler, passiveIfSupported);
					contextDocument?.addEventListener("touchend", touchEvents.upHandler, passiveIfSupported);
				} else {
					contextDocument?.addEventListener("mousemove", mouseEvents.moveHandler, passiveIfSupported);
					contextDocument?.addEventListener("mouseup", mouseEvents.upHandler, passiveIfSupported);
				}
				table$1.setColumnSizingInfo((old) => ({
					...old,
					startOffset: clientX,
					startSize,
					deltaOffset: 0,
					deltaPercentage: 0,
					columnSizingStart,
					isResizingColumn: column.id
				}));
			};
		};
	},
	createTable: (table$1) => {
		table$1.setColumnSizing = (updater) => table$1.options.onColumnSizingChange == null ? void 0 : table$1.options.onColumnSizingChange(updater);
		table$1.setColumnSizingInfo = (updater) => table$1.options.onColumnSizingInfoChange == null ? void 0 : table$1.options.onColumnSizingInfoChange(updater);
		table$1.resetColumnSizing = (defaultState) => {
			var _table$initialState$c;
			table$1.setColumnSizing(defaultState ? {} : (_table$initialState$c = table$1.initialState.columnSizing) != null ? _table$initialState$c : {});
		};
		table$1.resetHeaderSizeInfo = (defaultState) => {
			var _table$initialState$c2;
			table$1.setColumnSizingInfo(defaultState ? getDefaultColumnSizingInfoState() : (_table$initialState$c2 = table$1.initialState.columnSizingInfo) != null ? _table$initialState$c2 : getDefaultColumnSizingInfoState());
		};
		table$1.getTotalSize = () => {
			var _table$getHeaderGroup, _table$getHeaderGroup2;
			return (_table$getHeaderGroup = (_table$getHeaderGroup2 = table$1.getHeaderGroups()[0]) == null ? void 0 : _table$getHeaderGroup2.headers.reduce((sum$1, header) => {
				return sum$1 + header.getSize();
			}, 0)) != null ? _table$getHeaderGroup : 0;
		};
		table$1.getLeftTotalSize = () => {
			var _table$getLeftHeaderG, _table$getLeftHeaderG2;
			return (_table$getLeftHeaderG = (_table$getLeftHeaderG2 = table$1.getLeftHeaderGroups()[0]) == null ? void 0 : _table$getLeftHeaderG2.headers.reduce((sum$1, header) => {
				return sum$1 + header.getSize();
			}, 0)) != null ? _table$getLeftHeaderG : 0;
		};
		table$1.getCenterTotalSize = () => {
			var _table$getCenterHeade, _table$getCenterHeade2;
			return (_table$getCenterHeade = (_table$getCenterHeade2 = table$1.getCenterHeaderGroups()[0]) == null ? void 0 : _table$getCenterHeade2.headers.reduce((sum$1, header) => {
				return sum$1 + header.getSize();
			}, 0)) != null ? _table$getCenterHeade : 0;
		};
		table$1.getRightTotalSize = () => {
			var _table$getRightHeader, _table$getRightHeader2;
			return (_table$getRightHeader = (_table$getRightHeader2 = table$1.getRightHeaderGroups()[0]) == null ? void 0 : _table$getRightHeader2.headers.reduce((sum$1, header) => {
				return sum$1 + header.getSize();
			}, 0)) != null ? _table$getRightHeader : 0;
		};
	}
};
let passiveSupported = null;
function passiveEventSupported() {
	if (typeof passiveSupported === "boolean") return passiveSupported;
	let supported = false;
	try {
		const options = { get passive() {
			supported = true;
			return false;
		} };
		const noop = () => {};
		window.addEventListener("test", noop, options);
		window.removeEventListener("test", noop);
	} catch (err) {
		supported = false;
	}
	passiveSupported = supported;
	return passiveSupported;
}
function isTouchStartEvent(e) {
	return e.type === "touchstart";
}
const ColumnVisibility = {
	getInitialState: (state) => {
		return {
			columnVisibility: {},
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return { onColumnVisibilityChange: makeStateUpdater("columnVisibility", table$1) };
	},
	createColumn: (column, table$1) => {
		column.toggleVisibility = (value) => {
			if (column.getCanHide()) table$1.setColumnVisibility((old) => ({
				...old,
				[column.id]: value != null ? value : !column.getIsVisible()
			}));
		};
		column.getIsVisible = () => {
			var _ref, _table$getState$colum;
			const childColumns = column.columns;
			return (_ref = childColumns.length ? childColumns.some((c) => c.getIsVisible()) : (_table$getState$colum = table$1.getState().columnVisibility) == null ? void 0 : _table$getState$colum[column.id]) != null ? _ref : true;
		};
		column.getCanHide = () => {
			var _column$columnDef$ena, _table$options$enable;
			return ((_column$columnDef$ena = column.columnDef.enableHiding) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table$1.options.enableHiding) != null ? _table$options$enable : true);
		};
		column.getToggleVisibilityHandler = () => {
			return (e) => {
				column.toggleVisibility == null || column.toggleVisibility(e.target.checked);
			};
		};
	},
	createRow: (row, table$1) => {
		row._getAllVisibleCells = memo(() => [row.getAllCells(), table$1.getState().columnVisibility], (cells) => {
			return cells.filter((cell) => cell.column.getIsVisible());
		}, getMemoOptions(table$1.options, "debugRows", "_getAllVisibleCells"));
		row.getVisibleCells = memo(() => [
			row.getLeftVisibleCells(),
			row.getCenterVisibleCells(),
			row.getRightVisibleCells()
		], (left, center$1, right) => [
			...left,
			...center$1,
			...right
		], getMemoOptions(table$1.options, "debugRows", "getVisibleCells"));
	},
	createTable: (table$1) => {
		const makeVisibleColumnsMethod = (key, getColumns) => {
			return memo(() => [getColumns(), getColumns().filter((d) => d.getIsVisible()).map((d) => d.id).join("_")], (columns) => {
				return columns.filter((d) => d.getIsVisible == null ? void 0 : d.getIsVisible());
			}, getMemoOptions(table$1.options, "debugColumns", key));
		};
		table$1.getVisibleFlatColumns = makeVisibleColumnsMethod("getVisibleFlatColumns", () => table$1.getAllFlatColumns());
		table$1.getVisibleLeafColumns = makeVisibleColumnsMethod("getVisibleLeafColumns", () => table$1.getAllLeafColumns());
		table$1.getLeftVisibleLeafColumns = makeVisibleColumnsMethod("getLeftVisibleLeafColumns", () => table$1.getLeftLeafColumns());
		table$1.getRightVisibleLeafColumns = makeVisibleColumnsMethod("getRightVisibleLeafColumns", () => table$1.getRightLeafColumns());
		table$1.getCenterVisibleLeafColumns = makeVisibleColumnsMethod("getCenterVisibleLeafColumns", () => table$1.getCenterLeafColumns());
		table$1.setColumnVisibility = (updater) => table$1.options.onColumnVisibilityChange == null ? void 0 : table$1.options.onColumnVisibilityChange(updater);
		table$1.resetColumnVisibility = (defaultState) => {
			var _table$initialState$c;
			table$1.setColumnVisibility(defaultState ? {} : (_table$initialState$c = table$1.initialState.columnVisibility) != null ? _table$initialState$c : {});
		};
		table$1.toggleAllColumnsVisible = (value) => {
			var _value;
			value = (_value = value) != null ? _value : !table$1.getIsAllColumnsVisible();
			table$1.setColumnVisibility(table$1.getAllLeafColumns().reduce((obj, column) => ({
				...obj,
				[column.id]: !value ? !(column.getCanHide != null && column.getCanHide()) : value
			}), {}));
		};
		table$1.getIsAllColumnsVisible = () => !table$1.getAllLeafColumns().some((column) => !(column.getIsVisible != null && column.getIsVisible()));
		table$1.getIsSomeColumnsVisible = () => table$1.getAllLeafColumns().some((column) => column.getIsVisible == null ? void 0 : column.getIsVisible());
		table$1.getToggleAllColumnsVisibilityHandler = () => {
			return (e) => {
				var _target;
				table$1.toggleAllColumnsVisible((_target = e.target) == null ? void 0 : _target.checked);
			};
		};
	}
};
function _getVisibleLeafColumns(table$1, position) {
	return !position ? table$1.getVisibleLeafColumns() : position === "center" ? table$1.getCenterVisibleLeafColumns() : position === "left" ? table$1.getLeftVisibleLeafColumns() : table$1.getRightVisibleLeafColumns();
}
const GlobalFaceting = { createTable: (table$1) => {
	table$1._getGlobalFacetedRowModel = table$1.options.getFacetedRowModel && table$1.options.getFacetedRowModel(table$1, "__global__");
	table$1.getGlobalFacetedRowModel = () => {
		if (table$1.options.manualFiltering || !table$1._getGlobalFacetedRowModel) return table$1.getPreFilteredRowModel();
		return table$1._getGlobalFacetedRowModel();
	};
	table$1._getGlobalFacetedUniqueValues = table$1.options.getFacetedUniqueValues && table$1.options.getFacetedUniqueValues(table$1, "__global__");
	table$1.getGlobalFacetedUniqueValues = () => {
		if (!table$1._getGlobalFacetedUniqueValues) return /* @__PURE__ */ new Map();
		return table$1._getGlobalFacetedUniqueValues();
	};
	table$1._getGlobalFacetedMinMaxValues = table$1.options.getFacetedMinMaxValues && table$1.options.getFacetedMinMaxValues(table$1, "__global__");
	table$1.getGlobalFacetedMinMaxValues = () => {
		if (!table$1._getGlobalFacetedMinMaxValues) return;
		return table$1._getGlobalFacetedMinMaxValues();
	};
} };
const GlobalFiltering = {
	getInitialState: (state) => {
		return {
			globalFilter: void 0,
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			onGlobalFilterChange: makeStateUpdater("globalFilter", table$1),
			globalFilterFn: "auto",
			getColumnCanGlobalFilter: (column) => {
				var _table$getCoreRowMode;
				const value = (_table$getCoreRowMode = table$1.getCoreRowModel().flatRows[0]) == null || (_table$getCoreRowMode = _table$getCoreRowMode._getAllCellsByColumnId()[column.id]) == null ? void 0 : _table$getCoreRowMode.getValue();
				return typeof value === "string" || typeof value === "number";
			}
		};
	},
	createColumn: (column, table$1) => {
		column.getCanGlobalFilter = () => {
			var _column$columnDef$ena, _table$options$enable, _table$options$enable2, _table$options$getCol;
			return ((_column$columnDef$ena = column.columnDef.enableGlobalFilter) != null ? _column$columnDef$ena : true) && ((_table$options$enable = table$1.options.enableGlobalFilter) != null ? _table$options$enable : true) && ((_table$options$enable2 = table$1.options.enableFilters) != null ? _table$options$enable2 : true) && ((_table$options$getCol = table$1.options.getColumnCanGlobalFilter == null ? void 0 : table$1.options.getColumnCanGlobalFilter(column)) != null ? _table$options$getCol : true) && !!column.accessorFn;
		};
	},
	createTable: (table$1) => {
		table$1.getGlobalAutoFilterFn = () => {
			return filterFns.includesString;
		};
		table$1.getGlobalFilterFn = () => {
			var _table$options$filter, _table$options$filter2;
			const { globalFilterFn } = table$1.options;
			return isFunction(globalFilterFn) ? globalFilterFn : globalFilterFn === "auto" ? table$1.getGlobalAutoFilterFn() : (_table$options$filter = (_table$options$filter2 = table$1.options.filterFns) == null ? void 0 : _table$options$filter2[globalFilterFn]) != null ? _table$options$filter : filterFns[globalFilterFn];
		};
		table$1.setGlobalFilter = (updater) => {
			table$1.options.onGlobalFilterChange == null || table$1.options.onGlobalFilterChange(updater);
		};
		table$1.resetGlobalFilter = (defaultState) => {
			table$1.setGlobalFilter(defaultState ? void 0 : table$1.initialState.globalFilter);
		};
	}
};
const RowExpanding = {
	getInitialState: (state) => {
		return {
			expanded: {},
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			onExpandedChange: makeStateUpdater("expanded", table$1),
			paginateExpandedRows: true
		};
	},
	createTable: (table$1) => {
		let registered = false;
		let queued = false;
		table$1._autoResetExpanded = () => {
			var _ref, _table$options$autoRe;
			if (!registered) {
				table$1._queue(() => {
					registered = true;
				});
				return;
			}
			if ((_ref = (_table$options$autoRe = table$1.options.autoResetAll) != null ? _table$options$autoRe : table$1.options.autoResetExpanded) != null ? _ref : !table$1.options.manualExpanding) {
				if (queued) return;
				queued = true;
				table$1._queue(() => {
					table$1.resetExpanded();
					queued = false;
				});
			}
		};
		table$1.setExpanded = (updater) => table$1.options.onExpandedChange == null ? void 0 : table$1.options.onExpandedChange(updater);
		table$1.toggleAllRowsExpanded = (expanded) => {
			if (expanded != null ? expanded : !table$1.getIsAllRowsExpanded()) table$1.setExpanded(true);
			else table$1.setExpanded({});
		};
		table$1.resetExpanded = (defaultState) => {
			var _table$initialState$e, _table$initialState;
			table$1.setExpanded(defaultState ? {} : (_table$initialState$e = (_table$initialState = table$1.initialState) == null ? void 0 : _table$initialState.expanded) != null ? _table$initialState$e : {});
		};
		table$1.getCanSomeRowsExpand = () => {
			return table$1.getPrePaginationRowModel().flatRows.some((row) => row.getCanExpand());
		};
		table$1.getToggleAllRowsExpandedHandler = () => {
			return (e) => {
				e.persist == null || e.persist();
				table$1.toggleAllRowsExpanded();
			};
		};
		table$1.getIsSomeRowsExpanded = () => {
			const expanded = table$1.getState().expanded;
			return expanded === true || Object.values(expanded).some(Boolean);
		};
		table$1.getIsAllRowsExpanded = () => {
			const expanded = table$1.getState().expanded;
			if (typeof expanded === "boolean") return expanded === true;
			if (!Object.keys(expanded).length) return false;
			if (table$1.getRowModel().flatRows.some((row) => !row.getIsExpanded())) return false;
			return true;
		};
		table$1.getExpandedDepth = () => {
			let maxDepth = 0;
			const rowIds = table$1.getState().expanded === true ? Object.keys(table$1.getRowModel().rowsById) : Object.keys(table$1.getState().expanded);
			rowIds.forEach((id) => {
				const splitId = id.split(".");
				maxDepth = Math.max(maxDepth, splitId.length);
			});
			return maxDepth;
		};
		table$1.getPreExpandedRowModel = () => table$1.getSortedRowModel();
		table$1.getExpandedRowModel = () => {
			if (!table$1._getExpandedRowModel && table$1.options.getExpandedRowModel) table$1._getExpandedRowModel = table$1.options.getExpandedRowModel(table$1);
			if (table$1.options.manualExpanding || !table$1._getExpandedRowModel) return table$1.getPreExpandedRowModel();
			return table$1._getExpandedRowModel();
		};
	},
	createRow: (row, table$1) => {
		row.toggleExpanded = (expanded) => {
			table$1.setExpanded((old) => {
				var _expanded;
				const exists = old === true ? true : !!(old != null && old[row.id]);
				let oldExpanded = {};
				if (old === true) Object.keys(table$1.getRowModel().rowsById).forEach((rowId) => {
					oldExpanded[rowId] = true;
				});
				else oldExpanded = old;
				expanded = (_expanded = expanded) != null ? _expanded : !exists;
				if (!exists && expanded) return {
					...oldExpanded,
					[row.id]: true
				};
				if (exists && !expanded) {
					const { [row.id]: _,...rest } = oldExpanded;
					return rest;
				}
				return old;
			});
		};
		row.getIsExpanded = () => {
			var _table$options$getIsR;
			const expanded = table$1.getState().expanded;
			return !!((_table$options$getIsR = table$1.options.getIsRowExpanded == null ? void 0 : table$1.options.getIsRowExpanded(row)) != null ? _table$options$getIsR : expanded === true || (expanded == null ? void 0 : expanded[row.id]));
		};
		row.getCanExpand = () => {
			var _table$options$getRow, _table$options$enable, _row$subRows;
			return (_table$options$getRow = table$1.options.getRowCanExpand == null ? void 0 : table$1.options.getRowCanExpand(row)) != null ? _table$options$getRow : ((_table$options$enable = table$1.options.enableExpanding) != null ? _table$options$enable : true) && !!((_row$subRows = row.subRows) != null && _row$subRows.length);
		};
		row.getIsAllParentsExpanded = () => {
			let isFullyExpanded = true;
			let currentRow = row;
			while (isFullyExpanded && currentRow.parentId) {
				currentRow = table$1.getRow(currentRow.parentId, true);
				isFullyExpanded = currentRow.getIsExpanded();
			}
			return isFullyExpanded;
		};
		row.getToggleExpandedHandler = () => {
			const canExpand = row.getCanExpand();
			return () => {
				if (!canExpand) return;
				row.toggleExpanded();
			};
		};
	}
};
const defaultPageIndex = 0;
const defaultPageSize = 10;
const getDefaultPaginationState = () => ({
	pageIndex: defaultPageIndex,
	pageSize: defaultPageSize
});
const RowPagination = {
	getInitialState: (state) => {
		return {
			...state,
			pagination: {
				...getDefaultPaginationState(),
				...state == null ? void 0 : state.pagination
			}
		};
	},
	getDefaultOptions: (table$1) => {
		return { onPaginationChange: makeStateUpdater("pagination", table$1) };
	},
	createTable: (table$1) => {
		let registered = false;
		let queued = false;
		table$1._autoResetPageIndex = () => {
			var _ref, _table$options$autoRe;
			if (!registered) {
				table$1._queue(() => {
					registered = true;
				});
				return;
			}
			if ((_ref = (_table$options$autoRe = table$1.options.autoResetAll) != null ? _table$options$autoRe : table$1.options.autoResetPageIndex) != null ? _ref : !table$1.options.manualPagination) {
				if (queued) return;
				queued = true;
				table$1._queue(() => {
					table$1.resetPageIndex();
					queued = false;
				});
			}
		};
		table$1.setPagination = (updater) => {
			const safeUpdater = (old) => {
				let newState = functionalUpdate(updater, old);
				return newState;
			};
			return table$1.options.onPaginationChange == null ? void 0 : table$1.options.onPaginationChange(safeUpdater);
		};
		table$1.resetPagination = (defaultState) => {
			var _table$initialState$p;
			table$1.setPagination(defaultState ? getDefaultPaginationState() : (_table$initialState$p = table$1.initialState.pagination) != null ? _table$initialState$p : getDefaultPaginationState());
		};
		table$1.setPageIndex = (updater) => {
			table$1.setPagination((old) => {
				let pageIndex = functionalUpdate(updater, old.pageIndex);
				const maxPageIndex = typeof table$1.options.pageCount === "undefined" || table$1.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : table$1.options.pageCount - 1;
				pageIndex = Math.max(0, Math.min(pageIndex, maxPageIndex));
				return {
					...old,
					pageIndex
				};
			});
		};
		table$1.resetPageIndex = (defaultState) => {
			var _table$initialState$p2, _table$initialState;
			table$1.setPageIndex(defaultState ? defaultPageIndex : (_table$initialState$p2 = (_table$initialState = table$1.initialState) == null || (_table$initialState = _table$initialState.pagination) == null ? void 0 : _table$initialState.pageIndex) != null ? _table$initialState$p2 : defaultPageIndex);
		};
		table$1.resetPageSize = (defaultState) => {
			var _table$initialState$p3, _table$initialState2;
			table$1.setPageSize(defaultState ? defaultPageSize : (_table$initialState$p3 = (_table$initialState2 = table$1.initialState) == null || (_table$initialState2 = _table$initialState2.pagination) == null ? void 0 : _table$initialState2.pageSize) != null ? _table$initialState$p3 : defaultPageSize);
		};
		table$1.setPageSize = (updater) => {
			table$1.setPagination((old) => {
				const pageSize = Math.max(1, functionalUpdate(updater, old.pageSize));
				const topRowIndex = old.pageSize * old.pageIndex;
				const pageIndex = Math.floor(topRowIndex / pageSize);
				return {
					...old,
					pageIndex,
					pageSize
				};
			});
		};
		table$1.setPageCount = (updater) => table$1.setPagination((old) => {
			var _table$options$pageCo;
			let newPageCount = functionalUpdate(updater, (_table$options$pageCo = table$1.options.pageCount) != null ? _table$options$pageCo : -1);
			if (typeof newPageCount === "number") newPageCount = Math.max(-1, newPageCount);
			return {
				...old,
				pageCount: newPageCount
			};
		});
		table$1.getPageOptions = memo(() => [table$1.getPageCount()], (pageCount) => {
			let pageOptions = [];
			if (pageCount && pageCount > 0) pageOptions = [...new Array(pageCount)].fill(null).map((_, i) => i);
			return pageOptions;
		}, getMemoOptions(table$1.options, "debugTable", "getPageOptions"));
		table$1.getCanPreviousPage = () => table$1.getState().pagination.pageIndex > 0;
		table$1.getCanNextPage = () => {
			const { pageIndex } = table$1.getState().pagination;
			const pageCount = table$1.getPageCount();
			if (pageCount === -1) return true;
			if (pageCount === 0) return false;
			return pageIndex < pageCount - 1;
		};
		table$1.previousPage = () => {
			return table$1.setPageIndex((old) => old - 1);
		};
		table$1.nextPage = () => {
			return table$1.setPageIndex((old) => {
				return old + 1;
			});
		};
		table$1.firstPage = () => {
			return table$1.setPageIndex(0);
		};
		table$1.lastPage = () => {
			return table$1.setPageIndex(table$1.getPageCount() - 1);
		};
		table$1.getPrePaginationRowModel = () => table$1.getExpandedRowModel();
		table$1.getPaginationRowModel = () => {
			if (!table$1._getPaginationRowModel && table$1.options.getPaginationRowModel) table$1._getPaginationRowModel = table$1.options.getPaginationRowModel(table$1);
			if (table$1.options.manualPagination || !table$1._getPaginationRowModel) return table$1.getPrePaginationRowModel();
			return table$1._getPaginationRowModel();
		};
		table$1.getPageCount = () => {
			var _table$options$pageCo2;
			return (_table$options$pageCo2 = table$1.options.pageCount) != null ? _table$options$pageCo2 : Math.ceil(table$1.getRowCount() / table$1.getState().pagination.pageSize);
		};
		table$1.getRowCount = () => {
			var _table$options$rowCou;
			return (_table$options$rowCou = table$1.options.rowCount) != null ? _table$options$rowCou : table$1.getPrePaginationRowModel().rows.length;
		};
	}
};
const getDefaultRowPinningState = () => ({
	top: [],
	bottom: []
});
const RowPinning = {
	getInitialState: (state) => {
		return {
			rowPinning: getDefaultRowPinningState(),
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return { onRowPinningChange: makeStateUpdater("rowPinning", table$1) };
	},
	createRow: (row, table$1) => {
		row.pin = (position, includeLeafRows, includeParentRows) => {
			const leafRowIds = includeLeafRows ? row.getLeafRows().map((_ref) => {
				let { id } = _ref;
				return id;
			}) : [];
			const parentRowIds = includeParentRows ? row.getParentRows().map((_ref2) => {
				let { id } = _ref2;
				return id;
			}) : [];
			const rowIds = new Set([
				...parentRowIds,
				row.id,
				...leafRowIds
			]);
			table$1.setRowPinning((old) => {
				var _old$top3, _old$bottom3;
				if (position === "bottom") {
					var _old$top, _old$bottom;
					return {
						top: ((_old$top = old == null ? void 0 : old.top) != null ? _old$top : []).filter((d) => !(rowIds != null && rowIds.has(d))),
						bottom: [...((_old$bottom = old == null ? void 0 : old.bottom) != null ? _old$bottom : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)]
					};
				}
				if (position === "top") {
					var _old$top2, _old$bottom2;
					return {
						top: [...((_old$top2 = old == null ? void 0 : old.top) != null ? _old$top2 : []).filter((d) => !(rowIds != null && rowIds.has(d))), ...Array.from(rowIds)],
						bottom: ((_old$bottom2 = old == null ? void 0 : old.bottom) != null ? _old$bottom2 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
					};
				}
				return {
					top: ((_old$top3 = old == null ? void 0 : old.top) != null ? _old$top3 : []).filter((d) => !(rowIds != null && rowIds.has(d))),
					bottom: ((_old$bottom3 = old == null ? void 0 : old.bottom) != null ? _old$bottom3 : []).filter((d) => !(rowIds != null && rowIds.has(d)))
				};
			});
		};
		row.getCanPin = () => {
			var _ref3;
			const { enableRowPinning, enablePinning } = table$1.options;
			if (typeof enableRowPinning === "function") return enableRowPinning(row);
			return (_ref3 = enableRowPinning != null ? enableRowPinning : enablePinning) != null ? _ref3 : true;
		};
		row.getIsPinned = () => {
			const rowIds = [row.id];
			const { top, bottom } = table$1.getState().rowPinning;
			const isTop = rowIds.some((d) => top == null ? void 0 : top.includes(d));
			const isBottom = rowIds.some((d) => bottom == null ? void 0 : bottom.includes(d));
			return isTop ? "top" : isBottom ? "bottom" : false;
		};
		row.getPinnedIndex = () => {
			var _ref4, _visiblePinnedRowIds$;
			const position = row.getIsPinned();
			if (!position) return -1;
			const visiblePinnedRowIds = (_ref4 = position === "top" ? table$1.getTopRows() : table$1.getBottomRows()) == null ? void 0 : _ref4.map((_ref5) => {
				let { id } = _ref5;
				return id;
			});
			return (_visiblePinnedRowIds$ = visiblePinnedRowIds == null ? void 0 : visiblePinnedRowIds.indexOf(row.id)) != null ? _visiblePinnedRowIds$ : -1;
		};
	},
	createTable: (table$1) => {
		table$1.setRowPinning = (updater) => table$1.options.onRowPinningChange == null ? void 0 : table$1.options.onRowPinningChange(updater);
		table$1.resetRowPinning = (defaultState) => {
			var _table$initialState$r, _table$initialState;
			return table$1.setRowPinning(defaultState ? getDefaultRowPinningState() : (_table$initialState$r = (_table$initialState = table$1.initialState) == null ? void 0 : _table$initialState.rowPinning) != null ? _table$initialState$r : getDefaultRowPinningState());
		};
		table$1.getIsSomeRowsPinned = (position) => {
			var _pinningState$positio;
			const pinningState = table$1.getState().rowPinning;
			if (!position) {
				var _pinningState$top, _pinningState$bottom;
				return Boolean(((_pinningState$top = pinningState.top) == null ? void 0 : _pinningState$top.length) || ((_pinningState$bottom = pinningState.bottom) == null ? void 0 : _pinningState$bottom.length));
			}
			return Boolean((_pinningState$positio = pinningState[position]) == null ? void 0 : _pinningState$positio.length);
		};
		table$1._getPinnedRows = (visibleRows, pinnedRowIds, position) => {
			var _table$options$keepPi;
			const rows = ((_table$options$keepPi = table$1.options.keepPinnedRows) != null ? _table$options$keepPi : true) ? (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => {
				const row = table$1.getRow(rowId, true);
				return row.getIsAllParentsExpanded() ? row : null;
			}) : (pinnedRowIds != null ? pinnedRowIds : []).map((rowId) => visibleRows.find((row) => row.id === rowId));
			return rows.filter(Boolean).map((d) => ({
				...d,
				position
			}));
		};
		table$1.getTopRows = memo(() => [table$1.getRowModel().rows, table$1.getState().rowPinning.top], (allRows, topPinnedRowIds) => table$1._getPinnedRows(allRows, topPinnedRowIds, "top"), getMemoOptions(table$1.options, "debugRows", "getTopRows"));
		table$1.getBottomRows = memo(() => [table$1.getRowModel().rows, table$1.getState().rowPinning.bottom], (allRows, bottomPinnedRowIds) => table$1._getPinnedRows(allRows, bottomPinnedRowIds, "bottom"), getMemoOptions(table$1.options, "debugRows", "getBottomRows"));
		table$1.getCenterRows = memo(() => [
			table$1.getRowModel().rows,
			table$1.getState().rowPinning.top,
			table$1.getState().rowPinning.bottom
		], (allRows, top, bottom) => {
			const topAndBottom = new Set([...top != null ? top : [], ...bottom != null ? bottom : []]);
			return allRows.filter((d) => !topAndBottom.has(d.id));
		}, getMemoOptions(table$1.options, "debugRows", "getCenterRows"));
	}
};
const RowSelection = {
	getInitialState: (state) => {
		return {
			rowSelection: {},
			...state
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			onRowSelectionChange: makeStateUpdater("rowSelection", table$1),
			enableRowSelection: true,
			enableMultiRowSelection: true,
			enableSubRowSelection: true
		};
	},
	createTable: (table$1) => {
		table$1.setRowSelection = (updater) => table$1.options.onRowSelectionChange == null ? void 0 : table$1.options.onRowSelectionChange(updater);
		table$1.resetRowSelection = (defaultState) => {
			var _table$initialState$r;
			return table$1.setRowSelection(defaultState ? {} : (_table$initialState$r = table$1.initialState.rowSelection) != null ? _table$initialState$r : {});
		};
		table$1.toggleAllRowsSelected = (value) => {
			table$1.setRowSelection((old) => {
				value = typeof value !== "undefined" ? value : !table$1.getIsAllRowsSelected();
				const rowSelection = { ...old };
				const preGroupedFlatRows = table$1.getPreGroupedRowModel().flatRows;
				if (value) preGroupedFlatRows.forEach((row) => {
					if (!row.getCanSelect()) return;
					rowSelection[row.id] = true;
				});
				else preGroupedFlatRows.forEach((row) => {
					delete rowSelection[row.id];
				});
				return rowSelection;
			});
		};
		table$1.toggleAllPageRowsSelected = (value) => table$1.setRowSelection((old) => {
			const resolvedValue = typeof value !== "undefined" ? value : !table$1.getIsAllPageRowsSelected();
			const rowSelection = { ...old };
			table$1.getRowModel().rows.forEach((row) => {
				mutateRowIsSelected(rowSelection, row.id, resolvedValue, true, table$1);
			});
			return rowSelection;
		});
		table$1.getPreSelectedRowModel = () => table$1.getCoreRowModel();
		table$1.getSelectedRowModel = memo(() => [table$1.getState().rowSelection, table$1.getCoreRowModel()], (rowSelection, rowModel) => {
			if (!Object.keys(rowSelection).length) return {
				rows: [],
				flatRows: [],
				rowsById: {}
			};
			return selectRowsFn(table$1, rowModel);
		}, getMemoOptions(table$1.options, "debugTable", "getSelectedRowModel"));
		table$1.getFilteredSelectedRowModel = memo(() => [table$1.getState().rowSelection, table$1.getFilteredRowModel()], (rowSelection, rowModel) => {
			if (!Object.keys(rowSelection).length) return {
				rows: [],
				flatRows: [],
				rowsById: {}
			};
			return selectRowsFn(table$1, rowModel);
		}, getMemoOptions(table$1.options, "debugTable", "getFilteredSelectedRowModel"));
		table$1.getGroupedSelectedRowModel = memo(() => [table$1.getState().rowSelection, table$1.getSortedRowModel()], (rowSelection, rowModel) => {
			if (!Object.keys(rowSelection).length) return {
				rows: [],
				flatRows: [],
				rowsById: {}
			};
			return selectRowsFn(table$1, rowModel);
		}, getMemoOptions(table$1.options, "debugTable", "getGroupedSelectedRowModel"));
		table$1.getIsAllRowsSelected = () => {
			const preGroupedFlatRows = table$1.getFilteredRowModel().flatRows;
			const { rowSelection } = table$1.getState();
			let isAllRowsSelected = Boolean(preGroupedFlatRows.length && Object.keys(rowSelection).length);
			if (isAllRowsSelected) {
				if (preGroupedFlatRows.some((row) => row.getCanSelect() && !rowSelection[row.id])) isAllRowsSelected = false;
			}
			return isAllRowsSelected;
		};
		table$1.getIsAllPageRowsSelected = () => {
			const paginationFlatRows = table$1.getPaginationRowModel().flatRows.filter((row) => row.getCanSelect());
			const { rowSelection } = table$1.getState();
			let isAllPageRowsSelected = !!paginationFlatRows.length;
			if (isAllPageRowsSelected && paginationFlatRows.some((row) => !rowSelection[row.id])) isAllPageRowsSelected = false;
			return isAllPageRowsSelected;
		};
		table$1.getIsSomeRowsSelected = () => {
			var _table$getState$rowSe;
			const totalSelected = Object.keys((_table$getState$rowSe = table$1.getState().rowSelection) != null ? _table$getState$rowSe : {}).length;
			return totalSelected > 0 && totalSelected < table$1.getFilteredRowModel().flatRows.length;
		};
		table$1.getIsSomePageRowsSelected = () => {
			const paginationFlatRows = table$1.getPaginationRowModel().flatRows;
			return table$1.getIsAllPageRowsSelected() ? false : paginationFlatRows.filter((row) => row.getCanSelect()).some((d) => d.getIsSelected() || d.getIsSomeSelected());
		};
		table$1.getToggleAllRowsSelectedHandler = () => {
			return (e) => {
				table$1.toggleAllRowsSelected(e.target.checked);
			};
		};
		table$1.getToggleAllPageRowsSelectedHandler = () => {
			return (e) => {
				table$1.toggleAllPageRowsSelected(e.target.checked);
			};
		};
	},
	createRow: (row, table$1) => {
		row.toggleSelected = (value, opts) => {
			const isSelected = row.getIsSelected();
			table$1.setRowSelection((old) => {
				var _opts$selectChildren;
				value = typeof value !== "undefined" ? value : !isSelected;
				if (row.getCanSelect() && isSelected === value) return old;
				const selectedRowIds = { ...old };
				mutateRowIsSelected(selectedRowIds, row.id, value, (_opts$selectChildren = opts == null ? void 0 : opts.selectChildren) != null ? _opts$selectChildren : true, table$1);
				return selectedRowIds;
			});
		};
		row.getIsSelected = () => {
			const { rowSelection } = table$1.getState();
			return isRowSelected(row, rowSelection);
		};
		row.getIsSomeSelected = () => {
			const { rowSelection } = table$1.getState();
			return isSubRowSelected(row, rowSelection) === "some";
		};
		row.getIsAllSubRowsSelected = () => {
			const { rowSelection } = table$1.getState();
			return isSubRowSelected(row, rowSelection) === "all";
		};
		row.getCanSelect = () => {
			var _table$options$enable;
			if (typeof table$1.options.enableRowSelection === "function") return table$1.options.enableRowSelection(row);
			return (_table$options$enable = table$1.options.enableRowSelection) != null ? _table$options$enable : true;
		};
		row.getCanSelectSubRows = () => {
			var _table$options$enable2;
			if (typeof table$1.options.enableSubRowSelection === "function") return table$1.options.enableSubRowSelection(row);
			return (_table$options$enable2 = table$1.options.enableSubRowSelection) != null ? _table$options$enable2 : true;
		};
		row.getCanMultiSelect = () => {
			var _table$options$enable3;
			if (typeof table$1.options.enableMultiRowSelection === "function") return table$1.options.enableMultiRowSelection(row);
			return (_table$options$enable3 = table$1.options.enableMultiRowSelection) != null ? _table$options$enable3 : true;
		};
		row.getToggleSelectedHandler = () => {
			const canSelect = row.getCanSelect();
			return (e) => {
				var _target;
				if (!canSelect) return;
				row.toggleSelected((_target = e.target) == null ? void 0 : _target.checked);
			};
		};
	}
};
const mutateRowIsSelected = (selectedRowIds, id, value, includeChildren, table$1) => {
	var _row$subRows;
	const row = table$1.getRow(id, true);
	if (value) {
		if (!row.getCanMultiSelect()) Object.keys(selectedRowIds).forEach((key) => delete selectedRowIds[key]);
		if (row.getCanSelect()) selectedRowIds[id] = true;
	} else delete selectedRowIds[id];
	if (includeChildren && (_row$subRows = row.subRows) != null && _row$subRows.length && row.getCanSelectSubRows()) row.subRows.forEach((row$1) => mutateRowIsSelected(selectedRowIds, row$1.id, value, includeChildren, table$1));
};
function selectRowsFn(table$1, rowModel) {
	const rowSelection = table$1.getState().rowSelection;
	const newSelectedFlatRows = [];
	const newSelectedRowsById = {};
	const recurseRows = function(rows, depth) {
		return rows.map((row) => {
			var _row$subRows2;
			const isSelected = isRowSelected(row, rowSelection);
			if (isSelected) {
				newSelectedFlatRows.push(row);
				newSelectedRowsById[row.id] = row;
			}
			if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length) row = {
				...row,
				subRows: recurseRows(row.subRows)
			};
			if (isSelected) return row;
		}).filter(Boolean);
	};
	return {
		rows: recurseRows(rowModel.rows),
		flatRows: newSelectedFlatRows,
		rowsById: newSelectedRowsById
	};
}
function isRowSelected(row, selection) {
	var _selection$row$id;
	return (_selection$row$id = selection[row.id]) != null ? _selection$row$id : false;
}
function isSubRowSelected(row, selection, table$1) {
	var _row$subRows3;
	if (!((_row$subRows3 = row.subRows) != null && _row$subRows3.length)) return false;
	let allChildrenSelected = true;
	let someSelected = false;
	row.subRows.forEach((subRow) => {
		if (someSelected && !allChildrenSelected) return;
		if (subRow.getCanSelect()) if (isRowSelected(subRow, selection)) someSelected = true;
		else allChildrenSelected = false;
		if (subRow.subRows && subRow.subRows.length) {
			const subRowChildrenSelected = isSubRowSelected(subRow, selection);
			if (subRowChildrenSelected === "all") someSelected = true;
			else if (subRowChildrenSelected === "some") {
				someSelected = true;
				allChildrenSelected = false;
			} else allChildrenSelected = false;
		}
	});
	return allChildrenSelected ? "all" : someSelected ? "some" : false;
}
const reSplitAlphaNumeric = /([0-9]+)/gm;
const alphanumeric = (rowA, rowB, columnId) => {
	return compareAlphanumeric(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
const alphanumericCaseSensitive = (rowA, rowB, columnId) => {
	return compareAlphanumeric(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
const text = (rowA, rowB, columnId) => {
	return compareBasic(toString(rowA.getValue(columnId)).toLowerCase(), toString(rowB.getValue(columnId)).toLowerCase());
};
const textCaseSensitive = (rowA, rowB, columnId) => {
	return compareBasic(toString(rowA.getValue(columnId)), toString(rowB.getValue(columnId)));
};
const datetime = (rowA, rowB, columnId) => {
	const a = rowA.getValue(columnId);
	const b = rowB.getValue(columnId);
	return a > b ? 1 : a < b ? -1 : 0;
};
const basic = (rowA, rowB, columnId) => {
	return compareBasic(rowA.getValue(columnId), rowB.getValue(columnId));
};
function compareBasic(a, b) {
	return a === b ? 0 : a > b ? 1 : -1;
}
function toString(a) {
	if (typeof a === "number") {
		if (isNaN(a) || a === Infinity || a === -Infinity) return "";
		return String(a);
	}
	if (typeof a === "string") return a;
	return "";
}
function compareAlphanumeric(aStr, bStr) {
	const a = aStr.split(reSplitAlphaNumeric).filter(Boolean);
	const b = bStr.split(reSplitAlphaNumeric).filter(Boolean);
	while (a.length && b.length) {
		const aa = a.shift();
		const bb = b.shift();
		const an = parseInt(aa, 10);
		const bn = parseInt(bb, 10);
		const combo = [an, bn].sort();
		if (isNaN(combo[0])) {
			if (aa > bb) return 1;
			if (bb > aa) return -1;
			continue;
		}
		if (isNaN(combo[1])) return isNaN(an) ? -1 : 1;
		if (an > bn) return 1;
		if (bn > an) return -1;
	}
	return a.length - b.length;
}
const sortingFns = {
	alphanumeric,
	alphanumericCaseSensitive,
	text,
	textCaseSensitive,
	datetime,
	basic
};
const RowSorting = {
	getInitialState: (state) => {
		return {
			sorting: [],
			...state
		};
	},
	getDefaultColumnDef: () => {
		return {
			sortingFn: "auto",
			sortUndefined: 1
		};
	},
	getDefaultOptions: (table$1) => {
		return {
			onSortingChange: makeStateUpdater("sorting", table$1),
			isMultiSortEvent: (e) => {
				return e.shiftKey;
			}
		};
	},
	createColumn: (column, table$1) => {
		column.getAutoSortingFn = () => {
			const firstRows = table$1.getFilteredRowModel().flatRows.slice(10);
			let isString = false;
			for (const row of firstRows) {
				const value = row == null ? void 0 : row.getValue(column.id);
				if (Object.prototype.toString.call(value) === "[object Date]") return sortingFns.datetime;
				if (typeof value === "string") {
					isString = true;
					if (value.split(reSplitAlphaNumeric).length > 1) return sortingFns.alphanumeric;
				}
			}
			if (isString) return sortingFns.text;
			return sortingFns.basic;
		};
		column.getAutoSortDir = () => {
			const firstRow = table$1.getFilteredRowModel().flatRows[0];
			const value = firstRow == null ? void 0 : firstRow.getValue(column.id);
			if (typeof value === "string") return "asc";
			return "desc";
		};
		column.getSortingFn = () => {
			var _table$options$sortin, _table$options$sortin2;
			if (!column) throw new Error();
			return isFunction(column.columnDef.sortingFn) ? column.columnDef.sortingFn : column.columnDef.sortingFn === "auto" ? column.getAutoSortingFn() : (_table$options$sortin = (_table$options$sortin2 = table$1.options.sortingFns) == null ? void 0 : _table$options$sortin2[column.columnDef.sortingFn]) != null ? _table$options$sortin : sortingFns[column.columnDef.sortingFn];
		};
		column.toggleSorting = (desc, multi) => {
			const nextSortingOrder = column.getNextSortingOrder();
			const hasManualValue = typeof desc !== "undefined" && desc !== null;
			table$1.setSorting((old) => {
				const existingSorting = old == null ? void 0 : old.find((d) => d.id === column.id);
				const existingIndex = old == null ? void 0 : old.findIndex((d) => d.id === column.id);
				let newSorting = [];
				let sortAction;
				let nextDesc = hasManualValue ? desc : nextSortingOrder === "desc";
				if (old != null && old.length && column.getCanMultiSort() && multi) if (existingSorting) sortAction = "toggle";
				else sortAction = "add";
				else if (old != null && old.length && existingIndex !== old.length - 1) sortAction = "replace";
				else if (existingSorting) sortAction = "toggle";
				else sortAction = "replace";
				if (sortAction === "toggle") {
					if (!hasManualValue) {
						if (!nextSortingOrder) sortAction = "remove";
					}
				}
				if (sortAction === "add") {
					var _table$options$maxMul;
					newSorting = [...old, {
						id: column.id,
						desc: nextDesc
					}];
					newSorting.splice(0, newSorting.length - ((_table$options$maxMul = table$1.options.maxMultiSortColCount) != null ? _table$options$maxMul : Number.MAX_SAFE_INTEGER));
				} else if (sortAction === "toggle") newSorting = old.map((d) => {
					if (d.id === column.id) return {
						...d,
						desc: nextDesc
					};
					return d;
				});
				else if (sortAction === "remove") newSorting = old.filter((d) => d.id !== column.id);
				else newSorting = [{
					id: column.id,
					desc: nextDesc
				}];
				return newSorting;
			});
		};
		column.getFirstSortDir = () => {
			var _ref, _column$columnDef$sor;
			const sortDescFirst = (_ref = (_column$columnDef$sor = column.columnDef.sortDescFirst) != null ? _column$columnDef$sor : table$1.options.sortDescFirst) != null ? _ref : column.getAutoSortDir() === "desc";
			return sortDescFirst ? "desc" : "asc";
		};
		column.getNextSortingOrder = (multi) => {
			var _table$options$enable, _table$options$enable2;
			const firstSortDirection = column.getFirstSortDir();
			const isSorted = column.getIsSorted();
			if (!isSorted) return firstSortDirection;
			if (isSorted !== firstSortDirection && ((_table$options$enable = table$1.options.enableSortingRemoval) != null ? _table$options$enable : true) && (multi ? (_table$options$enable2 = table$1.options.enableMultiRemove) != null ? _table$options$enable2 : true : true)) return false;
			return isSorted === "desc" ? "asc" : "desc";
		};
		column.getCanSort = () => {
			var _column$columnDef$ena, _table$options$enable3;
			return ((_column$columnDef$ena = column.columnDef.enableSorting) != null ? _column$columnDef$ena : true) && ((_table$options$enable3 = table$1.options.enableSorting) != null ? _table$options$enable3 : true) && !!column.accessorFn;
		};
		column.getCanMultiSort = () => {
			var _ref2, _column$columnDef$ena2;
			return (_ref2 = (_column$columnDef$ena2 = column.columnDef.enableMultiSort) != null ? _column$columnDef$ena2 : table$1.options.enableMultiSort) != null ? _ref2 : !!column.accessorFn;
		};
		column.getIsSorted = () => {
			var _table$getState$sorti;
			const columnSort = (_table$getState$sorti = table$1.getState().sorting) == null ? void 0 : _table$getState$sorti.find((d) => d.id === column.id);
			return !columnSort ? false : columnSort.desc ? "desc" : "asc";
		};
		column.getSortIndex = () => {
			var _table$getState$sorti2, _table$getState$sorti3;
			return (_table$getState$sorti2 = (_table$getState$sorti3 = table$1.getState().sorting) == null ? void 0 : _table$getState$sorti3.findIndex((d) => d.id === column.id)) != null ? _table$getState$sorti2 : -1;
		};
		column.clearSorting = () => {
			table$1.setSorting((old) => old != null && old.length ? old.filter((d) => d.id !== column.id) : []);
		};
		column.getToggleSortingHandler = () => {
			const canSort = column.getCanSort();
			return (e) => {
				if (!canSort) return;
				e.persist == null || e.persist();
				column.toggleSorting == null || column.toggleSorting(void 0, column.getCanMultiSort() ? table$1.options.isMultiSortEvent == null ? void 0 : table$1.options.isMultiSortEvent(e) : false);
			};
		};
	},
	createTable: (table$1) => {
		table$1.setSorting = (updater) => table$1.options.onSortingChange == null ? void 0 : table$1.options.onSortingChange(updater);
		table$1.resetSorting = (defaultState) => {
			var _table$initialState$s, _table$initialState;
			table$1.setSorting(defaultState ? [] : (_table$initialState$s = (_table$initialState = table$1.initialState) == null ? void 0 : _table$initialState.sorting) != null ? _table$initialState$s : []);
		};
		table$1.getPreSortedRowModel = () => table$1.getGroupedRowModel();
		table$1.getSortedRowModel = () => {
			if (!table$1._getSortedRowModel && table$1.options.getSortedRowModel) table$1._getSortedRowModel = table$1.options.getSortedRowModel(table$1);
			if (table$1.options.manualSorting || !table$1._getSortedRowModel) return table$1.getPreSortedRowModel();
			return table$1._getSortedRowModel();
		};
	}
};
const builtInFeatures = [
	Headers,
	ColumnVisibility,
	ColumnOrdering,
	ColumnPinning,
	ColumnFaceting,
	ColumnFiltering,
	GlobalFaceting,
	GlobalFiltering,
	RowSorting,
	ColumnGrouping,
	RowExpanding,
	RowPagination,
	RowPinning,
	RowSelection,
	ColumnSizing
];
function createTable(options) {
	var _options$_features, _options$initialState;
	if (process.env.NODE_ENV !== "production" && (options.debugAll || options.debugTable)) console.info("Creating Table Instance...");
	const _features = [...builtInFeatures, ...(_options$_features = options._features) != null ? _options$_features : []];
	let table$1 = { _features };
	const defaultOptions = table$1._features.reduce((obj, feature) => {
		return Object.assign(obj, feature.getDefaultOptions == null ? void 0 : feature.getDefaultOptions(table$1));
	}, {});
	const mergeOptions = (options$1) => {
		if (table$1.options.mergeOptions) return table$1.options.mergeOptions(defaultOptions, options$1);
		return {
			...defaultOptions,
			...options$1
		};
	};
	const coreInitialState = {};
	let initialState = {
		...coreInitialState,
		...(_options$initialState = options.initialState) != null ? _options$initialState : {}
	};
	table$1._features.forEach((feature) => {
		var _feature$getInitialSt;
		initialState = (_feature$getInitialSt = feature.getInitialState == null ? void 0 : feature.getInitialState(initialState)) != null ? _feature$getInitialSt : initialState;
	});
	const queued = [];
	let queuedTimeout = false;
	const coreInstance = {
		_features,
		options: {
			...defaultOptions,
			...options
		},
		initialState,
		_queue: (cb) => {
			queued.push(cb);
			if (!queuedTimeout) {
				queuedTimeout = true;
				Promise.resolve().then(() => {
					while (queued.length) queued.shift()();
					queuedTimeout = false;
				}).catch((error) => setTimeout(() => {
					throw error;
				}));
			}
		},
		reset: () => {
			table$1.setState(table$1.initialState);
		},
		setOptions: (updater) => {
			const newOptions = functionalUpdate(updater, table$1.options);
			table$1.options = mergeOptions(newOptions);
		},
		getState: () => {
			return table$1.options.state;
		},
		setState: (updater) => {
			table$1.options.onStateChange == null || table$1.options.onStateChange(updater);
		},
		_getRowId: (row, index, parent) => {
			var _table$options$getRow;
			return (_table$options$getRow = table$1.options.getRowId == null ? void 0 : table$1.options.getRowId(row, index, parent)) != null ? _table$options$getRow : `${parent ? [parent.id, index].join(".") : index}`;
		},
		getCoreRowModel: () => {
			if (!table$1._getCoreRowModel) table$1._getCoreRowModel = table$1.options.getCoreRowModel(table$1);
			return table$1._getCoreRowModel();
		},
		getRowModel: () => {
			return table$1.getPaginationRowModel();
		},
		getRow: (id, searchAll) => {
			let row = (searchAll ? table$1.getPrePaginationRowModel() : table$1.getRowModel()).rowsById[id];
			if (!row) {
				row = table$1.getCoreRowModel().rowsById[id];
				if (!row) {
					if (process.env.NODE_ENV !== "production") throw new Error(`getRow could not find row with ID: ${id}`);
					throw new Error();
				}
			}
			return row;
		},
		_getDefaultColumnDef: memo(() => [table$1.options.defaultColumn], (defaultColumn) => {
			var _defaultColumn;
			defaultColumn = (_defaultColumn = defaultColumn) != null ? _defaultColumn : {};
			return {
				header: (props) => {
					const resolvedColumnDef = props.header.column.columnDef;
					if (resolvedColumnDef.accessorKey) return resolvedColumnDef.accessorKey;
					if (resolvedColumnDef.accessorFn) return resolvedColumnDef.id;
					return null;
				},
				cell: (props) => {
					var _props$renderValue$to, _props$renderValue;
					return (_props$renderValue$to = (_props$renderValue = props.renderValue()) == null || _props$renderValue.toString == null ? void 0 : _props$renderValue.toString()) != null ? _props$renderValue$to : null;
				},
				...table$1._features.reduce((obj, feature) => {
					return Object.assign(obj, feature.getDefaultColumnDef == null ? void 0 : feature.getDefaultColumnDef());
				}, {}),
				...defaultColumn
			};
		}, getMemoOptions(options, "debugColumns", "_getDefaultColumnDef")),
		_getColumnDefs: () => table$1.options.columns,
		getAllColumns: memo(() => [table$1._getColumnDefs()], (columnDefs) => {
			const recurseColumns = function(columnDefs$1, parent, depth) {
				if (depth === void 0) depth = 0;
				return columnDefs$1.map((columnDef) => {
					const column = createColumn(table$1, columnDef, depth, parent);
					const groupingColumnDef = columnDef;
					column.columns = groupingColumnDef.columns ? recurseColumns(groupingColumnDef.columns, column, depth + 1) : [];
					return column;
				});
			};
			return recurseColumns(columnDefs);
		}, getMemoOptions(options, "debugColumns", "getAllColumns")),
		getAllFlatColumns: memo(() => [table$1.getAllColumns()], (allColumns) => {
			return allColumns.flatMap((column) => {
				return column.getFlatColumns();
			});
		}, getMemoOptions(options, "debugColumns", "getAllFlatColumns")),
		_getAllFlatColumnsById: memo(() => [table$1.getAllFlatColumns()], (flatColumns) => {
			return flatColumns.reduce((acc, column) => {
				acc[column.id] = column;
				return acc;
			}, {});
		}, getMemoOptions(options, "debugColumns", "getAllFlatColumnsById")),
		getAllLeafColumns: memo(() => [table$1.getAllColumns(), table$1._getOrderColumnsFn()], (allColumns, orderColumns$1) => {
			let leafColumns = allColumns.flatMap((column) => column.getLeafColumns());
			return orderColumns$1(leafColumns);
		}, getMemoOptions(options, "debugColumns", "getAllLeafColumns")),
		getColumn: (columnId) => {
			const column = table$1._getAllFlatColumnsById()[columnId];
			if (process.env.NODE_ENV !== "production" && !column) console.error(`[Table] Column with id '${columnId}' does not exist.`);
			return column;
		}
	};
	Object.assign(table$1, coreInstance);
	for (let index = 0; index < table$1._features.length; index++) {
		const feature = table$1._features[index];
		feature == null || feature.createTable == null || feature.createTable(table$1);
	}
	return table$1;
}
function getCoreRowModel() {
	return (table$1) => memo(() => [table$1.options.data], (data) => {
		const rowModel = {
			rows: [],
			flatRows: [],
			rowsById: {}
		};
		const accessRows = function(originalRows, depth, parentRow) {
			if (depth === void 0) depth = 0;
			const rows = [];
			for (let i = 0; i < originalRows.length; i++) {
				const row = createRow(table$1, table$1._getRowId(originalRows[i], i, parentRow), originalRows[i], i, depth, void 0, parentRow == null ? void 0 : parentRow.id);
				rowModel.flatRows.push(row);
				rowModel.rowsById[row.id] = row;
				rows.push(row);
				if (table$1.options.getSubRows) {
					var _row$originalSubRows;
					row.originalSubRows = table$1.options.getSubRows(originalRows[i], i);
					if ((_row$originalSubRows = row.originalSubRows) != null && _row$originalSubRows.length) row.subRows = accessRows(row.originalSubRows, depth + 1, row);
				}
			}
			return rows;
		};
		rowModel.rows = accessRows(data);
		return rowModel;
	}, getMemoOptions(table$1.options, "debugTable", "getRowModel", () => table$1._autoResetPageIndex()));
}
function filterRows(rows, filterRowImpl, table$1) {
	if (table$1.options.filterFromLeafRows) return filterRowModelFromLeafs(rows, filterRowImpl, table$1);
	return filterRowModelFromRoot(rows, filterRowImpl, table$1);
}
function filterRowModelFromLeafs(rowsToFilter, filterRow, table$1) {
	var _table$options$maxLea;
	const newFilteredFlatRows = [];
	const newFilteredRowsById = {};
	const maxDepth = (_table$options$maxLea = table$1.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea : 100;
	const recurseFilterRows = function(rowsToFilter$1, depth) {
		if (depth === void 0) depth = 0;
		const rows = [];
		for (let i = 0; i < rowsToFilter$1.length; i++) {
			var _row$subRows;
			let row = rowsToFilter$1[i];
			const newRow = createRow(table$1, row.id, row.original, row.index, row.depth, void 0, row.parentId);
			newRow.columnFilters = row.columnFilters;
			if ((_row$subRows = row.subRows) != null && _row$subRows.length && depth < maxDepth) {
				newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
				row = newRow;
				if (filterRow(row) && !newRow.subRows.length) {
					rows.push(row);
					newFilteredRowsById[row.id] = row;
					newFilteredFlatRows.push(row);
					continue;
				}
				if (filterRow(row) || newRow.subRows.length) {
					rows.push(row);
					newFilteredRowsById[row.id] = row;
					newFilteredFlatRows.push(row);
					continue;
				}
			} else {
				row = newRow;
				if (filterRow(row)) {
					rows.push(row);
					newFilteredRowsById[row.id] = row;
					newFilteredFlatRows.push(row);
				}
			}
		}
		return rows;
	};
	return {
		rows: recurseFilterRows(rowsToFilter),
		flatRows: newFilteredFlatRows,
		rowsById: newFilteredRowsById
	};
}
function filterRowModelFromRoot(rowsToFilter, filterRow, table$1) {
	var _table$options$maxLea2;
	const newFilteredFlatRows = [];
	const newFilteredRowsById = {};
	const maxDepth = (_table$options$maxLea2 = table$1.options.maxLeafRowFilterDepth) != null ? _table$options$maxLea2 : 100;
	const recurseFilterRows = function(rowsToFilter$1, depth) {
		if (depth === void 0) depth = 0;
		const rows = [];
		for (let i = 0; i < rowsToFilter$1.length; i++) {
			let row = rowsToFilter$1[i];
			const pass = filterRow(row);
			if (pass) {
				var _row$subRows2;
				if ((_row$subRows2 = row.subRows) != null && _row$subRows2.length && depth < maxDepth) {
					const newRow = createRow(table$1, row.id, row.original, row.index, row.depth, void 0, row.parentId);
					newRow.subRows = recurseFilterRows(row.subRows, depth + 1);
					row = newRow;
				}
				rows.push(row);
				newFilteredFlatRows.push(row);
				newFilteredRowsById[row.id] = row;
			}
		}
		return rows;
	};
	return {
		rows: recurseFilterRows(rowsToFilter),
		flatRows: newFilteredFlatRows,
		rowsById: newFilteredRowsById
	};
}
function getFilteredRowModel() {
	return (table$1) => memo(() => [
		table$1.getPreFilteredRowModel(),
		table$1.getState().columnFilters,
		table$1.getState().globalFilter
	], (rowModel, columnFilters, globalFilter) => {
		if (!rowModel.rows.length || !(columnFilters != null && columnFilters.length) && !globalFilter) {
			for (let i = 0; i < rowModel.flatRows.length; i++) {
				rowModel.flatRows[i].columnFilters = {};
				rowModel.flatRows[i].columnFiltersMeta = {};
			}
			return rowModel;
		}
		const resolvedColumnFilters = [];
		const resolvedGlobalFilters = [];
		(columnFilters != null ? columnFilters : []).forEach((d) => {
			var _filterFn$resolveFilt;
			const column = table$1.getColumn(d.id);
			if (!column) return;
			const filterFn = column.getFilterFn();
			if (!filterFn) {
				if (process.env.NODE_ENV !== "production") console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${column.id}.`);
				return;
			}
			resolvedColumnFilters.push({
				id: d.id,
				filterFn,
				resolvedValue: (_filterFn$resolveFilt = filterFn.resolveFilterValue == null ? void 0 : filterFn.resolveFilterValue(d.value)) != null ? _filterFn$resolveFilt : d.value
			});
		});
		const filterableIds = (columnFilters != null ? columnFilters : []).map((d) => d.id);
		const globalFilterFn = table$1.getGlobalFilterFn();
		const globallyFilterableColumns = table$1.getAllLeafColumns().filter((column) => column.getCanGlobalFilter());
		if (globalFilter && globalFilterFn && globallyFilterableColumns.length) {
			filterableIds.push("__global__");
			globallyFilterableColumns.forEach((column) => {
				var _globalFilterFn$resol;
				resolvedGlobalFilters.push({
					id: column.id,
					filterFn: globalFilterFn,
					resolvedValue: (_globalFilterFn$resol = globalFilterFn.resolveFilterValue == null ? void 0 : globalFilterFn.resolveFilterValue(globalFilter)) != null ? _globalFilterFn$resol : globalFilter
				});
			});
		}
		let currentColumnFilter;
		let currentGlobalFilter;
		for (let j = 0; j < rowModel.flatRows.length; j++) {
			const row = rowModel.flatRows[j];
			row.columnFilters = {};
			if (resolvedColumnFilters.length) for (let i = 0; i < resolvedColumnFilters.length; i++) {
				currentColumnFilter = resolvedColumnFilters[i];
				const id = currentColumnFilter.id;
				row.columnFilters[id] = currentColumnFilter.filterFn(row, id, currentColumnFilter.resolvedValue, (filterMeta) => {
					row.columnFiltersMeta[id] = filterMeta;
				});
			}
			if (resolvedGlobalFilters.length) {
				for (let i = 0; i < resolvedGlobalFilters.length; i++) {
					currentGlobalFilter = resolvedGlobalFilters[i];
					const id = currentGlobalFilter.id;
					if (currentGlobalFilter.filterFn(row, id, currentGlobalFilter.resolvedValue, (filterMeta) => {
						row.columnFiltersMeta[id] = filterMeta;
					})) {
						row.columnFilters.__global__ = true;
						break;
					}
				}
				if (row.columnFilters.__global__ !== true) row.columnFilters.__global__ = false;
			}
		}
		const filterRowsImpl = (row) => {
			for (let i = 0; i < filterableIds.length; i++) if (row.columnFilters[filterableIds[i]] === false) return false;
			return true;
		};
		return filterRows(rowModel.rows, filterRowsImpl, table$1);
	}, getMemoOptions(table$1.options, "debugTable", "getFilteredRowModel", () => table$1._autoResetPageIndex()));
}
function getSortedRowModel() {
	return (table$1) => memo(() => [table$1.getState().sorting, table$1.getPreSortedRowModel()], (sorting, rowModel) => {
		if (!rowModel.rows.length || !(sorting != null && sorting.length)) return rowModel;
		const sortingState = table$1.getState().sorting;
		const sortedFlatRows = [];
		const availableSorting = sortingState.filter((sort) => {
			var _table$getColumn;
			return (_table$getColumn = table$1.getColumn(sort.id)) == null ? void 0 : _table$getColumn.getCanSort();
		});
		const columnInfoById = {};
		availableSorting.forEach((sortEntry) => {
			const column = table$1.getColumn(sortEntry.id);
			if (!column) return;
			columnInfoById[sortEntry.id] = {
				sortUndefined: column.columnDef.sortUndefined,
				invertSorting: column.columnDef.invertSorting,
				sortingFn: column.getSortingFn()
			};
		});
		const sortData = (rows) => {
			const sortedData = rows.map((row) => ({ ...row }));
			sortedData.sort((rowA, rowB) => {
				for (let i = 0; i < availableSorting.length; i += 1) {
					var _sortEntry$desc;
					const sortEntry = availableSorting[i];
					const columnInfo = columnInfoById[sortEntry.id];
					const sortUndefined = columnInfo.sortUndefined;
					const isDesc = (_sortEntry$desc = sortEntry == null ? void 0 : sortEntry.desc) != null ? _sortEntry$desc : false;
					let sortInt = 0;
					if (sortUndefined) {
						const aValue = rowA.getValue(sortEntry.id);
						const bValue = rowB.getValue(sortEntry.id);
						const aUndefined = aValue === void 0;
						const bUndefined = bValue === void 0;
						if (aUndefined || bUndefined) {
							if (sortUndefined === "first") return aUndefined ? -1 : 1;
							if (sortUndefined === "last") return aUndefined ? 1 : -1;
							sortInt = aUndefined && bUndefined ? 0 : aUndefined ? sortUndefined : -sortUndefined;
						}
					}
					if (sortInt === 0) sortInt = columnInfo.sortingFn(rowA, rowB, sortEntry.id);
					if (sortInt !== 0) {
						if (isDesc) sortInt *= -1;
						if (columnInfo.invertSorting) sortInt *= -1;
						return sortInt;
					}
				}
				return rowA.index - rowB.index;
			});
			sortedData.forEach((row) => {
				var _row$subRows;
				sortedFlatRows.push(row);
				if ((_row$subRows = row.subRows) != null && _row$subRows.length) row.subRows = sortData(row.subRows);
			});
			return sortedData;
		};
		return {
			rows: sortData(rowModel.rows),
			flatRows: sortedFlatRows,
			rowsById: rowModel.rowsById
		};
	}, getMemoOptions(table$1.options, "debugTable", "getSortedRowModel", () => table$1._autoResetPageIndex()));
}

//#endregion
//#region node_modules/@tanstack/solid-table/build/lib/index.mjs
function flexRender(Comp, props) {
	if (!Comp) return null;
	if (typeof Comp === "function") return createComponent(Comp, props);
	return Comp;
}
function createSolidTable(options) {
	const resolvedOptions = mergeProps({
		state: {},
		onStateChange: () => {},
		renderFallbackValue: null,
		mergeOptions: (defaultOptions, options$1) => {
			return mergeProps(defaultOptions, options$1);
		}
	}, options);
	const table$1 = createTable(resolvedOptions);
	const [state, setState] = createStore(table$1.initialState);
	createComputed(() => {
		table$1.setOptions((prev) => {
			return mergeProps(prev, options, {
				state: mergeProps(state, options.state || {}),
				onStateChange: (updater) => {
					setState(updater);
					options.onStateChange == null || options.onStateChange(updater);
				}
			});
		});
	});
	return table$1;
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