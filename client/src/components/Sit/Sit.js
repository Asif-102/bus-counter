import React, { useState } from 'react';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import './Sit.css';
import { useParams } from 'react-router-dom';

const Sit = ({ available, index, bus, counter, setCounter }) => {

    const { id } = useParams();

    const [isAvailable, setIsAvailable] = useState(available);

    const changeAvailability = (position) => {

        if (counter >= 10) {
            alert("You can't buy more than 10 tickets.");
        }
        else {
            setIsAvailable(false);
            
            const newCounter = counter + 1;
            setCounter(newCounter);

            bus.sits[position] = false;

            const bookedSit = bus.sits;

            fetch('http://localhost:4000/bookedSit', {
                method: 'PATCH',
                body: JSON.stringify({ id, bookedSit }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
                .then(res => res.json())
                .then(data => console.log(data))
        }

    }

    return (
        <div>
            {isAvailable ?
                <div className="available-sit">
                    <div onClick={() => changeAvailability(index)} className="col-1">
                        <SupervisorAccountIcon />
                    </div>
                </div>
                :
                <div className="unavailable-sit">
                    <div className="col-1">
                        <SupervisorAccountIcon />
                    </div>
                </div>
            }
        </div>
    );
};

export default Sit;