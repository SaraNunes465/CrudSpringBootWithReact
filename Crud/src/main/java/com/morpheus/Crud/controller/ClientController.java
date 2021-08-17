package com.morpheus.Crud.controller;

import com.morpheus.Crud.model.Client;
import com.morpheus.Crud.service.ClientService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import java.net.URI;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

//Classe responsavel por fazer a comunicação http com o front-end
@RestController
@RequestMapping(value = "/cadastro")
public class ClientController {
    @Autowired
    private ClientService clientService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Client>> findAllClient(){
        List<Client> clients = clientService.findAllClient();
        return ResponseEntity.ok().body(clients);
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    public ResponseEntity<Client> findById(@PathVariable Integer id, HttpServletResponse res){
        Client obj = clientService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @RequestMapping(value = "/cpf/{cpf}", method = RequestMethod.GET)
    public ResponseEntity<Client> findByCpf(@PathVariable String cpf){
        Client obj = clientService.findByCpf(cpf);
        return ResponseEntity.ok().body(obj);
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<Void> saveClient(@RequestBody Client client){
        Client client1 = clientService.saveClient(client);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequestUri().path("/{id}")
                .buildAndExpand(client1.getId()).toUri();

        return ResponseEntity.created(uri).build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    public ResponseEntity<Void> updateClient(@RequestBody Client client , @PathVariable Integer id){
        Client clientUpdate = clientService.findById(id);
        client.setId(clientUpdate.getId());
        clientService.updateClient(client);
        return ResponseEntity.noContent().build();
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    public ResponseEntity<Void> deleteCleintById (@PathVariable Integer id){
        clientService.deleteClient(id);
        return ResponseEntity.noContent().build();
    }
}
