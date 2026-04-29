package com.example.college.DTO;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    public Long id;
    public String name;
    public String course;
    public long rollNo;
    public String email;
}
