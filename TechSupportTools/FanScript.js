

// -------------------------
//      FAN DATASETS
// -------------------------

const FAN_DATA = {
    HS: [
        { name: "HS-100P", minCFM: 1, maxCFM: 100, minPa: 30, data: [[0, 156], [50, 135], [100, 98], [125, 90], [150, 69], [175, 40], [198, 0]] },
        { name: "HS-150P", minCFM: 101, maxCFM: 221, minPa: 120, data: [[0, 300], [90, 200], [180, 180], [270, 165], [360, 135], [450, 55], [530, 0]] },
        { name: "HS-200P", minCFM: 222, maxCFM: 336, minPa: 150, data: [[0, 352], [100, 280], [200, 245], [300, 210], [400, 195], [500, 175], [600, 140], [700, 100], [840, 0]] },
        { name: "HS-250P", minCFM: 337, maxCFM: 607, minPa: 200, data: [[0, 488], [200, 420], [400, 355], [600, 300], [800, 255], [1200, 160], [1405, 0]] },
        { name: "HS-315P", minCFM: 608, maxCFM: 1297, minPa: 200, data: [[0, 693], [220, 600], [440, 500], [660, 400], [880, 315], [1100, 275], [1320, 220], [1540, 180], [1760, 120], [1980, 50], [2206, 0]] }
    ],

    MS: [
        { name: "MS-100", minCFM: 1, maxCFM: 85, minPa: 20, data: [[0, 110], [40, 95], [85, 70], [120, 0]] },
        { name: "MS-150", minCFM: 86, maxCFM: 170, minPa: 80, data: [[0, 240], [90, 150], [170, 120], [260, 0]] },
        { name: "MS-200", minCFM: 171, maxCFM: 280, minPa: 110, data: [[0, 300], [120, 240], [240, 200], [350, 0]] }
    ]
};

// -------------------------

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

function buildChart(mode) {
    const fans = FAN_DATA[mode];

    const colors = ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"];

    const datasets = fans.map((fan, idx) => ({
        label: fan.name,
        data: fan.data.map(([x, y]) => ({ x, y })),
        borderColor: colors[idx % colors.length],
        backgroundColor: 'transparent',
        tension: 0.3,
        pointRadius: 0
    }));

    const pointDataset = {
        label: "Selected",
        data: [],
        pointBackgroundColor: "black",
        pointRadius: 8,
        type: "scatter",
        showLine: false
    };

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: "line",
        data: { datasets: [...datasets, pointDataset] },
        options: {
            responsive: true,
            scales: {
                x: { type: "linear", title: { display: true, text: "Airflow (m³/h)" } },
                y: { title: { display: true, text: "Pressure (Pa)" } }
            }
        }
    });

    return pointDataset;
}

let currentPointDataset = buildChart("HS");

// -------------------------
//       CFM INPUT
// -------------------------

document.getElementById("cfmInput").addEventListener("input", updateResult);

function updateResult() {
    const mode = document.getElementById("modeSelect").value;
    const fans = FAN_DATA[mode];

    const cfm = parseFloat(document.getElementById("cfmInput").value);
    if (isNaN(cfm)) return;

    const m3h = cfm * 1.699;

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

    const output = document.getElementById("output");
    if (selectedFan) {
        output.innerHTML =
            `Airflow = ${m3h.toFixed(1)} m³/h → Pressure = ${pressure.toFixed(1)} Pa<br>` +
            `Recommended Fan: <b>${selectedFan.name}</b>`;

        currentPointDataset.data = [{ x: m3h, y: pressure }];
    } else {
        output.innerHTML = `No suitable fan for ${cfm} CFM`;
        currentPointDataset.data = [];
    }

    chart.update();
}

// -------------------------
//     MODE SWITCH
// -------------------------

document.getElementById("modeSelect").addEventListener("change", function () {
    const mode = this.value;

    // Update fan image
    document.getElementById("fanImage").src =
        mode === "HS" ? "../Images/HSFan.png" : "../Images/MSFan.png";

    // Rebuild chart
    currentPointDataset = buildChart(mode);

    // Recalculate output if CFM exists
    updateResult();
});

