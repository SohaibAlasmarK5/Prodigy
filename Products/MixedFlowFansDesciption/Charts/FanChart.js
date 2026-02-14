const FAN_DATA = {
    HS100P: {
        maxX: 200,
        maxY: 160,
        stepX: 25,
        stepY: 20,
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

    HS150P: {
        maxX: 540,
        maxY: 300,
        stepX: 90,
        stepY: 50,
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
    }
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
                    title: { display: true, text: 'Airflow Meter Cubic Per Hour - m³/h', align: 'end', font: { size: 14 } },
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
