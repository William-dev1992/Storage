import express from 'express';
import path from 'path';
import apiRouter from './routes/api.js'

const PORT = 4000;
const app = express();

app.use("/api", apiRouter)
app.use('/', express.static(path.join("../frontend/public")))

app.listen(PORT, () => {
  console.log("Server running on port", PORT)
})