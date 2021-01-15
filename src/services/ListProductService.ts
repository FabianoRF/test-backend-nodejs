import { inject, injectable } from 'tsyringe';

import Product from '../database/entities/Product';
import IProductsRepository from '../repositories/models/IProductsRepository';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(): Promise<Product[]> {
    const products = await this.productsRepository.findAll();

    return products;
  }
}

export default ListProductsService;
