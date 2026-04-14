package com.example.college.Repository;

import com.example.college.Entity.StudentSchema;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;
import java.util.List;

@Repository
public interface studentRepository extends JpaRepository<StudentSchema, Long> {
    @Transactional
    void deleteByRollNo(long rollNo);
    @Transactional
    boolean existsByRollNo(Long rollNo);
    @Transactional
    StudentSchema findByRollNo(long rollNo);
}
