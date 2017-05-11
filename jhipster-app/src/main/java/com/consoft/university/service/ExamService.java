package com.consoft.university.service;

import com.consoft.university.domain.Exam;
import java.util.List;

/**
 * Service Interface for managing Exam.
 */
public interface ExamService {

    /**
     * Save a exam.
     *
     * @param exam the entity to save
     * @return the persisted entity
     */
    Exam save(Exam exam);

    /**
     *  Get all the exams.
     *  
     *  @return the list of entities
     */
    List<Exam> findAll();

    /**
     *  Get the "id" exam.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    Exam findOne(Long id);

    /**
     *  Delete the "id" exam.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);
}
