import { Component, ChangeEvent } from "react";
import ClientDataService from "../services/client.service";
import ClietData from '../type/client.type';

type Props = {};

type State = ClietData & { submitted: boolean };

export default class AddClient extends Component {
    constructor(props: Props) {
        super(props);
        this.onChangeClient = this.onChangeClient.bind(this);
        this.saveClient = this.saveClient.bind(this);
        this.newClient = this.newClient.bind(this);

        this.state = {
            id: null,
            name: "",
            cpf: "",
            dateBirth: new Date().toLocaleDateString() + ' 10:35',
            address: "",
            submitted: false
        };

    }

    onChangeClient(e: ChangeEvent<HTMLInputElement>) {
        let nam = e.target.name;
        let val = e.target.value;
        // @ts-ignore
        this.setState({ [nam]: val });

        console.log(this.state);
    }

    saveClient() {
        const data: ClietData = {
            name: this.state.name,
            cpf: this.state.cpf,
            dateBirth: new Date().toLocaleDateString() + ' 10:35',
            address: this.state.address,
            submitted: true
        };

        ClientDataService.create(data).then(response => {
            this.setState({
                id: response.data.id,
                name: response.data.name,
                cpf: response.data.cpf,
                dateBirth: response.data.dateBirth,
                address: response.data.address,
                submitted: true
            });
            console.log(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    newClient() {
        this.setState({
            id: null,
            name: "",
            cpf: "",
            dateBirth: new Date().toLocaleDateString() + ' 10:35',
            address: "",
            submitted: false
        })
    }

    render() {
        const { submitted } = this.state;
        return (
            <div className="submit-form">{submitted ? (<div>
                <h4>Você submeteu com sucesso!</h4>
                <button className="btn btn-success" onClick={this.newClient}>
                    Registrar Novos Dados
                </button>
            </div>
            ) :

                (<div>
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            required
                            onChange={this.onChangeClient}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="cpf">Cpf</label>
                        <input
                            type="text"
                            className="form-control"
                            id="cpf"
                            name="cpf"
                            required
                            onChange={this.onChangeClient}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Endereço</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            required
                            onChange={this.onChangeClient}
                            name="address"
                        />
                    </div>

                    <button onClick={this.saveClient} className="btn btn-success">
                        Submit
                    </button>
                </div>)}</div>
        )
    }
}


