package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.devloopers.masternote.dto.CriterioCriticoDTO;
import com.devloopers.masternote.entity.CriterioCritico;
import com.devloopers.masternote.repository.CriterioCriticoRepository;

@RestController
@RequestMapping("/cc")
public class CriterioCriticoResource {
	
	@Autowired
	private  CriterioCriticoRepository criterioCriticoRepository;
	
	@GetMapping
	public Iterable<CriterioCriticoDTO> findAll(){
		Iterable<CriterioCritico> ccs = criterioCriticoRepository.findAll();
		List<CriterioCriticoDTO> ccsDTO = new ArrayList<>();
		for(CriterioCritico cc : ccs) {
			CriterioCriticoDTO ccDTO = new CriterioCriticoDTO(cc);
			ccsDTO.add(ccDTO);
		}
		return ccsDTO;
	}
		
	@GetMapping("/pesquisaId/{id}")
	public CriterioCriticoDTO findById(@PathVariable Long id) {
		CriterioCritico cc = criterioCriticoRepository.findById(id).get();
		CriterioCriticoDTO ccDTO = new CriterioCriticoDTO(cc);
		return ccDTO;
	}
	
@PostMapping
	public CriterioCriticoDTO createCC(@RequestBody CriterioCriticoDTO ccDTO) {
		CriterioCritico cc = CriterioCritico.of(ccDTO);
		return new CriterioCriticoDTO(criterioCriticoRepository.save(cc));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<CriterioCriticoDTO> updateCC(@PathVariable Long id, @RequestBody CriterioCriticoDTO ccDTO) {
		Optional<CriterioCritico> ccOptional = criterioCriticoRepository.findById(id);
		
		if(ccOptional.isPresent()) {
			CriterioCritico cc = ccOptional.get();
			cc.setDescricao(ccDTO.getDescricao());
			criterioCriticoRepository.save(cc);
			return ResponseEntity.ok(new CriterioCriticoDTO(cc));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteCC(@PathVariable Long id) {
		criterioCriticoRepository.deleteById(id);
	}

}

