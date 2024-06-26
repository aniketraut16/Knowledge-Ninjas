import React, { useState, useEffect } from "react";
import "./App.css";
import { useTma } from "./context/tmaProvider";

function App() {
  const { user, isLoading, isError } = useTma();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching user data</div>;
  }

  return <div>{user && <h1>Welcome, {JSON.stringify(user)}</h1>}</div>;
}

export default App;
