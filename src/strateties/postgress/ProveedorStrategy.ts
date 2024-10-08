import { IEntidadStrategy } from '../IEntidadStrategy';
import pool from '../../config/poolPostgress';

export class ProveedorStrategy implements IEntidadStrategy {
  private action: 'crear' | 'obtener';

  constructor(action: any) {
    this.action = action;
  }

  async execute(params: any[]): Promise<any> {
    const getQuery = {
      crear: this.crearProveedorQuery(),
      obtener: this.obtenerProveedoresQuery(),
    };

    const query = getQuery[this.action] || 'Acción no soportada';

    const result = await pool.query(query, params);
    if (result?.rows.length > 0) {
      return result.rows;
    }
    return [];
  }

  private crearProveedorQuery(): string {
    const query = `
      INSERT INTO proveedores (sku_proveedor, nombre_proveedor)
      VALUES ($1, $2)
      RETURNING *
    `;
    return query;
  }

  private obtenerProveedoresQuery(): string {
    const query = `
      SELECT * 
      FROM proveedores
      ORDER BY id asc
    `;
    return query;
  }
}
