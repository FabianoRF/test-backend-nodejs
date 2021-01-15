import { Request, Response } from 'express';

import { container } from 'tsyringe';
import CreateProductService from '../../services/CreateProductService';
import DeleteProductService from '../../services/DeleteProductService';
import EditCategoryProductService from '../../services/EditCategoryProductService';
import ListProductService from '../../services/ListProductService';
import UpdateProductsService from '../../services/UpdateProductsService';

export default class ProductsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { title, category } = request.query;

    const listProducts = container.resolve(ListProductService);

    const products = await listProducts.execute({
      title: String(title),
      category: String(category),
    });

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

  public async updateCategory(
    request: Request,
    response: Response,
  ): Promise<Response> {
    const { id } = request.params;

    const { category } = request.body;

    const updateProduct = container.resolve(EditCategoryProductService);

    const updatedProduct = await updateProduct.execute({
      id,
      category,
    });

    return response.json(updatedProduct);
  }
}
