package com.consoft.university.repository;

import com.consoft.university.domain.Exam;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * Spring Data JPA repository for the Exam entity.
 */
@SuppressWarnings("unused")
public interface ExamRepository extends JpaRepository<Exam,Long> {

    @Query("select distinct exam from Exam exam left join fetch exam.students")
    List<Exam> findAllWithEagerRelationships();

    @Query("select exam from Exam exam left join fetch exam.students where exam.id =:id")
    Exam findOneWithEagerRelationships(@Param("id") Long id);

}
