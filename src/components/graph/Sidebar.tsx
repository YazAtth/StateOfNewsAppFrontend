import React, {useState} from "react";
import 'tailwindcss/tailwind.css';
import styles from "./Sidebar.module.css"
import GraphVisNode from "./GraphVisNode.ts";
import {SimilarArticle} from "../../types/JunctionTableApiResponse.tsx";
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

// const sampleSidebarData: SimilarArticle[] = [{"title":"Donald Trump: Hackers claim ex-president dead on son's X account","link":"https://www.bbc.co.uk/news/world-us-canada-66869455?at_medium=RSS&at_campaign=KARANGA","description":"The post was among a string of now-deleted messages on his son's account."},{"title":"Trump Campaigns in Iowa, Where GOP Rivals See Their Best Chance","link":"https://www.nytimes.com/2023/09/20/us/politics/trump-iowa-republicans-2024.html","description":"After a light campaign schedule in the key early state, the former president is making five trips in the next six weeks."},{"title":"Fulton County DA says fake Trump electors are incriminating one another and wants lawyer disqualified","link":"https://www.cnn.com/2023/04/18/politics/fulton-county-trump-fake-electors/index.html","description":"The Fulton County District Attorney's office said some fake electors for Donald Trump have implicated each other in potential criminal activity and is seeking to disqualify their lawyer, according to a new court filing."},{"title":"Volodymyr Zelenskyy Urges Trump To Reveal His Speedy Plan For Peace In Ukraine","link":"https://www.huffpost.com/entry/zelenskyy-trump-ukraine-russia-peace-plan_n_650ad742e4b0cacddcc6b2b8","description":"But the Ukrainian leader warned his country is not prepared to hand over territory to Russia. “That is not the peace formula,” he said."},{"title":"Donald Trump Jr.’s Twitter Account Hacked With Series Of Wild Posts","link":"https://www.huffpost.com/entry/donald-trump-jr-twitter-account-hacked_n_650ae9ebe4b09ab5f8e5dd3c","description":"One post announced that his father had died and that he would be taking his place in the 2024 presidential election. It was deleted not long after."},{"title":"Mike Pence Calls Out Former Boss Trump For Skipping Next Week’s GOP Primary Debate","link":"https://www.huffpost.com/entry/mike-pence-gop-primary-debate-trump_n_650abe77e4b0b7471891007b","description":"“I think it’s a missed opportunity for Donald Trump and I think it’s a missed opportunity for Republican voters,\" the former vice president said."},{"title":"Claire McCaskill Floats Trump Legal Punishment That Hits Him Where It ‘Hurts’","link":"https://www.huffpost.com/entry/claire-mccaskill-trump-gag-order_n_650addb6e4b0befea6b658cd","description":"The former Democratic senator weighed in on special counsel Jack Smith's request for a gag order in the Jan. 6 case."},{"title":"New Effort To Remove Trump From Ballot Underway In California","link":"https://www.huffpost.com/entry/california-remove-trump-ballot_n_6509d825e4b0dffbb8ca3c5a","description":"Lawmakers are asking the state's attorney general to seek a court opinion on whether Trump is disqualified because he violated the 14th Amendment."},{"title":"George Conway Says Trump Will Be ‘Destroyed On The Stand’ If He Does This","link":"https://www.huffpost.com/entry/george-conway-donald-trump-on-the-stand_n_650a97c8e4b07f7adf21af8d","description":"The conservative attorney explained exactly how a prosecutor could draw out the former president."},{"title":"Chris Christie Pinpoints The Very ‘Worst Part’ Of Bombshell Trump Report","link":"https://www.huffpost.com/entry/chris-christie-trump-report_n_650ab8a8e4b0b7471890ffa7","description":"Writing to-do notes on classified documents is not as bad as another allegation in the report, the presidential hopeful said."}]


export default function Navbar({ isOpen, toggleOpen, selectedNode, isSidebarLoading, setIsSidebarLoadingToFalse, selectedNodeLabel }: props) {

  const [sidebarData, setSidebarData] = useState<SimilarArticle[]>()

  React.useEffect(() => {

    const fetchDataFromApi = async () => {
      if (isSidebarLoading) {
        try {
          const keywordToArticleIdHashUri = `http://ec2-54-227-11-42.compute-1.amazonaws.com:8080/get-articles-from-keyword/?keyword=${selectedNodeLabel}`
          const response = await fetch(keywordToArticleIdHashUri);
          const jsonData: SimilarArticle[] = await response.json();

          console.log(jsonData)

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
              {isSidebarLoading ?
                <div className="flex justify-center pt-5">
                  <LoadingBar/>
                </div>
                :
                (sidebarData != undefined) && <ArticlesContainer similarArticleList={sidebarData}/>
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