import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button
} from '@mui/material';
import { Link } from 'react-router-dom';
import api from '../axios/axios';

function Showrankingbr() {
  const [universidades, setUniversidades] = useState([]);
  const [error, setError] = useState(null);

  const buscarUniversidades = async () => {
    try {
      const response = await api.buscarUniversidades({
        qualidade: 8,
        mercado: 8,
        producaocientifica: 8,
        reputacao: 8,
        inovacao: 8,
        publicaprivada: ''
      });
  
      console.log('Resposta completa:', response);
      console.log('Dados de universidades:', response.data.universidades);
  
      if (response.data.universidades) {
        setUniversidades(response.data.universidades);
        setError(null);
      } else {
        setError('Nenhuma universidade encontrada');
      }
    } catch (err) {
      console.error('Erro detalhado:', err);
      setError('Erro ao buscar universidades');
      if (err.response) {
        console.error('Detalhes da resposta de erro:', err.response.data);
      }
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ 
        mt: 4, 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center' 
      }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Ranking de Universidades
        </Typography>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={buscarUniversidades}
          sx={{ mb: 3 }}
        >
          Buscar Universidades
        </Button>

        {error && (
          <Typography color="error" sx={{ mb: 2 }}>
            {error}
          </Typography>
        )}

        {universidades.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Universidade</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Nota Ensino</TableCell>
                  <TableCell>Nota Pesquisa</TableCell>
                  <TableCell>Nota Mercado</TableCell>
                  <TableCell>Nota Inovação</TableCell>
                  <TableCell>Nota Total</TableCell>
                  <TableCell>Proximidade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {universidades.map((uni, index) => (
                  <TableRow key={index}>
                    <TableCell>{uni.universidade}</TableCell>
                    <TableCell>{uni.estado}</TableCell>
                    <TableCell>{uni.tipo}</TableCell>
                    <TableCell>{uni.notas.ensino}</TableCell>
                    <TableCell>{uni.notas.pesquisa}</TableCell>
                    <TableCell>{uni.notas.mercado}</TableCell>
                    <TableCell>{uni.notas.inovacao}</TableCell>
                    <TableCell>{uni.notas.total}</TableCell>
                    <TableCell>
                      {uni.proximidade?.pontos_proximidade || 'N/A'} 
                      {uni.proximidade?.diferenca_total 
                        ? ` (${Number(uni.proximidade.diferenca_total).toFixed(2)})` 
                        : ''}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        <Button 
          variant="contained" 
          color="secondary" 
          component={Link} 
          to="/" 
          sx={{ mt: 3 }}
        >
          Voltar para Home
        </Button>
      </Box>
    </Container>
  );
}

export default Showrankingbr;