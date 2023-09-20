import React, {useState} from "react";
import 'tailwindcss/tailwind.css';
import styles from "./Sidebar.module.css"
import GraphVisNode from "./GraphVisNode.ts";
import JunctionTableApiResponse from "../../types/JunctionTableApiResponse.tsx";
import ArticlesContainer from "./ArticlesContainer.tsx";
import LoadingBar from "../util/LoadingBar.tsx";


type props =  {
  isOpen: boolean
  toggleOpen: () => void;
  selectedNode: GraphVisNode | undefined;
  isSidebarLoading: boolean
  setIsSidebarLoadingToFalse: () => void
  selectedNodeLabel: string
}

export default function Navbar({ isOpen, toggleOpen, selectedNode, isSidebarLoading, setIsSidebarLoadingToFalse, selectedNodeLabel }: props) {

  const [sidebarData, setSidebarData] = useState<JunctionTableApiResponse>()

  React.useEffect(() => {

    const fetchDataFromApi = async () => {
      if (isSidebarLoading) {
        try {
          const keywordToArticleIdHashUri = "localhost:8080/keywords-to_article_id_hash/"
          const response = await fetch(`http://localhost:8080/keywords-to_article_id_hash/?keyword=${selectedNodeLabel}`);
          const jsonData: JunctionTableApiResponse = await response.json();

          console.log(jsonData)

          if (jsonData.similarArticleList) {
            setSidebarData(jsonData)
          }

          setSidebarData(jsonData);
          setIsSidebarLoadingToFalse();


        } catch (error) {
          console.error("Error fetching data: ", error)
          setIsSidebarLoadingToFalse();
        }
      }
    }
    fetchDataFromApi()

  }, [isSidebarLoading]);


  const [hasBeenOpened, setHasBeenOpened] = useState<boolean>(false)
  React.useEffect(() => {
    if (!isOpen && !hasBeenOpened) {
      setHasBeenOpened(true);
    }
  }, [isOpen, hasBeenOpened]);

  if (hasBeenOpened) {
    return (
      <>
        {/* transform ${!isOpen ? 'translate-x-0': 'translate-x-full'} ease-in-out duration-300 `*/}
        <div
          // className={`right-0 absolute bg-gray-300 md:w-[30vw] sm:w-[80vw] h-full z-10 ${styles.sidebarStyles}`}
          className={`right-0 absolute bg-gray-300 h-full z-10 ${styles.sidebarStyles} ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}`}
          // style={{display: isOpen ? 'block': 'none'}}
        >
          <div className="cursor-pointer pt-3 pl-2 pb-2 text-sm bg-blue-300">
            <button className="text-xl absolute right-4 z-20" onClick={() => toggleOpen()} style={{all: "unset"}}>
              Close Sidebar [x]
            </button>
          </div>

          <div className="h-full overflow-auto p-2">
            <p>Showing results for <b>{selectedNode?.label}</b>:</p>
            <div className="pt-2">
              {isSidebarLoading || (isSidebarLoading && sidebarData?.similarArticleList) ?
                <div className="flex justify-center pt-5">
                  <LoadingBar/>
                </div>
                :
                sidebarData?.similarArticleList && (
                  <ArticlesContainer similarArticleList={sidebarData.similarArticleList}/>
                )
              }
            </div>
          </div>

        </div>
      </>
    )
  } else {
    return <></>
  }



}