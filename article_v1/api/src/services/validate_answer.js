module.exports = function validateanswer1({
  distancia, qualidade, mercado, producaocientifica, reputacao, inovacao, publicaprivada, cidade
}) {
  // Verifica se todos os campos obrigatórios existem
  if (!distancia || !qualidade || !mercado || !producaocientifica || !reputacao || !inovacao || !publicaprivada || !cidade) {
    return { error: "Todos os campos devem ser preenchidos" };
  }
  
  // Validação para campos numéricos
  const numericalFields = { distancia, qualidade, mercado, producaocientifica, reputacao, inovacao };
  
  for (const [field, value] of Object.entries(numericalFields)) {
    // Verifica se é um número
    if (isNaN(Number(value))) {
      return { error: `O campo ${field} deve ser um número válido` };
    }
    
    // Verifica se está dentro de um intervalo esperado (opcional)
    // Assumindo que as prioridades são avaliadas de 0 a 10
    if (field !== 'distancia' && (Number(value) < 0 || Number(value) > 10)) {
      return { error: `O campo ${field} deve estar entre 0 e 10` };
    }

    if (field === 'distancia' && (Number(value) < 0 || Number(value) > 1000)) {
      return { error: `O campo ${field} deve estar entre 0 e 1000` };
    }

  }
  
  // Validação para o campo publicaprivada (assumindo valores específicos)
  if (!['publica', 'privada'].includes(publicaprivada.toLowerCase())) {
    return { error: "O campo publicaprivada deve ser 'publica' ou 'privada'" };
  }
  
  // Validação para o campo cidade (verificar se não está vazio ou apenas espaços)
  if (!cidade.trim()) {
    return { error: "A cidade não pode estar vazia" };
  }
  
  return null; // Retorna null se não houver erro
};