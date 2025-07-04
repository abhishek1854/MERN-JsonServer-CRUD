import React, { useEffect, useState, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import FormComponent from '../components/Form';
import { toast } from 'react-hot-toast';
import FormSkeleton from '../components/skeletons/FromSkeleton';
import { addStudent, getStudents, updateStudent } from '../utils/jsonServerApis';

const FormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ name: '', subjects: [] });
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const isEditMode = Boolean(id);
    const hasShownToast = useRef(false);

    useEffect(() => {
        async function fetchStudent() {
            const data = await getStudents();
            setStudents(data);

            if (isEditMode) {
                const student = data.find((s) => String(s.id) === String(id));
                console.log(student)
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
            setLoading(false);
        }

        fetchStudent();
    }, [id, isEditMode, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim() || formData.subjects.length === 0) {
            toast.error('Please fill in all fields.', {
                position: 'bottom-right',
                style: { fontSize: '1.2rem' }
            });
            return;
        }

        if (isEditMode) {
            console.log("formData", formData)
            const data = await updateStudent(formData);
            if (data) {
                const updated = students.map((s) =>
                    String(s.id) === String(id) ? { ...s, ...formData } : s
                );
                setStudents(updated);

            }
        } else {
            const newStudent = { ...formData, id: String(Date.now()) };
            const response = await addStudent(newStudent);
            if (response) {
                setStudents([...students, response]);

            }
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
