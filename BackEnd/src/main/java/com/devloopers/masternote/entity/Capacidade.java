package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.util.List;

import com.devloopers.masternote.dto.CapacidadeDTORequest;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
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
@Table(name = "capacidade")
public class Capacidade implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_capacidade")
    private Long id;

    private String descricao;

    private String tipo;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "uc_id")
    private UC uc;

    
    @OneToMany(mappedBy = "capacidade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Criterio> criterios;

    @JsonIgnore
    @OneToMany(mappedBy = "capacidade", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Avaliacao> avaliacoes;

    // getters e setters

    public Capacidade(Long id) {
        this.id = id;
    }

    public static Capacidade of(CapacidadeDTORequest capacidadeDTO) {
        Capacidade capacidade = new Capacidade();
        capacidade.setId(capacidadeDTO.getId());
        capacidade.setDescricao(capacidadeDTO.getDescricao());
        capacidade.setTipo(capacidadeDTO.getTipo());
        return capacidade;
    }

    @Override
    public String toString() {
        return "Capacidade{" +
                "id=" + id +
                ", descricao='" + descricao + '\'' +
                ", tipo='" + tipo + '\'' +
                '}';
    }
}
