/// <reference types="../types/react-graph-vis.d.ts" />
import * as React from 'react';
import Navbar from "../components/layout/Navbar.tsx";
import Sidebar from "../components/graph/Sidebar.tsx"
import Graph from "react-graph-vis";
import {useState} from "react";
import GraphVisNode from "../components/graph/GraphVisNode.ts";
import LoadingBar from "../components/util/LoadingBar.tsx";



interface graphData {
  nodes: { id: number; label: string; font: { size: number }; color?: string }[];
  edges: { from: number; to: number; id: string }[];
}



export function NewsGraph() {
  React.useEffect(() => {
    document.title = "StateOfNews | News Graph";
  }, []); // Run once on initial render


  const [graph, setGraph] = useState<graphData>()

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const graph_uri = "http://ec2-54-227-11-42.compute-1.amazonaws.com:8080/graph-data/"
        console.log(graph_uri)
        const response = await fetch(graph_uri);
        const jsonData = await response.json();
        // console.log(`Output: ${JSON.stringify(jsonData, null, 4)}`)

        setGraph(jsonData);
        // console.log(graph)
      } catch (error) {
        console.error("Error fetching data: ", error)
      }
    }
    fetchData();
  }, [])



  const options = {
    autoResize: true,
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
      arrows: {
        to: {
          enabled: false,
        },
        from: {
          enabled: false,
        }
      }
    },
    // height: "900px",
    interaction: {
      hover: true
    },
    // width: "900px",
    // physics: {
    //   // Even though it's disabled the options still apply to network.stabilize().
    //   enabled: true,
    //   solver: "repulsion",
    //   repulsion: {
    //     nodeDistance: 2000 // Put more distance between the nodes.
    //   }
    // }
    "physics": {
      "barnesHut": {
        "springConstant": 0,
        "avoidOverlap": 0.2,

        "springLength": 1000,
      }
    }

  };

  // Set size of the graph pane
  const graphPaneHeightMultiplier = 0.85
  const [optionsState, setOptionsState] = useState(() => {
    return {
      ...options,
      height: (window.innerHeight * graphPaneHeightMultiplier).toString()
    }
  });
  React.useEffect(() => {
    const handleResize = () => {
      setOptionsState((prevState) => ({
        ...prevState,
        height: (window.innerHeight * graphPaneHeightMultiplier).toString(),
      }));
    }

    // Add event listener to update the screen height on window resize
    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    }
  }, [])



  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedNode, setSelectedNode] = useState<GraphVisNode>();
  const [isSidebarLoading, setIsSidebarLoading] = useState<boolean>(false)
  const [selectedNodeLabel, setSelectedNodeLabel] = useState<string>("");



  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  const setIsSidebarLoadingToFalse = () => {
    setIsSidebarLoading(false);
  }



  const handleNodeClick = (event: any) => {
    if (graph == null) { // Ensures function will not run until graph data is loaded in
      return
    }

    const { nodes } = event;
    if (nodes.length > 0) {
      const nodeId = nodes[0];
      const node = graph.nodes.find((n) => n.id === nodeId);
      if (node) {

        setSelectedNode(node);
        setSelectedNodeLabel(node.label.toLowerCase());

        setIsOpen(true);
        setIsSidebarLoading(true);


      }
    }
  };


  const events = {
    select: handleNodeClick
  }




  return (
    <>

      <Navbar activePage="home"/>

      <div className="mx-auto relative flex-grow flex flex-col">

        {/*<div className={`right-0 absolute z-10 bg-blue-400 w-[20vw] h-full`}>*/}
        {/*  <p>Sidebar content</p>*/}
        {/*</div>*/}
        <Sidebar isOpen={isOpen}
                 toggleOpen={toggleOpen}
                 selectedNode={selectedNode}
                 isSidebarLoading={isSidebarLoading}
                 setIsSidebarLoadingToFalse={setIsSidebarLoadingToFalse}
                 selectedNodeLabel={selectedNodeLabel}
        />



        <div className="flex-grow pl-0 pr-0">

          {graph == null?
            <div className="pl-5 pr-5 pt-10 pb-5 flex items-center justify-center">
              <LoadingBar/>
            </div>
            :
            <Graph
              graph={graph}
              options={optionsState}
              events={events}
              getNetwork={network => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
                network.on("hoverNode", function () {
                  network.canvas.body.container.style.cursor = 'pointer'
                });

                network.on("blurNode", function () {
                  network.canvas.body.container.style.cursor = 'default'
                });
              }}
            />
          }


        </div>
      </div>

    </>
  );
}