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

import com.devloopers.masternote.dto.SADTO;
import com.devloopers.masternote.entity.SA;
import com.devloopers.masternote.repository.SARepository;

@RestController
@RequestMapping("/sa")
public class SAResource {
	@Autowired
	private  SARepository saRepository;
	
	@GetMapping
	public Iterable<SADTO> findAll(){
		Iterable<SA> sas = saRepository.findAll();
		List<SADTO> sasDTO = new ArrayList<>();
		for(SA sa : sas) {
			SADTO saDTO = new SADTO(sa);
			sasDTO.add(saDTO);
		}
		return  sasDTO;
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public SADTO findById(@PathVariable Long id) {
		SA sa = saRepository.findById(id).get();
		SADTO saDTO = new SADTO (sa);
		return saDTO;
	}
	
	@GetMapping("/pesquisaTitulo/{titulo}")
	public Iterable<SA> findByTitulo(@PathVariable String titulo){
		return saRepository.findByTitulo(titulo);
	}
	
	@GetMapping("/pesquisaTipo/{tipo}")
	public Iterable<SA> findByTipo(@PathVariable String tipo){
		return saRepository.findByTipo(tipo);
	}
	
	@PostMapping
	public SADTO createSA(@RequestBody SADTO saDTO) {
		SA sa = SA.of(saDTO);
		return new SADTO(saRepository.save(sa));
	}
	
	@PutMapping("/update/{id}")
	public ResponseEntity<SADTO> updateSA(@PathVariable Long id, @RequestBody SADTO saDTO) {
		Optional<SA> saOptional = saRepository.findById(id);
		
		if(saOptional.isPresent()) {
			SA sa = saOptional.get();
			sa.setDescricao(saDTO.getDescricao());
			sa.setTipo(saDTO.getTipo());
			sa.setTitulo(saDTO.getTitulo());
			saRepository.save(sa);
			return ResponseEntity.ok(new SADTO(sa));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteSA(@PathVariable Long id) {
		saRepository.deleteById(id);
	}
}
