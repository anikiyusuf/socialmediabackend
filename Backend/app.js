const express = require("express")
const router = require("./routes/userRouter")
const blogRouter = require("./routes/blogRouter")
//  const bodyParser = require("body-parser")
require("dotenv").config()

require('./db').connectToMongoDB()



const app = express();
const PORT = process.env.PORT

app.use(express.json())
app.use("/api/user", router)
app.use("/api/blog", blogRouter)


app.listen(PORT, () =>{
    console.log(`Server running on port localhost:${PORT}`)
} )




