package com.devloopers.masternote.resource;

import java.security.PrivateKey;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.devloopers.masternote.dto.UCDTOResponse;
import com.devloopers.masternote.entity.Capacidade;
import com.devloopers.masternote.entity.Criterio;
import com.devloopers.masternote.repository.CapacidadeRepository;
import com.devloopers.masternote.repository.CursoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloopers.masternote.dto.UCDTORequest;
import com.devloopers.masternote.entity.UC;
import com.devloopers.masternote.repository.UCRepository;


@RestController
@RequestMapping("/uc")
public class UCResource {
	@Autowired
	private  UCRepository ucRepository;

	@Autowired
	private CursoRepository cursoRepository;

	@Autowired
	private CapacidadeRepository capacidadeRepository;
	
	@GetMapping
	public Iterable<UCDTOResponse> findAll(){
		Iterable<UC> ucs = ucRepository.findAll();
		List<UCDTOResponse> ucsDTO = new ArrayList<>();
		for(UC uc: ucs) {
			UCDTOResponse ucDTO = UCDTOResponse.fromUC(uc);
			ucsDTO.add(ucDTO);
		}
		return ucsDTO;
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public UCDTOResponse findById(@PathVariable Long id) {
		UC uc = ucRepository.findById(id).get();
		UCDTOResponse ucDTO =  UCDTOResponse.fromUC(uc);
		return ucDTO;
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<UC> findBySigla(@PathVariable String sigla){
		return ucRepository.findBySigla(sigla);
	}
	
	@PostMapping
	public UCDTOResponse createUC(@RequestBody UCDTORequest ucDTO) {
		UC uc = UC.of(ucDTO);
		cursoRepository.findById(ucDTO.getCurso())
				.ifPresentOrElse(uc::setCurso, () -> {
					throw new EntityNotFoundException("Curso não encontrado com o ID: " + ucDTO.getCurso());
				});

		return  UCDTOResponse.fromUC(ucRepository.save(uc));
	}
	@GetMapping("/pesquisaCapacidadesUc/{id}")
	public List<Capacidade> findByUcId(@PathVariable Long id){
		UC uc = new UC();
		uc.setId(id);
		return capacidadeRepository.findByUc(uc);
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<UCDTOResponse> updateUC(@PathVariable Long id, @RequestBody UCDTORequest ucDTO) {
		Optional<UC> ucOptional = ucRepository.findById(id);
		
		if(ucOptional.isPresent()) {
			UC uc = ucOptional.get();
			uc.setNomeUc(ucDTO.getNomeUC());
			uc.setSigla(ucDTO.getSigla());
			uc.setCargaHoraria(ucDTO.getCargaHoraria());
			uc.setModulo(ucDTO.getModulo());
			uc.setConhecimentos(ucDTO.getConhecimentos());
			ucRepository.save(uc);
			return ResponseEntity.ok(UCDTOResponse.fromUC(uc));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUC(@PathVariable Long id) {
		ucRepository.deleteById(id);
	}

}
