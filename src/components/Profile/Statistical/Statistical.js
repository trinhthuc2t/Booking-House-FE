import React, {useState, useEffect} from 'react';
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, registerables} from 'chart.js';
import BookingService from "../../../service/BookingService";
import {useSelector} from "react-redux";
Chart.register(CategoryScale);
Chart.register(...registerables);

function MonthlyChart() {
    const currentDate = new Date().toISOString().substring(0, 10);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [month, setMonth] = useState(2023);
    const [year, setYear] = useState(0);
    const [startDay, setStartDay] = useState(0);
    const [endDay, setEndDay] = useState(0);
    const account = useSelector(state => state.account);

    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate)
    };


    const [chartData, setChartData] = useState({
        labels: [ 'Chủ nhật', 'Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7'],
        datasets: [{
            label: 'Monthly Data', data: [], borderColor: 'rgb(53, 162, 235)', fill: true,
        },],
    });


    const calculateDefaultStartDate = (currentDate) => {
        const selectedDate = new Date(currentDate);
        const dayOfWeek = selectedDate.getDay();

        if (dayOfWeek !== 0) {
            const daysUntilSunday = dayOfWeek;
            selectedDate.setDate(selectedDate.getDate() - daysUntilSunday);
        }
        setSelectedDate(selectedDate.toISOString().substring(0, 10));
    };

    const getBookingsByOwnerWeek = (id, month, year, startDay, EndDay) => {
        BookingService.getBookingsByOwnerWeek(id, month, year, startDay, EndDay)
            .then((response) => {
                console.log(response.data)
            const newDataset = [...chartData.datasets];
            newDataset[0].data = response.data
            setChartData({
                ...chartData, datasets: newDataset,
            });

        }).catch(function (err) {
            console.log(err);
        })
    }

    useEffect(() => {
        calculateDefaultStartDate(selectedDate)
        const dateParts = selectedDate.split('-');
        setYear(parseInt(dateParts[0]))
        setMonth(parseInt(dateParts[1]))
        setStartDay(parseInt(dateParts[2]))
        setEndDay(startDay+6)
        getBookingsByOwnerWeek(account.id, month, year, startDay, endDay);
    }, [month, year,currentDate,startDay,endDay,selectedDate]);


    return (<div className="container mt-4 col-9">
        <div className="row">
            <div className="col-6">
                <h2>Biểu đồ doanh thu hàng ngày</h2>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <input type="date" className="form-control" value={selectedDate}
                           onChange={handleDateChange}/>
                </div>
            </div>
            <div className="col-3">
                <div className="input-group">
                    <input type="date" className="form-control" value={currentDate}/>
                </div>
            </div>
        </div>
        <div className="card">
            <div className="card-body">
                <Line data={chartData}/>
            </div>
        </div>
    </div>);
}

export default MonthlyChart;


