package com.consoft.university.web.rest;

import com.consoft.university.UniversityApp;

import com.consoft.university.domain.Exam;
import com.consoft.university.repository.ExamRepository;
import com.consoft.university.service.ExamService;
import com.consoft.university.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ExamResource REST controller.
 *
 * @see ExamResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = UniversityApp.class)
public class ExamResourceIntTest {

    private static final LocalDate DEFAULT_DATA = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DATA = LocalDate.now(ZoneId.systemDefault());

    private static final String DEFAULT_HOUR = "AAAAAAAAAA";
    private static final String UPDATED_HOUR = "BBBBBBBBBB";

    private static final String DEFAULT_CLASSROOM = "AAAAAAAAAA";
    private static final String UPDATED_CLASSROOM = "BBBBBBBBBB";

    private static final String DEFAULT_DURATION = "AAAAAAAAAA";
    private static final String UPDATED_DURATION = "BBBBBBBBBB";

    private static final LocalDate DEFAULT_DEADLINE = LocalDate.ofEpochDay(0L);
    private static final LocalDate UPDATED_DEADLINE = LocalDate.now(ZoneId.systemDefault());

    @Autowired
    private ExamRepository examRepository;

    @Autowired
    private ExamService examService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restExamMockMvc;

    private Exam exam;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        ExamResource examResource = new ExamResource(examService);
        this.restExamMockMvc = MockMvcBuilders.standaloneSetup(examResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Exam createEntity(EntityManager em) {
        Exam exam = new Exam()
            .data(DEFAULT_DATA)
            .hour(DEFAULT_HOUR)
            .classroom(DEFAULT_CLASSROOM)
            .duration(DEFAULT_DURATION)
            .deadline(DEFAULT_DEADLINE);
        return exam;
    }

    @Before
    public void initTest() {
        exam = createEntity(em);
    }

    @Test
    @Transactional
    public void createExam() throws Exception {
        int databaseSizeBeforeCreate = examRepository.findAll().size();

        // Create the Exam
        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isCreated());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeCreate + 1);
        Exam testExam = examList.get(examList.size() - 1);
        assertThat(testExam.getData()).isEqualTo(DEFAULT_DATA);
        assertThat(testExam.getHour()).isEqualTo(DEFAULT_HOUR);
        assertThat(testExam.getClassroom()).isEqualTo(DEFAULT_CLASSROOM);
        assertThat(testExam.getDuration()).isEqualTo(DEFAULT_DURATION);
        assertThat(testExam.getDeadline()).isEqualTo(DEFAULT_DEADLINE);
    }

    @Test
    @Transactional
    public void createExamWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = examRepository.findAll().size();

        // Create the Exam with an existing ID
        exam.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        // Validate the Alice in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void checkDataIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setData(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkHourIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setHour(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkClassroomIsRequired() throws Exception {
        int databaseSizeBeforeTest = examRepository.findAll().size();
        // set the field null
        exam.setClassroom(null);

        // Create the Exam, which fails.

        restExamMockMvc.perform(post("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isBadRequest());

        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllExams() throws Exception {
        // Initialize the database
        examRepository.saveAndFlush(exam);

        // Get all the examList
        restExamMockMvc.perform(get("/api/exams?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(exam.getId().intValue())))
            .andExpect(jsonPath("$.[*].data").value(hasItem(DEFAULT_DATA.toString())))
            .andExpect(jsonPath("$.[*].hour").value(hasItem(DEFAULT_HOUR.toString())))
            .andExpect(jsonPath("$.[*].classroom").value(hasItem(DEFAULT_CLASSROOM.toString())))
            .andExpect(jsonPath("$.[*].duration").value(hasItem(DEFAULT_DURATION.toString())))
            .andExpect(jsonPath("$.[*].deadline").value(hasItem(DEFAULT_DEADLINE.toString())));
    }

    @Test
    @Transactional
    public void getExam() throws Exception {
        // Initialize the database
        examRepository.saveAndFlush(exam);

        // Get the exam
        restExamMockMvc.perform(get("/api/exams/{id}", exam.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(exam.getId().intValue()))
            .andExpect(jsonPath("$.data").value(DEFAULT_DATA.toString()))
            .andExpect(jsonPath("$.hour").value(DEFAULT_HOUR.toString()))
            .andExpect(jsonPath("$.classroom").value(DEFAULT_CLASSROOM.toString()))
            .andExpect(jsonPath("$.duration").value(DEFAULT_DURATION.toString()))
            .andExpect(jsonPath("$.deadline").value(DEFAULT_DEADLINE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingExam() throws Exception {
        // Get the exam
        restExamMockMvc.perform(get("/api/exams/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateExam() throws Exception {
        // Initialize the database
        examService.save(exam);

        int databaseSizeBeforeUpdate = examRepository.findAll().size();

        // Update the exam
        Exam updatedExam = examRepository.findOne(exam.getId());
        updatedExam
            .data(UPDATED_DATA)
            .hour(UPDATED_HOUR)
            .classroom(UPDATED_CLASSROOM)
            .duration(UPDATED_DURATION)
            .deadline(UPDATED_DEADLINE);

        restExamMockMvc.perform(put("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedExam)))
            .andExpect(status().isOk());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeUpdate);
        Exam testExam = examList.get(examList.size() - 1);
        assertThat(testExam.getData()).isEqualTo(UPDATED_DATA);
        assertThat(testExam.getHour()).isEqualTo(UPDATED_HOUR);
        assertThat(testExam.getClassroom()).isEqualTo(UPDATED_CLASSROOM);
        assertThat(testExam.getDuration()).isEqualTo(UPDATED_DURATION);
        assertThat(testExam.getDeadline()).isEqualTo(UPDATED_DEADLINE);
    }

    @Test
    @Transactional
    public void updateNonExistingExam() throws Exception {
        int databaseSizeBeforeUpdate = examRepository.findAll().size();

        // Create the Exam

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restExamMockMvc.perform(put("/api/exams")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(exam)))
            .andExpect(status().isCreated());

        // Validate the Exam in the database
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteExam() throws Exception {
        // Initialize the database
        examService.save(exam);

        int databaseSizeBeforeDelete = examRepository.findAll().size();

        // Get the exam
        restExamMockMvc.perform(delete("/api/exams/{id}", exam.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Exam> examList = examRepository.findAll();
        assertThat(examList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Exam.class);
    }
}
