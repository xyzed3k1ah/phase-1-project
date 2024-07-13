document.addEventListener('DOMContentLoaded', function () {
    fetch('db.json')
        .then(response => response.json())
        .then(data => {
            displayArtistInfo(data.artist);
            displayAlbums(data.albums);
            displaySingles(data.notable_singles);
            displayAwards(data.awards);
            addEventListeners(data);
        })
        .catch(error => console.error('Error fetching data:', error));
});

function displayArtistInfo(artist) {
    const artistInfo = document.getElementById('artist-info');
    artistInfo.innerHTML = `
        <img src="${artist.image_url}" alt="${artist.name}">
        <h3>${artist.name}</h3>
        <p>Birth Name: ${artist.birth_name}</p>
        <p>Birth Date: ${artist.birth_date}</p>
        <p>Death Date: ${artist.death_date}</p>
        <p>Nationality: ${artist.nationality}</p>
    `;
}

function displayAlbums(albums) {
    const albumsContainer = document.getElementById('albums');
    albums.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.className = 'card';
        albumCard.dataset.index = index;
        albumCard.innerHTML = `
            <img src="${album.image_url}" alt="${album.title}">
            <h3>${album.title}</h3>
            <p>Release Date: ${album.release_date}</p>
        `;
        albumsContainer.appendChild(albumCard);
    });
}

function displaySingles(singles) {
    const singlesContainer = document.getElementById('singles');
    singles.forEach((single, index) => {
        const singleCard = document.createElement('div');
        singleCard.className = 'card';
        singleCard.dataset.index = index;
        singleCard.innerHTML = `
            <img src="${single.image_url}" alt="${single.title}">
            <h3>${single.title}</h3>
            <p>Release Date: ${single.release_date}</p>
            <p>Length: ${single.length}</p>
        `;
        singlesContainer.appendChild(singleCard);
    });
}

function displayAwards(awards) {
    const awardsContainer = document.getElementById('awards');
    awards.forEach((award, index) => {
        const awardCard = document.createElement('div');
        awardCard.className = 'card';
        awardCard.dataset.index = index;
        awardCard.innerHTML = `
            <img src="${award.image_url}" alt="${award.award}">
            <h3>${award.award}</h3>
            <p>Category: ${award.category}</p>
            <p>Year: ${award.year}</p>
            <p>Result: ${award.result}</p>
        `;
        awardsContainer.appendChild(awardCard);
    });
}

function createDetailCard(type, details) {
    let detailContent = '';

    switch (type) {
        case 'album':
            detailContent = `
                <h3>${details.title}</h3>
                <p>Release Date: ${details.release_date}</p>
                <ul>
                    ${details.tracks.map(track => `
                        <li>
                            <strong>${track.title}</strong> (${track.length})
                            ${track.featured_artist ? ` - Featuring: ${track.featured_artist}` : ''}
                        </li>
                    `).join('')}
                </ul>
            `;
            break;
        case 'single':
            detailContent = `
                <h3>${details.title}</h3>
                <p>Release Date: ${details.release_date}</p>
                <p>Length: ${details.length}</p>
                ${details.collaboration ? `<p>Collaboration: ${details.collaboration}</p>` : ''}
                ${details.featured_artist ? `<p>Featuring: ${details.featured_artist}</p>` : ''}
            `;
            break;
        case 'award':
            detailContent = `
                <h3>${details.award}</h3>
                <p>Category: ${details.category}</p>
                <p>Year: ${details.year}</p>
                <p>Result: ${details.result}</p>
                ${details.work ? `<p>Work: ${details.work}</p>` : ''}
            `;
            break;
    }

    return detailContent;
}

function addEventListeners(data) {
    document.querySelectorAll('#albums .card').forEach(card => {
        const album = data.albums[card.dataset.index];
        const originalContent = card.innerHTML;
        const detailContent = createDetailCard('album', album);

        card.addEventListener('click', function () {
            if (this.innerHTML === originalContent) {
                this.innerHTML = detailContent;
            } else {
                this.innerHTML = originalContent;
            }
        });
    });

    document.querySelectorAll('#singles .card').forEach(card => {
        const single = data.notable_singles[card.dataset.index];
        const originalContent = card.innerHTML;
        const detailContent = createDetailCard('single', single);

        card.addEventListener('click', function () {
            if (this.innerHTML === originalContent) {
                this.innerHTML = detailContent;
            } else {
                this.innerHTML = originalContent;
            }
        });
    });

    document.querySelectorAll('#awards .card').forEach(card => {
        const award = data.awards[card.dataset.index];
        const originalContent = card.innerHTML;
        const detailContent = createDetailCard('award', award);

        card.addEventListener('click', function () {
            if (this.innerHTML === originalContent) {
                this.innerHTML = detailContent;
            } else {
                this.innerHTML = originalContent;
            }
        });
    });
}
