import { useState } from "react";
import UserContext from "./userContext";

import { RegisterService } from "../Service/UserService";
 

export default function UserContextProvider({ children }) {
  const [credentials, setCredentials] = useState(null);
  const RegisteringUser = async (credentials) => {
    const response = await RegisterService(credentials);
    // console.log(response);
    return response
  };

  return (
    <UserContext.Provider value={{ credentials, setCredentials, RegisteringUser }}>
      {children}
    </UserContext.Provider>
  );
}