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

@RestController
public class getStudentCrontellor {
    @Autowired
    StudnetService studnetService;
    @GetMapping("/getStudents")
    public ResponseEntity<List<StudentDTO>> findStudentCrontller(){
        return ResponseEntity.ok(studnetService.fetchStudents());
    }

    @GetMapping("/getStudent/{id}")
    public ResponseEntity<StudentDTO> getStudentById(@PathVariable Long id){
        return ResponseEntity.ok(studnetService.findStudentByItsID(id));
    }

    @PostMapping("/addStudent")
    public ResponseEntity<StudentDTO>addStudent(@RequestBody StudentDTO studentDTO){
        return ResponseEntity.status(HttpStatus.CREATED).body(studnetService.addStudent(studentDTO));
    }

    @DeleteMapping("/delete/{rollNo}")
    public ResponseEntity<Void> deleteTheStudent(@PathVariable Long rollNo){
        studnetService.delete(rollNo);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/update/{rollNo}")
    public ResponseEntity<StudentDTO> update(@PathVariable long rollNo,@RequestBody StudentDTO info){
        return ResponseEntity.ok(studnetService.update(rollNo,info));
    }

    @PatchMapping("/updateP/{rollNo}")
    public ResponseEntity<StudentDTO> updateP(@PathVariable long rollNo,@RequestBody Map<String,Object>info){
        return ResponseEntity.ok(studnetService.updatePartially(rollNo,info));
    }
}
