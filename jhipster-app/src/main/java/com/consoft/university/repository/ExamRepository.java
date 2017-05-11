package com.consoft.university.repository;

import com.consoft.university.domain.Exam;

import org.springframework.data.jpa.repository.*;

import java.util.List;

/**
 * Spring Data JPA repository for the Exam entity.
 */
@SuppressWarnings("unused")
public interface ExamRepository extends JpaRepository<Exam,Long> {

}
