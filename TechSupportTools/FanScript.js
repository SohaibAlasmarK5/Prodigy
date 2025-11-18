const CFM_TO_M3H = 1.699;
let currentLang = 'en';


const TRANSLATIONS = {
    en: {
        X_AXIS: "Airflow (m³/h)",
        Y_AXIS: "Static Pressure (Pa)",
        WATERMARK: "Fan Performance Curves",
        POINT_LABEL: "Selected Point",
        RESULT_NO_FAN: (cfm, mode) => `No suitable fan for ${cfm.toFixed(0)} CFM in the ${mode} series.`,
        RESULT_PREFIX: (m3h, pressure) => `Airflow = ${m3h.toFixed(0)} m³/h → Pressure = ${pressure.toFixed(0)} Pa<br>`,
        RESULT_FAN: "Recommended Fan:",
        INITIAL_OUTPUT: "Enter CFM to see fan performance"
    },
    ar: {
        X_AXIS: "تدفق الهواء (م³/س)",
        Y_AXIS: "الضغط الساكن (باسكال)",
        WATERMARK: "منحنيات أداء المروحة",
        POINT_LABEL: "النقطة المحددة",
        RESULT_NO_FAN: (cfm, mode) => `لا توجد مروحة مناسبة لـ ${cfm.toFixed(0)} CFM في سلسلة ${mode}.`,
        RESULT_PREFIX: (m3h, pressure) => `التدفق = ${m3h.toFixed(0)} م³/س ← الضغط = ${pressure.toFixed(0)} باسكال<br>`,
        RESULT_FAN: "المروحة الموصى بها:",
        INITIAL_OUTPUT: "أدخل CFM لرؤية أداء المروحة"
    }
};

// --- FAN DATASETS (as provided by user) ---
const FAN_DATA = {
    HS: [
        { name: "HS-100P", minCFM: 1, maxCFM: 100, minPa: 30, data: [[0, 156], [50, 135], [100, 98], [125, 90], [150, 69], [175, 40], [198, 0]] },
        { name: "HS-150P", minCFM: 101, maxCFM: 221, minPa: 120, data: [[0, 300], [90, 200], [180, 180], [270, 165], [360, 135], [450, 55], [530, 0]] },
        { name: "HS-200P", minCFM: 222, maxCFM: 336, minPa: 150, data: [[0, 352], [100, 280], [200, 245], [300, 210], [400, 195], [500, 175], [600, 140], [700, 100], [840, 0]] },
        { name: "HS-250P", minCFM: 337, maxCFM: 607, minPa: 200, data: [[0, 488], [200, 420], [400, 355], [600, 300], [800, 255], [1200, 160], [1405, 0]] },
        { name: "HS-315P", minCFM: 608, maxCFM: 1297, minPa: 200, data: [[0, 693], [220, 600], [440, 500], [660, 400], [880, 315], [1100, 275], [1320, 220], [1540, 180], [1760, 120], [1980, 50], [2206, 0]] }
    ],
    MS: [
        { name: "MS-100M", minCFM: 0, maxCFM: 160, minPa: 50, data: [[0, 315], [62, 295], [124, 270], [155, 250], [186, 224], [217, 180], [248, 125], [310, 0]] },
        { name: "MS-150M", minCFM: 161, maxCFM: 359, minPa: 160, data: [[0, 443], [112, 415], [224, 385], [336, 357], [448, 320], [560, 240], [672, 62], [720, 0]] },
        { name: "MS-200M", minCFM: 360, maxCFM: 500, minPa: 300, data: [[0, 580], [250, 555], [500, 500], [625, 455], [750, 400], [875, 315], [1000, 155], [1120, 0]] },
        { name: "MS-250M", minCFM: 501, maxCFM: 691, minPa: 300, data: [[0, 670], [250, 650], [500, 610], [750, 540], [1000, 440], [1125, 350], [1250, 225], [1320, 0]] },
        { name: "MS-315M", minCFM: 692, maxCFM: 1100, minPa: 300, data: [[0, 700], [250, 685], [500, 655], [750, 635], [1000, 580], [1250, 520], [1500, 430], [1750, 275], [1900, 0]] }
    ]
};

