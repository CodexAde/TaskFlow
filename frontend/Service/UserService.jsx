export const RegisterService = async (name, email, password) => {
    const url = new URL("http://localhost:3000/api/users/register")
    try {
        const response = await fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json" 
            },
            body: JSON.stringify({ name, email, password })
        })
        const data = await response.json()
        if (!response.ok) {
            console.log("Failed to create a user", data)
            return null
        }
        return data
    } catch (error) {
        console.log("Registeration failed", error)
    }
}