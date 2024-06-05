package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.util.List;

import com.devloopers.masternote.dto.SADTORequest;
import com.devloopers.masternote.dto.SADTOResponse;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "sa")
public class SA implements Serializable {
	private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_sa")
    private Long id;

    private String titulo;

    private String descricao;

    private String tipo;

    public SA(Long id) {
        this.id = id;
    }

    @ManyToOne
    @JoinColumn(name = "uc_id_uc")
    private UC uc;

    @OneToMany(mappedBy = "sa", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Avaliacao> avaliacoes;


    
//    @ManyToMany
//    @JoinTable(name = "associativaCD",
//               joinColumns = @JoinColumn(name = "avaliacao_aluno_id"),
//               inverseJoinColumns = @JoinColumn(name = "avaliacao_sa_id_sa"))
//    private List<Aluno> alunosCD;
//
//    @ManyToMany
//    @JoinTable(name = "associativaCC",
//               joinColumns = @JoinColumn(name = "avaliacao_aluno_id"),
//               inverseJoinColumns = @JoinColumn(name = "avaliacao_sa_id_sa"))
//    private List<Aluno> alunos;

    // getters e setters
    
    public static SA of(SADTORequest saDTO) {
    	SA sa = new SA();
    	sa.setId(saDTO.getId());
    	sa.setTitulo(saDTO.getTitulo());
    	sa.setDescricao(saDTO.getDescricao());
    	sa.setTipo(saDTO.getTipo());
    	return sa;
    }
    
}

