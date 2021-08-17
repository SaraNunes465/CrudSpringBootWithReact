import React, { Component } from "react";
import ClientService from "../services/client.service";
import ClientData from "../type/client.type";
import { Link } from "react-router-dom";

type Props = {}

type State = {
    clients: Array<ClientData>,
    currentClient: ClientData | null,
    currentIndex: number,
    searchCpf: string
}

export default class ClientList extends Component<Props, State> {
    constructor(props) {
        super(props);
        this.onChangeSearchClientToCpf = this.onChangeSearchClientToCpf.bind(this);
        this.retrieveClients = this.retrieveClients.bind(this);
        this.refrestList = this.refrestList.bind(this);
        this.searchCpf = this.searchCpf.bind(this);
        this.setActiviteClient = this.setActiviteClient.bind(this);

        this.state = {
            clients: [],
            currentClient: null,
            currentIndex: -1,
            searchCpf: ""
        }

    }

    componentDidMount() {
        this.retrieveClients();
    }

    onChangeSearchClientToCpf(e: ChangeEvent<HTMLInputElement>) {
        const searchCpf = e.target.value;
        this.setState({
            searchCpf: searchCpf
        });
    }

    retrieveClients() {
        ClientService.getAll().then((response) => {
            this.setState({
                clients: response.data
            });
            console.log(response.data);
        }).catch((e) => {
            console.log(e);
        });
    }

    refrestList() {
        this.retrieveClients();
        this.setState({
            currentClient: null,
            currentIndex: -1
        });
    }

    setActiviteClient(client: ClientData, index: number) {
        this.setState({
            currentClient: client,
            currentIndex: index
        });
    }

    searchCpf() {
        this.setState({
            currentClient: null,
            currentIndex: -1
        });

        ClientService.findByCpf(this.state.searchCpf).then((response) => {

            console.log(response.data);
            this.setState({
                clients: [response.data]
            });
            
        }).catch(e => {
            console.log(e);
        });
    }
    render() {

        const { searchCpf, clients, currentClient, currentIndex } = this.state;
        return (
            <div className="list row" >
                <div className="col-md-8">
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Busca por cpf"
                            value={searchCpf}
                            onChange={this.onChangeSearchClientToCpf}
                        />
                        <div className="input-group-append">
                            <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={this.searchCpf}
                            >
                                Busca
                            </button>
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <h4>Lista de Cliente</h4>
                    <ul className="list-group">
                        {clients && clients.map((client: ClientData, index: number) => (
                            <li className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                                onClick={() => this.setActiviteClient(client, index)}
                                key={index}
                            >
                                {client.name}
                            </li>
                        ))}
                    </ul>
                    {/* <button   className="m-3 btn btn-sm btn-danger"  onClick={this.removeAllTutorials}>Remover todos</button> */}
                </div>
                <div className="col-md-6">
                    {currentClient ? (
                        <div>
                            <h4>Clientes</h4>
                            <div>
                                <label>
                                    <strong>Nome:</strong>
                                </label>{" "}
                                {currentClient.name}
                            </div>
                            <div>
                                <label>
                                    <strong>Cpf:</strong>
                                </label>{" "}
                                {currentClient.cpf}
                            </div>
                            <div>
                                <label>
                                    <strong>Data Nascimento:</strong>
                                </label>{" "}
                                {currentClient.dateBirth}
                            </div>
                            <div>
                                <label>
                                    <strong>Endereço:</strong>
                                </label>{" "}
                                {currentClient.address}
                            </div>
                            <div>
                                <label>
                                    <strong>Status:</strong>
                                </label>{" "}
                                {currentClient.published ? "Published" : "Pending"}
                            </div> 

                            <Link to={"/cadastro/" + currentClient.id} 
                            className="btn btn-primary">
                                Editar
                            </Link>

                        </div>
                    ):(
                        <div>
                            <br />
                            <p>Por favor clique em algum cliente...</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

}