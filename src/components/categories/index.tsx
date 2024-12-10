import { FlatList } from "react-native"
import { Category } from "../category"
import { s } from "./styles"

export type CategoriesType = {
  id: string
  name: string
}

type CategoriesProps = {
  data: CategoriesType[]
  categorySelected: string
  onSelect: (id: string) => void
}

export function Categories({
  data,
  onSelect,
  categorySelected,
}: CategoriesProps) {
  return (
    <FlatList
      data={data}
      keyExtractor={item => item.id}
      renderItem={({ item }) => (
        <Category
          name={item.name}
          iconId={item.id}
          onPress={() => onSelect(item.id)}
          isSelected={item.id === categorySelected}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={s.content}
      style={s.container}
    />
  )
}
