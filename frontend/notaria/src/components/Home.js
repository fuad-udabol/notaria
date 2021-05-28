import { useContext } from "react";
import React from 'react';
import { AppContext } from '../Context';
import { Bar, Doughnut } from 'react-chartjs-2';

const Home = () => {
    const {
        proceduresCount,
        usersWithPrivilegies,
        setFilteredUser
    } = useContext(AppContext);
    const data = {
        labels: proceduresCount.map(({ name }) => {
            return name;
        }),
        datasets: [
            {
                label: 'Tramite',
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
        return (proceduresCount.map(({ name, id, count }) => {
            return (
                <div key={id} className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-bottom-info shadow h-100 py-2">
                        <div className="card-body">
                            <div className="row no-gutters align-items-center">
                                <div className="col mr-2">
                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                        {name}</div>
                                    <div className="h5 mb-0 font-weight-bold text-gray-800">{count}</div>
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
                        >{user_name + " "+ user_last_name}</option>
                        )
                    })
                    }
                </select>
            </div>
            <div className="row">
                {procedureCards()}
            </div>

            <div className="row">
                <div className="col-xl-8 col-lg-7">
                    <div className="card shadow mb-4">
                        <div
                            className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 className="m-0 font-weight-bold text-primary">Análisis semanal</h6>
                            <div className="dropdown no-arrow">
                                <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
                                    data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-v fa-sm fa-fw text-gray-400"></i>
                                </a>
                                <div className="dropdown-menu dropdown-menu-right shadow animated--fade-in"
                                    aria-labelledby="dropdownMenuLink">
                                    <div className="dropdown-header">Filtrar por usuario:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {<Bar data={data} options={options} />}
                        </div>
                    </div>
                </div>
                <div className="col-xl-4 col-lg-5">
                    <div className="card shadow mb-4">
                        <div className="card-header py-3">
                            <h6 className="m-0 font-weight-bold text-primary">Tramites</h6>
                        </div>
                        <div className="card-body">
                                    {<Doughnut data={data} />}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;