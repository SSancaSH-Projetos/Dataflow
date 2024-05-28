package com.devloopers.masternote.entity;


import com.devloopers.masternote.dto.CursoDTORequest;
import com.devloopers.masternote.dto.CursoDTOResponse;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

import lombok.NoArgsConstructor;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "curso")

public class Curso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_curso")
    private Long id;

    @Column(name = "nome_curso")
    private String nome;

    @Column(name = "carga_horaria")
    private Float cargaHoraria;

    @Column(name = "nivel")
    private String nivel;

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL,orphanRemoval = true)
    private List<UC> ucs;

    @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Avaliacao> avaliacoes;

   @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL,orphanRemoval = true)
   private List<Turma> turmas;

    public Curso(Long id) {
        this.id = id;
    }

    public static Curso of(CursoDTORequest cursoDTO) {
        Curso curso = new Curso();
        curso.setId(cursoDTO.getId());
        curso.setNome(cursoDTO.getNome());
        curso.setCargaHoraria(cursoDTO.getCargaHoraria());
        curso.setNivel(cursoDTO.getNivel());
        
        return curso;
    }


}