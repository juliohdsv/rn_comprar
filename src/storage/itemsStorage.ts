import AsyncStorage from "@react-native-async-storage/async-storage"
import { FilterStatus } from "@/types/FilterStatus"

const ITEMS_STORAGE_KEY = "@comprar:items"

export type ItemStorage = {
  id: string
  status: FilterStatus
  description: string
}

async function get(): Promise<ItemStorage[]> {
  try {
    const storage = await AsyncStorage.getItem(ITEMS_STORAGE_KEY)

    return storage ? JSON.parse(storage) : []
  } catch (error) {
    throw new Error("GET_ITEMS: " + error)
  }
}

async function getByStatus(status: FilterStatus): Promise<ItemsStorage[]> {
  const items = await get()
  return items.filter((item) => item.status === status)
}

async function save(items: ItemStorage[]): Promise<void>{
  try {   
    await AsyncStorage.setItem(ITEMS_STORAGE_KEY, JSON.stringify(items))
  } catch (error) {
    throw new Error("SAVE_ITEMS: " + error)
  }
}

async function add(newItem: ItemStorage): Promise<ItemStorage[]>{
  try {   
    const items = await get()
    const updatedItems = [...items, newItem]
    await save(updatedItems)

    return updatedItems

  } catch (error) {
    throw new Error("ADD_ITEMS: " + error)
  }
}

async function remove(id: string): Promise<void>{
  const items = await get()
  const updatedItems = await items.filter((item)=> item.id !== id)

  await save(updatedItems)
}

async function clear(): Promise<void>{
  try {
    await AsyncStorage.removeItem(ITEMS_STORAGE_KEY)

  } catch (error) {
    throw new Error("CLEAR_ITEMS: " + error)
  }
}

export const itemsStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear
}