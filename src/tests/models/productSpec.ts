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
    const result = await store.create(product);
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
    expect(result.category).toBe(product.category);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(1);
    expect(result.name).toBe(product.name);
    expect(result.price).toBe(product.price);
    expect(result.category).toBe(product.category);
  });
});
