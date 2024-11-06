import { describe, it, vi, expect, beforeEach } from 'vitest';
import { ClientRepository } from '../repositories/client.repository';
// import {SaleService} from "../services/sale.service";
import { registerSaleService } from '../services/sale.service';
import { Client } from '../models/client.model';
import { SaleCreateDto } from '../models/dto/sale-created.dto';
import { ProductRepository } from '../repositories/product.repository';
import { Product } from '../models/product.model';
import { SaleRepository } from '../repositories/sale.repository';
import { SaleProductRepository } from '../repositories/saleProduct.repository';
import { Sale } from '../models/sale.model';

describe('SaleService', () => {
  vi.mock('../repositories/ClientRepository', () => {
    const ClientRepository = vi.fn();
    ClientRepository.prototype.findByCode = vi.fn();
    ClientRepository.prototype.findIdByCode = vi.fn();
    return { ClientRepository };
  });

  vi.mock('../repositories/product.repository', () => {
    const ProductRepository = vi.fn();
    ProductRepository.prototype.findByCode = vi.fn();
    return { ProductRepository };
  });
  vi.mock('../repositories/sale.repository', () => {
    const SaleRepository = vi.fn();
    SaleRepository.prototype.save = vi.fn();
    return { SaleRepository };
  });
  vi.mock('../repositories/sale-product.repository', () => {
    const SaleProductRepository = vi.fn();
    SaleProductRepository.prototype.saveDetails = vi.fn();
    return { SaleProductRepository };
  });
  new SaleRepository();
  new SaleProductRepository();

  it('should return error when clientId not fount', async () => {
    const saleCreateDto: SaleCreateDto = {
      clientCode: '3',
      payCondition: 'efectivo',
      total: 10,
      productsItem: [
        {
          code: '1',
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    };

    const clientRepository = new ClientRepository();
    vi.mocked(clientRepository).findByCode.mockImplementationOnce(async (): Promise<Client | null> => null);

    // const saleService = new SaleService();
    await expect(() => registerSaleService(saleCreateDto)).rejects.toThrowError('Client');
  });

  it('should return error when product item be 0', async () => {
    const saleCreateDto: SaleCreateDto = {
      clientCode: '3',
      payCondition: 'efectivo',
      total: 10,
      productsItem: [],
    };
    const clientRepository = new ClientRepository();
    vi.mocked(clientRepository).findByCode.mockImplementationOnce(async (): Promise<Client | null> => {
      return {
        code: '3',
        name: 'Juan Pérez',
        cinit: '12345678',
        documenttype: 'CI',
        email: 'juanperez@mail.com',
      };
    });
    // const saleService = new SaleService();
    await expect(() => registerSaleService(saleCreateDto)).rejects.toThrowError('Product is required');
  });

  it('should return error when productId not fount', () => {
    const saleCreateDto: SaleCreateDto = {
      clientCode: '3',
      payCondition: 'efectivo',
      total: 10,
      productsItem: [
        {
          code: '1',
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    };

    const clientRepository = new ClientRepository();
    vi.mocked(clientRepository).findByCode.mockImplementationOnce(async (): Promise<Client | null> => {
      return {
        code: '3',
        name: 'Juan Pérez',
        cinit: '12345678',
        documenttype: 'CI',
        email: 'juanperez@mail.com',
      };
    });
    vi.mocked(clientRepository).findIdByCode.mockImplementationOnce(async (): Promise<number> => {
      return 1;
    });

    const productRepository = new ProductRepository();
    vi.mocked(productRepository).findByCode.mockImplementationOnce(async (): Promise<Product | null> => null);

    // const saleService = new SaleService();
    expect(() => registerSaleService(saleCreateDto)).rejects.toThrowError('Product with code 1 not found');
  });

  it('should return sale id when save sale', async () => {
    const saleCreateDto: SaleCreateDto = {
      clientCode: '1',
      payCondition: 'efectivo',
      total: 10,
      productsItem: [
        {
          code: '2',
          name: 'leche',
          amount: 2,
          price: 5,
          subTotal: 10,
        },
      ],
    };

    const clientRepository = new ClientRepository();
    vi.mocked(clientRepository).findByCode.mockImplementationOnce(async (): Promise<Client | null> => {
      return {
        code: '1',
        name: 'jonaten terrazas',
        cinit: '12345678',
        documenttype: 'CI',
        email: 'juanperez@mail.com',
      };
    });
    vi.mocked(clientRepository).findIdByCode.mockImplementationOnce(async (): Promise<number> => {
      return 1;
    });

    const productRepository = new ProductRepository();
    vi.mocked(productRepository).findByCode.mockImplementationOnce(async (): Promise<Product | null> => {
      return {
        id: 1,
        code: '1',
        name: 'leche',
        price: 5,
      };
    });

    vi.mocked(new SaleRepository()).save.mockImplementationOnce(async (): Promise<Sale> => {
      return {
        clientId: 1,
        total: 10,
        id: 1,
        payCondition: 'efectivo',
      };
    });

    // const saleService = new SaleService();
    const sale = await registerSaleService(saleCreateDto);
    expect(sale.code).toEqual(1);
  });
});
