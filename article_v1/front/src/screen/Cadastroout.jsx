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
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../axios/axios";

function Cadastroout() {
  const [priorities, setPriorities] = useState({
    region: "",
    country_req: "",
    size_req: "",
    focus_req: "",
    region_req: "",
    research_req: "",
    status_req: "",
    academic_reputation_score_req: 5.0,
    employer_reputation_score_req: 5.0,
    faculty_student_score_req: 5.0,
    citations_per_faculty_score_req: 5.0,
    international_faculty_score_req: 5.0,
    international_students_score_req: 5.0,
    international_research_network_score_req: 5.0,
    employment_outcomes_score_req: 5.0,
    sustainability_score_req: 5.0,
    overall_score_req: 5.0
  });

  const onChange = (event) => {
    const { name, value } = event.target;
    setPriorities({ ...priorities, [name]: value });
  };

  const handleSliderChange = (name) => (event, newValue) => {
    setPriorities({ ...priorities, [name]: parseFloat(newValue.toFixed(1)) });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    required();

    async function required() {
      await api.postrequired(priorities).then(
        (response) => {
          alert(response.data.message);
        },
        (error) => {
          console.log(error);
          alert(error.response.data.error);
        }
      );
    }
  };

  // Size options
  const sizeOptions = [
    { value: "S", label: "Small" },
    { value: "M", label: "Medium" },
    { value: "L", label: "Large" },
    { value: "XL", label: "Extra Large" }
  ];

  // Focus options
  const focusOptions = [
    { value: "COMP", label: "Comprehensive" },
    { value: "SPEC", label: "Specialized" },
    { value: "FART", label: "Focused Arts" },
    { value: "FSCI", label: "Focused Sciences" }
  ];

  // Research options
  const researchOptions = [
    { value: "HIGH", label: "High" },
    { value: "MED", label: "Medium" },
    { value: "LOW", label: "Low" }
  ];

  // Status options
  const statusOptions = [
    { value: "PUB", label: "Public" },
    { value: "PRI", label: "Private" },
    { value: "MIX", label: "Mixed" }
  ];

  const ratingMarks = [
    { value: 1, label: "1" },
    { value: 3, label: "3" },
    { value: 5, label: "5" },
    { value: 7, label: "7" },
    { value: 10, label: "10" }
  ];

  const regionOptions = [
    {value: "Europe", label: "Europe"},
    {value: "Americas", label: "Americas"},
    {value: "Africa", label: "Africa"},
    {value: "Asia", label: "Asia"},
    {value: "Asia", label: "Asia"}
  ];

  // Helper function to create rating sliders with float values
  const createRatingSlider = (id, label, value) => (
    <Box sx={{ mt: 3, mb: 2 }}>
      <Typography id={`${id}-slider`} gutterBottom>
        {label}: {value.toFixed(1)}
      </Typography>
      <Slider
        value={value}
        onChange={handleSliderChange(id)}
        aria-labelledby={`${id}-slider`}
        valueLabelDisplay="auto"
        step={0.1}
        marks={ratingMarks}
        min={1}
        max={10}
        name={id}
      />
    </Box>
  );

  return (
    <Container component="main" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Enter Your University Preferences
        </Typography>
        <Box
          component="form"
          sx={{ mt: 3, width: "100%" }}
          onSubmit={handleSubmit}
        >
          {/* Text fields for region and country */}
          <TextField
            required
            fullWidth
            id="region"
            label="Region"
            name="region"
            margin="normal"
            value={priorities.region}
            onChange={onChange}
          />
          <TextField
            required
            fullWidth
            id="country_req"
            label="Country"
            name="country_req"
            margin="normal"
            value={priorities.country_req}
            onChange={onChange}
          />

          {/* Dropdown selects for categorical fields */}
          <TextField
            select
            required
            fullWidth
            id="region_req"
            label="Region"
            name="region_req"
            margin="normal"
            value={priorities.region_req}
            onChange={onChange}
          >
            {regionOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>



          <TextField
            select
            required
            fullWidth
            id="size_req"
            label="Size"
            name="size_req"
            margin="normal"
            value={priorities.size_req}
            onChange={onChange}
          >
            {sizeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            required
            fullWidth
            id="focus_req"
            label="Focus"
            name="focus_req"
            margin="normal"
            value={priorities.focus_req}
            onChange={onChange}
          >
            {focusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            required
            fullWidth
            id="research_req"
            label="Research"
            name="research_req"
            margin="normal"
            value={priorities.research_req}
            onChange={onChange}
          >
            {researchOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            select
            required
            fullWidth
            id="status_req"
            label="Status"
            name="status_req"
            margin="normal"
            value={priorities.status_req}
            onChange={onChange}
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          {/* Rating sliders for all score fields */}
          {createRatingSlider(
            "academic_reputation_score_req",
            "Academic Reputation Score",
            priorities.academic_reputation_score_req
          )}
          {createRatingSlider(
            "employer_reputation_score_req",
            "Employer Reputation Score",
            priorities.employer_reputation_score_req
          )}
          {createRatingSlider(
            "faculty_student_score_req",
            "Faculty/Student Ratio Score",
            priorities.faculty_student_score_req
          )}
          {createRatingSlider(
            "citations_per_faculty_score_req",
            "Citations per Faculty Score",
            priorities.citations_per_faculty_score_req
          )}
          {createRatingSlider(
            "international_faculty_score_req",
            "International Faculty Score",
            priorities.international_faculty_score_req
          )}
          {createRatingSlider(
            "international_students_score_req",
            "International Students Score",
            priorities.international_students_score_req
          )}
          {createRatingSlider(
            "international_research_network_score_req",
            "International Research Network Score",
            priorities.international_research_network_score_req
          )}
          {createRatingSlider(
            "employment_outcomes_score_req",
            "Employment Outcomes Score",
            priorities.employment_outcomes_score_req
          )}
          {createRatingSlider(
            "sustainability_score_req",
            "Sustainability Score",
            priorities.sustainability_score_req
          )}
          {createRatingSlider(
            "overall_score_req",
            "Overall Score",
            priorities.overall_score_req
          )}

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
        </Box>
      </Box>
    </Container>
  );
}

export default Cadastroout;