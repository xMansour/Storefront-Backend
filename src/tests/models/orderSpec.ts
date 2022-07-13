import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';

const store = new OrderStore();
const userStore = new UserStore();

describe('Order Model Spec', () => {
  const user: User = {
    userName: 'testUser',
    firstName: 'test',
    lastName: 'user',
    password: 'test123'
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

  it('index method should all orders', async () => {
    try {
      const createduser = await userStore.create(user);
      const order: Order = {
        //@ts-ignore
        userId: createduser.id,
        status: 'Open'
      };
      await store.create(order);
      const result = await store.index();
      await userStore.delete(user.userName, user.password);
      //@ts-ignore
      expect(result.length).toBeGreaterThan(0);
    } catch (error) {
      throw new Error('index method error: ' + error);
    }
  });

  it('show method should return all orders for the specified user', async () => {
    try {
      const createduser = await userStore.create(user);
      const order: Order = {
        //@ts-ignore
        userId: createduser.id,
        status: 'Open'
      };
      await store.create(order);
      //@ts-ignore
      const result = await store.show(createduser.id);

      await userStore.delete(user.userName, user.password);

      //@ts-ignore
      expect(result[0].user_id).toEqual(String(createduser.id));
    } catch (error) {
      throw new Error('show method error: ' + error);
    }
  });

  it('create method should add an order with order.userId = createduser.id', async () => {
    try {
      const createduser = await userStore.create(user);

      const order: Order = {
        //@ts-ignore
        userId: createduser.id,
        status: 'Open'
      };
      const result = await store.create(order);
      await userStore.delete(user.userName, user.password);
      //@ts-ignore
      expect(result.user_id).toEqual(String(createduser.id));
    } catch (error) {
      throw new Error('create method error: ' + error);
    }
  });
});
