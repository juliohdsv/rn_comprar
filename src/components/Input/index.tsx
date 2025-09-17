import { 
  TextInput,
  TextInputProps,
  StyleSheet 
} from "react-native";


export function Input({ ...rest }: TextInputProps){
  return (
    <TextInput 
      style={styles.container} 
      placeholderTextColor="#74798B"
      {...rest}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    height: 48,
    width: "100%",
    borderRadius: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#C3C5CB",
  },

  text: {
    color: "#fff",
    fontSize: 14,
    fontWeight: 600,
  },
})