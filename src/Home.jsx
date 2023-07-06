import React, { useEffect, useState } from 'react'
// e43a27bdebe5127cfb51c675f19480de
// https://api.openweathermap.org/data/2.5/weather?q=London&appid=e43a27bdebe5127cfb51c675f19480de&units=metric
function Home() {
    const [data, setdata] = useState({
        celcius: 0,
        name: "Search a city",
        humidity: 0,
        speed: 0,
        weather: [{main: 'Clouds'}]
    })


    const [name, setName] = useState('')
    const [err, seterr] = useState('')
      
    const handleClick = () =>{
    if(name !== ''){
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${name}&appid=e43a27bdebe5127cfb51c675f19480de&units=metric`;
          
        fetch(apiUrl)
            .then(response => {
                if (response.ok) {
                  return response.json();
                } else {
                  throw new Error('Error: ' + response.status);
                }
              })
              .then(data => {
                console.log(data);
                setdata({...data, celcius: data.main.temp, name: data.name, humidity: data.main.humidity, speed: data.wind.speed})
              })
              .catch(error => {
                console.log(error.message)
                if(error.message.includes("404")){
                    seterr('Invalid City Name')
                }else{
                    seterr('')
                }
            });
        }
    }


  return (
    <div className="container">
        <div className="weather">
            <div className="search">
                <input type="text" placeholder='Enter City Name' onChange={ e => setName(e.target.value)}/>
                <button type='submit' onClick={handleClick}><img src="./public/search.png" alt="" /></button>
            </div>
            <div className="error">{err}</div>
            <div className="winfo">
                <div className="icon">
                    <img src={`./public/svgs/${data.weather[0].main}.svg`} alt=""/>
                </div>
                <h1>{Math.round(data.celcius)}°c</h1>
                <h2>{data.name}</h2>
                <div className="details">
                    <div className="col">
                        <img src="./public/humidity.webp" alt="" />
                        <div className='humidity'>
                            <p>{Math.round(data.humidity)}%</p>
                            <p>Humidity</p>
                        </div>
                    </div>
                    <div className="col">
                        <img src="./public/wind.png" alt="" />
                        <div className='wind'>
                            <p>{Math.round(data.speed)} km/h</p>
                            <p>Wind</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Home