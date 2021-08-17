import React, {useRef, useState} from "react";
import {Delaunay} from "d3-delaunay";


function App() {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');


   // const [stepRectangle, setStepRectangle] = useState(0)
    // const [stepСircle, setStepСircle] = useState(0)


    let pointsForRectangle = [];
    let pointsForCircle = [];

    function triangulationRectangle(stepRectangle) {
        for (let x = 0; x <= 600; x += stepRectangle) {
            for (let y = 0; y <= 300; y += stepRectangle) {
                pointsForRectangle.push([x + 600, y + 150]);
            }
        }
    }

    //  triangulationRectangle(points2)

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
        drawCircle()
    }

    // triangulationCircle(points)

// Нарисовать круг
    function drawCircle() {
        context.beginPath();
        context.fillStyle = "#FFF";
        context.arc(300, 300, 200, 0, Math.PI * 2);
        context.fill();
        context.stroke();
        context.closePath();
    }

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
    }

    //triangulation(pointsForRectangle)
    // triangulation(points2)

    const bodyInputRef = useRef()
    const bodyInputRef2 = useRef()

    // Кнопка триангуляции
    function triangulationRectangleButton(e) {
        e.preventDefault();
        context.clearRect(500, 100, 800, 600);

        console.log(bodyInputRef.current.value)

        triangulationRectangle(Number(bodyInputRef.current.value))
        triangulation(pointsForRectangle)

        console.log(pointsForRectangle)

        pointsForRectangle = [];
    }

    // Кнопка триангуляции круга
    function triangulationCircleButton(e) {
        e.preventDefault();
      // context.clearRect(300, 300, 250, 250);


        triangulationCircle(Number(bodyInputRef2.current.value))
        triangulation(pointsForCircle)

        pointsForCircle = [];
    }

    return (
        <div>
            <form>
                <input
                    ref={bodyInputRef}
                />
                <button onClick={triangulationRectangleButton}> Триангуляция прямоугольника</button>
            <div>
                <input
                    ref={bodyInputRef2}
                />
                <button onClick={triangulationCircleButton}> Триангуляция круга</button>
            </div>
            </form>
        </div>
    );
}

export default App;
