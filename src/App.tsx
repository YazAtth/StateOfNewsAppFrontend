import './App.css'
import {Route, BrowserRouter, Routes} from "react-router-dom";
import Instructions from "./pages/Instructions.tsx";
import {About} from "./pages/About.tsx";
import 'tailwindcss/tailwind.css';
import {Footer} from "./components/layout/Footer.tsx";
import Custom404 from "./pages/Custom404.tsx";
import React from "react";
import {NewsGraph} from "./pages/NewsGraph.tsx";
import Resources from "./pages/Resources.tsx";
import { Helmet } from 'react-helmet';
import {Test} from "./pages/Test.tsx";
import {Configuration} from "./pages/Configuration.tsx";

function App() {


  return (
    <>
      <Helmet>

        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin=""/>
        <link href="https://fonts.googleapis.com/css2?family=Vollkorn:wght@700&display=swap" rel="stylesheet"/>

      </Helmet>
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<NewsGraph/>}/>
              <Route path="/instructions" element={<Instructions/>}/>
              <Route path="/resources" element={<Resources/>}/>
              <Route path="/about" element={<About/>}/>
              <Route path="/test" element={<Test/>}/>
              <Route path="/configuration" element={<Configuration/>}/>

              <Route path="*" element={<Custom404/>}/>
            </Routes>
          </BrowserRouter>
        </div>

        <div className="mt-auto">
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default App
