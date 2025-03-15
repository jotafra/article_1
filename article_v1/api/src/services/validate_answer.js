module.exports = function validateUser({
    distancia, qualidade, mercado, producaocientifica, reputacao, inovacao, publicaprivada, cidade
  }) {
    if (!distancia || !qualidade || !mercado || !producaocientifica || !reputacao || !inovacao || !publicaprivada || !cidade ) {
      return { error: "Todos os campos devem ser preenchidos" };
    }
  
    return null; // Retorna null se não houver erro
  };
  
  