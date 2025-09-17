import { View, Image, TouchableOpacity,Text } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PEDDING, FilterStatus.DONE];

export default function App(){
  return(
    <View style={ styles.container}>
      <Image style={ styles.icon} source={require("@/assets/logo.png")}/>

      <View style={ styles.form}>
        <Input placeholder="O que você precisa comprar"/>
        <Button title="Entrar"/>
      </View>

      <View style={ styles.content}>
        <View style={ styles.header}>
          {FILTER_STATUS.map((status)=> (
              <Filter key={status} status={status} isActive/>
          ))}

          <TouchableOpacity style={styles.clearButton}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}