const FAN_DATA = {
    HS100P: {
        maxX: 200,
        maxY: 160,
        stepX: 25,
        stepY: 20,
        IsMS: false,
        datasets: [
            {
                label: "HS (High Speed)",
                data: [
                    { x: 0, y: 158 }, { x: 25, y: 135 }, { x: 50, y: 110 },
                    { x: 75, y: 100 }, { x: 100, y: 95 }, { x: 115, y: 100 },
                    { x: 125, y: 95 }, { x: 150, y: 70 }, { x: 175, y: 45 },
                    { x: 190, y: 20 }, { x: 200, y: 0 }
                ],
                borderColor: '#b24341'
            },
            {
                label: "LS (Low Speed)",
                data: [
                    { x: 0, y: 130 }, { x: 25, y: 110 }, { x: 45, y: 95 },
                    { x: 75, y: 85 }, { x: 95, y: 80 }, { x: 110, y: 80 },
                    { x: 125, y: 60 }, { x: 150, y: 30 }, { x: 165, y: 0 }
                ],
                borderColor: '#8ba752'
            }
        ]
    },
    HS125P: {
        maxX: 300,
        maxY: 160,
        stepX: 50,
        stepY: 20,
        IsMS: false,
        datasets: [
            {
                label: "HS (High Speed)",
                data: [
                    { x: 0, y: 160 },   // Starts at max pressure
                    { x: 50, y: 120 },
                    { x: 100, y: 105 },
                    { x: 135, y: 95 },  // Bottom of the dip
                    { x: 150, y: 100 }, // Peak of the jump
                    { x: 200, y: 75 },
                    { x: 250, y: 35 },
                    { x: 285, y: 0 }    // Ends before 300
                ],
                borderColor: '#b24341'
            },
            {
                label: "LS (Low Speed)",
                data: [
                    { x: 0, y: 105 },
                    { x: 25, y: 85 },
                    { x: 75, y: 78 },
                    { x: 125, y: 65 },
                    { x: 175, y: 45 },
                    { x: 250, y: 0 }    // Ends exactly at the 250 line
                ],
                borderColor: '#8ba752'
            }
        ]
    },
    HS150P: {
        maxX: 540,
        maxY: 300,
        stepX: 90,
        stepY: 50,
        IsMS: false,
        datasets: [
            {
                label: "HS (High Speed)",
                data: [
                    { x: 0, y: 300 }, { x: 45, y: 240 }, { x: 90, y: 200 },
                    { x: 135, y: 180 }, { x: 180, y: 180 }, { x: 270, y: 170 },
                    { x: 315, y: 160 }, { x: 360, y: 135 }, { x: 450, y: 65 },
                    { x: 530, y: 0 }
                ],
                borderColor: '#b24341'
            },
            {
                label: "LS (Low Speed)",
                data: [
                    { x: 0, y: 240 }, { x: 45, y: 205 }, { x: 90, y: 170 },
                    { x: 135, y: 160 }, { x: 180, y: 155 }, { x: 270, y: 125 },
                    { x: 315, y: 90 }, { x: 360, y: 45 }, { x: 410, y: 0 }
                ],
                borderColor: '#8ba752'
            }
        ]
    },
    HS200P: {
        maxX: 900,
        maxY: 400,
        stepX: 100,
        stepY: 50,
        IsMS: false,
        datasets: [
            {
                label: "HS",
                data: [
                    { x: 0, y: 350 }, { x: 100, y: 275 }, { x: 200, y: 240 },
                    { x: 300, y: 210 }, { x: 400, y: 195 }, { x: 500, y: 180 },
                    { x: 600, y: 150 }, { x: 700, y: 105 }, { x: 800, y: 45 },
                    { x: 840, y: 0 }
                ],
                borderColor: '#b24341'
            },
            {
                label: "LS",
                data: [
                    { x: 0, y: 275 }, { x: 100, y: 225 }, { x: 200, y: 195 },
                    { x: 300, y: 165 }, { x: 400, y: 120 }, { x: 500, y: 90 },
                    { x: 600, y: 50 }, { x: 700, y: 0 }
                ],
                borderColor: '#8ba752'
            }
        ]
    },
    HS250P: {
        maxX: 1400,
        maxY: 500,
        stepX: 200,
        stepY: 50,
        IsMS: false,
        datasets: [
            {
                label: "HS (High Speed)",
                data: [
                    { x: 0, y: 490 }, { x: 100, y: 460 }, { x: 200, y: 420 },
                    { x: 400, y: 360 }, { x: 600, y: 300 }, { x: 800, y: 260 },
                    { x: 1000, y: 220 }, { x: 1150, y: 190 }, { x: 1250, y: 110 },
                    { x: 1400, y: 0 }
                ],
                borderColor: '#b24341'
            },
            {
                label: "LS (Low Speed)",
                data: [
                    { x: 0, y: 370 }, { x: 200, y: 290 }, { x: 380, y: 210 },
                    { x: 400, y: 200 }, { x: 600, y: 140 }, { x: 800, y: 90 },
                    { x: 1000, y: 40 }, { x: 1100, y: 0 }
                ],
                borderColor: '#8ba752'
            }
        ]
    },
    HS315P: {
        maxX: 2200,
        maxY: 700,
        stepX: 220,
        stepY: 100,
        IsMS: false,
        datasets: [
            {
                label: "HS", borderColor: '#b24341',
                data: [
                    { x: 0, y: 700 }, { x: 440, y: 500 }, { x: 880, y: 320 },
                    { x: 1320, y: 220 }, { x: 1760, y: 120 }, { x: 2200, y: 0 }
                ]
            },
            {
                label: "LS", borderColor: '#8ba752',
                data: [
                    { x: 0, y: 440 }, { x: 440, y: 280 }, { x: 660, y: 220 },
                    { x: 1100, y: 120 }, { x: 1760, y: 0 }
                ]
            }
        ]
    },
    MS100: {
        maxX: 350,
        maxY: 350,
        stepX: 100,
        stepY: 50,
        IsMS: true,
        datasets: [
            {
                label: "MS-100M",
                data: [
                    { x: 0, y: 310 },
                    { x: 50, y: 300 },
                    { x: 100, y: 280 },
                    { x: 150, y: 245 },
                    { x: 200, y: 195 },
                    { x: 250, y: 125 },
                    { x: 275, y: 75 },
                    { x: 300, y: 0 }
                ],
                borderColor: '#555555'
            }
        ]
    },
    MS125: {
        maxX: 400,
        maxY: 400,
        stepX: 100,
        stepY: 50,
        IsMS: true,
        datasets: [
            {
                label: "MS-125M",
                data: [
                    { x: 0, y: 350 },    // Starts exactly on the 350 line
                    { x: 50, y: 345 },
                    { x: 100, y: 330 },
                    { x: 150, y: 310 },
                    { x: 200, y: 280 },
                    { x: 250, y: 240 },
                    { x: 300, y: 175 },
                    { x: 350, y: 85 },
                    { x: 400, y: 0 }     // Ends just before the 400 mark
                ],
                borderColor: '#555555'
            }
        ]
    },
    MS150: {
        maxX: 800,
        maxY: 500,
        stepX: 100,
        stepY: 100,
        IsMS: true,
        datasets: [
            {
                label: "MS-150M",
                data: [
                    { x: 0, y: 440 },   // Starting point on the Y-axis
                    { x: 100, y: 430 },
                    { x: 200, y: 410 },
                    { x: 300, y: 385 },
                    { x: 400, y: 350 }, // Intersection with the 350 line
                    { x: 500, y: 300 }, // Intersection with the 300 line
                    { x: 600, y: 220 },
                    { x: 650, y: 140 },
                    { x: 720, y: 0 }    // Final drop-off at 700 m³/h
                ],
                borderColor: '#555555'
            }
        ]
    },
    MS200: {
        maxX: 1300,
        maxY: 800,
        stepX: 200, // Based on grid labels 0, 400, 800, 1200
        stepY: 100, // Based on grid labels 100 to 800
        IsMS: true,
        datasets: [
            {
                label: "MS-200M",
                data: [
                    { x: 0, y: 580 },   // Starts just below the 600 line
                    { x: 200, y: 570 },
                    { x: 400, y: 550 },
                    { x: 600, y: 510 },
                    { x: 800, y: 440 },
                    { x: 900, y: 380 },
                    { x: 1000, y: 280 },
                    { x: 1100, y: 120 },
                    { x: 1120, y: 0 }    // Ends roughly midway between 1000 and 1200
                ],
                borderColor: '#555555'
            }
        ]
    },
    MS250: {
        maxX: 1600,
        maxY: 800,
        stepX: 400, // Matching the main axis labels: 0, 400, 800, 1200, 1600
        stepY: 100, // Matching the horizontal grid lines
        IsMS: true,
        datasets: [
            {
                label: "MS-250M",
                data: [
                    { x: 0, y: 660 },    // Starting point between 600 and 700
                    { x: 200, y: 650 },
                    { x: 400, y: 630 },
                    { x: 600, y: 600 },  // Intersection with the 600 Pa line
                    { x: 800, y: 550 },  // Midway between 500 and 600
                    { x: 1000, y: 470 },
                    { x: 1200, y: 340 },
                    { x: 1300, y: 200 },
                    { x: 1400, y: 0 }    // Ends on the second grid line after 1200
                ],
                borderColor: '#555555'
            }
        ]
    },
    MS315: {
        maxX: 2000,
        maxY: 800,
        stepX: 400,
        stepY: 100,
        IsMS: true,
        datasets: [
            {
                label: "MS-315M",
                data: [
                    { x: 0, y: 700 },    // Starts exactly on the 700 line
                    { x: 400, y: 660 },
                    { x: 800, y: 600 },  // Crosses 600 line at 800 m³/h
                    { x: 1200, y: 500 }, // Crosses 500 line at 1200 m³/h
                    { x: 1400, y: 410 },
                    { x: 1600, y: 300 }, // Crosses 300 line at 1600 m³/h
                    { x: 1800, y: 120 },
                    { x: 1900, y: 0 }    // Ends just before the 2000 mark
                ],
                borderColor: '#555555'
            }
        ]
    },
};
function loadFanChart(canvasId, fanKey) {

    const fan = FAN_DATA[fanKey];
    const ctx = document.getElementById(canvasId).getContext("2d");

    new Chart(ctx, {
        type: "line",
        data: {
            datasets: fan.datasets
        },
        options: {
            scales: {
                x: {
                    type: "linear",
                    min: 0,
                    max: fan.maxX,
                    title: { display: true, text: fan.IsMS ? 'Air Volume (m³/h)' : 'Airflow Meter Cubic Per Hour - m³/h', align: 'end', font: { size: 14 } },
                    ticks: {
                        stepSize: fan.stepX
                    }
                },
                y: {
                    min: 0,
                    max: fan.maxY,
                    title: { display: true, text: 'Pressure / Pa', align: 'end', font: { size: 14 } },
                    ticks: {
                        stepSize: fan.stepY
                    }
                }
            }
        }
    });
}
