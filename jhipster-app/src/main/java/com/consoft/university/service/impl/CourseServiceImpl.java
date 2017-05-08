package com.consoft.university.service.impl;

import com.consoft.university.service.CourseService;
import com.consoft.university.domain.Course;
import com.consoft.university.domain.Student;
import com.consoft.university.repository.CourseRepository;
import java.util.ArrayList;
import java.util.HashSet;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

/**
 * Service Implementation for managing Course.
 */
@Service
@Transactional
public class CourseServiceImpl implements CourseService {

    private final Logger log = LoggerFactory.getLogger(CourseServiceImpl.class);

    private final CourseRepository courseRepository;

    public CourseServiceImpl(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    /**
     * Save a course.
     *
     * @param course the entity to save
     * @return the persisted entity
     */
    @Override
    public Course save(Course course) {
        log.debug("Request to save Course : {}", course);
        Course result = courseRepository.save(course);
        return result;
    }

    /**
     * Get all the courses.
     *
     * @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Course> findAll() {
        log.debug("Request to get all Courses");
        List<Course> result = courseRepository.findAll();

        return result;
    }

    /**
     * Get one course by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Course findOne(Long id) {
        log.debug("Request to get Course : {}", id);
        Course course = courseRepository.findOne(id);
        return course;
    }

    /**
     * Delete the course by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Course : {}", id);
        courseRepository.delete(id);
    }

    /*inventato io*/
 /* @Override
    public List<Course> findAllCoursesOfTheCurrentUser() {
        log.debug("Request to get the current Student ");
        List<Course> result = courseRepository.findAllCoursesOfTheCurrentUser();
        return result;
    }*/
    @Override
    public List<Course> findAllCoursesOfTheCurrentUser() {
        log.debug("Request to get the current Student ");
        //Set<Course> result = courseRepository.findAllCoursesOfTheCurrentUser();
        List<Student> result = courseRepository.findAllCoursesOfTheCurrentUser();
        List<Course> parsedResult = new ArrayList<Course>();
        Set<Course> myCourseSet = new HashSet<Course>();
        myCourseSet = result.get(0).getAttends();
        
        myCourseSet.forEach(c -> parsedResult.add(c));
        return parsedResult;
    }
}
