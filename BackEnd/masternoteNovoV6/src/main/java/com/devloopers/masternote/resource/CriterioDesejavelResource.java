package com.devloopers.masternote.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloopers.masternote.entity.CriterioDesejavel;
import com.devloopers.masternote.repository.CriterioDesejavelRepository;

@RestController
@RequestMapping("/cd")
public class CriterioDesejavelResource {
		
		@Autowired
		private  CriterioDesejavelRepository criterioDesejavelRepository;
		
		@GetMapping
		public Iterable<CriterioDesejavel> findAll(){
			return criterioDesejavelRepository.findAll();
		}
		
		
		@GetMapping("/pesquisaId/{id}")
		public CriterioDesejavel findById(@PathVariable Long id) {
			return criterioDesejavelRepository.findById(id).orElse(null);
		}
		
		@PostMapping
		public CriterioDesejavel createCD(@RequestBody CriterioDesejavel cd) {
			return criterioDesejavelRepository.save(cd);
		}
		
		@PutMapping("/update/{id}")
		public CriterioDesejavel updateCD(@PathVariable Long id, @RequestBody CriterioDesejavel cd) {
			cd.setId(id);
			return criterioDesejavelRepository.save(cd);
		}
		
		@DeleteMapping("/delete/{id}")
		public void deleteCD(@PathVariable Long id) {
			criterioDesejavelRepository.deleteById(id);
		}
	}

