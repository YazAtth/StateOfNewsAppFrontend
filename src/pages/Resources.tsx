// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";


export default function Resources() {

  React.useEffect(() => {
    document.title = "StateOfNews | Resources";
  }, []); // Run once on initial render

  return (
    <>
      <Navbar activePage="resources"/>

      <div className="max-w-custom mx-auto">
        <div className="pl-5 pr-5 pt-2 pb-5">
          <h1>This is the resources page</h1>
        </div>
      </div>

    </>
  );
}
