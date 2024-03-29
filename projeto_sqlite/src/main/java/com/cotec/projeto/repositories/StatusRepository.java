package com.cotec.projeto.repositories;

import com.cotec.projeto.entities.Status;
import com.cotec.projeto.util.StatusDescricao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface StatusRepository extends JpaRepository<Status, Long> {
    Optional<Status> findByDescricao(StatusDescricao status);
}
