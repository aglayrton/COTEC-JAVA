package com.cotec.projeto.controller;

import com.cotec.projeto.dto.DadosPessoaDTO;
import com.cotec.projeto.services.PessoaService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RestController
@RequestMapping("/pessoas")
@CrossOrigin("*")
public class ControllerPessoa {

   @Autowired
    private PessoaService pessoaService;
    @GetMapping
    public ResponseEntity<Page<DadosPessoaDTO>> findAllPage(@PageableDefault(sort = {"nome"}) Pageable pageable){
        Page<DadosPessoaDTO> listaDTO = pessoaService.findAll(pageable);
        return ResponseEntity.ok().body(listaDTO);
    }

    @GetMapping("/{id}")
    public ResponseEntity<DadosPessoaDTO> buscarPorId(@PathVariable Long id){
        DadosPessoaDTO dto = pessoaService.findById(id);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping("/filtros")
    public ResponseEntity<Page<DadosPessoaDTO>> buscarPorFiltros(@RequestBody DadosPessoaDTO dadosPessoaDTO, @PageableDefault(sort = {"nome"}) Pageable pageable
                                                                 ){
        Page<DadosPessoaDTO> dto = pessoaService.findByFiltros(dadosPessoaDTO, pageable);
        return ResponseEntity.ok().body(dto);
    }

    @PostMapping
    public ResponseEntity<DadosPessoaDTO> cadastrar(@RequestBody @Valid DadosPessoaDTO dados){
        return ResponseEntity.ok(pessoaService.salvar(dados));
    }

    @PutMapping(value = "/{id}")
    public ResponseEntity<DadosPessoaDTO> atualizar(@RequestBody DadosPessoaDTO dadosPessoaDTO, @PathVariable Long id){
        DadosPessoaDTO dto = pessoaService.update(id, dadosPessoaDTO);
        return ResponseEntity.ok().body(dto);
    }

    @DeleteMapping(value = "/{id}")
    public ResponseEntity<Void> deleteById(@PathVariable Long id){
        pessoaService.delete(id);
        return ResponseEntity.ok().build();
    }

}
