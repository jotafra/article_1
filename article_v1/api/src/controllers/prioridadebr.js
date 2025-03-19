const connect = require("../db/connect");
const validate_answer = require("../services/validate_answer");

module.exports = class prioridadesbr {

  static async prioridadesbr(req, res) {
    const { 
      distancia, 
      qualidade, 
      mercado, 
      producaocientifica, 
      reputacao,
      inovacao,
      publicaprivada,
      cidade 
    } = req.body;
    
    // Valida os campos recebidos
    const validationError = validate_answer(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    } 
    
    try {
      const query = `INSERT INTO prioridadesbrreq (
        distancia, 
        qualidade, 
        mercado, 
        producaocientifica, 
        reputacao,
        inovacao, 
        publicaprivada, 
        cidade
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      
      connect.query(
        query,
        [
          distancia, 
          qualidade, 
          mercado, 
          producaocientifica, 
          reputacao,
          inovacao,
          publicaprivada,
          cidade
        ],
        (err, result) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
              return res.status(409).json({ 
                error: "Dados duplicados. Esta entrada já existe no banco de dados." 
              });
            }
            return res.status(500).json({ 
              error: "Erro interno do servidor", 
              details: err.message 
            });
          }
          
          // Retorna mensagem de sucesso quando os dados são inseridos
          return res.status(201).json({ 
            success: true,
            message: "Prioridades registradas com sucesso!",
            data: {
              id: result.insertId,
              distancia, 
              qualidade, 
              mercado, 
              producaocientifica, 
              reputacao,
              inovacao,
              publicaprivada,
              cidade
            }
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