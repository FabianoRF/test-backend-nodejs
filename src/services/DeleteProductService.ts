import { inject, injectable } from 'tsyringe';

import AppError from '../errorHandler/AppError';
import IProductsRepository from '../repositories/models/IProductsRepository';

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute(id: string): Promise<void> {
    const checkProduct = await this.productsRepository.findById(id);

    if (!checkProduct) {
      throw new AppError('This product do not exists');
    }

    await this.productsRepository.delete(id);
  }
}

export default ListProductsService;
