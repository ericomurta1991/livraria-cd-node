import NaoEncontrado from "../errors/NaoEncontrado.js";
import { livros } from "../models/index.js";

class LivroController {

  static listarLivros =  async (req, res, next) =>{
    try{      
      const livrosResultado = await livros.find()
        .populate("autor");
      res.status(200).json(livrosResultado);
    }catch (erro){
      next(erro);
    }
  };

  static listarLivroPorId = async(req, res, next) => {
        
    try{
      const {id}  = req.params;
      const livroPorId = await livros.findById(id, req.body)
        .populate("autor", "nome");
      if(livroPorId !== null) {
        res.status(200).send(livroPorId);
      }else{
        next(NaoEncontrado("Id do Livro nao encontrado"));
      }
    } catch (erro){ 
      next(erro);
    }
  };

  static cadastrarLivros = async (req, res, next) => {
    try{
      let livro = new livros(req.body);
      await livro.save(); 
      res.status(201).send(livro.toJSON());
    } catch(erro) {
      next(erro);
    }

            
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      const {id} = req.params;
      const newBook = await livros.findByIdAndUpdate(id, req.body,{
        new: true
      });
      if(id !== null){
        res.status(200).json(newBook);
      }else{
        next(new NaoEncontrado("Id do livro nao Localizado"));
      }
    }catch(erro){
      next(erro);   
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{
      const {id} = req.params;
      await livros.findByIdAndDelete(id);
      if(id !== null){
        res.status(200).send({message: "Livro removido com sucesso"});
      }else{
        next(new NaoEncontrado("Id do livro nao localizado"));
      }
    }catch (erro){ 
      next(erro);
    }
        
  };

  static listarLivroPorEditora = async(req, res, next) => {
    try{
      const editora = req.query.editora;
      const livroPorEditora = await livros.find({"editora": editora})
        .populate("autor", "nome");
      res.status(200).send(livroPorEditora);
    } catch(erro){
      next(erro);
    }
  };
}

export default LivroController;