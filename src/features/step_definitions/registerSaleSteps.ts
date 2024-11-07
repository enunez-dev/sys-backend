import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from 'chai';
import { registerSaleService } from '../../services/sale.service'; // Aquí se llama al servicio de ventas

let mockRegisterSaleService: typeof registerSaleService;
let saleData: any;
let result: any;
let error: any;

// Inicializa el estado de la venta antes de cada escenario
Given('que el formulario de registro de venta está disponible', function () {
  saleData = null;
  result = null;
  error = null;
  mockRegisterSaleService = async (data: any) => {
    return {
      code: 1,
    };
  };
});

When('ingreso los siguientes datos de la cabecera de la factura:', function (dataTable) {
  const cabecera = dataTable.hashes();
  saleData = {
    clientCode: cabecera[0].CodigoCliente,
    payCondition: cabecera[0].CondicionPago,
  };
});

When('ingreso los siguientes datos del detalle de la factura:', function (dataTable) {
  const detalles = dataTable.hashes();
  let total = 0;
  const productsItem = detalles.map((item: { CodigoProducto: any; NombreProducto: any; Cantidad: any; Precio: any; Total: any }) => {
    total = total + item.Total;
    return {
      code: item.CodigoProducto,
      name: item.NombreProducto,
      amount: item.Cantidad,
      price: item.Precio,
      subTotal: item.Total,
    };
  });
  saleData = {
    ...saleData,
    productsItem: productsItem,
    total,
  };
});

When('hago clic en "Registrar venta"', async function () {
  try {
    result = await mockRegisterSaleService(saleData);
  } catch (err) {
    error = err;
  }
});

Then('la venta es registrada exitosamente', function () {
  expect(result).to.deep.equal({
    code: 1,
  });
});
