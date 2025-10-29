export const RegisterService = async (user) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const url = new URL(`${backendUrl}/api/users/register`);
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("language", user.language);
    formData.append("avatar", user.avatar);
       try {
      const res = await fetch(url, {
      method: "POST",
      body: formData,
      });

      const response = await res.json();
      console.log("Response:", response);
      return response;
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong!");
    }
}