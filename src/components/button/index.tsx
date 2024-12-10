import { colors } from "@/styles/colors"
import { ActivityIndicator, Text, TouchableOpacity } from "react-native"
import type { TextProps, TouchableOpacityProps } from "react-native"
import { s } from "./styles"

type ButtonProps = TouchableOpacityProps & {
  isLoading?: boolean
}

function Button({ children, style, isLoading = false, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[s.container, s.container]}
      activeOpacity={0.8}
      disabled={isLoading}
      {...rest}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.gray[100]} />
      ) : (
        children
      )}
    </TouchableOpacity>
  )
}

function Title({ children, style, ...rest }: TextProps) {
  return (
    <Text style={[s.title, style]} {...rest}>
      {children}
    </Text>
  )
}

function Icon() {
  
}

Button.Title = Title

export { Button }
