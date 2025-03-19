import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import LinearProgress from "@mui/material/LinearProgress";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import Alert from '@mui/material/Alert';

import api from "../axios/axios";


function RankingUniversidades() {
  const [ranking, setRanking] = useState([]);
  const [prioridades, setPrioridades] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortConfig, setSortConfig] = useState({
    key: 'score_compatibilidade',
    direction: 'desc'
  });
  const [activeUniversidade, setActiveUniversidade] = useState(null);
  const [prioridadeId, setPrioridadeId] = useState('');

  const fetchRanking = async (id) => {
    try {
      setLoading(true);
      const response = await fetch('/api/ranking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ idPrioridade: id }),
      });
      
      if (!response.ok) {
        throw new Error('Falha ao buscar ranking');
      }
      
      const data = await response.json();
      setRanking(data.data);
      setPrioridades(data.prioridades);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (prioridadeId) {
      fetchRanking(prioridadeId);
    }
  };

  const filteredRanking = ranking.filter(uni => 
    uni.universidade.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.estado.toLowerCase().includes(searchTerm.toLowerCase()) ||
    uni.tipo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedRanking = [...filteredRanking].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'asc' ? 
      <ArrowUpwardIcon fontSize="small" /> : 
      <ArrowDownwardIcon fontSize="small" />;
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h4" sx={{ mb: 4 }}>
          Ranking de Universidades
        </Typography>
        
        <Box
          component="form"
          sx={{ width: "100%", mb: 4 }}
          onSubmit={handleSubmit}
        >
          <Grid container spacing={2} alignItems="flex-end">
            <Grid item xs={12} md={9}>
              <TextField
                fullWidth
                id="prioridadeId"
                label="ID da Prioridade"
                name="prioridadeId"
                value={prioridadeId}
                onChange={(e) => setPrioridadeId(e.target.value)}
                margin="normal"
                placeholder="Digite o ID da prioridade"
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                disabled={loading}
                sx={{ py: 1.5 }}
              >
                {loading ? 'Carregando...' : 'Buscar Ranking'}
              </Button>
            </Grid>
          </Grid>
        </Box>

        {prioridades && (
          <Card sx={{ width: "100%", mb: 4, bgcolor: "primary.light", color: "primary.contrastText" }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Prioridades Selecionadas
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Qualidade
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.qualidade}/10
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Mercado
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.mercado}/10
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Produção Científica
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.producaocientifica}/10
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Reputação
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.reputacao}/10
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Inovação
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.inovacao}/10
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Tipo
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.publicaprivada}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3}>
                  <Typography variant="body2" color="text.secondary">
                    Cidade/Estado
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {prioridades.cidade || 'Não especificado'}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}

        {error && (
          <Alert severity="error" sx={{ width: "100%", mb: 4 }}>
            {error}
          </Alert>
        )}

        {ranking.length > 0 && (
          <>
            <TextField
              fullWidth
              margin="normal"
              placeholder="Buscar universidade, estado ou tipo..."
              value={searchTerm}
              onChange={handleSearch}
              sx={{ mb: 3 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />

            <TableContainer component={Paper} sx={{ mb: 4 }}>
              <Table sx={{ minWidth: 650 }} aria-label="ranking table">
                <TableHead>
                  <TableRow>
                    <TableCell 
                      onClick={() => handleSort('ranking_compatibilidade')}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Ranking
                        {renderSortIcon('ranking_compatibilidade')}
                      </Box>
                    </TableCell>
                    <TableCell 
                      onClick={() => handleSort('universidade')}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Universidade
                        {renderSortIcon('universidade')}
                      </Box>
                    </TableCell>
                    <TableCell 
                      onClick={() => handleSort('estado')}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Estado
                        {renderSortIcon('estado')}
                      </Box>
                    </TableCell>
                    <TableCell 
                      onClick={() => handleSort('tipo')}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Tipo
                        {renderSortIcon('tipo')}
                      </Box>
                    </TableCell>
                    <TableCell 
                      onClick={() => handleSort('score_compatibilidade')}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Compatibilidade
                        {renderSortIcon('score_compatibilidade')}
                      </Box>
                    </TableCell>
                    <TableCell 
                      onClick={() => handleSort('ranking_original')}
                      sx={{ cursor: 'pointer' }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        Ranking Original
                        {renderSortIcon('ranking_original')}
                      </Box>
                    </TableCell>
                    <TableCell>Detalhes</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {sortedRanking.map((uni) => (
                    <React.Fragment key={uni.id}>
                      <TableRow hover>
                        <TableCell align="center">{uni.ranking_compatibilidade}</TableCell>
                        <TableCell>{uni.universidade}</TableCell>
                        <TableCell align="center">{uni.estado}</TableCell>
                        <TableCell>{uni.tipo}</TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Box sx={{ width: '100%', mr: 1 }}>
                              <LinearProgress 
                                variant="determinate" 
                                value={uni.score_compatibilidade} 
                                sx={{ height: 8, borderRadius: 5 }}
                              />
                            </Box>
                            <Box sx={{ minWidth: 35 }}>
                              <Typography variant="body2" color="text.secondary">
                                {uni.score_compatibilidade}%
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell align="center">{uni.ranking_original}</TableCell>
                        <TableCell align="center">
                          <IconButton
                            onClick={() => setActiveUniversidade(activeUniversidade === uni.id ? null : uni.id)}
                            color="primary"
                          >
                            <InfoIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
                          <Collapse in={activeUniversidade === uni.id} timeout="auto" unmountOnExit>
                            <Box sx={{ margin: 2, backgroundColor: "primary.light", p: 2, borderRadius: 1 }}>
                              <Typography variant="h6" gutterBottom component="div">
                                Notas Detalhadas
                              </Typography>
                              <Grid container spacing={2}>
                                <Grid item xs={6} sm={4} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Ensino
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {uni.notas.ensino.toFixed(2)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Pesquisa
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {uni.notas.pesquisa.toFixed(2)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Mercado
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {uni.notas.mercado.toFixed(2)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Inovação
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {uni.notas.inovacao.toFixed(2)}
                                  </Typography>
                                </Grid>
                                <Grid item xs={6} sm={4} md={2}>
                                  <Typography variant="body2" color="text.secondary">
                                    Internacionalização
                                  </Typography>
                                  <Typography variant="body1" fontWeight="medium">
                                    {uni.notas.internacionalizacao.toFixed(2)}
                                  </Typography>
                                </Grid>
                              </Grid>
                              <Box sx={{ mt: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                  Nota Total
                                </Typography>
                                <Typography variant="body1" fontWeight="medium">
                                  {uni.nota_total.toFixed(2)}
                                </Typography>
                              </Box>
                              <Box sx={{ mt: 2, display: 'flex', gap: 4 }}>
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    Compatibilidade de Tipo
                                  </Typography>
                                  <Typography 
                                    variant="body1" 
                                    fontWeight="medium"
                                    color={uni.match_tipo ? "success.main" : "error.main"}
                                  >
                                    {uni.match_tipo ? 'Compatível' : 'Não Compatível'}
                                  </Typography>
                                </Box>
                                <Box>
                                  <Typography variant="body2" color="text.secondary">
                                    Compatibilidade de Localização
                                  </Typography>
                                  <Typography 
                                    variant="body1" 
                                    fontWeight="medium"
                                    color={uni.match_localizacao ? "success.main" : "error.main"}
                                  >
                                    {uni.match_localizacao ? 'Compatível' : 'Não Compatível'}
                                  </Typography>
                                </Box>
                              </Box>
                            </Box>
                          </Collapse>
                        </TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}

        {!loading && ranking.length === 0 && !error && (
          <Box sx={{ p: 4, bgcolor: "grey.100", borderRadius: 1, textAlign: "center", width: "100%" }}>
            <Typography variant="h6" color="text.secondary">
              Nenhum resultado encontrado. Digite um ID de prioridade e clique em "Buscar Ranking".
            </Typography>
          </Box>
        )}

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
      </Box>
    </Container>
  );
}

export default RankingUniversidades;