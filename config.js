export const config = {
    columns: 30,
    millisecondIncrement: 250,
    rows: [
        {
            name: "Row1",
            type: "white",
            text: (i) => `${i * config.millisecondIncrement} ms`
        },
        {
            name: "Row2",
            type: "light-green"
        },
        {
            name: "Row3",
            type: "white"
        },
        {
            name: "Row4",
            type: "gray-white-gray",
            textItems: [
                { index: 0, text: "Task" },
                { index: 12, text: "Task" },
                { index: 40, text: "Task" }
            ]
        },
        {
            name: "Row5",
            type: "dark-yellow-white",
            textItems: [
                { index: 0, text: "Evaluate Module" },
                { index: 12, text: "Evaluate Module" },
                { index: 40, text: "Evaluate Module" }
            ]
        },
        {
            name: "Row6",
            type: "light-green-white",
            textItems: [
                { index: 0, text: "webpack_require" },
                { index: 12, text: "webpack_require" },
                { index: 40, text: "webpack_require" }
            ]
        },
        {
            name: "Row7",
            type: "light-green-white",
            textItems: [
                { index: 0, text: "/src/lib/components/editor.js" },
                { index: 12, text: "(anonymous)" },
                { index: 40, text: "(anonymous)" }
            ]
        },
        {
            name: "Row8",
            type: "light-green-white",
            textItems: [
                { index: 0, text: "/src/lib/components/editor.js" },
                { index: 12, text: "/src/lib/components/editor.js" },
                { index: 40, text: "/src/lib/components/editor.js" }
            ]
        },
        {
            name: "Row9",
            type: "light-green-white",
            textItems: [
                { index: 0, text: "(anonymous)" },
                { index: 12, text: "(anonymous)" },
                { index: 40, text: "(anonymous)" }
            ]
        },
        {
            name: "Row10",
            type: "light-green-white-row10",
            textItems: [
                { index: 0, text: "(anonymous)" }
            ]
        },
        {
            name: "SmallBarsRow",
            type: "small-bars",
            textItems: [],
        }
    ],
    colors: {
        white: "grid-item white",
        lightGreen: "grid-item light-green",
        gray: "grid-item gray",
        darkYellow: "grid-item dark-yellow",
        lightRed: "grid-item light-red",
        smallBarContainer: "grid-item small-bar-container"
    },
    patterns: {
        "gray-white-gray": (i) => i < 9 ? "gray" : i >= 9 && i < 12 ? "white" : i >= 12 && i < 24 ? "gray" : i >= 24 && i < 40 ? "white" : i >=40 && i < 50 ? "gray" : "white" ,
        "dark-yellow-white": (i) => i < 9 ? "darkYellow" : i >= 9 && i < 12 ? "white" : i >= 12 && i < 24 ? "darkYellow" : i >= 24 && i < 40 ? "white" : i >=40 && i < 45 ? "lightRed" : "white",
        "light-green-white": (i) => i < 8 ? "lightGreen" : i >= 8 && i < 12 ? "white" : i >= 12 && i < 22 ? "lightGreen" : i >= 24 && i < 40 ? "white" : i >=40 && i < 45 ? "lightRed" : "white",
        "light-green-white-row10": (i) => i < 8 ? "lightGreen" : "white",
        "small-bars": (i) => i < 4 ? "smallBarContainer" : "white"
    }
};
