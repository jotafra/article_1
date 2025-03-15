import * as React from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import { useNavigate } from "react-router-dom";
import {useState} from "react";
import api from "../axios/axios";

function Cadastro(){

const [prioridadesbr, setprioridades] = useState({
    distancia: 5, // Valor inicial de 5 km
    qualidade: 5,
    mercado: 5,
    producaocientifica: 5,
    reputacao: 5,
    inovacao: 5,
    publicaprivada: "", // Será "Publica" ou "Privada"
    cidade: ""
});

const onChange = (event) => {
    const { name, value } = event.target;
    setprioridades({...prioridadesbr, [name]: value});
};

const handleSliderChange = (name) => (event, newValue) => {
    setprioridades({...prioridadesbr, [name]: newValue});
};

const handleRadioChange = (event) => {
    setprioridades({...prioridadesbr, publicaprivada: event.target.value});
};

const handleSubmit = (event) => {
    event.preventDefault();
    required();
    
    async function required(){
        await api.postrequired(prioridadesbr).then((response) => {
            alert(response.data.message);
        },
        (error) => {
            console.log(error);
            alert(error.response.data.error);
        });
    }
};

const distanceMarks = [
    { value: 0, label: '0 km' },
    { value: 25, label: '25 km' },
    { value: 50, label: '50 km' },
    { value: 75, label: '75 km' },
    { value: 100, label: '100 km' },
];

const ratingMarks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
];

// Função helper para criar sliders de nota
const createRatingSlider = (id, label, value) => (
    <Box sx={{ mt: 3, mb: 2 }}>
        <Typography id={`${id}-slider`} gutterBottom>
            {label}: {value}
        </Typography>
        <Slider
            value={value}
            onChange={handleSliderChange(id)}
            aria-labelledby={`${id}-slider`}
            valueLabelDisplay="auto"
            step={1}
            marks={ratingMarks}
            min={1}
            max={10}
        />
    </Box>
);

return(
    <Container component="main" maxWidth="xs">
        <Box sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
        }}>
            <Avatar sx={{
                margin: 1, backgroundColor: "green"
            }}>
                <LockOutlinedIcon/>
            </Avatar>
            <Typography component="h1" variant="h5">
                Coloque abaixo suas prioridades
            </Typography>
            <Box component="form" sx={{mt: 1, width: '100%'}} onSubmit={handleSubmit}>
                {/* Slider para distância */}
                <Box sx={{ mt: 3, mb: 2 }}>
                    <Typography id="distance-slider" gutterBottom>
                        Distância de prioridade: {prioridadesbr.distancia} km
                    </Typography>
                    <Slider
                        value={prioridadesbr.distancia}
                        onChange={handleSliderChange("distancia")}
                        aria-labelledby="distance-slider"
                        valueLabelDisplay="auto"
                        step={5}
                        marks={distanceMarks}
                        min={0}
                        max={100}
                    />
                </Box>
                
                {/* Sliders para avaliações de 1 a 10 */}
                {createRatingSlider("qualidade", "Qualidade", prioridadesbr.qualidade)}
                {createRatingSlider("mercado", "Mercado", prioridadesbr.mercado)}
                {createRatingSlider("producaocientifica", "Produção Científica", prioridadesbr.producaocientifica)}
                {createRatingSlider("reputacao", "Reputação", prioridadesbr.reputacao)}
                {createRatingSlider("inovacao", "Inovação", prioridadesbr.inovacao)}
                
                {/* Opção para Pública ou Privada */}
                <FormControl component="fieldset" sx={{ mt: 3, mb: 2, width: '100%' }}>
                    <FormLabel component="legend">Tipo de Instituição</FormLabel>
                    <RadioGroup
                        row
                        aria-label="publicaprivada"
                        name="publicaprivada"
                        value={prioridadesbr.publicaprivada}
                        onChange={handleRadioChange}
                    >
                        <FormControlLabel value="Publica" control={<Radio />} label="Pública" />
                        <FormControlLabel value="Privada" control={<Radio />} label="Privada" />
                    </RadioGroup>
                </FormControl>
                
                <TextField
                required
                fullWidth
                id="cidade"
                label="Cidade natal"
                name="cidade"
                margin="normal"
                value={prioridadesbr.cidade}
                onChange={onChange}
                />
                <Button sx={{mt: 3, mb: 2, backgroundColor: "green"}}
                fullWidth
                type="submit"
                variant="contained"
                >Aplicar prioridades</Button>
            </Box>
        </Box>
    </Container>
);
}

export default Cadastro;