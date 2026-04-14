package com.example.college.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentSchema {
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private Long id;
    public String name;
    public long rollNo;
    public String course;
}
