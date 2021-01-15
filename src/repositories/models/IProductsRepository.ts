import Product from '../../database/entities/Product';

import ICreateProductDTO from '../dtos/ICreateProductDTO';

export default interface IClientRepository {
  create(data: ICreateProductDTO): Promise<Product>;
  update(id: string, data: ICreateProductDTO): Promise<Product | undefined>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | undefined>;
  findByTitle(title: string): Promise<Product | undefined>;
  delete(id: string): Promise<void>;
}
