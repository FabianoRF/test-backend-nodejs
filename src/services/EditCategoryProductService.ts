import { inject, injectable } from 'tsyringe';
import Product from '../database/entities/Product';

import AppError from '../errorHandler/AppError';
import IProductsRepository from '../repositories/models/IProductsRepository';

interface IRequest {
  id: string;
  category: string;
}

@injectable()
class EditCategoryProductService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({
    category,
    id,
  }: IRequest): Promise<Product | undefined> {
    const product = await this.productsRepository.findById(id);

    if (!product) {
      throw new AppError('This product do not exists');
    }

    const newProduct = {
      ...product,
      category,
    };

    const updatedProduct = await this.productsRepository.update(id, newProduct);

    return updatedProduct;
  }
}

export default EditCategoryProductService;
