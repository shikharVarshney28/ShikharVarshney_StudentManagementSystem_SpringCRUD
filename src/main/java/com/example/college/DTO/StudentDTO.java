package com.example.college.DTO;

import lombok.*;

@Data
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class StudentDTO {
    public String name;
    public String course;
    public long rollNo;
}
