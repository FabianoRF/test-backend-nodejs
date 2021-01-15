import { inject, injectable } from 'tsyringe';
import Product from '../database/entities/Product';

import AppError from '../errorHandler/AppError';
import IProductsRepository from '../repositories/models/IProductsRepository';

interface IRequest {
  title: string;
  price: number;
  description: string;
  category: string;
}

@injectable()
class UpdareProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(
    id: string,
    { category, description, price, title }: IRequest,
  ): Promise<Product | undefined> {
    const checkProduct = await this.productsRepository.findById(id);

    if (!checkProduct) {
      throw new AppError('This product do not exists');
    }

    const product = await this.productsRepository.update(id, {
      category,
      description,
      price,
      title,
    });

    return product;
  }
}

export default UpdareProductsService;
