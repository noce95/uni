package com.consoft.university.service.impl;

import com.consoft.university.service.LecturerService;
import com.consoft.university.domain.Lecturer;
import com.consoft.university.repository.LecturerRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Service Implementation for managing Lecturer.
 */
@Service
@Transactional
public class LecturerServiceImpl implements LecturerService{

    private final Logger log = LoggerFactory.getLogger(LecturerServiceImpl.class);
    
    private final LecturerRepository lecturerRepository;

    public LecturerServiceImpl(LecturerRepository lecturerRepository) {
        this.lecturerRepository = lecturerRepository;
    }

    /**
     * Save a lecturer.
     *
     * @param lecturer the entity to save
     * @return the persisted entity
     */
    @Override
    public Lecturer save(Lecturer lecturer) {
        log.debug("Request to save Lecturer : {}", lecturer);
        Lecturer result = lecturerRepository.save(lecturer);
        return result;
    }

    /**
     *  Get all the lecturers.
     *  
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<Lecturer> findAll() {
        log.debug("Request to get all Lecturers");
        List<Lecturer> result = lecturerRepository.findAll();

        return result;
    }

    /**
     *  Get one lecturer by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public Lecturer findOne(Long id) {
        log.debug("Request to get Lecturer : {}", id);
        Lecturer lecturer = lecturerRepository.findOne(id);
        return lecturer;
    }

    /**
     *  Delete the  lecturer by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Lecturer : {}", id);
        lecturerRepository.delete(id);
    }
}
