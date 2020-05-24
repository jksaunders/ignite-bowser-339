import React, { FunctionComponent as Component, useEffect } from "react"
import { View } from "react-native"
import { Text } from "../"
// import { observer } from "mobx-react-lite"
import { useStores } from "../../models"
import { errorSectionStyles as styles } from "./error-section.styles"
import { observer } from "mobx-react-lite"

export interface ErrorSectionProps {}

/**
 * This is a React functional component, ready to
 *
 * Component description here for TypeScript tips.
 */
export const ErrorSection: Component<ErrorSectionProps> = observer(props => {
  const { dialogStore } = useStores()

  useEffect(() => {
    if (dialogStore.dialog) {
      setTimeout(() => {
        dialogStore.setDialog(undefined)
      }, 2000)
    }
  }, [dialogStore.dialog])

  return (
    <View style={styles.WRAPPER}>
      {dialogStore.dialog && (
        <Text>{dialogStore.dialog}</Text>
      )}
    </View>
  )
})
