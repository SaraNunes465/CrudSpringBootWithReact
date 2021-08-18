# CrudSpringBootWithReact
Crud com Spring boot e react

## 💻 Pré-requisitos
Antes de começar, verifique se você atendeu aos seguintes requisitos:
* Você instalou a versão mais recente de `JAVA 8 / MAVEN `
* Você tem uma máquina `Windows / Linux / Mac`.
* Você tem que possuir Node js Atualizados da versão 14 + 
## 🚀 Instalando CRUD Back_End

Para instalar o Back-End, siga estas etapas:

Linux e macOS:
```
cd Crud/ && mvn clean install && mvn spring-boot:run  OU
cd Crud/ && mvn clean install && java -jar target/Crud-0.0.1-SNAPSHOT.jar 
```

Windows:
```
cd Crud
mvn clean install
java -jar target/Crud-0.0.1-SNAPSHOT.jar OU mvn spring-boot:run
```
## ☕ Usando CRUD Back-End

Para usar CRUD Back-End, siga estas etapas:

```
http://localhost:8080/cadastro
```


## 🚀 Instalando CRUD Front-End

Para instalar o Front-End, siga estas etapas:

Linux e macOS:
```
cd FrontEnd/ && npm install && npm run start  
```

Windows:
```
cd FrontEnd/
npm install
npm run start
```
## ☕ Usando CRUD Front-End

Para usar CRUD Front-End, siga estas etapas:

```
http://localhost:3000
```

## Observação

O front-end está apontando para um servidor do heroku, caso queira colocar em local host, faça a seguinte alteração

```
FrontEnd/http-common.js

baseURL: "https://aw-client-api.herokuapp.com" Troque por 
baseURL: "http://localhost:8080"
```

