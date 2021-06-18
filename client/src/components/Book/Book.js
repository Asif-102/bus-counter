import React, { useEffect, useState } from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimerIcon from '@material-ui/icons/Timer';
import { useHistory, useParams } from 'react-router-dom';
import Sit from '../Sit/Sit';
import './Book.css';

const Book = () => {
    const { id } = useParams();

    const [busInfo, setBusInfo] = useState([]);
    const history = useHistory();


    useEffect(() => {
        fetch('http://localhost:4000/buses')
            .then(res => res.json())
            .then(data => setBusInfo(data))
    }, [])

    let selectedBus = {};

    if (busInfo.length) {
        selectedBus = busInfo.find(bus => bus._id === id)
    }

    const { name, img, date, time, sits } = selectedBus;

    const makeAllAvailable = () => {
        fetch('http://localhost:4000/makeAllAvailable', {
            method: 'PATCH',
            body: JSON.stringify({ selectedBus, id}),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                history.go(0);
            })
    }


    let availableSit = [];

    if (sits) {
        availableSit = sits.filter(sit => sit === true);
    }

    const [counter, setCounter] = useState(0);

    return (
        <div className="text-center">
            {busInfo.length ?
                <div>
                    <img width="250px" src={img} alt="" />
                    <h3>{name}</h3>
                    <DateRangeIcon /> {date} <br />
                    <TimerIcon /> {time} <br />

                    {availableSit.length == 0 &&
                        <div>
                            <h3 className="text-danger">House is full</h3>
                            <button onClick={makeAllAvailable} className="custom-btn">Make all sits available</button>
                        </div>
                    }

                    <div className="sit-container">
                        <div className="row">
                            {
                                sits.map((sit, index) => <Sit bus={selectedBus}
                                    key={index} index={index} available={sit} counter={counter} setCounter={setCounter} />)
                            }
                        </div>
                    </div>

                </div>
                :
                <h1>Loading...</h1>
            }
        </div>
    );
};

export default Book;