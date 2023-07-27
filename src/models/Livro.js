import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O titulo do livro `e obrigatorio."]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor(a) do(a) livro `e obrigatorio."]},
    editora: {
      type: String,
      required: [true, "A editora `e obrigatoria."],
      enum: {
        values: ["Casa do Codigo", "Alura"],
        message: "A editora {VALUE} nao `e um valor permitido."
      }
    },
    numeroDePaginas: {
      type: Number,
      min: [10, "O numero de paginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"],
      max: [5000, "O numero de paginas deve estar entre 10 e 5000. Valor fornecido: {VALUE}"]
    }
  }
);

const livros= mongoose.model("livros", livroSchema);
export default livros;