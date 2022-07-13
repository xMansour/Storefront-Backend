import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();

describe('Product Model Spec', () => {
  const product: Product = {
    name: 'Led Lamp',
    price: 50,
    category: 'Lightning'
  };

  it('Should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('Should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('Should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('create method should add a product', async () => {
    try {
      const result = await store.create(product);
      expect(result.name).toBe(product.name);
      expect(result.price).toBe(product.price);
      expect(result.category).toBe(product.category);
    } catch (error) {
      throw new Error('create method error: ' + error);
    }
  });

  it('show method should return the correct product', async () => {
    try {
      const createdProduct = await store.create(product);
      //@ts-ignore
      const result = await store.show(createdProduct.id);
      expect(result.name).toBe(product.name);
      expect(result.price).toBe(product.price);
      expect(result.category).toBe(product.category);
    } catch (error) {
      throw new Error('show method error: ' + error);
    }
  });

  it('index method should return all products', async () => {
    const product: Product = {
      name: 'Legion Laptop',
      price: 800,
      category: 'Laptop'
    };
    try {
      await store.create(product);
      const products = await store.index();
      //@ts-ignore
      expect(products.length).toBeGreaterThan(0);
    } catch (error) {
      throw new Error('index method error: ' + error);
    }
  });
});
