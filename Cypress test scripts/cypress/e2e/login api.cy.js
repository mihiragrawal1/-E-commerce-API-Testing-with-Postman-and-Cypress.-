
describe('E-commerce website login api',()=>{

    it('Validate login api with valid credentials',()=>{
        cy.fixture('logindata.json').then((data)=>{
        cy.request({
            method:"POST",
            failOnStatusCode: false,
            url:"http://192.168.1.44:7654/users/login",
            body:data
         
        }).then((res)=>{
            expect(res.status).to.eq(200)    //returning 302 which is not correct
            expect(res.body.email).to.eq(data.email)
            expect(res.body.token).to.be.a('string')
            expect(res.body.first_name).to.be.a('string')

        })
    })
    })


    it('Validate login api with invalid credential',()=>{

        cy.fixture('logininvaliddata.json').then((data)=>{
        cy.request({
            method:"POST",
            failOnStatusCode: false,
            url:'http://192.168.1.44:7654/users/login',
            body:data
        }).then((res)=>{
            expect(res.status).to.eq(   401)    //returning 500 which is not correct
            expect(res.body.error).contains("login or password incorrect")
        })
    })
    })


    it('Validate login api with empty feilds ',()=>{

    
        cy.request({
            method:"POST",
            failOnStatusCode: false,
            url:'http://192.168.1.44:7654/users/login',
            body:{
                "email":"",
                "password":""
            }
        }).then((res)=>{
            expect(res.status).to.eq(400)         //returning 500 which is not correct
            expect(res.body).contains("Missing Email or Password")
        })
    })
    
})