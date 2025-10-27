export default function formateValidator(user) {
    if (!user.name || !user.email || !user.password) {
      alert("All fields (name, email, password) are required!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(user.email)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (user.password.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }
  return true; 
}   