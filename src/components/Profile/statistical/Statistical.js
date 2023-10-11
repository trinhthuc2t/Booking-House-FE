import React, {useState, useEffect} from 'react';
import bookingsService from "../../../service/BookingsService";
import {Line} from "react-chartjs-2";
import {CategoryScale, Chart, registerables} from 'chart.js';

Chart.register(CategoryScale);
Chart.register(...registerables);

function MonthlyChart() {
    const currentDate = new Date().toISOString().substring(0, 10);
    const [selectedDate, setSelectedDate] = useState(currentDate);
    const [day, setDay] = useState();
    const [month, setMonth] = useState();
    const [year, setYear] = useState();
    const [startDay, setStartDay] = useState();
    const [endDay, setEndDay] = useState();


    const handleDateChange = (event) => {
        const selectedDate = event.target.value;
        setSelectedDate(selectedDate)
    };


    const [chartData, setChartData] = useState({
        labels: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
        datasets: [{
            label: 'Monthly Data', data: [], borderColor: 'rgb(53, 162, 235)', fill: true,
        },],
            // labels: ['Ngày 1', 'Ngày 2', 'Ngày 3', 'Ngày 4', 'Ngày 5', 'Ngày 6', 'Ngày 7', 'Ngày 8', 'Ngày 9', 'Ngày 10', 'Ngày 11', 'Ngày 12',
        //     'Ngày 13', 'Ngày 14', 'Ngày 15', 'Ngày 16', 'Ngày 17', 'Ngày 28', 'Ngày 19', 'Ngày 20', 'Ngày 21', 'Ngày 22', 'Ngày 23', 'Ngày 24',
        //     'Ngày 25', 'Ngày 26', 'Ngày 27', 'Ngày 28', 'Ngày 29', 'Ngày 30', 'Ngày 31'],
        // datasets: [{
        //     label: 'Monthly Data', data: [], borderColor: 'rgb(53, 162, 235)', fill: true,
        // },],
        // labels: ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'],
        // datasets: [{
        //     label: 'Monthly Data', data: [], borderColor: 'rgb(53, 162, 235)', fill: true,
        // },],
    });


    const getBookingsByOwner = (id, year) => {
        bookingsService.getBookingsByOwner(id, year).then((response) => {
            const newDataset = [...chartData.datasets];
            newDataset[0].data = response
            setChartData({
                ...chartData, datasets: newDataset,
            });

        }).catch(function (err) {
            console.log(err);
        })
    }
    const getBookingsByOwnerWeek = (id, month, year, startDay, EndDay) => {
        bookingsService.getBookingsByOwnerWeek(id, month, year, startDay, EndDay).then((response) => {
            const newDataset = [...chartData.datasets];
            newDataset[0].data = response
            setChartData({
                ...chartData, datasets: newDataset,
            });

        }).catch(function (err) {
            console.log(err);
        })
    }

    useEffect(() => {
        const dateParts = selectedDate.split('-');
        setYear(parseInt(dateParts[0]))
        setMonth(parseInt(dateParts[1]))
        setDay(parseInt(dateParts[2]))
        getBookingsByOwner(1, year);
        // getBookingsByOwnerWeek(1, month, year, startDay, endDay);
    }, [month, year]);


    return (<div className="container mt-4 col-9">
        <div className="row">
            <div className="col-8">
                <h2>Biểu đồ doanh thu hàng ngày</h2>
            </div>
            <div className="col-4">
                <div className="input-group">
                    <input type="date" className="form-control" value={selectedDate}
                           onChange={handleDateChange}/>
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


