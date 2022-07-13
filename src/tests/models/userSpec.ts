import { User, UserStore } from '../../models/user';

const store = new UserStore();

describe('User Model Spec', () => {
    const user: User = {
        userName: "testUser",
        firstName: "test",
        lastName: "user",
        password: "test123"
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

    it('create method should add a user', async () => {
        const result = await store.create(user);
        //@ts-ignore
        expect(result.first_name).toBe(user.firstName)
        //@ts-ignore
        expect(result.last_name).toBe(user.lastName)
        //@ts-ignore
        expect(result.user_name).toBe(user.userName)
    });

    it('delete method should remove the user', async () => {
        await store.delete(user.userName, user.password);
        const result = await store.index()
        //@ts-ignore
        expect(result).toEqual([]);
    });
});
