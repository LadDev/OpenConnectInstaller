import React from 'react';
import ReactApexChart from "react-apexcharts";

// Import Images
import comingSoon from "../../assets/images/comingsoon.png";
import Img4 from "../../assets/images/small/img-4.jpg";

import getChartColorsArray from "../../Components/Common/ChartsDynamicColor";

const SemiCircularRadial = ({ dataColors, series }) => {
    var chartStorkeRadialbarColors = getChartColorsArray(dataColors);
    //const series = [100];
    var options = {
        chart: {
            type: 'radialBar',
            height: 350,
            offsetY: -20,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                startAngle: -90,
                endAngle: 90,
                track: {
                    background: "#e7e7e7",
                    strokeWidth: '97%',
                    margin: 5, // margin is in pixels
                    dropShadow: {
                        enabled: true,
                        top: 2,
                        left: 0,
                        color: '#999',
                        opacity: 1,
                        blur: 2
                    }
                },
                dataLabels: {
                    name: {
                        show: false
                    },
                    value: {
                        offsetY: -2,
                        fontSize: '22px'
                    }
                }
            }
        },
        grid: {
            padding: {
                top: -10
            }
        },
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'light',
                shadeIntensity: 0.4,
                inverseColors: false,
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 50, 53, 91]
            },
        },
        labels: ['Average Results'],
        colors: chartStorkeRadialbarColors
    };
    return (
        <ReactApexChart
            className="apex-charts"
            series={series}
            options={options}
            type="radialBar"
            height={328.7}
        />
    );
};

export { SemiCircularRadial };
