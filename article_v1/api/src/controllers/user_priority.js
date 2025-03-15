const connect = require("../db/connect");
const validate_answer = require("../services/validate_answer");

module.exports = class prioridade {

  static async prioridade(req, res) {
    const { distancia, 
      qualidade, 
      mercado, 
      producaocientifica, 
      reputacao,
      inovacao,
      publicaprivada,
      cidade } = req.body;
    const validationError = validate_answer(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    } try {
      const query = `INSERT INTO prioridadesbr (distancia, 
      qualidade, mercado, 
      producaocientifica, reputacao,
      inovacao, publicaprivada, cidade) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
      connect.query( query,
        [distancia, 
          qualidade, 
          mercado, 
          producaocientifica, 
          reputacao,
          inovacao,
          publicaprivada,
          cidade],
        (err) => {
          if (err) {
            if (err.code === "ER_DUP_ENTRY") {
                return res.status(500)
                  .json({ error: "Erro interno do servidor", err });
              }
            }
          }
      );
    } catch (error) {
      return res.status(500).json({ error });
    }
  }
};