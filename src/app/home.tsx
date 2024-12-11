import { Categories, type CategoriesType } from "@/components/categories"
import type { PlaceType } from "@/components/place"
import { Places } from "@/components/places"
import { api } from "@/services/api"
import { colors } from "@/styles/colors"
import { fontFamily } from "@/styles/font-family"
import { router } from "expo-router"
import { useEffect, useState } from "react"
import { Alert, Text, View } from "react-native"
import MapView, { Marker, Callout } from "react-native-maps"

type LocationType = {
  latitude: number
  longitude: number
}

type MarketsType = PlaceType & LocationType

const location: LocationType = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
}

export default function Home() {
  const [categories, setCategories] = useState<CategoriesType[]>([])
  const [categorySelected, setCategorySelected] = useState("")
  const [markets, setMarkets] = useState<MarketsType[]>([])

  // async function getCurrentLocation() {
  //   try {
  //     const { granted } = await Location.getForegroundPermissionsAsync()

  //     if (granted) {
  //       const {
  //         coords: { latitude, longitude },
  //       } = await Location.getCurrentPositionAsync()

  //       setLocation({ latitude, longitude })
  //     }
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

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
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: location.latitude,
            longitude: location.latitude,
          }}
        />
        {markets.map(item => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.latitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.medium,
                  }}
                >
                  {item.name}
                </Text>
                <Text
                  style={{
                    fontSize: 14,
                    color: colors.gray[600],
                    fontFamily: fontFamily.regular,
                  }}
                >
                  {item.address}
                </Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>
      <Places data={markets} />
    </View>
  )
}
