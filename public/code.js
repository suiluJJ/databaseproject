document.addEventListener('DOMContentLoaded', function () {
    loadAll();
});

const checkbox1 = document.getElementById('check1');
const checkbox2 = document.getElementById('check2');

//event listeners for checkbox changes
checkbox1.addEventListener('change', function () {
    toggleDeviceDetails('.hidden', this.checked);
    fetchAndRenderDevices();
});

checkbox2.addEventListener('change', function () {
    toggleDeviceDetails('.hidden2', this.checked);
    fetchAndRenderDevices();
});

// function to view the new elements with new data
function toggleDeviceDetails(selector, show) {
    const deviceDetails = document.querySelectorAll(`#devices p${selector}`);
    deviceDetails.forEach(detail => {
        detail.style.display = show ? 'block' : 'none';
    });
}


async function fetchAndRenderDevices() {
    try {
        const devices = await getDevices();
        console.log(devices);
        renderDevices(devices);
    } catch (error) {
        console.log(error);
    }
}


async function getDevices() {
    let url = 'http://localhost:5000/get';
    if (checkbox1.checked || checkbox2.checked) {
        url = 'http://localhost:5000/getall';
    }
    try {
        const res = await fetch(url);
        const data = await res.json();
        return data;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

// function to create elements for the data fetched from the database
function renderDevices(devices) {
    const devicesContainer = document.getElementById('devices');
    devicesContainer.innerHTML = ''; // Clear existing devices

    devices.forEach(device => {
        const deviceDiv = document.createElement('div');
        deviceDiv.classList.add('device');

        const deviceId = document.createElement('p');
        deviceId.textContent = `ID: ${device.DeviceID}`;
        deviceDiv.appendChild(deviceId);

        const deviceName = document.createElement('p');
        deviceName.textContent = `Name: ${device.Model}`;
        deviceDiv.appendChild(deviceName);

        const deviceBrand = document.createElement('p');
        deviceBrand.textContent = `Brand: ${device.Brand}`;
        deviceDiv.appendChild(deviceBrand);

        const deviceCategory = document.createElement('p');
        deviceCategory.textContent = `Category: ${device.Category}`;
        deviceDiv.appendChild(deviceCategory);

        // Device specs
        const deviceProcessor = document.createElement('p');
        deviceProcessor.textContent = `Processor: ${device.Processor}`;
        deviceProcessor.className = 'hidden';
        deviceDiv.appendChild(deviceProcessor);

        const deviceRAM = document.createElement('p');
        deviceRAM.textContent = `RAM: ${device.RAM}`;
        deviceRAM.className = 'hidden';
        deviceDiv.appendChild(deviceRAM);

        const deviceStorage = document.createElement('p');
        deviceStorage.textContent = `Storage: ${device.Storage}`;
        deviceStorage.className = 'hidden';
        deviceDiv.appendChild(deviceStorage);

        // Device info
        const devicePrice = document.createElement('p');
        devicePrice.textContent = `Price: ${device.Price}`;
        devicePrice.className = 'hidden2';
        deviceDiv.appendChild(devicePrice);

        const deviceDescription = document.createElement('p');
        deviceDescription.textContent = `Description: ${device.Description}`;
        deviceDescription.className = 'hidden2';
        deviceDiv.appendChild(deviceDescription);

        const deviceReleaseDate = document.createElement('p');
        deviceReleaseDate.textContent = `Release Date: ${device.ReleaseDate}`;
        deviceReleaseDate.className = 'hidden2';
        deviceDiv.appendChild(deviceReleaseDate);

        // Device image
        const deviceImage = document.createElement('img');
        deviceImage.src = device.Image;
        deviceImage.alt = device.Model;
        deviceDiv.appendChild(deviceImage);

        devicesContainer.appendChild(deviceDiv);
    });

    // Ensure details visibility based on checkboxes
    toggleDeviceDetails('.hidden', checkbox1.checked);
    toggleDeviceDetails('.hidden2', checkbox2.checked);
}

function loadAll() {
    fetchAndRenderDevices();
}
