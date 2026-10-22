'use strict';

function getPrices() {
    return {
        baseTypes: {
            "1": 150,
            "2": 200,
            "3": 300
        },
        options: {
            "0": 0,
            "50": 50,
            "100": 100
        },
        properties: {
            "150": 150
        }
    };
}

function updatePrice() {
    const prices = getPrices();
    
    const qtyInput = document.getElementById('quantity');
    let qty = parseInt(qtyInput.value);
    
    if (isNaN(qty) || qty < 1) {
        qty = 1;
        qtyInput.value = 1; 
    }
    
    if (qty > 200) {
        qty = 200;
        qtyInput.value = 200; 
    }

    const radios = document.getElementsByName('serviceType');
    let selectedType = "1";
    for (let i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            selectedType = radios[i].value;
            break;
        }
    }

    const optionsBlock = document.getElementById('options-block');
    const propertyBlock = document.getElementById('property-block');

    if (selectedType === "1") {
        optionsBlock.style.display = 'none';
        propertyBlock.style.display = 'none';
    } else if (selectedType === "2") {
        optionsBlock.style.display = 'block';
        propertyBlock.style.display = 'none';
    } else if (selectedType === "3") {
        optionsBlock.style.display = 'none';
        propertyBlock.style.display = 'block';
    }

    let totalPrice = prices.baseTypes[selectedType] * qty;

    if (selectedType === "2") {
        const extraOption = document.getElementById('extra-option');
        let optionPrice = parseInt(extraOption.value);
        totalPrice += optionPrice * qty;
    }

    if (selectedType === "3") {
        const extraProperty = document.getElementById('extra-property');
        if (extraProperty.checked) {
            let propPrice = parseInt(extraProperty.value);
            totalPrice += propPrice * qty;
        }
    }

    const resultDiv = document.getElementById('result');
    resultDiv.textContent = `Итого: ${totalPrice} руб.`;
}

document.addEventListener('DOMContentLoaded', function() {
    
    const qtyInput = document.getElementById('quantity');
    const radios = document.getElementsByName('serviceType');
    const extraOption = document.getElementById('extra-option');
    const extraProperty = document.getElementById('extra-property');

    qtyInput.addEventListener('input', updatePrice);
    
    for (let i = 0; i < radios.length; i++) {
        radios[i].addEventListener('change', updatePrice);
    }
    
    extraOption.addEventListener('change', updatePrice);
    extraProperty.addEventListener('change', updatePrice);

    updatePrice();
});