package com.consoft.university.service.impl;

import com.consoft.university.service.ExamService;
import com.consoft.university.domain.Exam;
import com.consoft.university.repository.ExamRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Exam.
 */
@Service
@Transactional
public class ExamServiceImpl implements ExamService{

    private final Logger log = LoggerFactory.getLogger(ExamServiceImpl.class);
    
    private final ExamRepository examRepository;

    public ExamServiceImpl(ExamRepository examRepository) {
        this.examRepository = examRepository;
    }

    /**
     * Save a exam.
     *
     * @param exam the entity to save
     * @return the persisted entity
     */
    @Override
    public Exam save(Exam exam) {
        log.debug("Request to save Exam : {}", exam);
        Exam result = examRepository.save(exam);
        return result;
    }

    /**
     *  Get all the exams.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Exam> findAll() {
        log.debug("Request to get all Exams");
        List<Exam> result = examRepository.findAllWithEagerRelationships();

        return result;
    }

    /**
     *  Get one exam by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Exam findOne(Long id) {
        log.debug("Request to get Exam : {}", id);
        Exam exam = examRepository.findOneWithEagerRelationships(id);
        return exam;
    }

    /**
     *  Delete the  exam by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Exam : {}", id);
        examRepository.delete(id);
    }
}
