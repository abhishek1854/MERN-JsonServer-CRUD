    import React, { useState } from 'react';
    import {
        Box, TextField, Button, InputLabel, MenuItem, Select,
        OutlinedInput, Checkbox, ListItemText, Typography, FormControl, FormHelperText
    } from '@mui/material';
    import ArrowBackIcon from '@mui/icons-material/ArrowBack';
    import { useNavigate } from 'react-router-dom';
    import subjects from '../data/subjects';

    const FormComponent = ({ formData, setFormData, onSubmit, title, btnText }) => {
        const navigate = useNavigate();

        const [touched, setTouched] = useState({
            name: false,
            subjects: false
        });

        const handleBlur = (field) => {
            setTouched((prev) => ({ ...prev, [field]: true }));
        };

        const onChangeHandler = (e) => {
            const { name, value } = e.target;
            const parsedValue = name === "subjects"
                ? typeof value === 'string' ? value.split(',') : value
                : value;

            setFormData((prev) => ({ ...prev, [name]: parsedValue }));
        };


        const isNameInvalid = touched.name && formData.name.trim() === '';
        const isSubjectsInvalid = touched.subjects && formData.subjects.length === 0;

        return (
            <Box sx={{ textAlign: 'center', mt: 4, px: 2 }}>
                <Box
                    component="form"
                    onSubmit={(e) => {
                        e.preventDefault();
                        setTouched({ name: true, subjects: true });

                        if (formData.name.trim() === '' || formData.subjects.length === 0) {
                            return;
                        }

                        onSubmit(e); 
                    }}
                    sx={{
                        width: '100%',
                        minWidth: { xs: '90vw', sm: 0 },
                        maxWidth: 500,
                        mx: 'auto',
                        mt: 4,
                        p: { xs: 2, sm: 3 },
                        borderRadius: 2,
                        boxShadow: 3,
                        bgcolor: '#fff',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography
                        variant="h5"
                        fontWeight={600}
                        textAlign="center"
                        sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }}
                    >
                        {title}
                    </Typography>

                    <TextField
                        error={isNameInvalid}
                        helperText={isNameInvalid ? 'Name is required' : ''}
                        name="name"
                        label="Name"
                        value={formData.name}
                        onChange={onChangeHandler}
                        onBlur={() => handleBlur('name')}
                        fullWidth
                    />

                    <FormControl fullWidth error={isSubjectsInvalid}>
                        <InputLabel id="subjects-label">Subjects</InputLabel>
                        <Select
                            labelId="subjects-label"
                            name="subjects"
                            multiple
                            value={formData.subjects}
                            onChange={onChangeHandler}
                            onBlur={() => handleBlur('subjects')}
                            input={<OutlinedInput label="Subjects" />}
                            renderValue={(selected) => selected.join(', ')}
                        >
                            {subjects.map((subject) => (
                                <MenuItem key={subject} value={subject}>
                                    <Checkbox checked={formData.subjects.includes(subject)} />
                                    <ListItemText primary={subject} />
                                </MenuItem>
                            ))}
                        </Select>
                        {isSubjectsInvalid && (
                            <FormHelperText>At least one subject is required</FormHelperText>
                        )}
                    </FormControl>

                    <Button type="submit" variant="contained" color="primary" fullWidth>
                        {btnText}
                    </Button>
                </Box>

                <Button
                    onClick={() => navigate('/')}
                    variant="outlined"
                    sx={{
                        mt: 2,
                        color: '#1976d2',
                        borderColor: '#1976d2',
                        px: 2,
                        py: 1,
                        fontSize: { xs: '0.85rem', sm: '1rem' }
                    }}
                >
                    <ArrowBackIcon sx={{ mr: 1 }} />
                    Back to Home
                </Button>
            </Box>
        );
    };

    export default FormComponent;
