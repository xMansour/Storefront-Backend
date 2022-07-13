import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model Spec', () => {
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

  it('Should have an authenticate method', () => {
    expect(store.authenticate).toBeDefined();
  });

  it('Should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('index method should return all users', async () => {
    await store.create(user);
    const users = await store.index();
    await store.delete(user.userName, user.password);
    //@ts-ignore
    expect(users.length).toBeGreaterThan(0);
  });

  it('create method should add a user', async () => {
    try {
      const result = await store.create(user);
      await store.delete(user.userName, user.password);
      //@ts-ignore
      expect(result.first_name).toBe(user.firstName);
      //@ts-ignore
      expect(result.last_name).toBe(user.lastName);
      //@ts-ignore
      expect(result.user_name).toBe(user.userName);
    } catch (error) {
      throw new Error('create method error: ' + error);
    }
  });

  it('delete method should remove the user', async () => {
    try {
      await store.create(user);
      await store.delete(user.userName, user.password);
      const result = await store.index();
      //@ts-ignore
      expect(result).toEqual([]);
    } catch (error) {
      throw new Error('delete method error: ' + error);
    }
  });

  it('authenticate method should return the user', async () => {
    try {
      await store.create(user);
      const result = await store.authenticate(user.userName, user.password);
      //@ts-ignore
      expect(result.first_name).toBe(user.firstName);
      //@ts-ignore
      expect(result.last_name).toBe(user.lastName);
      //@ts-ignore
      expect(result.user_name).toBe(user.userName);
      await store.delete(user.userName, user.password);
    } catch (error) {
      throw new Error('authenticate method error: ' + error);
    }
  });
});
