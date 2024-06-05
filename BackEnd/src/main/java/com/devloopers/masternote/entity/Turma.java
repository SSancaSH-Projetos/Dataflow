package com.devloopers.masternote.entity;

import com.devloopers.masternote.dto.TurmaDTORequest;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

import java.util.List;

@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "turma")
public class Turma {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_turma")
    private Long id;

    @Column(name = "sigla")
    private String sigla;

    @JsonIgnore // Adicione esta anotação para evitar o looping infinito
    @ManyToOne
    @JoinColumn(name = "cursoId")
    private Curso curso;

    public Turma(Long id) {
        this.id = id;
    }

    @JsonIgnore // Adicione esta anotação para evitar o looping infinito
    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Aluno> alunos;

    @JsonIgnore // Adicione esta anotação para evitar o looping infinito
    @OneToMany(mappedBy = "turma", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Avaliacao> avaliacoes;

    public static Turma of(TurmaDTORequest turmaDTO) {
        Turma turma = new Turma();
        turma.setId(turmaDTO.getId());
        turma.setSigla(turmaDTO.getSigla());
        return turma;
    }
}

