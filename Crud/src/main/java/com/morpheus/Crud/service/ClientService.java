package com.morpheus.Crud.service;

import com.morpheus.Crud.model.Client;

import java.util.List;

public interface ClientService {
    Client findById(Integer id);
    Client findByCpf(String cpf);
    List<Client> findAllClient();
    Client saveClient( Client client);
    void deleteClient( Integer id);
    void updateClient( Client client);
}
