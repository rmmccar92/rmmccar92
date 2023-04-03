// Packages
import React from "react";

// Local Imports
import {
  TEXT_COLORS,
  TEXT_FONT_FAMILIES,
  TEXT_SIZES,
  TEXT_WEIGHTS,
} from "./config";

interface ITextParameters {
  children?: React.ReactNode | string;
  className?: string;
  id?: string;
  color?: string;
  fontFamily?: string;
  size?: string;
  weight?: string;
}

/**
 * Simple text line with styles as props.
 *
 * @param {string} color Key for text color option.
 * @param {string} fontFamily Key for text font family option.
 * @param {string} size Key for text size option.
 * @param {string} weight Key for text weight option.
 * @returns {React.FC} Functional React component.
 */
const Text: React.FC<ITextParameters> = ({
  children = "",
  color = "default",
  fontFamily = "default",
  size = "default",
  weight = "default",
  ...props
}: ITextParameters) => {
  return (
    <p
      style={{
        // @ts-ignore
        color: TEXT_COLORS[color],
        // @ts-ignore
        fontFamily: TEXT_FONT_FAMILIES[fontFamily],
        // @ts-ignore
        fontSize: `${TEXT_SIZES[size]}px`,
        // @ts-ignore
        fontWeight: TEXT_WEIGHTS[weight],
        lineHeight: 1.5,
      }}
      {...props}
    >
      {children}
    </p>
  );
};

export default Text;
