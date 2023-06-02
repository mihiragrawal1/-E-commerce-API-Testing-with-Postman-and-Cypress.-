describe("E-commerce website consumer sign-up api",()=>{

    function generateRandomFirstName() {
        const firstNames = ['John', 'Jane', 'David', 'Emily', 'Michael', 'Sarah'];
        return firstNames[Math.floor(Math.random() * firstNames.length)];
      }
      
      function generateRandomLastName() {
        const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Davis', 'Miller'];
        return lastNames[Math.floor(Math.random() * lastNames.length)];
      }
      
      function generateRandomEmail() {
        const emailProviders = ['gmail.com', 'yahoo.com', 'outlook.com', 'hotmail.com'];
        const firstName = generateRandomFirstName().toLowerCase();
        const lastName = generateRandomLastName().toLowerCase();
        const provider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
        return `${firstName}.${lastName}@${provider}`;
      }
      
      function generateRandomPhoneNumber() {
        let phoneNumber = '';
        for (let i = 0; i < 10; i++) {
          phoneNumber += Math.floor(Math.random() * 10);
        }
        return phoneNumber;
      }
      
      function generateRandomPassword(length = 8) {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let password = '';
        for (let i = 0; i < length; i++) {
          password += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return password;
      }
 

    it('Validate successfull signup with valid data',()=>{
        cy.request({
            method:"POST",
            url:"http://localhost:7654/users/signup",
            body:{
                "first_name":generateRandomFirstName(),
                "last_name":generateRandomLastName(),
                "email":generateRandomEmail(),
                "password":generateRandomPassword(),
                "phone":generateRandomPhoneNumber()
            }
            
        }).then((res)=>{
            expect(res.status).to.eq(201)
            expect(res.body).contains("Successfullly signed in")
        })
    })


    it('Validate signup api while required feilds are missing in the request body',()=>{

      cy.request({
        method:"POST",
        url:"http://localhost:7654/users/signup",
        // failonStatusCode:false,
        failOnStatusCode: false,
        body:{
            "first_name":"",
            "last_name":generateRandomLastName(),
            "email":"",
            "password":generateRandomPassword(),
            "phone":""
        }
        
    }).then((res)=>{
        expect(res.status).to.eq(400)
        expect(res.body).contains("Feilds are mandatory")
    })

    })

    it('Validate signup api when duplicate data is passed',()=>{

      cy.request({
        method:"POST",
        url:"http://localhost:7654/users/signup",
        // failonStatusCode:false,
        failOnStatusCode: false,
        body:{
            "first_name":"Mihir",
            "last_name":"Agrawal",
            "email":"mihiragrawal23@gmail.com",
            "password":"mihir123",
            "phone":"6788678578"
        }
        
    }).then((res)=>{
        expect(res.status).to.eq(400)
        expect(res.body.error).contains("user already exists")
    })

    })
})