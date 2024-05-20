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
import lombok.Data;

import java.util.List;

import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.Where;

@Data
@Entity
@Table(name = "curso")
@SQLDelete(sql = "UPDATE table_product SET deleted = true WHERE id=?")
@Where(clause = "deleted=false")
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

    @Column(name= "deleted")
    private boolean deleted = Boolean.FALSE;

   @OneToMany(mappedBy = "curso", cascade = CascadeType.ALL,orphanRemoval = true)
   private List<Turma> turmas;

    public static Curso of(CursoDTORequest cursoDTO) {
        Curso curso = new Curso();
        curso.setId(cursoDTO.getId());
        curso.setNome(cursoDTO.getNome());
        curso.setCargaHoraria(cursoDTO.getCargaHoraria());
        curso.setNivel(cursoDTO.getNivel());
        curso.setDeleted (cursoDTO.isDeleted());
        return curso;
    }


}