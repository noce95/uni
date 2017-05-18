package com.consoft.university.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.consoft.university.domain.Exam;
import com.consoft.university.service.ExamService;
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

/*aggiunte a caso*/
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.GrantedAuthority;
import java.util.ArrayList;
import com.consoft.university.security.AuthoritiesConstants;
import static com.sun.corba.se.spi.presentation.rmi.StubAdapter.request;
import java.io.*;
import java.net.*;
import java.util.Objects;
import javax.servlet.http.HttpServletRequest;
/* fino a qui*/

/**
 * REST controller for managing Exam.
 */
@RestController
@RequestMapping("/api")
public class ExamResource {

    private final Logger log = LoggerFactory.getLogger(ExamResource.class);

    private static final String ENTITY_NAME = "exam";
        
    private final ExamService examService;

    public ExamResource(ExamService examService) {
        this.examService = examService;
    }

    /**
     * POST  /exams : Create a new exam.
     *
     * @param exam the exam to create
     * @return the ResponseEntity with status 201 (Created) and with body the new exam, or with status 400 (Bad Request) if the exam has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/exams")
    @Timed
    public ResponseEntity<Exam> createExam(@Valid @RequestBody Exam exam) throws URISyntaxException {
        log.debug("REST request to save Exam : {}", exam);
        if (exam.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new exam cannot already have an ID")).body(null);
        }
        Exam result = examService.save(exam);
        return ResponseEntity.created(new URI("/api/exams/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /exams : Updates an existing exam.
     *
     * @param exam the exam to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated exam,
     * or with status 400 (Bad Request) if the exam is not valid,
     * or with status 500 (Internal Server Error) if the exam couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/exams")
    @Timed
    public ResponseEntity<Exam> updateExam(@Valid @RequestBody Exam exam) throws URISyntaxException {
        log.debug("REST request to update Exam : {}", exam);
        if (exam.getId() == null) {
            return createExam(exam);
        }
        Exam result = examService.save(exam);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, exam.getId().toString()))
            .body(result);
    }

    /**
     * GET  /exams : get all the exams.
     *
     * @param prova
     * @return the ResponseEntity with status 200 (OK) and the list of exams in body
     */
    
    @GetMapping("/exams")
    @Timed
   
    
    public List<Exam> getAllExams(@RequestParam(value="courseId") Long prova)   {
        
        System.out.println("ciao");
        System.out.println("courseId del resource");
        System.out.println(prova);
        System.out.println();
        //la parte sopra si può togliere, erano solo esperimenti per capire l'url, anche cio che passi si può togliere
        log.debug("REST request to get all Exams");
        log.debug("REST request to get all Course");
        List<Exam> allExamsList = new ArrayList<>(); //tutti gli esami
        List<Exam> examsList = new ArrayList<Exam>(); //solo quelli del corso, bisogna trovare il modo di passare un id
        allExamsList = examService.findAll();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = auth.getName();
        log.debug("authentication name: " + currentPrincipalName);
     
        log.debug("authorities: " + auth.getAuthorities().size());
        for(GrantedAuthority a : auth.getAuthorities()){
            log.debug(a.toString());
            if(a.getAuthority().equals(AuthoritiesConstants.ADMIN) || a.getAuthority().equals(AuthoritiesConstants.ADMOFFICE)){
              return allExamsList;  
            }
        }
        
        for(Exam e : allExamsList){
            if(Objects.equals(e.getCourse().getId(), prova) ) 
                examsList.add(e);
        }
        return examsList;
    }
    

    /**
     * GET  /exams/:id : get the "id" exam.
     *
     * @param id the id of the exam to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the exam, or with status 404 (Not Found)
     */
    

    @GetMapping("/exams/{id}")
    @Timed
    public ResponseEntity<Exam> getExam(@PathVariable Long id) {
        log.debug("REST request to get Exam : {}", id);
        Exam exam = examService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(exam));
    }
    
    
    /**
     * DELETE  /exams/:id : delete the "id" exam.
     *
     * @param id the id of the exam to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/exams/{id}")
    @Timed
    public ResponseEntity<Void> deleteExam(@PathVariable Long id) {
        log.debug("REST request to delete Exam : {}", id);
        examService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
