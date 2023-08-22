// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";


export default function Instructions() {

  React.useEffect(() => {
    document.title = "StateOfNews | Instructions";
  }, []); // Run once on initial render

  return (
    <>
      <Navbar activePage="instructions"/>

      <div className="max-w-custom mx-auto" style={{minHeight: "90vh"}}>
        <div className="pl-5 pr-5 pt-5 pb-5">
          <h1 className={"font-semibold text-gray-700"}>Instructions</h1>
        </div>

        <h2>What is the graph?</h2>
        <h2>What do nodes mean? (the blue ovals)</h2>
        <h2>What do the lines between the nodes mean?</h2>
        <h2></h2>
        <h2></h2>

      </div>

    </>
  );
}
