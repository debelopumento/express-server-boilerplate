const express = require("express")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const AnyModel = require("./any-entity/model")

mongoose.Promise = global.Promise

console.log("DATABASE_URL: ", process.env.DATABASE_URL)

const app = express()
app.use(bodyParser.json())

app.get("/", async (req, res) => {
  const results = await AnyModel.find()
  console.log(2020, results)
  res.json({
    foo: "bar",
  })
})

app.use("*", (req, res) => {
  res.status(404).json({ message: "Not Found" })
})

let server

function runServer(
  databaseUrl = process.env.DATABASE_URL,
  port = process.env.PORT || 3000,
) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, (err) => {
      if (err) {
        return reject(err)
      }
      server = app
        .listen(port, () => {
          console.log(`Your app is listening on port ${port}`)
          resolve()
        })
        .on("error", (err) => {
          mongoose.disconnect()
          reject(err)
        })
    })
  })
}
function closeServer() {
  return mongoose.disconnect().then(() => {
    return new Promise((resolve, reject) => {
      console.log("Closing server")
      server.close((err) => {
        if (err) {
          return reject(err)
        }
        resolve()
      })
    })
  })
}

if (require.main === module) {
  runServer().catch((err) => console.error(err))
}

module.exports = { app, runServer, closeServer }
