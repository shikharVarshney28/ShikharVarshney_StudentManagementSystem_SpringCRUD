package com.example.college.Cronteller;

import com.example.college.DTO.StudentDTO;
import com.example.college.Services.StudnetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
@CrossOrigin(origins = "http://localhost:5173/")
@RestController
public class getStudentCrontellor {
    @Autowired
    StudnetService studnetService;
    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> findStudentCrontller(){
        return ResponseEntity.ok(studnetService.fetchStudents());
    }

    @GetMapping("/students/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id){
        return ResponseEntity.ok(studnetService.findStudentByItsID(id));
    }

    @PostMapping("/students")
    public ResponseEntity<StudentDTO>addStudent(@RequestBody StudentDTO studentDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(studnetService.addStudent(studentDTO));
    }

    @DeleteMapping("/students/{id}")
    public ResponseEntity<Void> deleteTheStudent(@PathVariable Long id){
        studnetService.delete(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/students/{id}")
    public ResponseEntity<StudentDTO> update(@PathVariable long id,@RequestBody StudentDTO info){
        return ResponseEntity.ok(studnetService.update(id,info));
    }
}
