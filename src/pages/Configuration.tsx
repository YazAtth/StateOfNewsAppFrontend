// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import {useEffect, useState} from "react";
import Table from "../components/configuration/Table.tsx";
import styles from "./Configuration.module.css"


export function Configuration() {

  const [stopWords, setStopWords] = useState<string[]>([]);
  const [newStopWords, setNewStopWords] = useState<string[]>([]);
  const [newItem, setNewItem] = useState("");
  const [flashMessage, setFlashMessage] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [buttonLabel, setButtonLabel] = useState({
    authenticateButton: "Authenticate",
    addItemButton: "Add Item",
    runAlgorithmButton: "Run Algorithm"
  });
  const [algorithmLastInvocation, setAlgorithmLastInvocation] = useState("N/A")


  // useEffect(() => {
  //   async function fetchData() {
  //
  //     console.log(stopWords)
  //
  //     const endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words`
  //     // const headers = {'authorizationToken': `${import.meta.env.VITE_API_AUTH_TOKEN}`}; // auth header with bearer token
  //     const headers = {'authorizationToken': `${authToken}`}; // auth header with bearer token
  //     const response = await fetch(endpoint, {headers});
  //
  //     if (response.status == 200) {
  //       const responseBody = await response.json()
  //       setStopWords(responseBody)
  //     } else {
  //       setStopWords([])
  //     }
  //
  //   }
  //   fetchData();
  // }, [authToken])

  // When the authenticate button is clicked
  async function fetchData() {


    setButtonLabel(prevState => ({
      ...prevState,
      authenticateButton: "Loading..."
    }))

    let endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words`
    // const headers = {'authorizationToken': `${import.meta.env.VITE_API_AUTH_TOKEN}`}; // auth header with bearer token
    const headers = {'authorizationToken': `${authToken}`}; // auth header with bearer token
    let response = await fetch(endpoint, {headers});


    if (response.status == 200) {
      const responseBody = await response.json();
      setStopWords(responseBody)
    } else {
      setStopWords([])
    }


    // Make request to see last algorithm run
    endpoint = `${import.meta.env.VITE_API_DOMAIN}/last-algo-run`
    response = await fetch(endpoint, {headers})

    if (response.status == 200) {
      const responseBody = await response.json();
      setAlgorithmLastInvocation(responseBody.lastModified)
    }


    // Reset label on authenticate button
    setButtonLabel(prevState => ({
      ...prevState,
      authenticateButton: "Authenticate"
    }))


  }





  async function addItem(newItem: string) {

    newItem = newItem.trim();

    if (newItem == "") {
      setFlashMessage("Text box cannot be empty")
      setNewItem("");
      return;
    }

    if (stopWords.includes(newItem)) {
      setFlashMessage("Item already exists")
      setNewItem("");
      return;
    }

    try {
      setButtonLabel(prevState => ({
        ...prevState,
        addItemButton: "Loading..."
      }))

      const endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words`
      // const headers = {'authorizationToken': `${import.meta.env.VITE_API_AUTH_TOKEN}`}; // auth header with bearer token
      const headers = {'authorizationToken': `${authToken}`, 'Content-Type':'application/json'}; // auth header with bearer token


      const response = await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify([newItem])
          });


      if (response.ok) {
        setStopWords([...stopWords, newItem]);
        setNewStopWords([...newStopWords, newItem]);
        setFlashMessage(`Added item "${newItem}"`);
      } else {
        setFlashMessage(`Failed to add item "${newItem}`);
        console.log(response.status)
      }
    } catch (error) {
      console.error("Error fetching data: ", error)
      setFlashMessage(`Failed to add item "${newItem}"`)
    } finally {
      setButtonLabel(prevState => ({
        ...prevState,
        addItemButton: "Add Item"
      }))
    }

    setNewItem("");

  }

  async function runAlgorithm() {
    setButtonLabel(prevState => ({
      ...prevState,
      runAlgorithmButton: "Loading..."
    }))

    const endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words`
    const headers = {'authorizationToken': `${authToken}`}; // auth header with bearer token
    const response = await fetch(endpoint, {headers});

    setButtonLabel(prevState => ({
      ...prevState,
      runAlgorithmButton: "Run Algorithm"
    }))
  }

  return (
      <>
        <Navbar activePage={"configuration"}/>

        <div className="max-w-custom mx-auto" style={{minHeight: "90vh"}}>
          <div className="ml-8 mr-8">

            <div className="mt-6 mb-6 ml-4">
              <h1 className={"font-semibold text-gray-700 text-5xl"}>Configuration</h1>
            </div>


            {/* Authentication */}

            <input
              type="text"
              placeholder="Enter Auth Token"
              value={authToken}
              onChange={(e) => setAuthToken(e.target.value)}
              className={`${styles.textBox} w-full`}
            />

            <button onClick={() => fetchData()}>{buttonLabel.authenticateButton}</button>

            <hr className={`${styles.divider} mt-5`}/>

            <p><b>Last Modified:</b> {algorithmLastInvocation}</p>
            <button onClick={() => runAlgorithm()}>{buttonLabel.runAlgorithmButton}</button>

            <hr className={`${styles.divider} mt-5`}/>

            {/* Stop Words Editor */}

            <p>{flashMessage}</p>
            <input
                type="text"
                placeholder="Enter item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
                className={`${styles.textBox} w-full`}
            />
            <button onClick={() => addItem(newItem)}>{buttonLabel.addItemButton}</button>

            <Table
              items={stopWords}
              setItems={setStopWords}
              title={"Stop Words"}
              setFlashMessage={setFlashMessage}
              authToken={authToken}
            />

          </div>
        </div>

      </>
  );
}