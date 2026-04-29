package com.example.college.Services;

import com.example.college.DTO.StudentDTO;
import com.example.college.Entity.StudentSchema;
import com.example.college.Repository.studentRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StudnetService {
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    studentRepository studentRepository;
    public List<StudentDTO> fetchStudents(){
        List<StudentSchema> studentSchema = studentRepository.findAll();
        System.out.println(studentSchema);
        List<StudentDTO> dto = studentSchema.stream().map(student->modelMapper.map(student,StudentDTO.class)).toList();
        return dto;
    }

    public StudentDTO findStudentByItsID(Long id) {
        StudentSchema student = studentRepository.findById(id).orElseThrow(()-> new IllegalArgumentException("No student found"));
        return modelMapper.map(student,StudentDTO.class);
    }

    public StudentDTO addStudent(StudentDTO studentDTO) {
        StudentSchema newStudent =modelMapper.map(studentDTO, StudentSchema.class);
        studentRepository.save(newStudent);
        return studentDTO;
    }
    public void delete(Long id) {
        if(studentRepository.existsById(id))
            studentRepository.deleteById(id);
    }

    public StudentDTO update(long id, StudentDTO info) {
        StudentSchema exitsStudent = studentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Map fields from DTO to Entity
        modelMapper.map(info, exitsStudent);

        // Ensure the ID remains the one from the Path Variable
        exitsStudent.setId(id);

        studentRepository.save(exitsStudent);
        return modelMapper.map(exitsStudent, StudentDTO.class);
    }
}
