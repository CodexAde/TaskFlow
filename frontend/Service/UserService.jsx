export const RegisterService = async (user) => {
    const url = new URL("http://localhost:3000/api/users/register")
       try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const response = await res.json();
      console.log("Response:", response);
      return response;
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
}