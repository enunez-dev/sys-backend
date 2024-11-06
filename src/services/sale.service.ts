import { ISaleProduct } from '../models/saleProduct.model';
import { clientFindById } from '../repositories/client.repository';
import { productFindById } from '../repositories/product.repository';
import { saleSave } from '../repositories/sale.repository';
import { productSaveDetails } from '../repositories/saleProduct.repository';
import { response } from '../utils/response';

export async function registerSaleService(dataBody: any): Promise<any> {
  try {
    const client = await clientFindById(dataBody.client.id);

    if (client == null) {
      throw new Error(`Client witch id ${dataBody.client.id} not found`);
    }

    const products: ISaleProduct[] = [];
    for (const p of dataBody.productsItem) {
      const product = await productFindById(p.id);
      if (product?.id == null) {
        throw new Error(`Product with code ${p.id} not found`);
      }
      products.push({
        quantity: p.quantity,
        price: p.price,
        productId: product.id,
        subtotal: p.subTotal,
      });
    }

    const clientId: number = client.id || 0;
    const saleRes = await saleSave(clientId, dataBody.total, dataBody.payCondition.id);
    for (const product of products) {
      product.saleId = saleRes.id;
      await productSaveDetails(product);
    }
    const data = {
      id: saleRes.id,
      client: client,
      payCondition: dataBody.payCondition,
      total: saleRes.total,
      productItem: dataBody.productsItem,
    };
    return response('Guardado correctamente', data);
  } catch (error) {
    console.log(error);
    return response('Error al registrar el cliente', {}, false);
  }
}
