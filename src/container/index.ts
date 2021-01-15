import { container } from 'tsyringe';

import IProductRepository from '../repositories/models/IProductsRepository';
import ProductsRepository from '../repositories/implementations/ProductsRepository';

container.registerSingleton<IProductRepository>(
  'ProductsRepository',
  ProductsRepository,
);
