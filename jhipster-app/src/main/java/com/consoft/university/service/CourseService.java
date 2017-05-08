package com.consoft.university.service;

import com.consoft.university.domain.Course;
import java.util.List;
import java.util.Set;

/**
 * Service Interface for managing Course.
 */
public interface CourseService {
    
/* aggiunto io questo sotto*/    
   List<Course> findAllCoursesOfTheCurrentUser();
    //Set<Course> findAllCoursesOfTheCurrentUser();

    /**
     * Save a course.
     *
     * @param course the entity to save
     * @return the persisted entity
     */
    Course save(Course course);

    /**
     *  Get all the courses.
     *  
     *  @return the list of entities
     */
    List<Course> findAll();

    /**
     *  Get the "id" course.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Course findOne(Long id);

    /**
     *  Delete the "id" course.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
