async function fetchApiData() {
    try {
        const urls = [
            'https://api.artic.edu/api/v1/artworks/129883',
            'https://api.artic.edu/api/v1/artworks/129884',
            'https://api.artic.edu/api/v1/artworks/129885'
        ];

        const responses = await Promise.all(urls.map(url =>
            fetch(url).then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
        ));

        return responses.map(item => item.data);
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return [];
    }
}

async function displayData() {
    const data = await fetchApiData();
    const container = document.getElementById('data-container');

    if (data.length > 0) {
        container.innerHTML = data.map(item => `
            <div class="card">
                <h3>${item.title || 'No Title Display'}</h3>
                <p>${item.artist_title || 'No Artist Title'}</p>
                <p>${item.artist_display || 'No Artist Display'}</p>
                <p>${item.api_model || 'No Api Model'}</p>
            </div>
        `).join('');
    } else {
        container.innerHTML = '<p>No data available</p>';
    }
}

window.onload = displayData;
