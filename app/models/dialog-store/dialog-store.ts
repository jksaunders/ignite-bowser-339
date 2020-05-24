import { Instance, SnapshotOut, types, flow } from "mobx-state-tree"
import { withEnvironment } from "../extensions/with-environment"

/**
 * Model description here for TypeScript hints.
 */
export const DialogStoreModel = types
  .model("DialogStore")
  .props({
    dialog: types.maybe(types.string),
  })
  .extend(withEnvironment)
  .views(self => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions(self => ({
    setDialog: flow(function * (dialog) {
      self.dialog = dialog
    }),
  }))
  .actions(self => ({
    initializeStore: flow(function * () {
      self.environment.setDialog = dialog => self.setDialog(dialog)
    }),
  }))

/**
  * Un-comment the following to omit model attributes from your snapshots (and from async storage).
  * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

  * Note that you'll need to import `omit` from ramda, which is already included in the project!
  *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
  */

type DialogStoreType = Instance<typeof DialogStoreModel>
export interface DialogStore extends DialogStoreType {}
type DialogStoreSnapshotType = SnapshotOut<typeof DialogStoreModel>
export interface DialogStoreSnapshot extends DialogStoreSnapshotType {}
