const basename = "http://localhost:3000/api"

export default {
    async login({email, password}) {
        let req = await fetch(basename + "/login",{
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email, 
                password: password
            }),
            // mode: "cors",
            credentials: "include"
        })

        let data = await req.json();

        return data;
    },
    async profile() {
        let req = await fetch(basename + "/profile",{
            method: "get",
            mode: "cors",
            credentials: "include"
        })

        let data = await req.json();

        return data;
    }
}