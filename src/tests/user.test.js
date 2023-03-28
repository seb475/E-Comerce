const request = require("supertest")
const app = require("../app")

let userId
let token

test("POST /users should create a user", async() => {
    const newUser = {
        firstName:"Sebastian",
        lastName:"Pedraza Acevedo",
        email:"12sebatianmx@gmail.com",
        password:"sebas123",
        phone:44313212
    }
    const res = await request(app).post("/users").send(newUser)
    userId = res.body.id
    expect(res.status).toBe(201)
    expect(res.body.email).toBe(newUser.email)
})
test("POST /users/login should do login", async() => {
    const user = {
        email:"12sebatianmx@gmail.com",
        password:"sebas123",
    }
    const res = await request(app)
    .post("/users/login")
    .send(user)
    token = res.body.token
    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(user.email)
    expect(res.body.token).toBeDefined()
})

test("POST /users/login with invalid credentials should return 401",async() => {
    const user = {
        email:"12sebatianmx@gmail.com",
        password:"sebassss123",
    }
    const res = await request(app)
    .post("/users/login")
    .send(user)
    expect(res.status).toBe(401)
})

test("GET /users should return all users", async() => {
    const res = await request(app)
    .get("/users")
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(2)
})

test("PUT /users/:id should update one user", async() => {
    const body = {
        firstName:"sebastian Update"
    }
    const res = await request(app)
    .put(`/users/${userId}`)
    .send(body)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
})


test("DELETE /users/:id should delete one user",async() => {
    const res = await request(app)
    .delete(`/users/${userId}`)
    .set("Authorization", `Bearer ${token}`)
    expect(res.status).toBe(204)
})
