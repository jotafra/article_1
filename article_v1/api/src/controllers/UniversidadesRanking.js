const connect = require("../db/connect");

module.exports = class UniversidadesRanking {
  static async rankUniversidades(req, res) {
    const { idPrioridade } = req.body;
    
    if (!idPrioridade) {
      return res.status(400).json({
        error: "ID da prioridade é obrigatório"
      });
    }
    
    try {
      // Primeiro, busca as prioridades do usuário
      connect.query(
        "SELECT * FROM prioridadesbrreq WHERE id = ?",
        [idPrioridade],
        (err, prioridades) => {
          if (err) {
            return res.status(500).json({
              error: "Erro ao buscar prioridades",
              details: err.message
            });
          }
          
          if (!prioridades || prioridades.length === 0) {
            return res.status(404).json({
              error: "Prioridades não encontradas"
            });
          }
          
          const prioridade = prioridades[0];
          
          // Busca todas as universidades
          connect.query(
            "SELECT * FROM universidadesbr",
            (err, universidades) => {
              if (err) {
                return res.status(500).json({
                  error: "Erro ao buscar universidades",
                  details: err.message
                });
              }
              
              if (!universidades || universidades.length === 0) {
                return res.status(404).json({
                  error: "Nenhuma universidade encontrada"
                });
              }
              
              // Calcular pontuação de semelhança para cada universidade
              const universidadesRankeadas = universidades.map(univ => {
                // Calcular pontuação baseada nas prioridades
                let score = 0;
                let maxScore = 0;
                
                // Comparar qualidade de ensino (Nota_Ensino)
                if (prioridade.qualidade) {
                  const pesoQualidade = prioridade.qualidade / 10; // Normalizar para 0-1
                  score += (univ.Nota_Ensino / 50) * 100 * pesoQualidade; // Convertendo para uma escala de 0-100
                  maxScore += pesoQualidade * 100;
                }
                
                // Comparar mercado (Nota_Mercado)
                if (prioridade.mercado) {
                  const pesoMercado = prioridade.mercado / 10; // Normalizar para 0-1
                  score += (univ.Nota_Mercado / 20) * 100 * pesoMercado; // Convertendo para uma escala de 0-100
                  maxScore += pesoMercado * 100;
                }
                
                // Comparar produção científica (Nota_Pesquisa)
                if (prioridade.producaocientifica) {
                  const pesoPesquisa = prioridade.producaocientifica / 10; // Normalizar para 0-1
                  score += (univ.Nota_Pesquisa / 50) * 100 * pesoPesquisa; // Convertendo para uma escala de 0-100
                  maxScore += pesoPesquisa * 100;
                }
                
                // Comparar inovação (Nota_Inovacao)
                if (prioridade.inovacao) {
                  const pesoInovacao = prioridade.inovacao / 10; // Normalizar para 0-1
                  score += (univ.Nota_Inovacao / 5) * 100 * pesoInovacao; // Convertendo para uma escala de 0-100
                  maxScore += pesoInovacao * 100;
                }
                
                // Comparar reputação (usando Nota_Total como proxy)
                if (prioridade.reputacao) {
                  const pesoReputacao = prioridade.reputacao / 10; // Normalizar para 0-1
                  score += (univ.Nota_Total / 100) * 100 * pesoReputacao; // Convertendo para uma escala de 0-100
                  maxScore += pesoReputacao * 100;
                }
                
                // Calcular pontuação final (normalizada)
                const finalScore = maxScore > 0 ? (score / maxScore) * 100 : 0;
                
                // Verificar tipo (pública/privada)
                let matchTipo = true;
                if (prioridade.publicaprivada && prioridade.publicaprivada !== "Ambas") {
                  if (prioridade.publicaprivada === "Pública" && 
                      !(univ.Tipo === "Federal" || univ.Tipo === "Estadual")) {
                    matchTipo = false;
                  } else if (prioridade.publicaprivada === "Privada" && 
                            univ.Tipo !== "Privada") {
                    matchTipo = false;
                  }
                }
                
                return {
                  id: univ.id,
                  universidade: univ.Universidade,
                  tipo: univ.Tipo,
                  ranking_original: univ.Ranking,
                  nota_total: univ.Nota_Total,
                  notas: {
                    ensino: univ.Nota_Ensino,
                    pesquisa: univ.Nota_Pesquisa,
                    mercado: univ.Nota_Mercado,
                    inovacao: univ.Nota_Inovacao,
                    internacionalizacao: univ.Nota_Internacionalizacao
                  },
                  score_compatibilidade: parseFloat(finalScore.toFixed(2)),
                  match_tipo: matchTipo,
                };
              });
              
              // Ordenar universidades pelo score de compatibilidade (do maior para o menor)
              universidadesRankeadas.sort((a, b) => b.score_compatibilidade - a.score_compatibilidade);
              
              // Adicionar ranking de compatibilidade
              const resultado = universidadesRankeadas.map((univ, index) => {
                return {
                  ...univ,
                  ranking_compatibilidade: index + 1
                };
              });
              
              return res.status(200).json({
                success: true,
                message: "Ranking de universidades gerado com sucesso",
                prioridades: prioridade,
                total_universidades: resultado.length,
                data: resultado
              });
            }
          );
        }
      );
    } catch (error) {
      return res.status(500).json({
        error: "Erro ao processar sua requisição",
        details: error.message
      });
    }
  }
};