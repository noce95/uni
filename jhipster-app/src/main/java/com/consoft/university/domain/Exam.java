package com.consoft.university.domain;


import javax.persistence.*;
import javax.validation.constraints.*;
import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

/**
 * A Exam.
 */
@Entity
@Table(name = "exam")
public class Exam implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "data", nullable = false)
    private LocalDate data;

    @NotNull
    @Column(name = "hour", nullable = false)
    private String hour;

    @NotNull
    @Column(name = "classroom", nullable = false)
    private String classroom;

    @Column(name = "duration")
    private String duration;

    @Column(name = "deadline")
    private LocalDate deadline;

    @ManyToOne
    private Course course;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public LocalDate getData() {
        return data;
    }

    public Exam data(LocalDate data) {
        this.data = data;
        return this;
    }

    public void setData(LocalDate data) {
        this.data = data;
    }

    public String getHour() {
        return hour;
    }

    public Exam hour(String hour) {
        this.hour = hour;
        return this;
    }

    public void setHour(String hour) {
        this.hour = hour;
    }

    public String getClassroom() {
        return classroom;
    }

    public Exam classroom(String classroom) {
        this.classroom = classroom;
        return this;
    }

    public void setClassroom(String classroom) {
        this.classroom = classroom;
    }

    public String getDuration() {
        return duration;
    }

    public Exam duration(String duration) {
        this.duration = duration;
        return this;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public LocalDate getDeadline() {
        return deadline;
    }

    public Exam deadline(LocalDate deadline) {
        this.deadline = deadline;
        return this;
    }

    public void setDeadline(LocalDate deadline) {
        this.deadline = deadline;
    }

    public Course getCourse() {
        return course;
    }

    public Exam course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Exam exam = (Exam) o;
        if (exam.id == null || id == null) {
            return false;
        }
        return Objects.equals(id, exam.id);
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(id);
    }

    @Override
    public String toString() {
        return "Exam{" +
            "id=" + id +
            ", data='" + data + "'" +
            ", hour='" + hour + "'" +
            ", classroom='" + classroom + "'" +
            ", duration='" + duration + "'" +
            ", deadline='" + deadline + "'" +
            '}';
    }
}
