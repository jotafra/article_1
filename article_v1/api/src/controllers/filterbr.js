const connect = require("../db/connect");

module.exports = class filterbr {
  static async filterbr(req, res) {
    const { 
      qualidade, 
      mercado, 
      producaocientifica, 
      reputacao,
      inovacao,
      publicaprivada
    } = req.body;
    
    try {
      const queryUniversidades = `
        SELECT 
          universidade, 
          Estado, 
          Tipo,
          Nota_Ensino,
          Nota_Pesquisa,
          Nota_Mercado,
          Nota_Inovacao,
          Nota_Total,
          (
            ABS(? - Nota_Ensino) +
            ABS(? - Nota_Mercado) +
            ABS(? - Nota_Pesquisa) +
            ABS(? - Nota_Total) +
            ABS(? - Nota_Inovacao)
          ) AS diferenca_total,
          (
            (? BETWEEN Nota_Ensino - 1 AND Nota_Ensino + 1) +
            (? BETWEEN Nota_Mercado - 1 AND Nota_Mercado + 1) +
            (? BETWEEN Nota_Pesquisa - 1 AND Nota_Pesquisa + 1) +
            (? BETWEEN Nota_Total - 1 AND Nota_Total + 1) +
            (? BETWEEN Nota_Inovacao - 1 AND Nota_Inovacao + 1)
          ) AS pontos_proximidade
        FROM 
          universidadesbr
        WHERE 
          (? = '' OR Tipo = ?)
        ORDER BY 
          pontos_proximidade DESC, 
          diferenca_total ASC
        LIMIT 10
      `;

      connect.query(
        queryUniversidades,
        [
          qualidade, mercado, producaocientifica, reputacao, inovacao,
          qualidade, mercado, producaocientifica, reputacao, inovacao,
          publicaprivada || '', publicaprivada || ''
        ],
        (err, results) => {
          if (err) {
            return res.status(500).json({ 
              error: "Erro ao buscar universidades", 
              details: err.message 
            });
          }

          const universidadesRanqueadas = results.map(uni => ({
            universidade: uni.universidade,
            estado: uni.Estado,
            tipo: uni.Tipo,
            notas: {
              ensino: uni.Nota_Ensino,
              pesquisa: uni.Nota_Pesquisa,
              mercado: uni.Nota_Mercado,
              inovacao: uni.Nota_Inovacao,
              total: uni.Nota_Total
            },
            proximidade: {
              diferenca_total: Number(uni.diferenca_total), // Garantir que seja um número
              pontos_proximidade: uni.pontos_proximidade
            }
          }));

          return res.status(200).json({
            success: true,
            message: "Universidades encontradas",
            universidades: universidadesRanqueadas
          });
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