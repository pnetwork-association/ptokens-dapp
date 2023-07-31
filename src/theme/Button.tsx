import { defineStyle, defineStyleConfig } from "@chakra-ui/styled-system"

const baseStyle = defineStyle({
  borderRadius: 0, // disable the border radius
  fontWeight: 'normal', // change the font weight to normal
  fontFamily: 'mono', // change the font family to monospaced
})

const sizes = {
  md: defineStyle({
    fontSize: "sm", // Change font size to sm (14px)
  }),
}

// Defining a custom variant
const chainSelect = defineStyle((props) => {
  const { colorScheme: c } = props
  return {
    bg: `${c}.500`,
    fontFamily: "sans-serif",
    fontWeight: "semibold",
    color: 'white',
    borderRadius: '3xl',
    // transition: 'transform 0.15s ease-out, background 0.15s ease-out',

    _hover: {
      transform: 'scale(1.05, 1.05)',
      bg: `${c}.600`,
    },
  }
})

export const buttonTheme = defineStyleConfig({
  baseStyle,
  sizes,
  variants: {
    ChainSelect: chainSelect,
  },
  defaultProps: {
    colorScheme: "purple", // set the default color scheme to purple
  },
})