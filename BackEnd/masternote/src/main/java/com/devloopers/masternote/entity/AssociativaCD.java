package com.devloopers.masternote.entity;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinColumns;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "associativaCD")
public class AssociativaCD implements Serializable {
	private static final long serialVersionUID = 1L;
	@Id
    @ManyToOne
    @JoinColumns({
        @JoinColumn(name = "avaliacao_aluno_id", referencedColumnName = "aluno_id"),
        @JoinColumn(name = "avaliacao_sa_id_sa", referencedColumnName = "sa_id_sa")
    })
    private Avaliacao avaliacao;

    @Id
    @ManyToOne
    @JoinColumn(name = "criterio_desejavel_id_criterio_desejavel")
    private CriterioDesejavel criterioDesejavel;

    // getters e setters
}
