import { useEffect, useState } from "react";
import { View, Image, TouchableOpacity,Text, FlatList, Alert } from "react-native";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { FilterStatus } from "@/types/FilterStatus";
import { Item } from "@/components/Item";
import { itemsStorage, ItemStorage } from "@/storage/itemsStorage";

import { styles } from "./styles";


const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export default function App(){

  const [filter, setFilter] = useState<FilterStatus>(FilterStatus.PENDING);
  const [description, setDescription] = useState<string>("")
  const [items, setItems] = useState<ItemStorage[]>([])

  async function handleAdd(){
    if(!description.trim()){
      return Alert.alert("Adicionar", "informe a descrião para adicionar.")
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING,
    }

    await itemsStorage.add(newItem)
    await itemsByStatus()

    setFilter(FilterStatus.PENDING)
    Alert.alert("Adicionado", `Adicionado ${description}`)
    setDescription("")
  }

  async function handleRemove(id: string){
    try {
      await itemsStorage.remove(id)
      await itemsByStatus()
      
    } catch (error) {
      console.log(error)
      Alert.alert("Remover", "Não foi possível remover.")
    }
  }

  async function itemsByStatus(){
    try{
      const response = await itemsStorage.getByStatus(filter)
      setItems(response)

    }catch(error){
      console.log(error)
      Alert.alert("Error", "It`s not possible filter")
    }
  }

  async function onClear(){
    try {
      await itemsStorage.clear()
      setItems([])

    } catch (error) {
      console.log(error)
      Alert.alert("Erro", "Não foi possível remover todos os items")
    }
  }

  async function handleClear(){
    Alert.alert("Limpar", "Deseja remover todos?", [
      { text: "Não", style: "cancel" },
      { text: "Sim", onPress: ()=> onClear() }
    ])
  }

  useEffect(()=> {
    itemsByStatus()
  },[filter])

  return(
    <View style={ styles.container}>
      <Image style={ styles.icon} source={require("@/assets/logo.png")}/>

      <View style={ styles.form}>
        <Input 
          placeholder="O que você precisa comprar"
          onChangeText={setDescription}
          value={description}
        />
        <Button 
          title="Adicionar" 
          onPress={handleAdd}
        />
      </View>

      <View style={ styles.content}>
        <View style={ styles.header}>
          {FILTER_STATUS.map((status)=> (
              <Filter 
                key={status} 
                status={status} 
                isActive={status === filter}
                onPress={()=> setFilter(status)}
              />
          ))}

          <TouchableOpacity 
            style={styles.clearButton}
            onPress={handleClear}
          >
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>

        <FlatList 
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item })=> (
            <Item 
              data={item}
              onStatus={ ()=> console.log("Muda o status")}
              onRemove={ ()=> handleRemove(item.id)}
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