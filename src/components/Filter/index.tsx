import { 
  TouchableOpacity,TouchableOpacityProps,
  Text, StyleSheet 
} from "react-native";

import { FilterStatus } from "@/types/FilterStatus";
import { StatusIcon } from "../FilterStaus";

type Props = TouchableOpacityProps & {
  status: FilterStatus,
  isActive: boolean,
}

export function Filter({ status, isActive, ...rest }: Props){
  return(
    <TouchableOpacity
     style= { [styles.container, { opacity: isActive ? 1 : 0.5 }]}
     activeOpacity={0.8}
     {...rest}
    >
      <StatusIcon status={status}/>

      <Text style= { styles.title}>
        { status === FilterStatus.DONE ? "Comprados" : "Pendentes"}
      </Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  title: {
    fontSize: 12,
    fontWeight: 600,
  }
})