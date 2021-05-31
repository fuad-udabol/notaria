import { useContext, useState } from "react";
import React from 'react';
import { AppContext } from '../Context';
import { Bar, Doughnut } from 'react-chartjs-2';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

const Home = () => {
    const {
        proceduresCount,
        usersWithPrivilegies,
        setFilteredUser,
        startDate,
        setStartDate,
        endDate,
        setEndDate
    } = useContext(AppContext);
    let [total, setTotal] = useState(null);
    const [state, setState] = useState([
        {
          startDate: startDate,
          endDate: endDate,
          key: 'selection'
        }
      ]);
    const data = {
        labels: proceduresCount.map(({ name }) => {
            return name;
        }),
        datasets: [
            {
                label: 'Trámite',
                data: proceduresCount.map(({ count }) => {
                    return count;
                }),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    const procedureCards = () => {
        return (proceduresCount.map(({ name, id, count, price }) => {
            return (
                <div key={id} className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-bottom-warning shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        {name}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">Bs. {price}.-</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }));
    };
    const getTotal = () => {
        let sum = 0;
        let i;
        if (proceduresCount.length > 0) {
            for (i = 0; i <= proceduresCount.length; i++) {
                if(proceduresCount[i])
                    sum = sum + parseInt(proceduresCount[i].price);
            }
        }
        return (
            <div className="col-xl-12 col-md-12 mb-4">
                    <div className="card border-left-danger shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        Total</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">Bs. {sum}.-</div>
                                </div>
                                <div className="col-auto">
                                    <i className="fas fa-calendar fa-2x text-gray-300"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        );
    } ;
    return (
        <div className="container-fluid">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Inicio</h1>
                <select id="procedure"
                    onChange={(e) => setFilteredUser(e.target.value)}
                >
                    <option
                        id="-1"
                        value="-1"
                    >Filtrar resultados por usuario</option>
                    {
                        usersWithPrivilegies.map(({ id, user_name, user_last_name }) => {
                            return (
                                <option
                                    key={id}
                                    id={id}
                                    value={id}
                                >{user_name + " " + user_last_name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <div className="row">
                {procedureCards()}
            </div>

            <div className="row">
                {getTotal()}
            </div>

            <div className="row">
                <div className="col-xl-3 col-lg-5">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Rango de fechas</h6>
                        </div>
                        <div className="card-body">
                            {
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={item => {
                                        let startDateTem = item.selection.startDate;
                                        let endDateTem = item.selection.endDate;
                                        if (startDateTem === endDateTem) {
                                            endDateTem.setHours(endDateTem.getHours()+20);
                                        }
                                        setState([item.selection]);
                                        setStartDate(startDateTem);
                                        setEndDate(endDateTem);
                                    }}
                                    moveRangeOnFirstSelection={false}
                                    ranges={state}
                                />
                            }
                        </div>
                    </div>
                </div>
                <div className="col-xl-9 col-lg-7">
                    <div className="card shadow mb-4">
                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Trámites</h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                            </div>
                        </div>
                        <div className="card-body">
                            {<Bar data={data} options={options} />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;