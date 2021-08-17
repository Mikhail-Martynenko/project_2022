import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import {Delaunay} from "d3-delaunay";
import Path from "d3-delaunay/src/path";

//d3.select("body").style("background-color", "pink");


const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);