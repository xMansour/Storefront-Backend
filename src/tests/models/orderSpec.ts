import { Order, OrderStore } from '../../models/order';

const store = new OrderStore();

describe('Order Model Spec', () => {
  const order: Order = {
    userId: 1,
    status: 'Open'
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
});
