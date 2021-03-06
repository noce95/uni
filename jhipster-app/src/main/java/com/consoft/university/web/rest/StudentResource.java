package com.consoft.university.web.rest;

import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;

import com.consoft.university.domain.Authority;
import com.consoft.university.domain.User;
import com.consoft.university.repository.UserRepository;
import com.consoft.university.security.AuthoritiesConstants;
import com.consoft.university.service.UserService;
import com.consoft.university.service.dto.UserDTO;

import com.codahale.metrics.annotation.Timed;
import com.consoft.university.domain.Student;
import com.consoft.university.service.StudentService;
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


/* da qui agginti con mail*/
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import com.consoft.university.service.UserService;
import org.springframework.security.core.GrantedAuthority;
import java.util.ArrayList;
/* fino a qui*/


/**
 * REST controller for managing Student.
 */
@RestController
@RequestMapping("/api")
public class StudentResource {

    private final Logger log = LoggerFactory.getLogger(StudentResource.class);

    private static final String ENTITY_NAME = "student";
        
    private final StudentService studentService;

    @Autowired
    private UserService userService;
    
    public StudentResource(StudentService studentService) {
        this.studentService = studentService;
    }

    /**
     * POST  /students : Create a new student.
     *
     * @param student the student to create
     * @return the ResponseEntity with status 201 (Created) and with body the new student, or with status 400 (Bad Request) if the student has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/students")
    @Timed
    public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) throws URISyntaxException {
        log.debug("REST request to save Student : {}", student);
        if (student.getId() != null) {
            return ResponseEntity.badRequest().headers(HeaderUtil.createFailureAlert(ENTITY_NAME, "idexists", "A new student cannot already have an ID")).body(null);
        }
        
        /*L'utente associato allo studente creato dovrà cambiare il suo ruolo da USER->STUDENT */
        User user = userService.getUserWithAuthorities();
        Set<Authority> authorities = new HashSet<>();
        Authority a = new Authority();
        a.setName(AuthoritiesConstants.STUDENT);
        authorities.add(a);
        user.setAuthorities(authorities);
        log.debug("User id: " + user.getId());
        UserDTO userDto = new UserDTO(user);
        userService.updateUser(userDto);
        
        Student result = studentService.save(student);
        return ResponseEntity.created(new URI("/api/students/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /students : Updates an existing student.
     *
     * @param student the student to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated student,
     * or with status 400 (Bad Request) if the student is not valid,
     * or with status 500 (Internal Server Error) if the student couldnt be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/students")
    @Timed
    public ResponseEntity<Student> updateStudent(@Valid @RequestBody Student student) throws URISyntaxException {
        log.debug("REST request to update Student : {}", student);
        if (student.getId() == null) {
            return createStudent(student);
        }
        Student result = studentService.save(student);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, student.getId().toString()))
            .body(result);
    }

    /**
     * GET  /students : get all the students.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of students in body
     */
    @GetMapping("/students")
    @Timed
    
/*sostituito con quello dopo*//*
    public List<Student> getAllStudents() {
        log.debug("REST request to get all Students");
        return studentService.findAll();
    }*/
    
/*aggiunta questa funzione da mail*/
    public List<Student> getAllStudents() {
        log.debug("REST request to get all Students");
        List<Student> studentList = new ArrayList<Student>();
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        String currentPrincipalName = auth.getName();
        log.debug("authentication name: " + currentPrincipalName);
        //String currentPrincipalName = authentication.getName();
        //if(currentPrincipalName.equals("admin")){
        log.debug("authorities: "+auth.getAuthorities().size());
        for(GrantedAuthority a : auth.getAuthorities()){
            log.debug(a.toString());
            if(a.getAuthority().equals(AuthoritiesConstants.ADMIN) || a.getAuthority().equals(AuthoritiesConstants.ADMOFFICE)){
              return studentService.findAll();  
            }
        }
                
        studentList=studentService.findByUserIsCurrentUser();
        return studentList;

    }
    
/*fin qui*/

    /**
     * GET  /students/:id : get the "id" student.
     *
     * @param id the id of the student to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the student, or with status 404 (Not Found)
     */
    @GetMapping("/students/{id}")
    @Timed
    public ResponseEntity<Student> getStudent(@PathVariable Long id) {
        log.debug("REST request to get Student : {}", id);
        Student student = studentService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(student));
    }

    /**
     * DELETE  /students/:id : delete the "id" student.
     *
     * @param id the id of the student to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/students/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        log.debug("REST request to delete Student : {}", id);
        studentService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }

}
