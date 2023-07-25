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
        res.status(404).send({message: "id do Autor nao localizado"});
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
      res.status(200).json(newBook);
    }catch(erro){
      next(erro);   
    }
  };

  static excluirAutor = async (req, res, next) => {
    try{
      const {id} = req.params;
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "Autor removido com sucesso"});
    }catch (erro){ 
      next(erro);
    }
        
  };
}

export default AutorController;