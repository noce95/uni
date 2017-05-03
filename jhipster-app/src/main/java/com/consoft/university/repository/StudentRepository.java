package com.consoft.university.repository;

import com.consoft.university.domain.Student;

import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import java.util.List;



/**
 * Spring Data JPA repository for the Student entity.
 */
@SuppressWarnings("unused")
public interface StudentRepository extends JpaRepository<Student,Long> {

    @Query("select distinct student from Student student left join fetch student.attends")
    List<Student> findAllWithEagerRelationships();

    @Query("select student from Student student left join fetch student.attends where student.id =:id")
    Student findOneWithEagerRelationships(@Param("id") Long id);
    
    /*aggiunte queste due righe*/
    @Query("select distinct student from Student student where student.user.login = ?#{principal.username}")
    List<Student> findByUserIsCurrentUser();

}
