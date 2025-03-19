module.exports = function validateanswer2({
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
  }) {
    // Verifica se todos os campos obrigatórios existem
    const requiredFields = [
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
    ];
    
    if (requiredFields.some(field => field === undefined || field === null || field === '')) {
      return { error: "Todos os campos devem ser preenchidos" };
    }
    
    // Validação para campos de score (decimais)
    const scoreFields = {
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
    };
    
    for (const [field, value] of Object.entries(scoreFields)) {
      // Verifica se é um número
      if (isNaN(Number(value))) {
        return { error: `O campo ${field} deve ser um número válido` };
      }
      
      // Verifica se está dentro de um intervalo esperado (assumindo scores de 0 a 100)
      if (Number(value) < 0 || Number(value) > 100) {
        return { error: `O campo ${field} deve estar entre 0 e 100` };
      }
    }
    
    // Validação para o campo size_req (assumindo valores específicos)
    if (!['small', 'medium', 'large', 'extra large'].includes(size_req.toLowerCase())) {
      return { error: "O campo size_req deve ser 'small', 'medium', 'large' ou 'extra large'" };
    }
    
    // Validação para o campo focus_req (assumindo valores específicos)
    if (!['comprehensive', 'focused', 'specialized'].includes(focus_req.toLowerCase())) {
      return { error: "O campo focus_req deve ser 'comprehensive', 'focused' ou 'specialized'" };
    }
    
    // Validação para o campo research_req (assumindo valores específicos)
    if (!['high', 'medium', 'low'].includes(research_req.toLowerCase())) {
      return { error: "O campo research_req deve ser 'high', 'medium' ou 'low'" };
    }
    
    // Validação para o campo status_req (assumindo valores específicos)
    if (!['public', 'private', 'public/private'].includes(status_req.toLowerCase())) {
      return { error: "O campo status_req deve ser 'public', 'private' ou 'public/private'" };
    }
    
    // Validação para o campo country_req (verificar se não está vazio ou apenas espaços)
    if (!country_req.trim()) {
      return { error: "O campo country_req não pode estar vazio" };
    }
    
    return null; // Retorna null se não houver erro
  };