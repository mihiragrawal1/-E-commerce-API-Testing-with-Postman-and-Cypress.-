describe("E-commerce application search product api",()=>{

    it("Validate search  product api for a product",()=>{
      let  productname="Sneakers"

        cy.fixture("logindata.json").then((data) => {
            cy.request({
              method: "POST",
              failOnStatusCode: false,
              url: "http://192.168.1.44:7654/users/login",
              body: data,
            }).then((res) => {
            let token=res.body.token
            let userid=res.body._id

            cy.request({
                method:"GET",
                url:"http://192.168.1.44:7654/users/search?name="+productname,
                headers:{
                    token:token
                }

            }).then((res)=>{
                expect(res.status).to.eq(200)
                expect(res.body).to.be.a('array')
                // expect(res.body.product_name).contains(productname)

            })
        })
    })

 })


 it("validate if the search product api response contains the relevant product details such as name, price, etc.",()=>{

    let  productname="Sneakers"

    cy.fixture("logindata.json").then((data) => {
        cy.request({
          method: "POST",
          failOnStatusCode: false,
          url: "http://192.168.1.44:7654/users/login",
          body: data,
        }).then((res) => {
        let token=res.body.token
        let userid=res.body._id

        cy.request({
            method:"GET",
            url:"http://192.168.1.44:7654/users/search?name="+productname,
            headers:{
                token:token
            }

        }).then((res)=>{
            expect(res.status).to.eq(200)
            // expect(res.body).to.be.a('array')  
            expect(res.body[0]).to.have.property('product_name')
            expect(res.body[0]).to.have.property('price')
            expect(res.body[0]).to.have.property('rating')



        })
    })
})

 })



 it("Validate the API's response when searching for a non-existent product name.",()=>{

    let  productname="zxzz"

    cy.fixture("logindata.json").then((data) => {
        cy.request({
          method: "POST",
          failOnStatusCode: false,
          url: "http://192.168.1.44:7654/users/login",
          body: data,
        }).then((res) => {
        let token=res.body.token
        let userid=res.body._id

        cy.request({
            method:"GET",
            url:"http://192.168.1.44:7654/users/search?name="+productname,
            headers:{
                token:token
            }

        }).then((res)=>{
            expect(res.status).to.eq(200)
            expect(res.body).to.eq("null")
            // expect(res.body).should('be.null')
            
        })
    })
})

 })


 it("Validate how the API handles invalid or empty search parameter",()=>{

    let  productname=""

    cy.fixture("logindata.json").then((data) => {
        cy.request({
          method: "POST",
          failOnStatusCode: false,
          url: "http://192.168.1.44:7654/users/login",
          body: data,
        }).then((res) => {
        let token=res.body.token
        let userid=res.body._id

        cy.request({
            method:"GET",
            url:"http://192.168.1.44:7654/users/search?name="+productname,
            failOnStatusCode: false,
            headers:{
                token:token
            }

        }).then((res)=>{
            expect(res.status).to.eq(404)
            expect(res.body.error).to.eq("invalid search index")

        })
    })
})

 })
 



})