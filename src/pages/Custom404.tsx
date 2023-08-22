import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";

export default function Custom404() {
  return (
    <>
      <Navbar activePage="404"/>
      <h1>Page not found!!</h1>
    </>
  );
}