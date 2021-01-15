import Product from '../../database/entities/Product';
import IProductsRepository from '../models/IProductsRepository';
import ICreateProductDTO from '../dtos/ICreateProductDTO';
import IUpdateProductDTO from '../dtos/IUpdateProductDTO';

class FakeProductsRepository implements IProductsRepository {
  private products: Product[] = [];

  public async create(data: ICreateProductDTO): Promise<Product> {
    const product = new Product();

    Object.assign(product, {
      ...data,
      id: this.products.length + 1,
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    return product;
  }

  public async findAll(): Promise<Product[]> {
    return this.products;
  }

  public async findById(id: string): Promise<Product | undefined> {
    const product = this.products.find(pr => pr.id === id);

    return product;
  }

  public async findByTitle(title: string): Promise<Product | undefined> {
    const product = this.products.find(pr => pr.title === title);

    return product;
  }

  public async delete(id: string): Promise<void> {
    this.products = this.products.filter(product => product.id !== id);
  }

  public async update(
    id: string,
    data: IUpdateProductDTO,
  ): Promise<Product | undefined> {
    const product = this.products.find(pr => pr.id === id);

    this.products = this.products.map(pd => {
      if (pd.id === id) {
        return {
          ...pd,
          title: data.title,
          category: data.category,
          description: data.description,
          price: data.price,
        };
      }

      return pd;
    });

    return product;
  }
}

export default FakeProductsRepository;
