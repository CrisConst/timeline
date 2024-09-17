export function createTooltip() {
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip';
    tooltip.innerText = '2.40 ms appendChild';
    document.body.appendChild(tooltip);
    return tooltip;
}

export function showTooltip(e, tooltip) {
    tooltip.style.left = e.pageX + 10 + 'px';
    tooltip.style.top = e.pageY + 10 + 'px';
    tooltip.classList.add('active');
}

export function hideTooltip(tooltip) {
    tooltip.classList.remove('active');
}

export function handleDragging(dragContainer) {
    let isDragging = false;
    let startX, scrollLeft;

    dragContainer.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.pageX - dragContainer.offsetLeft;
        scrollLeft = dragContainer.scrollLeft;
        dragContainer.classList.add('active');
    });

    dragContainer.addEventListener('mouseleave', () => {
        isDragging = false;
        dragContainer.classList.remove('active');
    });

    dragContainer.addEventListener('mouseup', () => {
        isDragging = false;
        dragContainer.classList.remove('active');
    });

    dragContainer.addEventListener('mousemove', (e) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - dragContainer.offsetLeft;
        const walk = (x - startX) * 1.5;
        dragContainer.scrollLeft = scrollLeft - walk;
    });
}

export function createGridItem(row, i, config, millisecondIncrement, addTooltipEvents, addSmallBars) {
    const gridItem = document.createElement('div');
    let className = config.colors[row.type] || config.colors.white;

    if (row.type in config.patterns) {
        const colorKey = config.patterns[row.type](i);
        className = config.colors[colorKey];
    }

    gridItem.className = className;

    if (row.textItems && row.textItems.find(item => item.index === i)) {
        const textItem = row.textItems.find(item => item.index === i);
        gridItem.className += ' text-item';

        const textContent = typeof textItem.text === 'function' ? textItem.text() : textItem.text;
        gridItem.innerHTML = `<span>${textContent}</span>`;
    } else if (row.text) {
        const timeLabel = Math.floor(i * millisecondIncrement);
        gridItem.innerHTML = `<span>${timeLabel} </span>`;
    }

    if (row.type !== 'white') {
        addTooltipEvents(gridItem);
    }

    if (row.type === "small-bars" && i < 4) {
        addSmallBars(gridItem);
    }

    return gridItem;
}

export function addTooltipEvents(gridItem, tooltip, showTooltip, hideTooltip) {
    gridItem.addEventListener('mouseover', (e) => {
        showTooltip(e, tooltip);
    });

    gridItem.addEventListener('mouseout', () => {
        hideTooltip(tooltip);
    });
}

export function addSmallBars(gridItem) {
    const barsContainer = document.createElement('div');
    barsContainer.className = "bars-container";
    for (let j = 0; j < 3; j++) {
        const smallBar = document.createElement('div');
        smallBar.className = 'small-bar';
        barsContainer.appendChild(smallBar);
    }
    gridItem.appendChild(barsContainer);
}

export function zoomGrid(increase, mouseX, config, zoomLevel, millisecondIncrement, dragContainer, gridContainer, addGridRows) {
    const viewportWidth = window.innerWidth;
    const gridRect = gridContainer.getBoundingClientRect();
    const scrollPositionBeforeZoom = dragContainer.scrollLeft;
    const mouseRelativeX = mouseX - gridRect.left;
    const zoomRatio = mouseRelativeX / viewportWidth;

    const gridWidthBeforeZoom = config.columns * 100 * zoomLevel;
    const mousePositionInGrid = scrollPositionBeforeZoom + mouseRelativeX;

    if (increase) {
        zoomLevel += 0.1;
        millisecondIncrement = Math.max(50, millisecondIncrement / 1.2);
    } else {
        const gridWidthAfterZoom = config.columns * 100 * zoomLevel;
        if (gridWidthAfterZoom > viewportWidth) {
            zoomLevel = Math.max(0.1, zoomLevel - 0.1);
            millisecondIncrement = Math.min(500, millisecondIncrement * 1.2);
        }
    }

    addGridRows();

    const gridWidthAfterZoom = config.columns * 100 * zoomLevel;
    const newMousePositionInGrid = zoomRatio * gridWidthAfterZoom;
    const newScrollPosition = newMousePositionInGrid - mouseRelativeX;
    dragContainer.scrollLeft = newScrollPosition;
}

export function handleZoom(gridContainer, dragContainer, config, zoomLevel, millisecondIncrement, addGridRows) {
    document.addEventListener('wheel', function (e) {
        const mouseX = e.clientX;
        if (e.deltaY < 0) {
            zoomGrid(true, mouseX, config, zoomLevel, millisecondIncrement, dragContainer, gridContainer, addGridRows);
        } else if (e.deltaY > 0) {
            zoomGrid(false, mouseX, config, zoomLevel, millisecondIncrement, dragContainer, gridContainer, addGridRows);
        }
    });
}

export function addWhiteRowsDynamically(gridContainer, columnsNeeded, config) {
    const singleRowHeight = document.querySelector('.grid-item')?.offsetHeight;

    if (!singleRowHeight) {
        console.error("No grid items available to calculate height.");
        return;
    }

    const existingRows = config.rows.length;
    const viewportHeight = window.innerHeight;
    const rowsInViewport = Math.floor(viewportHeight / singleRowHeight);
    const additionalRowsNeeded = rowsInViewport - existingRows;

    for (let i = 0; i < additionalRowsNeeded; i++) {
        for (let j = 0; j < columnsNeeded; j++) {
            const gridItem = document.createElement('div');
            gridItem.className = config.colors.white;
            gridContainer.appendChild(gridItem);
        }
    }
}
