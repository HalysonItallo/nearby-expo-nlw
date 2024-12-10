import { Categories, type CategoriesType } from "@/components/categories"
import type { PlaceType } from "@/components/place"
import { Places } from "@/components/places"
import { api } from "@/services/api"
import { useEffect, useState } from "react"
import { Alert, View } from "react-native"

type MarketsType = PlaceType & {}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesType[]>([])
  const [categorySelected, setCategorySelected] = useState("")
  const [markets, setMarkets] = useState<MarketsType[]>([])

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories")
      setCategories(data)
      setCategorySelected(data[0].id)
    } catch (error) {
      console.log(error)
      Alert.alert("Categorias", "Não foi possível carregar as categorias.")
    }
  }

  async function fetchMarkets() {
    try {
      if (!categorySelected) return

      const { data } = await api.get(`/markets/category/${categorySelected}`)
      setMarkets(data)
    } catch (error) {
      console.log(error)
      Alert.alert("Locais", "Não foi possível carregar os locais.")
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect(() => {
    fetchMarkets()
  }, [categorySelected])

  return (
    <View style={{ flex: 1 }}>
      <Categories
        data={categories}
        onSelect={setCategorySelected}
        categorySelected={categorySelected}
      />
      <Places data={markets} />
    </View>
  )
}
