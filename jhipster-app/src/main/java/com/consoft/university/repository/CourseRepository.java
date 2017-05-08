package com.consoft.university.repository;

import com.consoft.university.domain.Course;
import com.consoft.university.domain.Student;

import org.springframework.data.jpa.repository.*;

import java.util.List;
import java.util.Set;

/**
 * Spring Data JPA repository for the Course entity.
 */
@SuppressWarnings("unused")
public interface CourseRepository extends JpaRepository<Course,Long> {
    
    
    /*@Query("select c "
            + "from Course c "
            + "where c.id join sa.attends_id and sa.student_id =(select student_id "
                                                           + "from Student s "
                                                           + "where userid=?#{principal.username}) ")
    List<Course> findAllCoursesOfTheCurrentUser();*/
    
      @Query("select distinct student from Student student left join fetch student.attends "
              +"where student.user.login = ?#{principal.username}")
    List<Student> findAllCoursesOfTheCurrentUser();
    
/*
    @Query("select distinct student from Student student where student.user.login = ?#{principal.username} ")
    List<Course> findAllCoursesOfTheCurrentUser();
    */
}