function interpolate(data, x) {
    for (let i = 1; i < data.length; i++) {
        const [x0, y0] = data[i - 1];
        const [x1, y1] = data[i];
        if (x <= x1) {
            return y0 + ((x - x0) / (x1 - x0)) * (y1 - y0);
        }
    }
    return null;
}

const ctx = document.getElementById("fanChart").getContext("2d");
let chart;

const watermarkPlugin = {
    id: 'watermark',
    beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.save();
        ctx.font = "bold 80px Arial";
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        // Use translation object for text
        ctx.fillText(TRANSLATIONS[currentLang].WATERMARK, width / 2, height / 2);
        ctx.restore();
    }
};

function buildChart(mode) {
    const fans = FAN_DATA[mode];
    const colors = ["#c81b1b", "#ff7f0e", "#2ca02c", "#1f77b4", "#9467bd"];

    const datasets = fans.map((fan, idx) => ({
        label: fan.name,
        data: fan.data.map(([x, y]) => ({ x, y })),
        borderColor: colors[idx % colors.length],
        backgroundColor: 'transparent',
        borderWidth: 3,
        tension: 0.3,
        pointRadius: 0
    }));

    const pointDataset = {
        // Use translation object for label
        label: TRANSLATIONS[currentLang].POINT_LABEL,
        data: [],
        pointBackgroundColor: "black",
        pointRadius: 8,
        pointStyle: 'crossRot',
        borderWidth: 3,
        type: "scatter",
        showLine: false
    };

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: { datasets: [...datasets, pointDataset] },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    type: "linear",
                    title: { display: true, text: TRANSLATIONS[currentLang].X_AXIS }
                },
                y: {
                    title: { display: true, text: TRANSLATIONS[currentLang].Y_AXIS },
                    min: 0
                }
            },
            plugins: {
                legend: { position: 'bottom' },
                title: { display: false }
            }
        },
        plugins: [watermarkPlugin]
    });

    return pointDataset;
}

let currentPointDataset = buildChart("HS");


document.getElementById("cfmInput").addEventListener("input", updateResult);

document.getElementById("modeSelect").addEventListener("change", function () {
    const mode = this.value;

    document.getElementById("fanImage").src =
        mode === "HS" ? "../Images/HSFan.png" : "../Images/MSFan.png";

    currentPointDataset = buildChart(mode);

    updateResult();
});



function updateResult() {
    const mode = document.getElementById("modeSelect").value;
    const fans = FAN_DATA[mode];

    const cfm = parseFloat(document.getElementById("cfmInput").value);
    const output = document.getElementById("output");

    if (isNaN(cfm) || cfm <= 0) {
        output.innerHTML = TRANSLATIONS[currentLang].INITIAL_OUTPUT;
        currentPointDataset.data = [];
        chart.update();
        return;
    }

    const m3h = cfm * CFM_TO_M3H;

    let selectedFan = null;
    let pressure = null;

    for (const fan of fans) {
        if (cfm >= fan.minCFM && cfm <= fan.maxCFM) {
            const p = interpolate(fan.data, m3h);
            if (p !== null && p >= fan.minPa) {
                selectedFan = fan;
                pressure = p;
                break;
            }
        }
    }

    if (selectedFan) {
        output.innerHTML =
            TRANSLATIONS[currentLang].RESULT_PREFIX(m3h, pressure) +
            `${TRANSLATIONS[currentLang].RESULT_FAN} <b>${selectedFan.name}</b>`;

        currentPointDataset.data = [{ x: m3h, y: pressure }];
    } else {
        output.innerHTML = TRANSLATIONS[currentLang].RESULT_NO_FAN(cfm, mode);
        currentPointDataset.data = [];
    }

    chart.update();
}


document.addEventListener("DOMContentLoaded", function () {
    currentPointDataset = buildChart(document.getElementById("modeSelect").value);

    function applyPlaceholders(lang) {
        const input = document.getElementById("cfmInput");
        if (input) {
            const placeholderKey = lang === 'ar' ? 'data-ar-placeholder' : 'data-en-placeholder';
            input.placeholder = input.getAttribute(placeholderKey) || input.placeholder;
        }
    }

    applyPlaceholders(currentLang);
});