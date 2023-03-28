const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
const Productimg = require("../models/Productimg")
require("../models")

let token 
let productId


beforeAll(async() => {
    const credentials = {
        email:"test@gmail.com",
        password:"test123"
    }
    const res = await request(app)
    .post("/users/login")
    .send(credentials)
    token = res.body.token
})

test("POST /products should create one product", async() => {
    const product = {
        title:"samsung s23",
        description:" new smartphone ",
        price:233
    }
    const res = await request(app)
    .post("/products")
    .send(product)
    .set("Authorization", `Bearer ${token}`)
    productId = res.body.id
    userId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.title).toBe(product.title)

})
test("GET /products should return all products",async() => {
    const res = await request(app)
    .get("/products")
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})
test("GET /products should return one product",async() => {
    const product = await Product.findOne({where: {title: "samsung s23"}})
    const res = await request(app).get(`/products/${product.id}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe("samsung s23")
})

test("POST /products/:id/images should set the news images ", async() => {
    const image = await Productimg.create({url:"hgasjhf", filename: "zxafee"})
    const res = await request(app)
    .post(`/products/${productId}/images`)
    .send([image.id])
    .set("Authorization", `Bearer ${token}`)
  await image.destroy()  
expect(res.status).toBe(200)
expect(res.body).toHaveLength(1)
})
test("PUT /products/:id should update one product", async() => {
    const body = {
        title:"product Update"
    }
    const res = await request(app)
    .put(`/products/${productId}`)
    .send(body)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.title).toBe(body.title)
})

test("DELETE /products/:id should delete one product",async() => {
    const res = await request(app)
    .delete(`/products/${productId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})