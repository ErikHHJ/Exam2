import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "./layout/Layout.jsx";

import "./App.css";
import * as React from "react";

import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

export default App;
