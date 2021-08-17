package com.morpheus.Crud.repository;

import com.morpheus.Crud.model.Client;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

//Classe responsavel por comunicacar com banco e fazer query
@Repository
public interface ClientRepository extends JpaRepository<Client, Integer> {
    @Query("SELECT c FROM Client c where c.cpf = ?1 ")
    Optional<Client> findByCpf(String cpf);
}
