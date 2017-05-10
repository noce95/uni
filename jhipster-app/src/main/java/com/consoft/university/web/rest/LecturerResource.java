package com.consoft.university.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.consoft.university.domain.Lecturer;
import com.consoft.university.service.LecturerService;
import com.consoft.university.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Lecturer.
 */
@RestController
@RequestMapping("/api")
public class LecturerResource {

    private final Logger log = LoggerFactory.getLogger(LecturerResource.class);

    private static final String ENTITY_NAME = "lecturer";
        
    private final LecturerService lecturerService;

    public LecturerResource(LecturerService lecturerService) {
        this.lecturerService = lecturerService;
    }

    /**
     * POST  /lecturers : Create a new lecturer.
     *
     * @param lecturer the lecturer to create
     * @return the ResponseEntity with status 201 (Created) and with body the new lecturer, or with status 400 (Bad Request) if the lecturer has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/lecturers")
    @Timed
    public ResponseEntity<Lecturer> createLecturer(@Valid @RequestBody Lecturer lecturer) throws URISyntaxException {
        log.debug("REST request to save Lecturer : {}", lecturer);
        if (lecturer.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new lecturer cannot already have an ID")).body(null);
        }
        Lecturer result = lecturerService.save(lecturer);
        return ResponseEntity.created(new URI("/api/lecturers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /lecturers : Updates an existing lecturer.
     *
     * @param lecturer the lecturer to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated lecturer,
     * or with status 400 (Bad Request) if the lecturer is not valid,
     * or with status 500 (Internal Server Error) if the lecturer couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/lecturers")
    @Timed
    public ResponseEntity<Lecturer> updateLecturer(@Valid @RequestBody Lecturer lecturer) throws URISyntaxException {
        log.debug("REST request to update Lecturer : {}", lecturer);
        if (lecturer.getId() == null) {
            return createLecturer(lecturer);
        }
        Lecturer result = lecturerService.save(lecturer);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, lecturer.getId().toString()))
            .body(result);
    }

    /**
     * GET  /lecturers : get all the lecturers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of lecturers in body
     */
    @GetMapping("/lecturers")
    @Timed
    public List<Lecturer> getAllLecturers() {
        log.debug("REST request to get all Lecturers");
        return lecturerService.findAll();
    }

    /**
     * GET  /lecturers/:id : get the "id" lecturer.
     *
     * @param id the id of the lecturer to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the lecturer, or with status 404 (Not Found)
     */
    @GetMapping("/lecturers/{id}")
    @Timed
    public ResponseEntity<Lecturer> getLecturer(@PathVariable Long id) {
        log.debug("REST request to get Lecturer : {}", id);
        Lecturer lecturer = lecturerService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(lecturer));
    }

    /**
     * DELETE  /lecturers/:id : delete the "id" lecturer.
     *
     * @param id the id of the lecturer to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/lecturers/{id}")
    @Timed
    public ResponseEntity<Void> deleteLecturer(@PathVariable Long id) {
        log.debug("REST request to delete Lecturer : {}", id);
        lecturerService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
