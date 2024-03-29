package com.cotec.projeto.services;

import com.cotec.projeto.dto.DadosPessoaDTO;
import com.cotec.projeto.dto.StatusDTO;
import com.cotec.projeto.entities.Pessoa;
import com.cotec.projeto.entities.Status;
import com.cotec.projeto.repositories.PessoaRepository;
import com.cotec.projeto.repositories.StatusRepository;
import com.cotec.projeto.services.exceptions.DataBaseException;
import com.cotec.projeto.services.exceptions.EntityNotFoundException;
import com.cotec.projeto.util.StatusDescricao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.ExampleMatcher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;


@Service
@Transactional(readOnly = false)
public class PessoaService {

    @Autowired
    private  PessoaRepository pessoaRepository;
    @Autowired
    private StatusRepository statusRepository;

    @Transactional(readOnly = true)
    public Page<DadosPessoaDTO> findAll(Pageable pageable){
        Page<Pessoa> pessoas = pessoaRepository.findAll(pageable);
        return pessoas.map(x -> new DadosPessoaDTO(x.getId(), x.getNome(), x.getSobrenome(), x.getCpf(), new StatusDTO(x.getStatus().getDescricao()), x.getDataCadastro()));
    }

    @Transactional(readOnly = true)
    public DadosPessoaDTO findById(Long id){
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);
        Pessoa pessoa = pessoaOptional.orElseThrow(()->new EntityNotFoundException("Pessoa não encontrado"));
        return new DadosPessoaDTO(pessoa.getId(), pessoa.getNome(), pessoa.getSobrenome(), pessoa.getCpf(), new StatusDTO(pessoa.getStatus().getDescricao()), pessoa.getDataCadastro());
    }

    public DadosPessoaDTO salvar(DadosPessoaDTO dadosPessoaDTO){
        Pessoa pessoa = new Pessoa();
        copiaDTOParaEntidade(dadosPessoaDTO,  pessoa);
        Pessoa pessoaSalva = pessoaRepository.save(pessoa);
        return new DadosPessoaDTO(pessoaSalva.getId(), pessoaSalva.getNome(), pessoaSalva.getSobrenome(), pessoaSalva.getCpf(), new StatusDTO(pessoaSalva.getStatus().getDescricao()), pessoaSalva.getDataCadastro());
    }

    public DadosPessoaDTO update(Long id, DadosPessoaDTO dadosPessoaDTO) {
        Optional<Pessoa> pessoaOptional = pessoaRepository.findById(id);
        Pessoa pessoa = pessoaOptional.orElseThrow(()->new EntityNotFoundException("Pessoa não encontada"));
        copiaDTOParaEntidade(dadosPessoaDTO,  pessoa);
        Pessoa pessoaSalva = pessoaRepository.save(pessoa);
        return new DadosPessoaDTO(pessoaSalva.getId(), pessoaSalva.getNome(), pessoaSalva.getSobrenome(), pessoaSalva.getCpf(), new StatusDTO(pessoaSalva.getStatus().getDescricao()), pessoaSalva.getDataCadastro());
    }

    public void copiaDTOParaEntidade(DadosPessoaDTO dadosPessoaIdDTO, Pessoa pessoa){
        pessoa.setNome(dadosPessoaIdDTO.nome());
        pessoa.setSobrenome(dadosPessoaIdDTO.sobrenome());
        pessoa.setCpf(dadosPessoaIdDTO.cpf());
        Optional<Status> statusOptional = statusRepository.findByDescricao(dadosPessoaIdDTO.status().descricao());
        Status status = statusOptional.orElseThrow(()->new EntityNotFoundException("Id não encontrada"));
        pessoa.setStatus(status);
    }

    @Transactional
    public void delete(long id){
        Pessoa pessoa = pessoaRepository.findById(id).orElseThrow(()->new EntityNotFoundException("Id não encontrado"));

            if(pessoa.getStatus().getDescricao().equals(StatusDescricao.INATIVO)){
                pessoaRepository.deleteById(id);
            }else{
                throw new DataBaseException("Usuário ativo, não pode ser excluído");
            }
    }

    public Page<DadosPessoaDTO> findByFiltros(DadosPessoaDTO dadosPessoaDTO, Pageable pageable) {
        Pessoa pessoa = new Pessoa(dadosPessoaDTO);
        ExampleMatcher matcher = ExampleMatcher.matching()
                .withStringMatcher(ExampleMatcher.StringMatcher.CONTAINING)   // Match string containing pattern
                .withIgnoreCase();
        return pessoaRepository.findAll(Example.of(pessoa, matcher), pageable).map(x->
             new DadosPessoaDTO(x.getId(), x.getNome(), x.getSobrenome(), x.getCpf(), new StatusDTO(x.getStatus().getDescricao()), x.getDataCadastro()));
    }
}
