const connect = require("../db/connect");
const validate_answer = require("../services/validate_answer2");

module.exports = class prioridadesout {
  static async prioridadesout(req, res) {
    const { 
      country_req, 
      size_req, 
      focus_req, 
      research_req, 
      status_req,
      academic_reputation_score_req,
      employer_reputation_score_req,
      faculty_student_score_req,
      citations_per_faculty_score_req,
      international_faculty_score_req,
      international_students_score_req,
      international_research_network_score_req,
      employment_outcomes_score_req,
      sustainability_score_req,
      overall_score_req
    } = req.body;
    
    // Valida os campos recebidos
    const validationError = validate_answer(req.body);
    if (validationError) {
      return res.status(400).json(validationError);
    } 
    
    try {
      const query = `INSERT INTO prioridadesoutreq (
        country_req, 
        size_req, 
        focus_req, 
        research_req, 
        status_req,
        academic_reputation_score_req,
        employer_reputation_score_req,
        faculty_student_score_req,
        citations_per_faculty_score_req,
        international_faculty_score_req,
        international_students_score_req,
        international_research_network_score_req,
        employment_outcomes_score_req,
        sustainability_score_req,
        overall_score_req
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      
      connect.query(
        query,
        [
          country_req, 
          size_req, 
          focus_req, 
          research_req, 
          status_req,
          academic_reputation_score_req,
          employer_reputation_score_req,
          faculty_student_score_req,
          citations_per_faculty_score_req,
          international_faculty_score_req,
          international_students_score_req,
          international_research_network_score_req,
          employment_outcomes_score_req,
          sustainability_score_req,
          overall_score_req
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
              country_req, 
              size_req, 
              focus_req, 
              research_req, 
              status_req,
              academic_reputation_score_req,
              employer_reputation_score_req,
              faculty_student_score_req,
              citations_per_faculty_score_req,
              international_faculty_score_req,
              international_students_score_req,
              international_research_network_score_req,
              employment_outcomes_score_req,
              sustainability_score_req,
              overall_score_req
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