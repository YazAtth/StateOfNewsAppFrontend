// fsf
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import {architectureDiagram, mongoDbLogo} from "../assets/images.tsx";
import styles from "./About.module.css"
import {useState} from "react";


export function About() {

  const [showFullScreen, setShowFullScreen] = useState(false);

  const handleImageClick = () => {
    setShowFullScreen(true);
  };

  const handleCloseFullScreen = () => {
    setShowFullScreen(false);
  };


  return (
    <>
      <div className={`${showFullScreen ? styles.page : ""}`}>
        <Navbar activePage="about"/>


        <div className="max-w-custom mx-auto" style={{minHeight: "90vh"}}>
          <div className="ml-8 mr-8">
            <div className="mt-6 mb-6 ml-4">
              <h1 className={"font-semibold text-gray-700 text-5xl"}>About</h1>
            </div>

            <h2 className={"font-semibold text-gray-700 text-3xl ml-4"}>Architecture Diagram</h2>
            <hr className={`${styles.divider}`}/>


            <div className="flex justify-center m-4 bg-white rounded-3xl">
              <img src={architectureDiagram} onClick={handleImageClick}/>
            </div>


            <h2 className={"font-semibold text-gray-700 text-3xl ml-4 mt-8"}>Github Links</h2>
            <hr className={`${styles.divider}`}/>

            <div className={`${styles.githubLinkCardHolder}`}>


              <a href="#">
                <div className={`${styles.githubLinkCard}`}>
                  <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>Front-End Website Source Code</h2>
                  <div className={`${styles.githubLinkCardImage}`}>
                    <div className={`${styles.githubLogoSvg} flex justify-center`}>
                      <svg className={``} viewBox="0 0 24 24" aria-hidden="true" style={{minWidth: "15em"}}>
                        <path fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>


              <a href="#">
                <div className={`${styles.githubLinkCard}`}>
                  <h2 className={"text-3xl text-gray-700 font-semibold text-center"}>Headline Keyword Generator Source Code</h2>
                  <div className={`${styles.githubLinkCardImage}`}>
                    <div className={`${styles.githubLogoSvg} flex justify-center`}>
                      <svg className={``} viewBox="0 0 24 24" aria-hidden="true" style={{minWidth: "15em"}}>
                        <path fillRule="evenodd"
                              d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                              clipRule="evenodd"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </a>






            </div>



          </div>
        </div>
      </div>


      {showFullScreen && (
        <div className={"fullscreen-overlay active "} onClick={handleCloseFullScreen}>
          <div className={"flex justify-center"}>
            <img src={architectureDiagram} style={{width: "100%"}}/>
          </div>
          <p className={"m-2 mb-4 text-center"} style={{minHeight: "20vh"}}>Click on the image to exit zoomed view</p>
        </div>
      )}

    </>
  );
}