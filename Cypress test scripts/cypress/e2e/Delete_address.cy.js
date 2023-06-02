describe("E-commerce application delete api",()=>{
    
    it("Validate delete address api with valid user id ",()=>{

        cy.fixture("logindata.json").then((data) => {
            cy.request({
              method: "POST",
              failOnStatusCode: false,
              url: "http://192.168.1.44:7654/users/login",
              body: data,
            }).then((res) => {
            let token=res.body.token
            let userid=res.body._id
         
        // const userid="64759d5551dc973cc84d5f47"
        cy.request({
            method:"DELETE",
            url:"http://192.168.1.44:7654/deleteaddresses?id="+userid,
            headers:{
                token:token
            },
            failOnStatusCode:false

        }).then((res)=>{
            expect(res.status).to.eq(204)       //returning 202 but it should be 204 for delete call
            expect(res.body).contains("Successfully deleted addresses")
        })


    })
});
});


    
it("Validate delete address api with invalid user id ",()=>{

    cy.fixture("logindata.json").then((data) => {
        cy.request({
          method: "POST",
          failOnStatusCode: false,
          url: "http://192.168.1.44:7654/users/login",
          body: data,
        }).then((res) => {
        let token=res.body.token
        function generateRandomAlphanumeric() {
            const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let result = '';
            for (let i = 0; i < 24; i++) {
              result += characters.charAt(Math.floor(Math.random() * characters.length));
            }
            return result;
          }
    const userid=generateRandomAlphanumeric()
    cy.request({
        method:"DELETE",
        url:"http://192.168.1.44:7654/deleteaddresses?id="+userid,
        headers:{
            token:token
        },
        failOnStatusCode:false

    }).then((res)=>{
        expect(res.status).to.eq(404)       //returning 500 but it should be 404 for delete call
        expect(res.body).contains("Invalid Consumer Id")
    })


})
});
});

})