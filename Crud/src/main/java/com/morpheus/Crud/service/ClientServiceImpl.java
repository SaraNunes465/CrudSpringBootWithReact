package com.morpheus.Crud.service;

import com.morpheus.Crud.model.Client;
import com.morpheus.Crud.repository.ClientRepository;
import com.morpheus.Crud.service.exceptions.ObjectNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

//Classe responsavel por fazer a regra de negocio do servidor
@Service
public class ClientServiceImpl implements ClientService {

    @Autowired
    private ClientRepository clientRepository;

    @Override
    public Client findById(Integer id) {
        Optional<Client> obj = clientRepository.findById(id);
        return obj.orElseThrow( () -> new ObjectNotFoundException("Objeto Não encontrado  id : ( " + id + " )"));
    }

    @Override
    public Client findByCpf(String cpf) {
        Optional<Client> obj = clientRepository.findByCpf(cpf);
        return obj.orElseThrow( () -> new ObjectNotFoundException("Cpf Não encontrado ( " + cpf + " )"));
    }

    @Override
    public List<Client> findAllClient() {
        return clientRepository.findAll();
    }

    @Override
    public Client saveClient(Client client) {
        client.setId(null);
        return clientRepository.save(client);
    }

    @Override
    public void deleteClient(Integer id) {
        clientRepository.deleteById(id);
    }

    @Override
    public void updateClient(Client client) {
        clientRepository.save(client);

    }

}
