import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O titulo do livro `e obrigatorio"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor(a) do(a) livro `e obrigatorio"]},
    editora: {
      type: String,
      required: [true, "A editora `e obrigatoria"]},
    numeroDePaginas: {type: Number}
  }
);

const livros= mongoose.model("livros", livroSchema);
export default livros;