import { IClient } from '../models/client.model';
import { clientSave, clientFindByCiNit } from '../repositories/client.repository';
import { response } from '../utils/response';

export async function registerClientService(clientData: IClient): Promise<any> {
  try {
    const savedClient = await clientSave(clientData);
    const data = {
      id: savedClient.id,
      name: savedClient.name,
      ciNit: savedClient.ci_nit,
      documentType: savedClient.document_type,
      email: savedClient.email,
    };
    return response('Cliente registrado correctamente', data);
  } catch (error: any) {
    console.log(error);
    return response(error.message, {}, false);
  }
}

export async function getClientService(cinit: string): Promise<any> {
  try {
    const savedClient = await clientFindByCiNit(cinit);

    return response('Datos del cliente', savedClient);
  } catch (error: any) {
    console.error(error);
    return response(error.message, {}, false);
  }
}
