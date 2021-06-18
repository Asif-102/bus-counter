import React from 'react';
import DateRangeIcon from '@material-ui/icons/DateRange';
import TimerIcon from '@material-ui/icons/Timer';
import { Link } from 'react-router-dom';
import './Bus.css';

const Bus = ({ bus, index }) => {
    const { _id, name, img, date, time } = bus;
    return (
        <div className="col-xl-4 col-lg-6 col-md-12 col-sm-12 col-xs-12">
            <div className="mb-5">
                <img src={img} className="img-fluid mb-2" alt="" />
                <h3>{name}{' '}{index+1}</h3>
                <DateRangeIcon /> {date} <br />
                <TimerIcon /> {time} <br />
                <Link to={`/booking/${_id}`}><button className="custom-btn">Book a sit</button></Link>
            </div>
        </div>
    );
};

export default Bus;