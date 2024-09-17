import { config } from './config.js';
import {
    createTooltip,
    showTooltip,
    hideTooltip,
    handleDragging,
    createGridItem,
    addTooltipEvents,
    addSmallBars,
    handleZoom,
    addWhiteRowsDynamically
} from './utils.js';

let zoomLevel = 1;
const maxTime = 27000;
let millisecondIncrement = 500;

document.addEventListener("DOMContentLoaded", function () {
    const dragContainer = document.getElementById('drag-container');
    const gridContainer = document.getElementById('grid-container');
    let tooltip = createTooltip();

    function addGridRows() {
        gridContainer.innerHTML = '';
        const gridItems = [];
        const columnsNeeded = Math.floor(maxTime / millisecondIncrement);
        const columnWidth = 100 * zoomLevel;

        gridContainer.style.gridTemplateColumns = `repeat(${columnsNeeded}, ${columnWidth}px)`;

        config.rows.forEach(row => {
            for (let i = 0; i < columnsNeeded; i++) {
                const gridItem = createGridItem(row, i, config, millisecondIncrement, (item) => addTooltipEvents(item, tooltip, showTooltip, hideTooltip), addSmallBars);
                gridItems.push(gridItem);
            }
        });

        gridItems.forEach(item => {
            gridContainer.appendChild(item);
        });

        addWhiteRowsDynamically(gridContainer, columnsNeeded, config);
    }

    function initializeGrid() {
        addGridRows();
        handleDragging(dragContainer);
        handleZoom(gridContainer, dragContainer, config, zoomLevel, millisecondIncrement, addGridRows);

        window.addEventListener('resize', function () {
            addGridRows();
        });
    }

    initializeGrid();
});
