import { productFindById, productList } from '../repositories/product.repository';
import { response } from '../utils/response';

export async function getProductListService(): Promise<any> {
  try {
    const products = await productList();

    return response('Listado de productos', products);
  } catch (error: any) {
    if (error?.detail) {
      throw new Error(error?.detail);
    }
    throw new Error('Error al registrar el cliente en la base de datos');
  }
}

export async function getProductService(id: string): Promise<any> {
  try {
    const product = await productFindById(id);

    return response('Datos del producto', product);
  } catch (error: any) {
    if (error?.detail) {
      throw new Error(error?.detail);
    }
    throw new Error('Error al registrar el cliente en la base de datos');
  }
}
