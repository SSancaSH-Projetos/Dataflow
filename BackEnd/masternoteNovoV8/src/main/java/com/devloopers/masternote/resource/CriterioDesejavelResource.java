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


import com.devloopers.masternote.dto.CriterioDesejavelDTO;
import com.devloopers.masternote.entity.CriterioDesejavel;
import com.devloopers.masternote.repository.CriterioDesejavelRepository;

@RestController
@RequestMapping("/cd")
public class CriterioDesejavelResource {
		
		@Autowired
		private  CriterioDesejavelRepository criterioDesejavelRepository;
		
		@GetMapping
		public Iterable<CriterioDesejavelDTO> findAll(){
			Iterable<CriterioDesejavel> cds = criterioDesejavelRepository.findAll();
			List<CriterioDesejavelDTO> cdsDTO = new ArrayList<>();
			for(CriterioDesejavel cd : cds) {
				CriterioDesejavelDTO cdDTO = new CriterioDesejavelDTO(cd);
				cdsDTO.add(cdDTO);
			}
			return cdsDTO;
		}
		
		
		@GetMapping("/pesquisaId/{id}")
		public CriterioDesejavelDTO findById(@PathVariable Long id) {
			CriterioDesejavel cd = criterioDesejavelRepository.findById(id).get();
			CriterioDesejavelDTO cdDTO = new CriterioDesejavelDTO(cd);
			return cdDTO;
		}
		
		@PostMapping
		public CriterioDesejavelDTO createCD(@RequestBody CriterioDesejavelDTO cdDTO) {
			CriterioDesejavel cd = CriterioDesejavel.of(cdDTO);
			return new CriterioDesejavelDTO(criterioDesejavelRepository.save(cd));
		}
		
		@PutMapping("/update/{id}")
		public ResponseEntity<CriterioDesejavelDTO> updateCD(@PathVariable Long id, @RequestBody CriterioDesejavelDTO cdDTO) {
			Optional<CriterioDesejavel> cdOptional = criterioDesejavelRepository.findById(id);
				
			if(cdOptional.isPresent()) {
				CriterioDesejavel cd = cdOptional.get();
				cd.setDescricao(cdDTO.getDescricao());
				criterioDesejavelRepository.save(cd);
				return ResponseEntity.ok(new CriterioDesejavelDTO(cd));
			} else {
				return ResponseEntity.notFound().build();
			}
		}
		
		@DeleteMapping("/delete/{id}")
		public void deleteCD(@PathVariable Long id) {
			criterioDesejavelRepository.deleteById(id);
		}
	}

