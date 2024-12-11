import { IconMapPin, IconPhone, IconTicket } from "@tabler/icons-react-native"
import { Text, View } from "react-native"
import { Info } from "../info"
import { s } from "./styles"

type RulesType = {
  id: string
  description: string[]
}

export type DetailsProps = {
  name: string
  description: string
  address: string
  phone: string
  coupons: number
  rules: RulesType[]
}

type Props = {
  data: DetailsProps
}

export function Details({
  data: { name, description, address, phone, coupons, rules },
}: Props) {
  return (
    <View style={s.container}>
      <Text style={s.name}>{name}</Text>
      <Text style={s.description}>{description}</Text>

      <View style={s.group}>
        <Text style={s.title}>Informações</Text>
        <Info icon={IconTicket} description={`${coupons} cupons disponíveis`} />
        <Info icon={IconMapPin} description={address} />
        <Info icon={IconPhone} description={phone} />
      </View>

      <View style={s.group}>
        <Text style={s.title}>Regulamento</Text>
        {rules.map(rule => (
          <Text key={rule.id} style={s.rule}>
            {`\u2022 ${rule.description}`}
          </Text>
        ))}
      </View>
    </View>
  )
}
