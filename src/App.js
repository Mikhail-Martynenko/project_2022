import React, {useRef, useState} from "react";
import {Delaunay} from "d3-delaunay";
import './styles.css'

function App() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let pointsForRectangle = [];
    let pointsForCircle = [];
    //let jsonPoints = null;
    //let jsonTrianglesPoints = null;

    function triangulationRectangle(stepRectangle) {
        for (let x = 0; x <= 600; x += stepRectangle) {
            for (let y = 0; y <= 300; y += stepRectangle) {
                pointsForRectangle.push([x + 600, y + 150]);
            }
        }
    }

// Функция для добавления точек в круг
    function triangulationCircle(stepСircle) {
        // let radius = 200;
        pointsForCircle.push([300, 300]);
        let x = null;
        let y = null;

        for (let phi = 0; phi <= 360; phi += stepСircle) {
            for (let radius = 200; radius > 50; radius /= 2) {
                x = Math.abs(Math.floor(radius * Math.cos(phi)) + 300);
                y = Math.abs(Math.floor(radius * Math.sin(phi)) + 300);
                pointsForCircle.push([x, y]);
            }
        }
        // for (let x = 0; x <= 200; x += 100) {
        //     for (let y = 0; y <= 200; y += 100) {
        //         pointsForCircle.push([x+200 , y+200 ]);
        //     }
        // }
        drawCircle()
    }

// Нарисовать круг
    function drawCircle() {
        context.beginPath();
        context.fillStyle = "#FFF";
        context.arc(300, 300, 200, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();
    }

    // Состояние JSON
    const [jsonPoints, setJsonPoints] = useState('')
    const [jsonVerticesOfTriangles, setJsonVerticesOfTriangles] = useState('')

// Триангуляция
    function triangulation(arr) {
        const delaunay = Delaunay.from(arr);
        let tr = delaunay.triangles

        for (let i = 0; i < tr.length; i++) {
            const {points, triangles} = delaunay;
            const t0 = triangles[i * 3 + 0];
            const t1 = triangles[i * 3 + 1];
            const t2 = triangles[i * 3 + 2];
            context.beginPath();
            context.moveTo(points[t0 * 2], points[t0 * 2 + 1]);
            context.lineTo(points[t1 * 2], points[t1 * 2 + 1]);
            context.lineTo(points[t2 * 2], points[t2 * 2 + 1]);
            context.closePath();
            context.stroke();
        }
        setJsonPoints(JSON.stringify(arr))
        setJsonVerticesOfTriangles(JSON.stringify(tr))
    }

    const bodyInputRef = useRef()
    const bodyInputRef2 = useRef()

    // Кнопка триангуляции прямоугольника
    function triangulationRectangleButton(e) {

        e.preventDefault();
        context.clearRect(500, 100, 800, 600);

        triangulationRectangle(Number(bodyInputRef.current.value))
        triangulation(pointsForRectangle)

        pointsForRectangle = [];
    }

    // Кнопка триангуляции круга
    function triangulationCircleButton(e) {

        e.preventDefault();
        triangulationCircle(Number(bodyInputRef2.current.value))
        triangulation(pointsForCircle)

        pointsForCircle = [];
    }


    // function foo(e) {
    //     e.preventDefault();
    //
    // }

    return (
        <div className='App'>
            <form>
                <input
                    defaultValue='70'
                    ref={bodyInputRef}
                />
                <button onClick={triangulationRectangleButton}>Триангуляция прямоугольника</button>
                <div>
                    <input
                        defaultValue='40'
                        ref={bodyInputRef2}
                    />
                    <button onClick={triangulationCircleButton}>Триангуляция круга</button>
                </div>
            </form>
            <div>
                {/*<button onClick={foo}>Получить JSON</button>*/}
                <div>
                    <div>JSON</div>
                    <div>Координаты точек</div>
                    <div>{jsonPoints}</div>
                    <div>Номера вершин треугольников</div>
                    <div>{jsonVerticesOfTriangles}</div>
                </div>
            </div>
        </div>
    );
}

export default App;
