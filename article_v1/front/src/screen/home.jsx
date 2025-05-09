//Estava faltando esse import
import { Link } from "react-router-dom" 

import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Grid from "@mui/material/Grid";

import SchoolIcon from "@mui/icons-material/School";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import CreateIcon from "@mui/icons-material/Create";
import StarIcon from "@mui/icons-material/Star";
import CodeIcon from "@mui/icons-material/Code";
import PersonIcon from "@mui/icons-material/Person";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import locate from "../assets/locate.png";
import img1 from "../assets/1.png";
import img2 from "../assets/2.png";
import img3 from "../assets/3.png";
import img4 from "../assets/4.png";


import api from "../axios/axios";

function Home() {
  const navigate = useNavigate();

  const navigateToCadastro = () => {
    navigate("/cadastro");
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          mt: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "green", fontWeight: "bold" }}
        >
          <SchoolIcon sx={{ fontSize: 40, mr: 2, verticalAlign: "middle" }} />
          Recomendação de Universidades
        </Typography>

        <Typography
          variant="h6"
          component="p"
          align="center"
          sx={{ mb: 4, maxWidth: "80%" }}
        >
          Encontre a universidade ideal para você com base nas suas prioridades
          e preferências.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <SchoolIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Encontre Universidades
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Compare instituições públicas e privadas de acordo com seus
                  critérios.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <PersonIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Personalize
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Ajuste as prioridades conforme suas necessidades específicas.
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={4}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <StarIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Análise Inteligente
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Receba recomendações baseadas em dados reais do ensino
                  superior.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography
          variant="h3"
          component="h1"
          gutterBottom
          sx={{ color: "green", fontWeight: "bold" }}
        >
          <CodeIcon sx={{ fontSize: 40, mr: 2, verticalAlign: "middle" }} />
          Como funciona o algoritmo?
        </Typography>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "green", fontWeight: "bold" }}
        >
          <CreateIcon sx={{ fontSize: 30, mr: 2, verticalAlign: "middle" }} />
          Aplicação de prioridades 
        </Typography>

        <Typography
          fullWidth
          variant="h6"
          component="p"
          align="center"
          sx={{ mb: 4, maxWidth: "100%" }}
        >
          Para a sugestão da melhor universidade para você, precisamos saber quais são suas prioridades 
          em relação a alguns tópicos como:
        </Typography>

        {/* Lista de tópicos adicionada abaixo dos botões */}
        <Box sx={{ width: '100%', mt: 4, mb: 4 }}>
          <Card elevation={3} sx={{ mt: -5 }}>
            <CardContent>
              <List>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary="Ensino" secondary="Qualidade das aulas, corpo docente e infraestrutura" />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary="Pesquisa" secondary="Produção científica, projetos de pesquisa e laboratórios" />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary="Inovação" secondary="Empreendedorismo, startups e transferência de tecnologia" />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary="Internacionalização" secondary="Parcerias internacionais, intercâmbios e pesquisa global" />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary="Mercado" secondary="Empregabilidade, conexões com empresas e preparação profissional" />
                </ListItem>

                <ListItem>
                  <ListItemIcon>
                    <CheckCircleIcon sx={{ color: "green" }} />
                  </ListItemIcon>
                  <ListItemText primary="Localização" secondary="Proximidade de sua cidade natal, distancia em km" />
                </ListItem>

              </List>
            </CardContent>
          </Card>
        </Box>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "green", fontWeight: "bold" }}
        >
          <EqualizerIcon sx={{ fontSize: 30, mr: 2, verticalAlign: "middle" }} />
          Comparação com o Banco de dados 
        </Typography>

        <Typography
          fullWidth
          variant="h6"
          component="p"
          align="center"
          sx={{ mb: 4, maxWidth: "100%" }}
        >
          A partir de suas prioridades é formado um vetor A em um gráfico 3D, 
          logo após realiza a comparação com as notas das universidades do 
          banco de dados que oferecem esse nivel prioridade a você 
        </Typography>

        {/* Container Grid para colocar os dois cards lado a lado */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <SchoolIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Universidade A 
                </Typography>

                <Typography variant="body2" color="text.secondary">
                <ListItemText primary="Inovação: 10.0"
                secondary="Ensino: 10.0"
                />
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <SchoolIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Universidade B 
                </Typography>

                <Typography variant="body2" color="text.secondary">
                <ListItemText primary="Inovação: 9.0"
                secondary="Ensino: 7.0"
                />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <PersonIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Usuário X 
                </Typography>

                <Typography variant="body2" color="text.secondary">
                <ListItemText primary="Inovação: 10.0"
                secondary="Ensino: 10.0"
                />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ textAlign: "center" }}>
                <PersonIcon sx={{ fontSize: 40, color: "green", mb: 1 }} />
                <Typography variant="h6" gutterBottom>
                  Usuário Y 
                </Typography>

                <Typography variant="body2" color="text.secondary">
                <ListItemText primary="Inovação: 10.0"
                secondary="Ensino: 8.0"
                />
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>


          <Typography
          fullWidth
          variant="h6"
          component="p"
          align="center"
          sx={{ mb: 3, mt: 2, maxWidth: "100%" }}
        >
          Logo a universidade A é mais próxima das prioridades do Usuário X, 
          e a universidade B é mais próxima das prioridades do Usuário Y
        </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img
                  src={img1}
                  alt="Cálculo de distância"
                  style={{ height: "450px", borderRadius: 2 }}
                />
                <img
                  src={img3}
                  alt="Cálculo de distância"
                  style={{ height: "450px", borderRadius: 2 }}
                />
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4, mb: 4 }}>
                <img
                  src={img2}
                  alt="Cálculo de distância"
                  style={{ height: "450px", borderRadius: 2 }}
                />
                <img
                  src={img4}
                  alt="Cálculo de distância"
                  style={{ height: "450px", borderRadius: 2 }}
                />
              </Box>

        <Typography
          variant="h4"
          component="h1"
          gutterBottom
          sx={{ color: "green", fontWeight: "bold" }}
        >
          <LocationOnIcon sx={{ fontSize: 30, mr: 2, verticalAlign: "middle" }} />
          Cálculo da Localização 
        </Typography>

        <Typography
          fullWidth
          variant="h6"
          component="p"
          align="center"
          sx={{ mb: 3, mt: 2, maxWidth: "100%" }}
        >
          A distancia é calculada com base em sua localização e a distancia de prioridade que é exigida 
          nos parametros, com o valor de sua prioridade é formado um raio de uma circunferência no qual vai
          abranger todas as faculdades da área atingida pelo circulo por exemplo:
        </Typography>

        {/* Imagem adicionada aqui após o último texto */}
        <Box
          sx={{
            width: '100%',
            textAlign: 'center',
            mb: 4
          }}
        >
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ color: "green" }}>
                Visualização do Cálculo de Distância
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <img
                  src={locate}
                  alt="Cálculo de distância"
                  style={{ height: "450px", borderRadius: 2 }}
                />
              </Box>
            </CardContent>
          </Card>
        </Box>

        <Button
            sx={{ 
              mt: 2, 
              mb: 3, 
              backgroundColor: "green", 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/cadastro"
            size="large"
          >
            Quero fazer o teste com uma universidade dentro do Brasil
          </Button>
        
        <Button
            sx={{ 
              mt: 2, 
              mb: 3, 
              backgroundColor: "green", 
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 'bold'
            }}
            fullWidth
            variant="contained"
            color="primary"
            component={Link}
            to="/cadastroout"
            size="large"
          >
            Quero fazer o teste com uma universidade fora do Brasil
          </Button>
      </Box>
    </Container>
  );
}

export default Home;