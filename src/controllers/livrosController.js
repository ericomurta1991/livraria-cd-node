import livros from "../models/Livro.js";

class LivroController {

  static listarLivros =  async (req, res) =>{
    try{
      const livrosResultado = await livros.find()
        .populate("autor");
      res.status(200).json(livrosResultado);
    }catch (err){
      res.status(500).json(err);
    }
  };

  static listarLivroPorId = async(req, res) => {
        
    try{
      const {id}  = req.params;
      const livroPorId = await livros.findById(id, req.body)
        .populate("autor", "nome");
      res.status(200).send(livroPorId);

    } catch (err){
      res.status(400).send({message: `${err.message} - erro ao buscar o id do livro`});
    }
  };

  static cadastrarLivros = async (req, res) => {
    try{
      let livro = new livros(req.body);
      await livro.save(); 
      res.status(201).send(livro.toJSON());
    } catch(err) {
      res.status(501).send({message: `${err.message} - erro ao cadastrar livro`});
    }

            
  };

  static atualizarLivro = async (req, res) => {
    try{
      const {id} = req.params;
      const newBook = await livros.findByIdAndUpdate(id, req.body,{
        new: true
      });
      res.status(200).json(newBook);
    }catch(err){
      res.status(500).json({ err: err.message });   
    }
  };

  static excluirLivro = async (req, res) => {
    try{
      const {id} = req.params;
      await livros.findByIdAndDelete(id);
      res.status(200).send({message: "Livro removido com sucesso"});
    }catch (err){ 
      res.status(500).send({message: err.message});
    }
        
  };

  static listarLivroPorEditora = async(req, res) => {
    try{
      const editora = req.query.editora;
      const livroPorEditora = await livros.find({"editora": editora})
        .populate("autor", "nome");
      res.status(200).send(livroPorEditora);
    } catch(err){
      res.status(400).send({message: `${err.message} - editora nao encontrada`});
    }
  };
}

export default LivroController;