// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import {useState} from "react";
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

  const [stopWords, setStopWords] = useState(stopWordArray)
  const [newStopWords, setNewStopWords] = useState<string[]>([])
  const [newItem, setNewItem] = useState("");
  const [flashMessage, setFlashMessage] = useState("")

  const addItem = (newItem: string) => {

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

    setStopWords([...stopWords, newItem]);
    setNewStopWords([...newStopWords, newItem]);
    setNewItem("");
  };

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

          <Table items={newStopWords} setItems={setNewStopWords}/>

          {/*<Table stopWords={stopWords}/>*/}

        </div>
      </div>

      </>
  );
}