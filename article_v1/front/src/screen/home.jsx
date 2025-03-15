import React from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import SchoolIcon from '@mui/icons-material/School';
import PersonIcon from '@mui/icons-material/Person';
import StarIcon from '@mui/icons-material/Star';
import api from "../axios/axios";

function Home() {
    const navigate = useNavigate();

    const navigateToCadastro = () => {
        navigate('/cadastro');
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ 
                mt: 8, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center'
            }}>
                <Typography variant="h3" component="h1" gutterBottom sx={{ color: 'green', fontWeight: 'bold' }}>
                    <SchoolIcon sx={{ fontSize: 40, mr: 2, verticalAlign: 'middle' }} />
                    Sistema de Recomendação de Universidades
                </Typography>

                <Typography variant="h6" component="p" align="center" sx={{ mb: 4, maxWidth: "80%" }}>
                    Encontre a universidade ideal para você com base nas suas prioridades e preferências.
                </Typography>

                <Grid container spacing={3} sx={{ mb: 4 }}>
                    <Grid item xs={12} md={4}>
                        <Card elevation={3}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <SchoolIcon sx={{ fontSize: 40, color: 'green', mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Encontre Universidades
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Compare instituições públicas e privadas de acordo com seus critérios.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Card elevation={3}>
                            <CardContent sx={{ textAlign: 'center' }}>
                                <PersonIcon sx={{ fontSize: 40, color: 'green', mb: 1 }} />
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
                            <CardContent sx={{ textAlign: 'center' }}>
                                <StarIcon sx={{ fontSize: 40, color: 'green', mb: 1 }} />
                                <Typography variant="h6" gutterBottom>
                                    Análise Inteligente
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Receba recomendações baseadas em dados reais do ensino superior.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>

                <Button 
                    variant="contained" 
                    size="large" 
                    onClick={navigateToCadastro}
                    sx={{ 
                        backgroundColor: 'green', 
                        '&:hover': { backgroundColor: 'darkgreen' }, 
                        px: 4,
                        py: 1.5
                    }}
                >
                    Definir Minhas Prioridades
                </Button>
            </Box>
        </Container>
    );
}

export default Home;