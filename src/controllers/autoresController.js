import autores from "../models/Autor.js";

class AutorController {

    static listarAutores =  async (req, res) =>{
        try{
            const autoresResultado = await autores.find();
            res.status(200).json(autoresResultado);
        }catch (err){
            res.status(500).json(err);
        }
    }

    static listarAutorPorId = async(req, res) => {
        
        try{
            const {id}  = req.params;
            const autorPorId = await autores.findById(id, req.body)
            res.status(200).send(autorPorId);

        } catch (err){
            res.status(400).send({message: `${err.message} - erro ao buscar o id do Autor`});
        }
    }

    static cadastrarAutor = async (req, res) => {
        try{
            let autor = new autores(req.body);
            await autor.save(); 
            res.status(201).send(autor.toJSON())
            } catch(err) {
                res.status(501).send({message: `${err.message} - erro ao cadastrar Autor`})
            }

            
    }

    static atualizarAutor = async (req, res) => {
        try{
        const {id} = req.params;
        const newBook = await autores.findByIdAndUpdate(id, req.body,{
            new: true
        });
        res.status(200).json(newBook);
        }catch(err){
        res.status(500).json({ err: err.message });   
        }
    }

    static excluirAutor = async (req, res) => {
        try{
            const {id} = req.params;
            await autores.findByIdAndDelete(id);
            res.status(200).send({message: 'Autor removido com sucesso'})
        }catch (err){ 
            res.status(500).send({message: err.message})
        }
        
    }
}

export default AutorController;