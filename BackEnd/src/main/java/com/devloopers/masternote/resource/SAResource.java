package com.devloopers.masternote.resource;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.devloopers.masternote.dto.SADTORequest;
import com.devloopers.masternote.entity.UC;
import com.devloopers.masternote.repository.UCRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.devloopers.masternote.dto.SADTOResponse;
import com.devloopers.masternote.entity.SA;
import com.devloopers.masternote.repository.SARepository;

@RestController
@RequestMapping("/sa")
public class SAResource {
	@Autowired
	private  SARepository saRepository;
	@Autowired
	private UCRepository ucRepository;
	
	@GetMapping
	public Iterable<SADTOResponse> findAll(){
		Iterable<SA> sas = saRepository.findAll();
		List<SADTOResponse> sasDTO = new ArrayList<>();
		for(SA sa : sas) {
			SADTOResponse saDTO =  SADTOResponse.fromSA(sa);
			sasDTO.add(saDTO);
		}
		return  sasDTO;
	}
	
	
	@GetMapping("/pesquisaId/{id}")
	public SADTOResponse findById(@PathVariable Long id) {
		SA sa = saRepository.findById(id).get();
		SADTOResponse saDTO =  SADTOResponse.fromSA(sa);
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
	public ResponseEntity<?> createSA(@RequestBody SADTORequest saDTO) {
		SA sa = SA.of(saDTO);
		Optional<UC> ucRecebido = ucRepository.findById(saDTO.getUcId());
		if (ucRecebido.isPresent()) {
			sa.setUc(ucRecebido.get());
			saRepository.save(sa);
			return ResponseEntity.ok(SADTOResponse.fromSA(sa));
		} else {
			// Crie uma mensagem de erro ou objeto de erro adequado
			String errorMessage = "UC not found with id: " + saDTO.getUcId();
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
		}
	}


	@PutMapping("/update/{id}")
	public ResponseEntity<SADTOResponse> updateSA(@PathVariable Long id, @RequestBody SADTOResponse saDTO) {
		Optional<SA> saOptional = saRepository.findById(id);
		
		if(saOptional.isPresent()) {
			SA sa = saOptional.get();
			sa.setDescricao(saDTO.getDescricao());
			sa.setTipo(saDTO.getTipo());
			sa.setTitulo(saDTO.getTitulo());
			saRepository.save(sa);
			return ResponseEntity.ok(SADTOResponse.fromSA(sa));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@DeleteMapping("/delete/{id}")
	public void deleteSA(@PathVariable Long id) {
		saRepository.deleteById(id);
	}
}
