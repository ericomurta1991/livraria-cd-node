import RequisicaoIncorreta from "./RequisicaoIncorreta.js";

class ErroDeValidacao extends RequisicaoIncorreta {
  constructor(erro){
    const mensagensErro = Object.values(erro.errors)
      .map(erro => erro.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${mensagensErro}`);
  }
}

export default ErroDeValidacao;