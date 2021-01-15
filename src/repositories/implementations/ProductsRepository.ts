import { getRepository, Like, Repository } from 'typeorm';

import Product from '../../database/entities/Product';
import IProductsRepository from '../models/IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';
import IListProductDTO from '../dtos/IListProductDTO';

class ProductsRepository implements IProductsRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = this.ormRepository.create(data);

    await this.ormRepository.save(product);

    return product;
  }

  public async findAll({
    category = '',
    title = '',
  }: IListProductDTO): Promise<Product[]> {
    const products = await this.ormRepository.find({
      where: {
        category: Like(`%${category}%`),
        title: Like(`%${title}%`),
      },
    });

    return products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne(id);

    return product;
  }

  public async findByTitle(title: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        title,
      },
    });

    return product;
  }

  public async delete(id: string): Promise<void> {
    await this.ormRepository.delete(id);
  }

  public async update(
    id: string,
    data: IUpdateProductDTO,
  ): Promise<Product | undefined> {
    await this.ormRepository.update(id, data);

    const product = await this.ormRepository.findOne(id);

    return product;
  }
}

export default ProductsRepository;
