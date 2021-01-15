import { inject, injectable } from 'tsyringe';

import Product from '../database/entities/Product';
import IProductsRepository from '../repositories/models/IProductsRepository';

interface IRequest {
  title: string;
  category: string;
}

@injectable()
class ListProductsService {
  constructor(
    @inject('ProductsRepository')
    private productsRepository: IProductsRepository,
  ) {}

  public async execute({ title, category }: IRequest): Promise<Product[]> {
    let params = { title, category };

    if (title === 'undefined' && category === 'undefined') {
      params = {
        title: '',
        category: '',
      };
    } else if (title === 'undefined') {
      params = { category, title: '' };
    } else if (category === 'undefined') {
      params = { title, category: '' };
    }
    const products = await this.productsRepository.findAll(params);

    return products;
  }
}

export default ListProductsService;
