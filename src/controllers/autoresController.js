import NaoEncontrado from "../errors/NaoEncontrado.js";
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores =  async (req, res) =>{
    try{
      const autoresResultado = await autores.find();
      res.status(200).json(autoresResultado);
    }catch (err){
      res.status(500).json({message: "Erro interno no servidor"});
    }
  };

  static listarAutorPorId = async(req, res, next) => {
        
    try{
      const {id}  = req.params;
      const autorPorId = await autores.findById(id);
      

      if (autorPorId !== null) {
        res.status(200).send(autorPorId);
      }else{
        next(new NaoEncontrado("Id do autor nao localizado."));
      }
    } catch (err){
      next(err);

    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try{
      let autor = new autores(req.body);
      await autor.save(); 
      res.status(201).send(autor.toJSON());
    } catch(erro) {
      next(erro);
    }

            
  };

  static atualizarAutor = async (req, res, next) => {
    try{
      const {id} = req.params;
      const newBook = await autores.findByIdAndUpdate(id, req.body,{
        new: true
      });
      if (newBook !== null){
        res.status(200).json(newBook);
      } else {
        next(new NaoEncontrado("Id do Autor nao localizado."));
      }
    }catch(erro){
      next(erro);   
    }
  };

  static excluirAutor = async (req, res, next) => {
    try{
      const {id} = req.params;
      await autores.findByIdAndDelete(id);
      
      if(id !== null){
        res.status(200).send({message: "Autor removido com sucesso"});  
      }else{
        next(new NaoEncontrado("Id do Autor nao localizado."));
      }
    }catch (erro){ 
      next(erro);
    }
        
  };
}

export default AutorController;