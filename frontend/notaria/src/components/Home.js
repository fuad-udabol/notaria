import { useContext, useState } from "react";
import React from 'react';
import { AppContext } from '../Context';
import { Chart } from 'react-charts';

const Home = () => {
    const {
        proceduresCount
    } = useContext(AppContext);

    const data = React.useMemo(
        () => [
            {
                label: 'Series 1',
                data: [[0, 1], [1, 2], [2, 4], [3, 2], [4, 7]]
            },
            {
                label: 'Series 2',
                data: [[0, 3], [1, 1], [2, 5], [3, 6], [4, 4]]
            }
        ],
        []
    )

    const axes = React.useMemo(
        () => [
            { primary: true, type: 'linear', position: 'bottom' },
            { type: 'linear', position: 'left' }
        ],
        []
    )

    const lineChart = (
        // A react-chart hyper-responsively and continuously fills the available
        // space of its parent element automatically
        <div
            style={{
                height: '400px',
                width: '100%'
            }}
        >
            <Chart data={data} axes={axes} />
        </div>
    )
    const procedureCards = () => {
        return (proceduresCount.map(({name, id, count}) => {
            return (
                <div className="col-xl-3 col-md-6 mb-4">
                    <div className="card border-left-primary shadow h-100 py-2">
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
                <a href="#" className="d-none d-sm-inline-block btn btn-sm btn-primary shadow-sm"><i
                    className="fas fa-download fa-sm text-white-50"></i> Generar Reporte</a>
            </div>
            <div className="row">
                {procedureCards()}
            </div>

            <div className="row">
                <div className="col-xl-12 col-lg-7">
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
                                    <div className="dropdown-header">Dropdown Header:</div>
                                    <a className="dropdown-item" href="#">Action</a>
                                    <a className="dropdown-item" href="#">Another action</a>
                                    <div className="dropdown-divider"></div>
                                    <a className="dropdown-item" href="#">Something else here</a>
                                </div>
                            </div>
                        </div>
                        <div className="card-body">
                            {lineChart}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Home;