import { inject, injectable } from 'tsyringe';

import AppError from '../errorHandler/AppError';

import Product from '../database/entities/Product';
import IProductsRepository from '../repositories/models/IProductsRepository';

interface IRequest {
  title: string;
  price: number;
  description: string;
  category: string;
}

@injectable()
class CreateProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    title,
    price,
    description,
    category,
  }: IRequest): Promise<Product> {
    const checkProduct = await this.productsRepository.findByTitle(title);

    if (checkProduct) {
      throw new AppError('This product already exists');
    }

    const product = await this.productsRepository.create({
      title,
      price,
      description,
      category,
    });

    return product;
  }
}

export default CreateProductService;
