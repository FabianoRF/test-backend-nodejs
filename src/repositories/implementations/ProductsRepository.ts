import { getRepository, Repository } from 'typeorm';

import Product from '../../database/entities/Product';
import IProductsRepository from '../models/IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';

class ClientRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async findAll(): Promise<Product[]> {
    const products = await this.ormRepository.find();

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(
    id: string,
    data: ICreateProductDTO,
  ): Promise<Product | undefined> {
    await this.ormRepository.update(id, data);

    const product = await this.ormRepository.findOne(id);

    return product;
  }
}

export default ClientRepository;
