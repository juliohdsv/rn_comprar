import { 
  TouchableOpacity, 
  TouchableOpacityProps,
  Text, 
  StyleSheet 
} from "react-native";

type Props = TouchableOpacityProps & {
  title: string
}

export function Button({title, ...rest}: Props){
  return(
    <TouchableOpacity 
      style={styles.container}
      activeOpacity={0.8}
      {...rest}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c46b1",
    height: 48,
    width: "100%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },

  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
  },
})