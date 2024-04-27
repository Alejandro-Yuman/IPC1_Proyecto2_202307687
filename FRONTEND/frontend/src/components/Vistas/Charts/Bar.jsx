import React, { useState, useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";



function ReporteBar () {
    const [lista, setLista] = useState([]);

    const charBarRef = useRef(null);

    useEffect(() => {
        fetch('http://localhost:5000/mostUserPosts', {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then((response) => response.json())
            .then((res) => {
                //console.log(res.topBar);
                setLista(res.topBar)
                //console.log(lista);
            }).catch(((error) => console.error(error)))


        /*if (lista.length === 0) {
            return
        }*/
    }, [])

    useEffect(() => {

        if (lista.length === 0) {
            return
        }
        
        const colors = ["#D98880", "#C39BD3", "#85C1E9", "#73C6B6", "#F8C471 "]  

        const labelsUser = lista.map(itemUser => itemUser.user )
        const dataPost = lista.map(itemUser => itemUser.post)

        
        //Configuracion de grafica
        const config = {
            type: "bar",
            data: {
                labels: labelsUser,
                datasets: [{
                    label: "Cantidad de Post por Usuario",
                    data: dataPost,
                    backgroundColor: colors.slice(0, dataPost.length), // Colores para las barras
                    borderColor: "red",
                    borderWidth: 1
                }] 
            },
            options: {
                scale: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }

        const myChart = new Chart(charBarRef.current, config)
        return () => myChart.destroy()

    }, [lista])

    return (
        <div>
            <canvas ref={charBarRef} width="400" height="400">

            </canvas>



        </div>
    )
}


export default ReporteBar;