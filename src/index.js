import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles.css";
import {Delaunay} from "d3-delaunay";
import Path from "d3-delaunay/src/path";
//import Delaunator from 'delaunator';


//d3.select("body").style("background-color", "pink");



let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');

let points = [];
let points2 = [];
// points.push([0,0])
// points.push([0,300])
// points.push([600,0])
// points.push([600,300])

//let count = prompt("Введите количество точек для триангуляции")


// Триангуляция прямоугольника
function triangulationRectangle(arr) {
    let count = prompt("Введите шаг для триангуляции прямоугольника",'60')
    for (let x = 0; x <= 600; x += Number(count)) {
        for (let y = 0; y <= 300; y += Number(count)) {
            arr.push([x+600, y+150]);
            // if(points.length >= count){
            //     break;
            // }
        }
    }
}
triangulationRectangle(points2)


function triangulationСircle(arrPoints) {
    let step = prompt("Введите шаг для триангуляции круга",'30')
    let radius = 200;
    arrPoints.push([300, 300]);
    let x = null;
    let y = null;
    // points.push([500, 300]);
    // points.push([300, 100]);
    // points.push([300, 500]);
    // points.push([100, 300]);
    // points.push([300, 300]);

    for (let phi = 1 ; phi <= 360; phi += Number(step)) {
       x = Math.abs(Math.floor(radius * Math.cos(phi))+300);
       y = Math.abs(Math.floor(radius * Math.sin(phi))+300);
        points.push([x, y]);
        console.log(x)
        console.log(y)
    }
    drawCircle()
}
triangulationСircle(points)

// Нарисовать круг
function drawCircle() {
    context.beginPath();
    context.fillStyle = "#FFF";
    context.arc(300, 300, 200, 0, Math.PI * 2);
    context.fill();
    context.stroke();
    context.closePath();
}

console.log(points)
console.log(points.length)
// for (let i = 0; i<= 100; i ++){
//     points.push([Math.floor(Math.random()*600),Math.floor(Math.random()*300)]);
// }

function triangulation(arr){
    const delaunay = Delaunay.from(arr);
    let tr = delaunay.triangles

    for (let i = 0; i<tr.length; i++){
        const {points, triangles} = delaunay;
        const t0 = triangles[i * 3 + 0];
        const t1 = triangles[i * 3 + 1];
        const t2 = triangles[i * 3 + 2];
        // context.beginPath();
        context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
        context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
        context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
        context.stroke();

    }
}
triangulation(points)
triangulation(points2)


// const delaunay = Delaunay.from(points);
// const voronoi = delaunay.voronoi([0, 0, 960, 500]);
// let tr = delaunay.triangles
//
//
// for (let i = 0; i<tr.length; i++){
//     const {points, triangles} = delaunay;
//     const t0 = triangles[i * 3 + 0];
//     const t1 = triangles[i * 3 + 1];
//     const t2 = triangles[i * 3 + 2];
//    // context.beginPath();
//     context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
//     context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
//     context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
//    // context.closePath();
//     context.stroke();
//
//     //delaunay.renderTriangle(i, [context])
// }
// //delaunay.renderTriangle(i, [context])




const mountNode = document.getElementById("app");
ReactDOM.render(<App />, mountNode);