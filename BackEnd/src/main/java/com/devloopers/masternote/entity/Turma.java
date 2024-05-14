package com.devloopers.masternote.entity;


import com.devloopers.masternote.dto.TurmaDTO;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;


@Data
@Entity
@Table(name = "turma")
@SQLDelete(sql = "UPDATE table_product SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_turma")
    private Long id;

    @Column(name = "sigla")
    private String sigla;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "curso_id_curso")
    private Curso curso;

    @Column(name= "deletedT")
    private boolean deletedT = Boolean.FALSE;
    
//    @JsonIgnore
//    @ManyToMany(mappedBy = "turmas")
//    private List<Aluno> alunos;

   //@OneToMany(mappedBy = "turma")
    //private List<Aluno> alunos;

    // Getters and Setters
    
    public static Turma of(TurmaDTO turmaDTO) {
    	Turma turma = new Turma();
    	turma.setId(turmaDTO.getId());
    	turma.setSigla(turmaDTO.getSigla());
        turma.setDeletedT(turmaDTO.isDeletedT());
    	return turma;
    }
}