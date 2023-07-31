import NaoEncontrado from "../errors/NaoEncontrado.js";
import RequisicaoIncorreta from "../errors/RequisicaoIncorreta.js";
import { autores, livros } from "../models/index.js";

class LivroController {

  static listarLivros =  async (req, res, next) =>{
    try{
      let {limite = 5, pagina = 1, ordenacao = "_id:-1"} = req.query;
      
      let[campoOrdenacao, ordem] = ordenacao.split(":");

      limite = parseInt(limite);
      pagina = parseInt(pagina);
      ordem = parseInt(ordem);

      if(limite > 0 && pagina > 0){
        const livrosResultado = await livros.find()
          .sort({[campoOrdenacao]: ordem})
          .skip((pagina -1 ) * limite)
          .limit(limite)
          .populate("autor");
        res.status(200).json(livrosResultado);
      }else{
        next(new RequisicaoIncorreta());
      }


      
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

  static listarLivroPorFiltro = async(req, res, next) => {
    try{
      const {editora, titulo, minPaginas, maxPaginas, nomeAutor} = req.query;

      
      //usando metodo do proprio javascript, regex;
      const regex = new RegExp(titulo, "i");
      
      let busca = {};
      //usando o metodo do mongoose para regex
      if(editora) busca.editora = {$regex: editora, $options: "i"};
      if(titulo) busca.titulo = regex;

      if(minPaginas || maxPaginas) busca.numeroDePaginas = {};

      //gte = Greather Than or Equal  = Maior ou igual que
      if(minPaginas) busca.numeroDePaginas.$gte = minPaginas;
      //lte = Less than or Equal = Menor ou igual que
      if(maxPaginas) busca.numeroDePaginas.$lte = maxPaginas;
      if(nomeAutor){
        const autor = await autores.findOne({nome: nomeAutor});
        
        if (autor !== null){
          busca.autor = autor._id;
        }else{
          busca = null;
        }
      }
      if(busca !== null){
        const livrosResultado = await livros.find(busca)
          .find(busca)
          .populate("autor", "nome");
        res.status(200).send(livrosResultado);
      }else{
        res.status(200).send([]);
      }
    } catch(erro){
      next(erro);
    }
  };
}


export default LivroController;