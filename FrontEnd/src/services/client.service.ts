import http from "../http-common";
import ClientData from "../type/client.type";

class ClientDataService {
  getAll() {
    return http.get("/cadastro");
  }

  get(id: string) {
    return http.get(`/cadastro/${id}`);
  }

  create(data: ClientData) {
    return http.post("/cadastro", data);
  }

  update(data: ClientData, id: any) {
    return http.put(`/cadastro/${id}`, data);
  }

  delete(id: any) {
    return http.delete(`/cadastro/${id}`);
  }

  findByCpf(cpf: string) {
    return http.get(`/cadastro/cpf/${cpf}`);
  }
}

export default new ClientDataService();