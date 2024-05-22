package com.devloopers.masternote.entity;

import java.io.Serializable;
import java.sql.Date;

import com.devloopers.masternote.dto.AvaliacaoDTORequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;

@Data
@Entity
@Table(name = "avaliacao")
public class Avaliacao implements Serializable {
	private static final long serialVersionUID = 1L;
	
	 @Id
	 @GeneratedValue(strategy = GenerationType.IDENTITY)
	 @Column(name = "id_avaliacao")
	 private Long id;
	 
	 @Column(name= "data_avaliacao")
	 private Date data;
	 
	 @Column(name = "resultado")
	 private Boolean resultado;
	 
	 @ManyToOne
	 @JoinColumn(name= "curso_id")
	 private Curso curso;
	
	 @ManyToOne
	 @JoinColumn(name= "turma_id")
	 private Turma turma;
	 
	 @ManyToOne
	 @JoinColumn(name= "uc_id")
	 private UC uc;
	 
    @ManyToOne
    @JoinColumn(name = "aluno_id")
	private Aluno aluno;
	
	@ManyToOne
	@JoinColumn(name = "capacidade_id")
	private Capacidade capacidade;
		
	
     @ManyToOne
    @JoinColumn(name = "criterio_id")
    private Criterio criterio;
    
    @ManyToOne
    @JoinColumn(name = "sa_id")
    private SA Sa;
        
    
    
    
        
    
    public static Avaliacao of(AvaliacaoDTORequest avaliacaoDTO) {
    	Avaliacao avaliacao = new Avaliacao();
    	avaliacao.setId(avaliacaoDTO.getId());
    	avaliacao.setCurso(avaliacaoDTO.getCurso());
    	avaliacao.setTurma(avaliacaoDTO.getTurma());
    	avaliacao.setUc(avaliacaoDTO.getUc());
    	avaliacao.setSa(avaliacaoDTO.getSa());
    	avaliacao.setCapacidade(avaliacaoDTO.getCapacidade());
    	avaliacao.setCriterio(avaliacaoDTO.getCriterio());
    	avaliacao.setAluno(avaliacaoDTO.getAluno());
    	avaliacao.setResultado(avaliacaoDTO.getResultado());
    	avaliacao.setData(avaliacaoDTO.getData());
    	return avaliacao;
    }
   
}
