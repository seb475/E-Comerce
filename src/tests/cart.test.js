const request = require("supertest")
const app = require("../app")
const Product = require("../models/Product")
require("../models")

let token
let cartId

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

test("POST /cart should create one cart", async() => {
    const product = await Product.create({
        title:"samsung s23",
        description:" new smartphone ",
        price:233
        })
    const cart = {
        quantity:1,
        productId: product.id
    }
    const res = await request(app)
    .post("/cart")
    .send(cart)
    .set("Authorization", `Bearer ${token}`)
    await product.destroy()
    cartId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.quantity).toBe(cart.quantity)
})

test("GET /cart should return all carts", async() => {
    const res = await request(app)
    .get("/cart")
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})
test("PUT /cart/:id should update one cart",async() => {
    const body = {
        quantity: 0
    }
    const res = await request(app)
    .put(`/cart/${cartId}`)
    .send(body)
    .set("Authorization", `Bearer ${token}`)
    expect(res.body.quantity).toBe(body.quantity)
})

test("DELETE /cart/:id should delete one cart",async() =>{
    const res = await request(app)
    .delete(`/cart/${cartId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})
