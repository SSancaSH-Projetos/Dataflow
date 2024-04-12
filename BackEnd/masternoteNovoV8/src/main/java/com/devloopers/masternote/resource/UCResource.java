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

import com.devloopers.masternote.dto.UCDTO;
import com.devloopers.masternote.entity.UC;
import com.devloopers.masternote.repository.UCRepository;


@RestController
@RequestMapping("/uc")
public class UCResource {
	@Autowired
	private  UCRepository ucRepository;
	
	@GetMapping
	public Iterable<UCDTO> findAll(){
		Iterable<UC> ucs = ucRepository.findAll();
		List<UCDTO> ucsDTO = new ArrayList<>();
		for(UC uc: ucs) {
			UCDTO ucDTO = new UCDTO(uc);
			ucsDTO.add(ucDTO);
		}
		return ucsDTO;
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public UCDTO findById(@PathVariable Long id) {
		UC uc = ucRepository.findById(id).get();
		UCDTO ucDTO = new UCDTO(uc);
		return ucDTO;
	}
	
	@GetMapping("/pesquisaSigla/{sigla}")
	public Iterable<UC> findBySigla(@PathVariable String sigla){
		return ucRepository.findBySigla(sigla);
	}
	
	@PostMapping
	public UCDTO createUC(@RequestBody UCDTO ucDTO) {
		UC uc = UC.of(ucDTO);
		return new UCDTO(ucRepository.save(uc));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<UCDTO> updateUC(@PathVariable Long id, @RequestBody UCDTO ucDTO) {
		Optional<UC> ucOptional = ucRepository.findById(id);
		
		if(ucOptional.isPresent()) {
			UC uc = ucOptional.get();
			uc.setNomeUc(ucDTO.getNomeUc());
			uc.setSigla(ucDTO.getSigla());
			uc.setCargaHoraria(ucDTO.getCargaHoraria());
			uc.setModulo(ucDTO.getModulo());
			uc.setConhecimentos(ucDTO.getConhecimentos());
			ucRepository.save(uc);
			return ResponseEntity.ok(new UCDTO(uc));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteUC(@PathVariable Long id) {
		ucRepository.deleteById(id);
	}

}
