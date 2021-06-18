import React, { useEffect, useState } from 'react';
import Bus from '../Bus/Bus';

const Home = () => {

    const [buses, setBuses] = useState([]);

    useEffect(() => {
        fetch('http://localhost:4000/buses')
            .then(res => res.json())
            .then(data => setBuses(data))
    }, [])

    return (
        <div className="container">
            {buses.length > 0 ?
                <div className="custom-container text-center">
                    <h1>Welcome to our Bus Counter</h1>
                    <h3>Choose your bus and book your sit</h3><br /><br />
                    <div className="row">
                        {
                            buses.map((bus, index) => <Bus bus={bus} key={bus._id} index={index}/>)
                        }
                    </div>
                </div>
                :
                <h1 className="text-center">Loading...</h1>
            }
        </div>
    );
};

export default Home;