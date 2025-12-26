let token = "";

async function register() {
    const url = "http://localhost:9001/api/v1/register";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "vitalib",
                email: "valid@email.com",
                password: "pass123",
                role: "user"
            })
        });
        console.log(await response.json());
    } catch (error) {
        console.log(error);
    }
}

async function login() {
    const url = "http://localhost:9001/api/v1/login";
    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                username: "vitalib",
                password: "pass123"
            })
        });
        const data = await response.json();
        console.log(data);
        token = data.token; // теперь токен сохраняется в глобальной переменной
    } catch (error) {
        console.log(error);
    }
}

async function getUser() {
    const url = "http://localhost:9001/api/v1/profile";
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });
        console.log(await response.json());
    } catch (error) {
        console.log(error);
    }
}

async function main() {
    await register();
    await login();
    await getUser();
}

main();
