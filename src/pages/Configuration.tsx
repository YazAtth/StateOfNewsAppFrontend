// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import {useEffect, useState} from "react";
import Table from "../components/configuration/Table.tsx";

// type Props = {
//
// };

export function Configuration() {

  const stopWordArray = ["day",
    "days",
    "week",
    "weeks",
    "month",
    "months",
    "year",
    "years",
    "video",
    "way",
    "pictures",
    "year",
    "month",
    "week",
    "podcast",
    "new",
    "new",
    "co",
    "my",
    "out",
    "images",
    "says",
    "rise",
    "call",
    "child",
    "children",
    "man",
    "men",
    "woman",
    "women",
    "people",
    "person",
    "sex",
    "rape",
    "sexual",
    "options",
    "use",
    "live",
    "case",
    "year",
    "group",
    "finds",
    "place",
    "report",
    "lives",
    "area",
    "news",
    "rules",
    "former",
    "start",
    "world",
    "house",
    "plan",
    "plans",
    "BBC",
    "apple",
    "pear",
    "peach",
    "orange"]



  const [stopWords, setStopWords] = useState<string[]>([])
  const [newStopWords, setNewStopWords] = useState<string[]>([])
  const [newItem, setNewItem] = useState("");
  const [flashMessage, setFlashMessage] = useState("")


  useEffect(() => {
    async function fetchData() {
      try {
        const endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words`
        const headers = {'authorizationToken': `${import.meta.env.VITE_API_AUTH_TOKEN}`}; // auth header with bearer token
        const response = await (await fetch(endpoint, {headers})).json();

        setStopWords(response)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchData();
  }, [])



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
      const endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words`
      const headers = {'authorizationToken': `${import.meta.env.VITE_API_AUTH_TOKEN}`}; // auth header with bearer token

      const response = await (
          await fetch(endpoint, {
            method: "POST",
            headers,
            body: JSON.stringify([newItem])
          })
      ).json();

      setStopWords([...stopWords, newItem]);
      setNewStopWords([...newStopWords, newItem]);
      setFlashMessage(`Added item \"${newItem}\"`)
    } catch (error) {
      console.error("Error fetching data: ", error)
      setFlashMessage(`Failed to add item \"${newItem}\"`)
    }

    setNewItem("");



  }

  return (
      <>
        <Navbar activePage={"configuration"}/>

        <div className="max-w-custom mx-auto" style={{minHeight: "90vh"}}>
          <div className="ml-8 mr-8">

            <div className="mt-6 mb-6 ml-4">
              <h1 className={"font-semibold text-gray-700 text-5xl"}>Configuration</h1>
            </div>

            <p>{flashMessage}</p>
            <input
                type="text"
                placeholder="Enter item"
                value={newItem}
                onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={() => addItem(newItem)}>Add Item</button>

            {/*<Table items={newStopWords} setItems={setNewStopWords}/>*/}
            <Table items={stopWords} setItems={setStopWords} title={"Stop Words"} setFlashMessage={setFlashMessage}/>

          </div>
        </div>

      </>
  );
}