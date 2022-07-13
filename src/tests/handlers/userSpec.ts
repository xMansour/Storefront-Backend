import supertest from "supertest";
import app from "../../app";
import { User, UserStore } from "../../models/user";
import { getToken } from "../../utils/auth";

const req = supertest(app);


describe("User Handler Spec", () => {
    //@ts-ignore
    let result;
    //@ts-ignore
    let token;
    const userStore = new UserStore();
    const user: User = {
        userName: "userName",
        firstName: "user",
        lastName: "name",
        password: "password123"
    };

    beforeAll(async () => {
        result = await userStore.create(user);
        token = getToken(result);
    })

    afterAll(async () => {
        result = await userStore.delete(user.userName, user.password);
    })



    it("[GET] /users Should require a JWT", (done) => {
        req
            .get("/users")
            .then((res) => {
                expect(res.status).toBe(401)
                done();
            })
    })

    //@ts-ignore
    it("[GET] /users/1 Should require a JWT", (done) => {
        req
            //@ts-ignore
            .get("/users/1")
            .then((res) => {
                expect(res.status).toBe(401)
                done()
            })
    })

    it("[Delete] /users Should require a JWT", (done) => {
        req
            .delete("/users")
            .query({
                userName: user.userName,
                password: user.password
            })
            .then((res) => {
                expect(res.status).toBe(401)
                done();
            })
    })





    it("[GET] /users Should get the index route", (done) => {
        req
            .get("/users")
            //@ts-ignore
            .set("Authorization", "bearer " + token)
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })


})