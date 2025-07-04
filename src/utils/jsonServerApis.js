import { toast } from 'react-hot-toast';
const BASE_URL = 'http://localhost:3000';

export const getStudents = async () => {
  try {
    const response = await fetch(`${BASE_URL}/students`);

    if (!response.ok) {
      throw new Error('Error while fetching all student');
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error('Error fetching students:', error);
    toast.error('Error fetching students');
    return [];
  }
}

export const addStudent = async (student) => {
  try {
    const response = await fetch(`${BASE_URL}/students`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error('Error while adding new student');
    }

    const data = await response.json();

    toast.success('Student added successfully', {
      position: 'bottom-right',
      style: { fontSize: '1.2rem' }
    });
    return data;

  } catch (error) {
    console.error('Error adding student:', error);
    toast.error('Error adding student');
    return null;
  }
}

export const updateStudent = async (student) => {
  try {
    // console.log(id)
    console.log(student)
    const response = await fetch(`${BASE_URL}/students/${student.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(student),
    });

    if (!response.ok) {
      throw new Error('Error while updating student');
    }

    const data = await response.json();

    toast.success('Student updated successfully', {
      position: 'bottom-right',
      style: { fontSize: '1.2rem' }
    });

    return data;

  } catch (error) {
    console.error('Error updating student:', error);
    toast.error('Error updating student');
    return null;
  }
}

export const deleteStudent = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/students/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Error while deleting student');
    }

    toast.success('Deleted successfully', {
      position: 'bottom-right',
      style: { fontSize: '1.2rem' }
    });
    return true;

  } catch (error) {
    console.error('Error deleting student:', error);
    toast.error('Error deleting student');
    return false;
  }
}

export const deleteAllStudents = async () => {
  try {
    const students = await getStudents();
    await Promise.all(
      students.map(student =>
        fetch(`${BASE_URL}/students/${student.id}`, { method: 'DELETE' })
      )
    ).then(() => {
      toast.success('Deleted successfully', {
        position: 'bottom-right',
        style: { fontSize: '1.2rem' }
      });
      return true;
    });

  } catch (error) {
    console.error("Error deleting all students:", error);
    toast.error("Error deleting all students!");
    return false;
  }
};

