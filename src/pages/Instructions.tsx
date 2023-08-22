// @flow
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import styles from "./Instructions.module.css"


export default function Instructions() {

  React.useEffect(() => {
    document.title = "StateOfNews | Instructions";
  }, []); // Run once on initial render

  return (
    <>
      <Navbar activePage="instructions"/>

      <div className="max-w-custom mx-auto" style={{minHeight: "90vh"}}>
        <div className="ml-10 mt-6">
          <h1 className={"font-semibold text-gray-700 text-5xl"}>Instructions</h1>
        </div>

        <div className={`${styles.instructionsCardHolder} m-5`}>

          <div className={`${styles.instructionsCard} ${styles.instructionsCard1}` }>
            <h2 className={`${styles.instructionsCardTitle}`}>What is the graph?</h2>
            <p className="text-xl">
              It's a node graph which is a visual map that shows how different pieces of information are
              connected to each other. It consists of nodes (the blue ovals) and edges (lines between the blue ovals).
            </p>
          </div>
          <div className={`${styles.instructionsCard}`}>
            <h2 className={`${styles.instructionsCardTitle}`}>What do nodes mean? (the blue ovals)</h2>
            <p className="text-xl">
              Each node represents a word from one or more news headlines. The larger the node: the more often the
              word shows up in headlines.
            </p>
          </div>
          <div className={`${styles.instructionsCard}`}>
            <h2 className={`${styles.instructionsCardTitle}`}>What do the lines between the nodes mean?</h2>
            <p className="text-xl">
              The lines show that two words are linked. If two words words appear together in a headline:
              there will be a line connecting the two words.
            </p>
          </div>
          <div className={`${styles.instructionsCard} ${styles.instructionsCard2}`}>
            <h2 className={`${styles.instructionsCardTitle}`}>How can I see the articles the words come from?</h2>
            <p className="text-xl">
              Clicking on the nodes will open up a sidebar that will show all of the articles the words come from.
              Clicking on the articles will take you to the article itself.
            </p>
          </div>
          <br/>


        </div>

      </div>

    </>
  );
}
