import * as React from 'react';
import styles from "./Table.module.css"
import {useState} from "react";

interface Props {
  items: string[]
  setItems: React.Dispatch<React.SetStateAction<string[]>>; // Add the setter prop
}

export default function Table(props: Props) {

  const { items, setItems } = props

  const removeItem = (itemToRemove: string) => {
    setItems((prevStopWords) => {
      const updatedItems: string[] = prevStopWords.filter((item) => item !== itemToRemove);
      return updatedItems; // Return the new state value
    });
  };

  return (
    <>
      <div className="stop-words-table mb-4">
        <table className={`w-full`}>
          <tr>
            <th>Stop Words</th>
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