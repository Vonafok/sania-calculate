document.addEventListener("DOMContentLoaded", function() {
    const areasBox = document.getElementById('areasBox');
    const addPersonButton = document.getElementById('addPersonButton');
    const calculateButton = document.getElementById('calculateButton');
    const resultsArea = document.getElementById('resultsArea');
    const totalAreaField = document.getElementById('totalArea');

    let areaFields = [];

    // Обработчик кнопки "Добавить лицо"
    addPersonButton.addEventListener('click', function() {
        addAreaField();
    });

    // Обработчик кнопки "Рассчитать доли"
    calculateButton.addEventListener('click', function() {
        calculateShares();
    });

    // Функция добавления нового поля для ввода площади
    function addAreaField() {
        const areaBox = document.createElement('div');
        areaBox.classList.add('input-group');

        const areaLabel = document.createElement('label');
        areaLabel.textContent = "Площадь лица:";
        areaBox.appendChild(areaLabel);

        const areaField = document.createElement('input');
        areaField.type = 'number';
        areaField.placeholder = 'Введите площадь';
        areaFields.push(areaField);
        areaBox.appendChild(areaField);

        // Кнопка удаления
        const removeButton = document.createElement('button');
        removeButton.textContent = 'Удалить лицо';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', function() {
            removeAreaField(areaBox);
        });
        areaBox.appendChild(removeButton);

        areasBox.appendChild(areaBox);
    }

    // Функция удаления поля
    function removeAreaField(areaBox) {
        areasBox.removeChild(areaBox);
        // Удаляем поле из массива areaFields
        const index = areaFields.indexOf(areaBox.querySelector('input'));
        if (index !== -1) {
            areaFields.splice(index, 1);
        }
    }

    // Функция для расчета долей
    function calculateShares() {
        try {
            const totalArea = parseFloat(totalAreaField.value);

            if (isNaN(totalArea)) {
                throw new Error("Площадь должна быть числом.");
            }

            const areas = areaFields.map(field => parseFloat(field.value));

            if (areas.some(isNaN)) {
                throw new Error("Все площади должны быть числами.");
            }

            const scaledTotal = Math.round(totalArea * 10);
            const scaledAreas = areas.map(area => Math.round(area * 10));

            let commonDivisor = scaledTotal;
            scaledAreas.forEach(area => {
                commonDivisor = gcd(commonDivisor, area);
            });

            let results = `Общая площадь: ${totalArea} м² = ${scaledTotal / commonDivisor} частей\n`;

            areas.forEach((area, index) => {
                const scaledArea = scaledAreas[index];
                results += `Лицо ${index + 1}: ${area} м² = ${scaledArea / commonDivisor}/${scaledTotal / commonDivisor}\n`;
            });

            resultsArea.value = results;
        } catch (e) {
            resultsArea.value = `Ошибка: ${e.message}`;
        }
    }

    // Функция нахождения НОД (наибольший общий делитель)
    function gcd(a, b) {
        while (b !== 0) {
            let temp = b;
            b = a % b;
            a = temp;
        }
        return a;
    }
});
