const axios = require('axios');

let token = "";

async function register() {
    try {
        const response = await axios.post(
            "http://localhost:9001/api/v1/register",
            {
                username: "vitalib",
                email: "valid@email.com",
                password: "pass123",
                role: "user"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        console.log(response.data);
    } catch (error) {
        console.log(error.response ? error.response.data : error);
    }
}

async function login(){
    try{
        const response = await axios.post(
            "http://localhost:9001/api/v1/login",
            {
                username: "vitalib",
                password: "pass123"
            }
        );
        console.log(response.data);
        token = response.data.token;
        console.log(token);
    }catch(error){
        console.log(error);
    }
}


async function getUser(){
    try{
        const response = await axios.get("http://localhost:9001/api/v1/profile", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        console.log(response.data);

    }catch(error){
        console.log(error);
    }
}

async function main() {
    await register();
    await login();
    await getUser();
}

main();

 