export interface ResizeOptions {
  cssVariable: string;
  minWidth?: number;
  maxWidth?: number;
  defaultWidth?: number;
  onResizeStart?: () => void;
  onResizeEnd?: () => void;
  onResize?: (widthPx: number) => void;
}

export const getRemInPixels = () => {
  const fontSize = getComputedStyle(document.documentElement).fontSize;
  return parseFloat(fontSize) || 16;
};

export const remToPx = (rem: number) => rem * getRemInPixels();
export const pxToRem = (px: number) => px / getRemInPixels();

export const getCurrentWidth = (
  cssVariable: string,
  defaultWidth: number = 320,
): number => {
  const cssValue = getComputedStyle(document.documentElement)
    .getPropertyValue(cssVariable)
    .trim();

  if (cssValue.endsWith("rem")) {
    return remToPx(parseFloat(cssValue));
  }
  if (cssValue.endsWith("px")) {
    return parseFloat(cssValue);
  }
  return defaultWidth;
};

export const updateWidthVariable = (
  cssVariable: string,
  widthPx: number,
) => {
  document.documentElement.style.setProperty(
    cssVariable,
    `${pxToRem(widthPx)}rem`,
  );
};

export const clampWidth = (
  widthPx: number,
  minWidth: number = 200,
  maxWidth: number = 600,
): number => {
  return Math.max(minWidth, Math.min(maxWidth, widthPx));
};