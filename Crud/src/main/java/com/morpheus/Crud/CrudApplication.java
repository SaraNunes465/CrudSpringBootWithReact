package com.morpheus.Crud;

import com.morpheus.Crud.model.Client;
import com.morpheus.Crud.repository.ClientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.SimpleDateFormat;
import java.util.Arrays;
import org.apache.log4j.Logger;

@SpringBootApplication
public class CrudApplication implements CommandLineRunner {
	private static final Logger logger = Logger.getLogger(CrudApplication.class);

	public static void main(String[] args) {
		SpringApplication.run(CrudApplication.class, args);
	}

	@Autowired
	private ClientRepository clientRepository;

	@Override
	//Usar para fazer uma base de teste
	public void run(String... args) throws Exception {
		logger.info("Iniciando Aplicação");
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		Client client = new Client(null,"Piusr","52857980949",sdf.parse("08/11/1978 10:32"),"Rua Mário Machado");
		Client client2 = new Client(null,"Rosa Raquel Andrea dos Santos","62287052453",sdf.parse("06/10/1998 10:32"),"Rua Porto Velho");
		Client client3 = new Client(null,"Samuel Luiz Francisco Figueiredo","70713766891",sdf.parse("19/12/2000 10:32"),"Rua Rio Mearim");

		clientRepository.saveAll(Arrays.asList(client,client2,client3));

		logger.info("Finalizado apicação ativada");
	}
}
