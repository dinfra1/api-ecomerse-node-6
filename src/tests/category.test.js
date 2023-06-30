const request = require("supertest")
const app = require("../app")


const BASE_URL_LOGIN = '/api/v1/users/login'
const BASE_URL = '/api/v1/categories'
let TOKEN
let categoriesId

beforeAll(async()=>{

    const user = {
        email: "edinsonramirez94@gmail.com",
        password: "Cls.3196"
    }

    const res = await request(app)
    .post(BASE_URL_LOGIN)
    .send(user)

    TOKEN = res.body.token
})

test("POST -> 'URL', should return status code 201, res.body.name === <user>.name", async()=>{

    const createCategories = {
            name: "Ventas"
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(createCategories)
    .set("Authorization", `Bearer ${TOKEN}`)

    categoriesId = res.body.id

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(createCategories.name)
})

test("GET -> URL, should return 200", async()=>{
    const res = await request(app)
    .get(BASE_URL)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("DELETE -> 'URL'/:id, should restore status code 204",async()=>{

    const res = await request(app)
    .delete(`${BASE_URL}/${categoriesId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    
})