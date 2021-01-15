import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '../../services/CreateProductService';
import DeleteProductService from '../../services/DeleteProductService';
import ListProductService from '../../services/ListProductService';
import UpdateProductsService from '../../services/UpdateProductsService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute();

    return response.json(products);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { title, price, description, category } = request.body;

    const createProduct = container.resolve(CreateProductService);

    const product = await createProduct.execute({
      title,
      price,
      description,
      category,
    });

    return response.json(product);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const listProducts = container.resolve(DeleteProductService);

    await listProducts.execute(id);

    return response.status(200).send();
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const { title, price, description, category } = request.body;

    const updateProduct = container.resolve(UpdateProductsService);

    const updatedProduct = await updateProduct.execute(id, {
      title,
      price,
      description,
      category,
    });

    return response.json(updatedProduct);
  }
}
