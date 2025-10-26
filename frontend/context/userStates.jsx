import { useState } from "react";
import UserContext from "./userContext";

export default function UserContextProvider({children}) {
  const [credentials, setCredentials] = useState(null);

  return (
    <UserContext.Provider value={{ credentials, setCredentials }}>
      {children}
    </UserContext.Provider>
  );
}