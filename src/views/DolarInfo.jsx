import React, {useEffect, useState} from 'react'
import '../sass/views/DolarInfo.sass'
import axios from 'axios';
import {Bar} from 'react-chartjs-2';

function DolarInfo () {

    useEffect(() => {
        getDailyDolar()
    }, [])

    const [dailyDollarValue, setDailyDollarValue] = useState([])
    const [dollarValue1, setDollarValue1] = useState(0)
    const [dollarValue2, setDollarValue2] = useState(0)
    const [minimumDate, setMinimumDate] = useState("")
    const [higherDollar, setHigherDollar] = useState(0)
    const [lowerDollar, setlowerDollar] = useState(0)

    //Establece el valor del dólar del día, también queda incluído en el gráfico
    const getDailyDolar = async () => {
        await axios.get(`https://mindicador.cl/api`)
        .then(res => {
            const data = res.data.dolar.valor;
            setDailyDollarValue(data);
        })
    }

    //Obtiene el valor del dólar en la fecha seleccionada, también establece la fecha mínima
    //del segundo input date, en caso de no haber valor en la fecha arrojará un alert
    const getInitialDolar = async (e) => {
        const date = e.target.value
        setMinimumDate(e.target.value)
        const year = date.substr(0,4);
        const month = date.substr(5,2);
        const day = date.substr(8,2);
        await axios.get(`https://mindicador.cl/api/dolar/${day}-${month}-${year}`)
        .then(res => {
            const data = res.data.serie[0].valor;
            setDollarValue1(data);
            calculateDolar(data, 1);
        }).catch( error => {
            alert("No hay valor del dólar en esta fecha");
        })
    }

    //Obtiene el valor del dólar en la fecha seleccionada, en caso de no haber valor en la
    //fecha arrojará un alert
    const getFinalDolar = async (e) => {
        const date = e.target.value
        const year = date.substr(0,4);
        const month = date.substr(5,2);
        const day = date.substr(8,2);
        await axios.get(`https://mindicador.cl/api/dolar/${day}-${month}-${year}`)
        .then(res => {
            const data = res.data.serie[0].valor;
            setDollarValue2(data);
            calculateDolar(data, 2);
        }).catch( error => {
            alert("No hay valor del dólar en esta fecha");
        })
    }

    //Método que calcula el mayor y menor valor del dólar según las fechas seleccionadas,
    //también incluye validaciones para los casos que no cumplan la validación principal
    const calculateDolar = async (value) => {
        if(value > lowerDollar){
            if(lowerDollar > higherDollar){
                setHigherDollar(lowerDollar)
            }
            setHigherDollar(value)
            if(lowerDollar === 0){
                setlowerDollar(value)
            }
        }else if(value === higherDollar){
            setlowerDollar(value)
        }else{
            setHigherDollar(lowerDollar)
            setlowerDollar(value)
        }
    }

    //Datos del gráfico
    const data = {
        labels: [dollarValue1, dollarValue2, dailyDollarValue],
        datasets: [{
            label:'Valor del dólar',
            backgroundColor: 'rgba(0,0,0,1)',
            borderColor: 'black',
            borderWidth: 1,
            hoverBackgroundColor: 'rgba(0,0,0,1)',
            hoverBorderColor: '#FF0000',
            data: [dollarValue1, dollarValue2, dailyDollarValue]
        }]
    }

    return (
        <div class="container">
            <div className="row" align="center">
                <div className="col-12 mt-3"><h1><span class="badge badge-pill badge-light">Valor del dólar al día:</span> ${dailyDollarValue}</h1></div>
                <div className="col-sm-12 col-md-6 mt-3" justify="center">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-lg">Inicio</span>
                        </div>
                        <input type="date" name="fechaInicial" onChange={getInitialDolar}/>
                        <div class="input-group-append">
                            <span class="input-group-text">$</span>
                            <span class="input-group-text">{dollarValue1}</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-6 mt-3">
                    <div class="input-group">
                        <div class="input-group-prepend">
                            <span class="input-group-text" id="inputGroup-sizing-lg">Final</span>
                        </div>
                        <input type="date" min={minimumDate} name="fechaInicial" onChange={getFinalDolar}/>
                        <div class="input-group-append">
                            <span class="input-group-text">$</span>
                            <span class="input-group-text">{dollarValue2}</span>
                        </div>
                    </div>
                </div>
                <div className="col-sm-12 col-md-4 mt-3"><h3><span class="badge badge-pill badge-light">Promedio:</span> ${((higherDollar+lowerDollar)/2).toFixed(2)}</h3></div>
                <div className="col-sm-12 col-md-4 mt-3"><h3><span class="badge badge-pill badge-light">Mayor valor:</span> ${higherDollar}</h3></div>
                <div className="col-sm-12 col-md-4 mt-3"><h3><span class="badge badge-pill badge-light">Menor valor:</span> ${lowerDollar}</h3></div>
                <div className="col-sm-12 col-md-8 mx-auto mt-3"><Bar data={data}/></div>
            </div>
            {/* <div className="grid-container">
                <div className="item1">Valor del dólar al día: ${dailyDollarValue}</div>
                <div className="item2"><input type="date" name="fechaInicial" onChange={getInitialDolar}/></div>
                <div >{dollarValue1}</div>
                <div ><input min={minimumDate} type="date" name="fechaFinal" onChange={getFinalDolar} /></div>
                <div >{dollarValue2}</div>
                <div className="item3">Promedio: ${((higherDollar+lowerDollar)/2).toFixed(2)}</div>
                <div className="item3">Mayor valor: ${higherDollar}</div>
                <div className="item3">Menor valor: ${lowerDollar}</div>
            </div>
            <div className="grid-container">
                <div className="item4"><Bar data={data}/></div>
            </div> */}
        </div>
    );
}

export default DolarInfo