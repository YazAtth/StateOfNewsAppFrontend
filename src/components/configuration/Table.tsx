import * as React from 'react';
import styles from "./Table.module.css"
import {useState} from "react";

interface Props {
  items: string[]
  setItems: React.Dispatch<React.SetStateAction<string[]>> // Add the setter prop
  title: string
  flashMessage?: string
  setFlashMessage: React.Dispatch<React.SetStateAction<string>>
}

export default function Table(props: Props) {

  const { items, setItems, title, setFlashMessage } = props

  async function removeItem(itemToRemove: string) {

    try {
      const endpoint = `${import.meta.env.VITE_API_DOMAIN}/stop-words?stop-word-to-delete=${itemToRemove}`
      const headers = {'authorizationToken': `${import.meta.env.VITE_API_AUTH_TOKEN}`,}; // auth header with bearer token
      const response = await fetch(endpoint, {
            method: "DELETE",
            headers,
          });

      // If item can be deleted on the db we delete our local copy
      if (response.ok) {
        // console.log("Ran this")
        setItems( (prevStopWords) => {
          return prevStopWords.filter((item) => item !== itemToRemove);
        });
      }

      // console.log(items)
      setFlashMessage(`Successfully deleted item \"${itemToRemove}\"`)

    } catch (error) {
      console.error("Error fetching data: ", error)
      setFlashMessage(`Failed to delete item \"${itemToRemove}\"`)
    }
  }

  return (
    <>
      <div className="stop-words-table mb-4">
        <table className={`w-full`}>
          <tr>
            <th>{title}</th>
            <th></th>
          </tr>
          {items.map((stopWord, index) => {
            const rowClass = index % 2 === 0 ? styles.evenRow : styles.oddRow;

            return (
              <tr key={index} className={rowClass}>
                <td className={`p-3`}>{stopWord}</td>
                <td className={`p-3 text-center`}>
                  <button
                    onClick={() => removeItem(stopWord)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            )
          })}
        </table>
      </div>
    </>
  )
}