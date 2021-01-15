import Product from '../../database/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IListProductDTO from '../dtos/IListProductDTO';

export default interface IProductsRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(id: string, data: ICreateProductDTO): Promise<Product | undefined>;
  findAll(data: IListProductDTO | undefined): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByTitle(title: string): Promise<Product | undefined>;
  delete(id: string): Promise<void>;
}
