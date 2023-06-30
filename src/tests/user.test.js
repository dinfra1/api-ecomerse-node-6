const request = require("supertest")
const app = require("../app")

const BASE_URL = '/api/v1/users'
let TOKEN
let userId

beforeAll(async()=>{

    const user = {
        email: "edinsonramirez94@gmail.com",
        password: "Cls.3196"
    }

    const res = await request(app)
    .post(`${BASE_URL}/login`)
    .send(user)

    TOKEN = res.body.token
})

test("GET -> URL, should return 200", async()=>{
    const res = await request(app)
    .get(BASE_URL)
    .set('Authorization', `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("POST -> 'URL', should return status code 201, res.body.firstName", async()=>{

    const createUser = {
            firstName: "EDINSON",
            lastName: "RAMIREZ",
            email: "edinsonamirez94@gmail.com",
            password: "Cls.3196",
            phone: "3245731320"
    }

    const res = await request(app)
    .post(BASE_URL)
    .send(createUser)

    userId =  res.body.id

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(createUser.firstName)
})

test("PUT 'URL', should return status code 200 and body.firstName === body.firstName",async()=>{

    const userUpdate = {
        firstName: "EDINSON",
    }

    const res = await request(app)
    .put(`${BASE_URL}/${userId}`)
    .send(userUpdate)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(userUpdate.firstName)

})

test("POST -> 'BASE_URL/login, should return code 200, compere re.body,firstname con user.firstname", async()=>{

    const userLogin = {
        email: "edinsonamirez94@gmail.com",
        password: "Cls.3196",
    }

    const res =  await request(app)
    .post(`${BASE_URL}/login`)
    .send(userLogin)

    expect(res.status).toBe(200)
    expect(res.body.user.email).toBe(userLogin.email)
    expect(res.body.token).toBeDefined()
})

test("POST -> 'BASE_URL/login, should return code 401, compere re.body.password con user.password", async()=>{

    const userLogin = {
        email: "edinsonamirez94@gmail.com",
        password: " invalid password"
    }

    const res =  await request(app)
    .post(`${BASE_URL}/login`)
    .send(userLogin)

    expect(res.status).toBe(401)
})


test("DELETE -> 'URL'/:id, should restore status code 204",async()=>{

    const res = await request(app)
    .delete(`${BASE_URL}/${userId}`)
    .set("Authorization", `Bearer ${TOKEN}`)

    expect(res.status).toBe(204)
    
})