import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import localStorageService from '../utils/localStorage';
import FormComponent from '../components/Form';
import { toast } from 'react-hot-toast';
import FormSkeleton from '../components/skeletons/FromSkeleton';

const FormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', subjects: [] });
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const isEditMode = Boolean(id);
    const hasShownToast = useRef(false);

    useEffect(() => {
        const data = localStorageService.getElement('studentData') || [];
        setStudents(data);

        if (isEditMode) {
            const student = data.find((s) => String(s.id) === String(id));
            if (student) {
                setFormData(student);
            } else if (!hasShownToast.current) {
                toast.error('Student not found', {
                    position: 'bottom-right',
                    style: { fontSize: '1.2rem' }
                });
                hasShownToast.current = true;
                navigate('/');
            }
        }
        const delay = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(delay);
    }, [id, isEditMode, navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name.trim() || formData.subjects.length === 0) {
            toast.error('Please fill in all fields.', {
                position: 'bottom-right',
                style: { fontSize: '1.2rem' }
            });
            return;
        }

        if (isEditMode) {
            const updated = students.map((s) =>
                String(s.id) === String(id) ? { ...s, ...formData } : s
            );
            localStorageService.setElement('studentData', updated);
            setStudents(updated);
            toast.success('Student updated successfully', {
                position: 'bottom-right',
                style: { fontSize: '1.2rem' }
            });
        } else {
            const newStudent = { ...formData, id: Date.now() };
            const updated = [...students, newStudent];
            localStorageService.setElement('studentData', updated);
            setStudents(updated);
            toast.success('Student added successfully', {
                position: 'bottom-right',
                style: { fontSize: '1.2rem' }
            });
        }

        navigate('/');
    };

    return (
        <>
            {loading ? (
                <FormSkeleton />
            ) : (
                <FormComponent
                    formData={formData}
                    setFormData={setFormData}
                    onSubmit={handleSubmit}
                    title={isEditMode ? 'Update Student' : 'Add Student'}
                    btnText={isEditMode ? 'Update' : 'Add'}
                />
            )}
        </>
    );
};

export default FormPage;
