// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import styles from "./Resources.module.css"

import {
  reactLogo,
  mongoDbLogo,
  awsLambdaLogo,
  awsS3Logo,
  d3Logo,
  tailwindCssLogo,
  viteJsLogo, typescriptLogo
} from "../assets/images.tsx";

export default function Resources() {

  React.useEffect(() => {
    document.title = "StateOfNews | Resources";
  }, []); // Run once on initial render

  return (
    <>
      <Navbar activePage="resources"/>

      <div className="max-w-custom mx-auto" style={{minHeight: "90vh"}}>
        <div className="ml-10 mt-6">
          <h1 className={"font-semibold text-gray-700 text-5xl"}>Resources</h1>
        </div>

        <div className={`${styles.resourceCardHolder} m-5`}>
          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>React</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={reactLogo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>MongoDB</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={mongoDbLogo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>AWS Lambda</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={awsLambdaLogo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>AWS S3</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={awsS3Logo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>D3.js</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={d3Logo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>TailwindCSS</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={tailwindCssLogo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>Vite.js</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={viteJsLogo}/>
            </div>
          </div>

          <div className={`${styles.resourceCard}`}>
            <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>Typscript</h2>
            <div className={`${styles.resourceCardImage} flex justify-center`}>
              <img src={typescriptLogo}/>
            </div>
          </div>


        </div>
      </div>

    </>
  );
}
