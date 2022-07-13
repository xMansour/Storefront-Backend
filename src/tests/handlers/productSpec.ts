import supertest from "supertest";
import app from "../../app";
import { Product, ProductStore } from "../../models/product";

const req = supertest(app);


describe("Product Handler Spec", () => {
    //@ts-ignore
    let result;
    const productStore = new ProductStore();
    const product: Product = {
        name: "Light Lamp",
        price: 50,
        category: "lightning"
    };

    beforeAll(async () => {
        result = await productStore.create(product);
    })


    it("[POST] /products Should require a JWT", (done) => {
        req
            .post("/products")
            .then((res) => {
                expect(res.status).toBe(401)
                done();
            })
    })

    it("[GET] /products Should return all products", (done) => {
        req
            .get("/products")
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })

    it("[GET] /products/1 Should return product with id=1", (done) => {
        req
            .get("/products/1")
            .then((res) => {
                expect(res.status).toBe(200)
                done()
            })
    })


})