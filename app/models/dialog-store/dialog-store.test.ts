import { DialogStoreModel, DialogStore } from "./dialog-store"

test("can be created", () => {
  const instance: DialogStore = DialogStoreModel.create({})

  expect(instance).toBeTruthy()
})