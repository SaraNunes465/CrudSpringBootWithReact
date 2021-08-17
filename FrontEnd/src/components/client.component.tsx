import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import ClientDataService from "../services/client.service";
import ClientData from "../type/client.type";


interface RouterProps {

    id: string;
}
type Props = RouteComponentProps<RouterProps>
type State = {
    currentClient: ClientData;
    message: string;
}


export default class Client extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.onChangeClient = this.onChangeClient.bind(this);
        this.getClientId = this.getClientId.bind(this);
        this.updatePublished = this.updatePublished.bind(this);
        this.updateClient = this.updateClient.bind(this);
        this.deleteClient = this.deleteClient.bind(this);

        this.state = {
            currentClient: {
                id: null,
                name: "",
                cpf: "",
                dateBirth: new Date().toLocaleDateString() + ' 10:35',
                address: "",
                published: false,
            },
            message: ""
        };
    }

    componentDidMount() {
        this.getClientId(this.props.match.params.id);
    }
    
    onChangeClient(e: ChangeEvent<HTMLInputElement>) {
        let nam = e.target.name;
        let val = e.target.value;

        this.setState((prevSate) => {
            return {
                currentClient: {
                    ...prevSate.currentClient,
                    [nam]: val
                }
            }
        })

    };


    getClientId(id: string) {
        ClientDataService.get(id).then((response) => {
            this.setState({ currentClient: response.data });
            console.log(response.data);
        }).catch((e) => {
            console.log(e);
        })

    };

    updatePublished(status: boolean) {
        const data: ClientData = {
            id: this.state.currentClient.id,
            name: this.state.currentClient.name,
            cpf: this.state.currentClient.cpf,
            dateBirth: this.state.currentClient.dateBirth,
            address: this.state.currentClient.address,
            published: status,
        };

        ClientDataService.update(data, this.state.currentClient.id).then((response) => {
            this.setState((prevState) => ({
                currentClient: {
                    ...prevState.currentClient,
                    published: status,
                },
                message: "O status foi atualizado com sucesso!!"
            }));
            console.log(response.data);
        }).catch((e) => {
            console.log(e);
        });
    };


    updateClient() {
        ClientDataService.update(
            this.state.currentClient,
            this.state.currentClient.id
        )
            .then((response) => {
                console.log(response.data);
                this.setState({
                    message: "O cliente foi atualizado com sucesso",
                });
            }).catch((e) => { console.log(e) })
    };

    deleteClient() {
        ClientDataService.delete(this.state.currentClient.id).then((response) => {

            console.log(response.data);
            this.props.history.push("/cadastro");
        }).catch((e) => { console.log(e) })
    };

    render() {
        const { currentClient } = this.state;
        return (<div>
            {currentClient ?
                (<div className="edit-form">
                    <h4>Nome</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Nome</label>
                            <input type="text" name="name" className="form-control" id="name" required onChange={this.onChangeClient} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="cpf">CPF</label>
                            <input type="text" name="cpf" className="form-control" id="cpf" required onChange={this.onChangeClient} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Endereço</label>
                            <input type="text" name="address" className="form-control" id="address" required onChange={this.onChangeClient} />
                        </div>
                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentClient.published ? "Published" : "Pending"}
                        </div>
                    </form>
                    {currentClient.published ? (
                        <button className="btn btn-warning mr-2"
                            onClick={() => this.updatePublished(false)}>Cancelar Publicação</button>
                    ) : (
                        <button className="btn btn-primary mr-2"
                            onClick={() => this.updatePublished(true)}>Puplicar</button>
                    )}
                    <button className="btn btn-danger mr-2"
                        onClick={(() => this.deleteClient())}>Deletar</button>

                    <button type="submit" className="btn btn-success"
                        onClick={this.updateClient}>Update</button>
                    <p>{this.state.message}</p>

                </div>) : (
                    <div>
                        <br />
                        <p>Por favor clique em um cliente</p>
                    </div>
                )}
        </div>)
            ;
    };

}
