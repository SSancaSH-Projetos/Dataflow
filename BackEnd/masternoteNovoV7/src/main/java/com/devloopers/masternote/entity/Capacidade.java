package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "capacidade")
public class Capacidade implements Serializable {
	private static final long serialVersionUID = 1L; 
	
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_capacidade")
    private Long id;

    private String descricao;

    private String tipo;
    
   // @ManyToOne
   // @JoinColumn(name = "capacidade_id_capacidade")
  //  private Capacidade capacidade;

    @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "uc_id_uc")
    private UC uc;
    
    @JsonIgnore
    @OneToMany(mappedBy = "capacidade")
    private List<CriterioCritico> criteriosCriticos;

    //@ManyToOne
    //@JoinColumn(name = "sa_id_sa")
   // private SA sa;

    // getters e setters
}

