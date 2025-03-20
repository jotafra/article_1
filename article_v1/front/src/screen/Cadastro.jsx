import { Link } from "react-router-dom";
import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useState } from "react";
import api from "../axios/axios";

function Cadastro() {
  const [prioridadesbr, setprioridades] = useState({
    distancia: 50.0, // Valor inicial de 50 km
    qualidade: 5.0,
    mercado: 5.0,
    producaocientifica: 5.0,
    reputacao: 5.0,
    inovacao: 5.0,
    publicaprivada: "", // Será "Publica" ou "Privada"
    cidade: "",
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setprioridades({ ...prioridadesbr, [name]: value });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setprioridades({ ...prioridadesbr, [name]: newValue });
  };

  const handleRadioChange = (event) => {
    setprioridades({ ...prioridadesbr, publicaprivada: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    required();
  };

  async function required() {
    try {
      const response = await api.postprioridadesbr(prioridadesbr);
      alert(response.data.message);
    } catch (error) {
      // Melhor tratamento de erro para mostrar mensagens úteis
      if (error.response && error.response.data) {
        // Se temos dados estruturados no erro
        if (error.response.data.error) {
          alert(`Erro: ${error.response.data.error}`);
        } else if (error.response.data.message) {
          alert(`Erro: ${error.response.data.message}`);
        } else {
          alert(`Erro ao enviar prioridades. Código: ${error.response.status}`);
        }
      } else {
        // Caso não tenhamos uma resposta estruturada
        alert("Erro ao enviar prioridades. Verifique sua conexão ou tente novamente mais tarde.");
      }
    }
  }

  // Novas marcações para slider de distância até 1000km
  const distanceMarks = [
    { value: 0, label: "0 km" },
    { value: 200, label: "200 km" },
    { value: 400, label: "400 km" },
    { value: 600, label: "600 km" },
    { value: 800, label: "800 km" },
    { value: 1000, label: "1000 km" },
  ];

  const ratingMarks = [
    { value: 1, label: "1" },
    { value: 3, label: "" },
    { value: 5, label: "5" },
    { value: 7, label: "" },
    { value: 10, label: "10" },
  ];

  // Formatar números com uma casa decimal
  const formatNumber = (value) => Number(value).toFixed(1);

  // Função helper para criar sliders de nota com valores decimais
  const createRatingSlider = (id, label, value) => (
    <Box sx={{ mt: 4, mb: 3, width: "100%" }}>
      <Typography id={`${id}-slider`} gutterBottom variant="h6">
        {label}: {formatNumber(value)}
      </Typography>
      <Box sx={{ px: 0, width: "100%" }}>
        <Slider
          value={value}
          onChange={handleSliderChange(id)}
          aria-labelledby={`${id}-slider`}
          valueLabelDisplay="auto"
          step={0.1}
          marks={ratingMarks}
          min={1}
          max={10}
          valueLabelFormat={formatNumber}
          sx={{ 
            width: "100%",
            '& .MuiSlider-rail': { height: 10 },
            '& .MuiSlider-track': { height: 10 },
            '& .MuiSlider-thumb': { 
              width: 24, 
              height: 24 
            },
            '& .MuiSlider-mark': {
              height: 8,
              width: 8,
            },
            '& .MuiSlider-markLabel': {
              fontSize: '1rem',
            }
          }}
        />
      </Box>
    </Box>
  );

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 3 }}>
          Coloque abaixo suas prioridades
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3, width: "100%" }}
          onSubmit={handleSubmit}
        >
          {/* Slider para distância - com alcance até 1000km */}
          <Box sx={{ mt: 4, mb: 3, width: "100%" }}>
            <Typography id="distance-slider" gutterBottom variant="h6">
              Distância de prioridade: {formatNumber(prioridadesbr.distancia)} km
            </Typography>
            <Box sx={{ width: "100%" }}>
              <Slider
                value={prioridadesbr.distancia}
                onChange={handleSliderChange("distancia")}
                aria-labelledby="distance-slider"
                valueLabelDisplay="auto"
                step={5}
                marks={distanceMarks}
                min={0}
                max={1000}
                valueLabelFormat={(value) => `${value} km`}
                sx={{ 
                  width: "100%",
                  '& .MuiSlider-rail': { height: 10 },
                  '& .MuiSlider-track': { height: 10 },
                  '& .MuiSlider-thumb': { 
                    width: 24, 
                    height: 24 
                  },
                  '& .MuiSlider-mark': {
                    height: 8,
                    width: 8,
                  },
                  '& .MuiSlider-markLabel': {
                    fontSize: '1rem',
                  }
                }}
              />
            </Box>
          </Box>

          {/* Caixa de texto mais larga */}
          <TextField
            required
            fullWidth
            id="cidade"
            label="Cidade natal"
            name="cidade"
            margin="normal"
            value={prioridadesbr.cidade}
            onChange={onChange}
            InputProps={{
              style: { 
                fontSize: '1.1rem',
                padding: '15px 14px'
              }
            }}
            InputLabelProps={{
              style: { 
                fontSize: '1.1rem' 
              }
            }}
            sx={{ 
              mt: 4, 
              mb: 3,
              '& .MuiOutlinedInput-root': {
                height: '60px'
              }
            }}
          />

          {/* Sliders para avaliações de 1 a 10 com valores decimais */}
          <Typography variant="h5" sx={{ mt: 5, mb: 3 }}>
            Prioridades de Avaliação
          </Typography>
          
          <Box sx={{ width: "100%" }}>
            {createRatingSlider(
              "qualidade",
              "Qualidade",
              prioridadesbr.qualidade
            )}
            {createRatingSlider(
              "mercado", 
              "Mercado", 
              prioridadesbr.mercado
            )}
            {createRatingSlider(
              "producaocientifica",
              "Produção Científica",
              prioridadesbr.producaocientifica
            )}
            {createRatingSlider(
              "reputacao",
              "Reputação",
              prioridadesbr.reputacao
            )}
            {createRatingSlider(
              "inovacao", 
              "Inovação", 
              prioridadesbr.inovacao
            )}
          </Box>

          {/* Opção para Pública ou Privada */}
          <FormControl
            component="fieldset"
            sx={{ mt: 5, mb: 3, width: "100%" }}
          >
            <FormLabel component="legend" sx={{ fontSize: '1.2rem', mb: 2 }}>Tipo de Instituição</FormLabel>
            <RadioGroup
              row
              aria-label="publicaprivada"
              name="publicaprivada"
              value={prioridadesbr.publicaprivada}
              onChange={handleRadioChange}
            >
              <FormControlLabel
                value="Publica"
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                label="Pública"
                sx={{ mr: 5, '& .MuiFormControlLabel-label': { fontSize: '1.1rem' } }}
              />
              <FormControlLabel
                value="Privada"
                control={<Radio sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>}
                label="Privada"
                sx={{ '& .MuiFormControlLabel-label': { fontSize: '1.1rem' } }}
              />
            </RadioGroup>
          </FormControl>

          <Button
            sx={{ 
              mt: 5, 
              mb: 3, 
              backgroundColor: "green", 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
            fullWidth
            type="submit"
            variant="contained"
            size="large"
          >
            Aplicar prioridades
          </Button>

          <Button
            sx={{ 
              mt: 2, 
              mb: 5, 
              backgroundColor: "green", 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/"
            size="large"
          >
            Voltar para Home
          </Button>

          <Button
            sx={{ 
              mt: 0, 
              mb: 5, 
              backgroundColor: "green", 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/show"
            size="large"
          >
            Ir para ranking
          </Button>

        </Box>
      </Box>
    </Container>
  );
}

export default Cadastro;