import { View, Image } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";

export default function App(){
  return(
    <View style={ styles.container}>
      <Image style={ styles.icon} source={require("@/assets/logo.png")}/>

      <View style={ styles.form}>
        <Input placeholder="O que você precisa comprar"/>
        <Button title="Entrar"/>
      </View>

      <View style= { styles.content}>
        <Filter status={FilterStatus.DONE} isActive/>
        <Filter status={FilterStatus.PEDDING} isActive={false}/>
      </View>
    </View>
  )
}