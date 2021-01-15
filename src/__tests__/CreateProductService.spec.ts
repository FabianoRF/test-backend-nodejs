import AppError from '../errorHandler/AppError';
import FakeProductsRepository from '../repositories/fakes/FakeProductsRepository';
import CreateProductService from '../services/CreateProductService';

describe('CreatedProduct', () => {
  it('should be able to create a new Product', async () => {
    const fakeProductsRepository = new FakeProductsRepository();

    const createProduct = new CreateProductService(fakeProductsRepository);

    const product = await createProduct.execute({
      category: 'category',
      description: 'description',
      price: 102.99,
      title: 'new product',
    });

    expect(product).toHaveProperty('id');
  });

  it('should not be able to create a Product with same title from another', async () => {
    const fakeProductsRepository = new FakeProductsRepository();
    const createProduct = new CreateProductService(fakeProductsRepository);

    await createProduct.execute({
      category: 'category',
      description: 'description',
      price: 102.99,
      title: 'new product',
    });

    await expect(
      createProduct.execute({
        category: 'category',
        description: 'description',
        price: 102.99,
        title: 'new product',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
