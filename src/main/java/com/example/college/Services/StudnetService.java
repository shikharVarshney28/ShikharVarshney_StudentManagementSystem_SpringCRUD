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
    public void delete(Long rollNo) {
        if(studentRepository.existsByRollNo(rollNo))
            studentRepository.deleteByRollNo(rollNo);
    }

    public StudentDTO update(long rollNo, StudentDTO info) {
        StudentSchema exitsStudent = studentRepository.findByRollNo(rollNo);
        modelMapper.map(info, exitsStudent);
        studentRepository.save(exitsStudent);
        return info;
    }

    public StudentDTO updatePartially(long rollNo, Map<String, Object> info) {
        StudentSchema existingStudent = studentRepository.findByRollNo(rollNo);
        info.forEach((key,value)->{
            switch(key){
                case "name" : existingStudent.setName((String)value);break;
                case "rollNo":
                    // Fix: Cast to Number first, then get longValue
                    if (value instanceof Number) {
                        existingStudent.setRollNo(((Number) value).longValue());
                    }
                    break;
                case "course" : existingStudent.setCourse((String)value);break;
                default : throw new IllegalArgumentException("Not a feild");
            }
        });
        studentRepository.save(existingStudent);
        return modelMapper.map(existingStudent,StudentDTO.class);
    }
}
