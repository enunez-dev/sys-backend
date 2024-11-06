import { describe, it, vi, expect, beforeEach } from 'vitest';
import { clientFindById } from '../repositories/client.repository';
// import {SaleService} from "../services/sale.service";
import { registerSaleService } from '../services/sale.service';
// import { IClient } from '../models/client.model';
// import { productFindById } from '../repositories/product.repository';
// import { IProduct } from '../models/product.model';
// import { saleSave } from '../repositories/sale.repository';
// import { productSaveDetails } from '../repositories/saleProduct.repository';
// import { ISale } from '../models/sale.model';

// describe('SaleService', () => {
// vi.mock('../repositories/client.repository', () => {
//   const ClientRepository = vi.fn();
//   ClientRepository.prototype.clientFindByCiNit = vi.fn();
//   ClientRepository.prototype.clientFindById = vi.fn();
//   return { ClientRepository };
// });
// vi.mock('../repositories/product.repository', () => {
//   const ProductRepository = vi.fn();
//   ProductRepository.prototype.productFindById = vi.fn();
//   return { ProductRepository };
// });
// vi.mock('../repositories/sale.repository', () => {
//   const SaleRepository = vi.fn();
//   SaleRepository.prototype.saleSave = vi.fn();
//   return { SaleRepository };
// });
// vi.mock('../repositories/saleProduct.repository', () => {
//   const SaleProductRepository = vi.fn();
//   SaleProductRepository.prototype.productSaveDetails = vi.fn();
//   return { SaleProductRepository };
// });
// new SaleRepository();
// new SaleProductRepository();
// it('should return error when clientId not fount', async () => {
//   const saleCreateDto: any = {
//     client: {
//       id: 1,
//       name: 'User Demo',
//     },
//     payCondition: {
//       id: 1,
//       name: 'Efectivo',
//     },
//     total: 10,
//     productsItem: [
//       {
//         code: '1',
//         name: 'leche',
//         amount: 2,
//         price: 5,
//         subTotal: 10,
//       },
//     ],
//   };
//   // Aquí mockeamos manualmente el servicio para devolver una respuesta simulada
//   let mockClientFindById: typeof clientFindById;
//   mockClientFindById = async (id: number) => {
//     return {
//       id: 1,
//       name: 'User Demo',
//       ciNit: '1234567',
//       documentType: 'CI',
//       email: 'demo@correo.com',
//     };
//   };
//   // Llamamos al servicio
//   const result = await mockClientFindById(saleCreateDto.client.id);
//   // const saleService = new SaleService();
//   await expect(() => registerSaleService(saleCreateDto)).rejects.toThrowError('Client');
// });
// it('should return error when productId not fount', () => {
//   const saleCreateDto: any = {
//     clientCode: '3',
//     payCondition: 'efectivo',
//     total: 10,
//     productsItem: [
//       {
//         id: 9,
//         name: 'leche',
//         amount: 2,
//         price: 5,
//         subTotal: 10,
//       },
//     ],
//   };
//   vi.mocked(clientRepository).findIdByCode.mockImplementationOnce(async (): Promise<number> => {
//     return 1;
//   });
//   const productRepository = new ProductRepository();
//   vi.mocked(productRepository).findByCode.mockImplementationOnce(async (): Promise<Product | null> => null);
//   // const saleService = new SaleService();
//   expect(() => registerSaleService(saleCreateDto)).rejects.toThrowError('Product with code 1 not found');
// });
// it('should return sale id when save sale', async () => {
//   const saleCreateDto: SaleCreateDto = {
//     clientCode: '1',
//     payCondition: 'efectivo',
//     total: 10,
//     productsItem: [
//       {
//         code: '2',
//         name: 'leche',
//         amount: 2,
//         price: 5,
//         subTotal: 10,
//       },
//     ],
//   };
//   const clientRepository = new ClientRepository();
//   vi.mocked(clientRepository).findByCode.mockImplementationOnce(async (): Promise<Client | null> => {
//     return {
//       code: '1',
//       name: 'jonaten terrazas',
//       cinit: '12345678',
//       documenttype: 'CI',
//       email: 'juanperez@mail.com',
//     };
//   });
//   vi.mocked(clientRepository).findIdByCode.mockImplementationOnce(async (): Promise<number> => {
//     return 1;
//   });
//   const productRepository = new ProductRepository();
//   vi.mocked(productRepository).findByCode.mockImplementationOnce(async (): Promise<Product | null> => {
//     return {
//       id: 1,
//       code: '1',
//       name: 'leche',
//       price: 5,
//     };
//   });
//   vi.mocked(new SaleRepository()).save.mockImplementationOnce(async (): Promise<Sale> => {
//     return {
//       clientId: 1,
//       total: 10,
//       id: 1,
//       payCondition: 'efectivo',
//     };
//   });
//   // const saleService = new SaleService();
//   const sale = await registerSaleService(saleCreateDto);
//   expect(sale.code).toEqual(1);
// });
// });
