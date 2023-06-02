describe("E-commerce application add address api",()=>{


    it("Validate add address api with valid id",()=>{

        cy.fixture("logindata.json").then((data) => {
            cy.request({
              method: "POST",
              failOnStatusCode: false,
              url: "http://192.168.1.44:7654/users/login",
              body: data,
            }).then((res) => {
            let token=res.body.token
            let userid=res.body._id
    
            if(res.body.address.length == 2){          //because consumer can add only two address max
                cy.fixture('address.json').then((data)=>{
                    cy.request({
                        method:"POST",
                        url:"http://192.168.1.44:7654/addaddress?id="+userid,
                        headers:{
                            token:token
                        },
                        failOnStatusCode:false,
                        body:data
                
                    }).then((res)=>{
            
                        expect(res.status).to.eq(400)
                    })
                
                })
            }
            else{

                cy.fixture('address.json').then((data)=>{
    
        
                    cy.request({
                        method:"POST",
                        url:"http://192.168.1.44:7654/addaddress?id="+userid,
                        headers:{
                            token:token
                        },
                        failOnStatusCode:false,
                        body:data
                
                    }).then((res)=>{
                        expect(res.status).to.eq(200)      
                        expect(res.body).contains("Successfully added address")
                
                      
                    })
                
                })


            }
        })
    })

    })


it("Validate add address api with invalid user id ",()=>{

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
     
        cy.fixture('address.json').then((data)=>{

    
    cy.request({
        method:"POST",
        url:"http://192.168.1.44:7654/addaddress?id="+userid,
        headers:{
            token:token
        },
        failOnStatusCode:false,
        body:data

    }).then((res)=>{
        expect(res.status).to.eq(404)   //returning 500 but should return 404 not found for invalid id      
        expect(res.body).contains("Invalid User ID")
    })

})
})
});
});


it("Validate add address api with valid id and blank address feilds",()=>{

    cy.fixture("logindata.json").then((data) => {
        cy.request({
          method: "POST",
          failOnStatusCode: false,
          url: "http://192.168.1.44:7654/users/login",
          body: data,
        }).then((res) => {
        let token=res.body.token
        let userid=res.body._id

                //because consumer can add only two address max
            cy.fixture('example.json').then((data)=>{
                cy.request({
                    method:"POST",
                    url:"http://192.168.1.44:7654/addaddress?id="+userid,
                    headers:{
                        token:token
                    },
                    failOnStatusCode:false,
                    body:data
            
                }).then((res)=>{
        
                    expect(res.status).to.eq(400)
                })
            
            })
        
      
    })
})


})

})








    // it("Validate add address api with valid user id ",()=>{   //add address api accepts only two address 

    //     cy.fixture("logindata.json").then((data) => {
    //         cy.request({
    //           method: "POST",
    //           failOnStatusCode: false,
    //           url: "http://192.168.1.44:7654/users/login",
    //           body: data,
    //         }).then((res) => {
    //         let token=res.body.token
    //         let userid=res.body._id
    
    //         if(res.body.address.length == 2){
    
    //             cy.request({
    //                 method:"DELETE",
    //                 url:"http://192.168.1.44:7654/deleteaddresses?id="+userid,
    //                 headers:{
    //                     token:token
    //                 },
    //                 failOnStatusCode:false
        
    //             })   //delete api work done
    //             // now add address
    
    //             cy.fixture('address.json').then((data)=>{
    
        
    //                 cy.request({
    //                     method:"POST",
    //                     url:"http://192.168.1.44:7654/addaddress?id="+userid,
    //                     headers:{
    //                         token:token
    //                     },
    //                     failOnStatusCode:false,
    //                     body:data
                
    //                 }).then((res)=>{
    //                     expect(res.status).to.eq(200)      
    //                     expect(res.body).contains("Successfully added address")
                
                      
    //                 })
                
    //             })
    //         }
    //         else{
    
    //             cy.fixture('address.json').then((data)=>{
    
        
    //                 cy.request({
    //                     method:"POST",
    //                     url:"http://192.168.1.44:7654/addaddress?id="+userid,
    //                     headers:{
    //                         token:token
    //                     },
    //                     failOnStatusCode:false,
    //                     body:data
                
    //                 }).then((res)=>{
    //                     expect(res.status).to.eq(200)      
    //                     expect(res.body).contains("Successfully added address")
                
                      
    //                 })
                
    //             })
    
    //         }
    // })
    // });
    // });


    
