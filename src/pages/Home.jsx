import {
    Box,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    TablePagination,
    TextField
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ClearIcon from '@mui/icons-material/Clear';
import toast from 'react-hot-toast';

import localStorageService from '../utils/localStorage';
import WarningModal from '../components/WarningModal';
import InfoBox from '../components/InfoBox';
import HomePageSkeleton from '../components/skeletons/HomePageSkeleton';
import { deleteStudent, getStudents, deleteAllStudents } from "../utils/jsonServerApis"

const Home = () => {
    const navigate = useNavigate();

    const [students, setStudents] = useState([]);
    const [sortOrder, setSortOrder] = useState('asc');
    const [subjectSortOrder, setSubjectSortOrder] = useState('asc');
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const [openDialog, setOpenDialog] = useState(false);
    const [deleteTarget, setDeleteTarget] = useState(null);

    const [isNameSorted, setIsNameSorted] = useState(false);
    const [isSubjectSorted, setIsSubjectSorted] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        async function fetchStudents() {
            const data = await getStudents();
            console.log("Log from Home", data)
            setStudents(data)
        }

        fetchStudents();
        const delay = setTimeout(() => {
            setIsLoading(false);
        }, 500);

        return () => clearTimeout(delay);
    }, []);

    const handleConfirmDelete = (id = null) => {
        setDeleteTarget(id === null ? null : students.find((s) => s.id === id));
        setOpenDialog(true);
    };

    const handleDialogClose = () => {
        setOpenDialog(false);
        setDeleteTarget(null);
    };

    const handleDeleteConfirmed = async () => {
        if (deleteTarget === null) {
            await deleteAllStudents();
            const updated = await getStudents();
            setStudents(updated);
        } else {
            await deleteStudent(deleteTarget.id);
            const updated = await getStudents();
            setStudents(updated);
        }
        handleDialogClose();

    };


    const handleSearch = async (query) => {
        setSearchQuery(query);
        const stored = await getStudents() || [];
        setStudents(
            query.trim() === ''
                ? stored
                : stored.filter((student) =>
                    student.name.toLowerCase().includes(query.toLowerCase())
                )
        );
    };

    const clearSearch = async () => {
        setSearchQuery('');
        setIsNameSorted(false);
        setIsSubjectSorted(false);
        setSortOrder('asc');
        setSubjectSortOrder('asc');
        const originalData = await getStudents() || [];
        setStudents(originalData);
        toast.success('Filters cleared', {
            position: 'bottom-right',
            style: { fontSize: '1.2rem' }
        });
    };

    const sortStudents = (dir) => {
        if (students.length === 0) {
            toast.error('No student data available to sort', {
                position: 'bottom-right',
                style: { fontSize: '1.1rem' }
            });
            return;
        }
        setSortOrder(dir);
        setIsNameSorted(true);
        setIsSubjectSorted(false);
        const sorted = [...students].sort((a, b) =>
            dir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        );
        setStudents(sorted);
    };

    const sortBySubjects = (dir) => {
        if (students.length === 0) {
            toast.error('No student data available to sort', {
                position: 'bottom-right',
                style: { fontSize: '1.1rem' }
            });
            return;
        }
        setSubjectSortOrder(dir);
        setIsSubjectSorted(true);
        setIsNameSorted(false);
        const sorted = [...students].sort((a, b) => {
            const subjectA = a.subjects?.[0]?.toLowerCase() || '';
            const subjectB = b.subjects?.[0]?.toLowerCase() || '';
            return dir === 'asc' ?
                subjectA.localeCompare(subjectB) :
                subjectB.localeCompare(subjectA);
        });
        setStudents(sorted);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const paginatedStudents = students.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box sx={{ fontFamily: 'Arial, sans-serif', minHeight: 'fit-content', bgcolor: '#e0e0e0', px: { xs: 0.5, sm: 4 }, py: { xs: 1, sm: 3 } }}>
            {isLoading ? (<HomePageSkeleton />) : (<>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 3, mb: 2, px: 2 }}>
                    <InfoBox students={students} />
                </Box>

                <Box
                    sx={{
                        overflowX: 'auto',
                        mt: 2,
                        mb: 2,
                        mx: 'auto',
                        backgroundColor: '#fff',
                        borderRadius: 3,
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                        p: { xs: 2, sm: 3 },
                        px: 2,
                        width: '100%',
                        maxWidth: '1400px',
                        minWidth: { xs: '95vw', sm: 0 }
                    }}
                >
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            alignItems: { xs: 'stretch', sm: 'center' },
                            justifyContent: 'space-between',
                            gap: 2,
                            mb: 2,
                            width: '100%',
                        }}
                    >
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                            <TextField
                                variant="outlined"
                                size="small"
                                value={searchQuery}
                                onChange={(e) => handleSearch(e.target.value)}
                                placeholder="Search Students"
                                sx={{
                                    backgroundColor: '#fff',
                                    borderRadius: 1,
                                    width: { xs: '50%', sm: 250 },
                                }}
                            />

                            {(searchQuery || isNameSorted || isSubjectSorted) && (
                                <Box sx={{ width: { xs: '100%', sm: 'auto' } }}>
                                    <Button
                                        onClick={clearSearch}
                                        startIcon={<ClearIcon />}
                                        sx={{
                                            width: { xs: '50%', sm: 'auto' },
                                            px: 2,
                                            py: 1,
                                            height: 40,
                                            fontWeight: 600,
                                            textTransform: 'none',
                                            color: '#fff',
                                            backgroundColor: '#1976d2',
                                            borderRadius: 2,
                                            fontSize: { xs: '0.9rem', sm: '1rem' },
                                            '&:hover': {
                                                backgroundColor: '#115293',
                                            },
                                        }}
                                    >
                                        Clear Filter
                                    </Button>
                                </Box>
                            )}


                        </Box>

                        {students.length > 0 && (
                            <Button
                                variant="contained"
                                color="error"
                                onClick={() => handleConfirmDelete(null)}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    height: 40,
                                    px: 2,
                                    backgroundColor: '#d32f2f',
                                    '&:hover': { backgroundColor: '#c62828' },
                                    width: { xs: '50%', sm: 'auto' },
                                }}
                            >
                                <DeleteForeverIcon sx={{ marginRight: 1 }} />
                                Delete All
                            </Button>
                        )}
                    </Box>

                    <Table sx={{ minWidth: 1000, width: '100%' }}>
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#e3f2fd' }}>
                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        color: students.length === 0 ? '#aaa' : '#1565c0',
                                        cursor: students.length === 0 ? 'not-allowed' : 'pointer',
                                        userSelect: 'none',
                                        fontSize: 'h6.fontSize'
                                    }}
                                    onClick={() => {
                                        if (students.length > 0) {
                                            const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
                                            sortStudents(newOrder);
                                        } else {
                                            toast.error('No student data available to sort', {
                                                position: 'bottom-right',
                                                style: { fontSize: '1.1rem' }
                                            });
                                        }
                                    }}
                                >
                                    Name
                                    {sortOrder === 'asc' ? (
                                        <ArrowUpwardIcon sx={{ verticalAlign: 'middle', ml: 1, fontSize: 'h6.fontSize' }} />
                                    ) : (
                                        <ArrowDownwardIcon sx={{ verticalAlign: 'middle', ml: 1, fontSize: 'h6.fontSize' }} />
                                    )}
                                </TableCell>

                                <TableCell
                                    sx={{
                                        fontWeight: 'bold',
                                        color: students.length === 0 ? '#aaa' : '#1565c0',
                                        cursor: students.length === 0 ? 'not-allowed' : 'pointer',
                                        userSelect: 'none',
                                        fontSize: 'h6.fontSize'
                                    }}
                                    onClick={() => {
                                        if (students.length > 0) {
                                            const newOrder = subjectSortOrder === 'asc' ? 'desc' : 'asc';
                                            sortBySubjects(newOrder);
                                        } else {
                                            toast.error('No student data available to sort', {
                                                position: 'bottom-right',
                                                style: { fontSize: '1.1rem' }
                                            });
                                        }
                                    }}
                                >
                                    Subjects
                                    {subjectSortOrder === 'asc' ? (
                                        <ArrowUpwardIcon sx={{ verticalAlign: 'middle', ml: 1, fontSize: 'h6.fontSize' }} />
                                    ) : (
                                        <ArrowDownwardIcon sx={{ verticalAlign: 'middle', ml: 1, fontSize: 'h6.fontSize' }} />
                                    )}
                                </TableCell>

                                <TableCell sx={{
                                    fontWeight: 'bold',
                                    color: students.length === 0 ? '#aaa' : '#1565c0',
                                    cursor: students.length === 0 ? 'not-allowed' : 'default',
                                    userSelect: 'none',
                                    fontSize: 'h6.fontSize'
                                }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {paginatedStudents.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={3} align="center" sx={{ color: '#d32f2f', py: { xs: 2, sm: 4 }, fontSize: { xs: '0.95rem', sm: '1.1rem' } }}>
                                        No students found. Please add or refine your search.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                paginatedStudents.map((student) => (
                                    <TableRow
                                        key={student.id}
                                        hover
                                        sx={{
                                            '&:last-child td': { borderBottom: 0 },
                                            '&:hover': { backgroundColor: '#f9f9f9' },
                                            transition: 'background-color 0.3s',
                                        }}
                                    >
                                        <TableCell>{student.name}</TableCell>
                                        <TableCell>{student.subjects.join(', ')}</TableCell>
                                        <TableCell sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                variant="contained"
                                                onClick={() => navigate(`/edit-student/${student.id}`)}
                                                sx={{
                                                    minWidth: 36,
                                                    backgroundColor: '#1976d2',
                                                    '&:hover': { backgroundColor: '#1565c0' },
                                                    borderRadius: 1,
                                                    padding: '6px',
                                                }}
                                            >
                                                <EditIcon fontSize="small" />
                                            </Button>
                                            <Button
                                                variant="contained"
                                                onClick={() => handleConfirmDelete(student.id)}
                                                sx={{
                                                    minWidth: 36,
                                                    backgroundColor: '#d32f2f',
                                                    '&:hover': { backgroundColor: '#c62828' },
                                                    borderRadius: 1,
                                                    padding: '6px',
                                                }}
                                            >
                                                <DeleteIcon fontSize="small" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>

                    {students.length > 0 && (
                        <Box sx={{ display: 'flex', justifyContent: { xs: 'center', sm: 'flex-end' }, mt: 2 }}>
                            <TablePagination
                                component="div"
                                count={students.length}
                                page={page}
                                onPageChange={handleChangePage}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                rowsPerPageOptions={[5, 10, 15, 20]}
                            />
                        </Box>
                    )}
                </Box>

                <WarningModal
                    open={openDialog}
                    onClose={handleDialogClose}
                    onConfirm={handleDeleteConfirmed}
                    message={
                        deleteTarget === null
                            ? 'Are you sure you want to delete all students?'
                            : `Are you sure you want to delete ${deleteTarget.name}?`
                    }
                />
            </>
            )}

        </Box>
    );
};

export default Home;
