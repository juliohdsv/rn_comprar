import { View, Image, TouchableOpacity,Text, FlatList } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];
const ITEMS = [
   {
    id: "1",
    status: FilterStatus.DONE,
    description: "1 pacote de café"
  },
  {
    id: "2",
    status: FilterStatus.PENDING,
    description: "3 pacotes de macarrão"
  },
  {
    id: "3",
    status: FilterStatus.PENDING,
    description: "3 cebolas"
  },
]

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

        <FlatList 
          data={ITEMS}
          keyExtractor={(item) => item.id}
          renderItem={({ item })=> (
            <Item 
              data={item}
              onStatus={ ()=> console.log("Muda o status")}
              onRemove={ ()=> console.log("Remove o item")}
            />
          )}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={()=> <View style={styles.separator}/>}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={()=> <Text style={styles.empty}>Nenhum texto aqui.</Text>}
        />

      </View>
    </View>
  )
}