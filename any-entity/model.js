const mongoose = require("mongoose")

const anySchema = mongoose.Schema({
  id: String,
  foo: String,
  any: {},
})

anySchema.methods.apiRepr = () => {
  return {
    id: this._id,
    foo: this.foo,
    any: {},
  }
}

module.exports = mongoose.model(
  "AnyModel",
  anySchema,
  "anyCollectionName", // collectionName
)
