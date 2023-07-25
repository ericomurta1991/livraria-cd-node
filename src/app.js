import  express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import manipuladorDeErros from "./middlewares/manipuladorDeErros.js";

db.on("error", console.log.bind(console, "Erro de conexao"));
db.once("open", () => {
  console.log("Conexao com o banco feita com sucesso");
});

const app = express();
app.use(express.json());
routes(app);


// eslint-disable-next-line no-unused-vars
app.use(manipuladorDeErros);

export default app;