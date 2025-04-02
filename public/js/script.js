
// Fonction de recherche
function searchHelp() {
    const searchValue = document.getElementById('search').value;
    fetch(`/api/search?q=${encodeURIComponent(searchValue)}`)
        .then(response => response.json())
        .then(data => {
            // Mettre à jour la carte avec les résultats
            updateMap(data);
        })
        .catch(error => console.error('Erreur lors de la recherche:', error));
}

// Initialiser la carte
let map;
document.addEventListener('DOMContentLoaded', function () {
    // Initialiser la carte centrée sur Paris
    map = L.map('map').setView([48.8566, 2.3522], 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Charger les profils des aidants
    fetch('/api/profiles')
        .then(response => response.json())
        .then(profiles => {
            const profileGrid = document.getElementById('profile-grid');
            profiles.forEach(profile => {
                const profileCard = document.createElement('div');
                profileCard.className = 'profile-card';
                profileCard.innerHTML = `
                    <img src="/images/avatar-placeholder.png" alt="Avatar" class="profile-avatar">
                    <h3>${profile.name}</h3>
                    <p>${profile.description}</p>
                    <p class="location">${profile.location}</p>
                    <button class="contact-btn">Contacter</button>
                `;
                profileGrid.appendChild(profileCard);
            });
        })
        .catch(error => console.error('Erreur lors du chargement des profils:', error));
});

// Mettre à jour la carte avec les résultats de la recherche
function updateMap(results) {
    // Supprimer les anciens marqueurs
    map.eachLayer(layer => {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Ajouter les nouveaux marqueurs
    results.forEach(item => {
        L.marker([item.lat, item.lng])
            .addTo(map)
            .bindPopup(`${item.name} - ${item.description}`);
    });
}