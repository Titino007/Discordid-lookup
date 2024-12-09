function finduser() {
    let apiUrl = 'https://discordlookup.mesalytic.moe/v1/user/' + document.getElementById('userid-search-input').value;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error('Data not found');
                } else if (response.status === 500) {
                    throw new Error('Server error');
                } else {
                    throw new Error('Network response was not ok');
                }
            }
            return response.json();
        })
        .then(data => {
            let image = data.avatar && data.avatar.link ? data.avatar.link : '40a4592d0e7f4dc067ec0cdc24e038b9.png';
            let clan = data.raw.clan ? data.raw.clan : 'None';

            const formattedDate = data.created_at.slice(0, 10);

            const UsernameElement = document.getElementById('main-username');
            const ProfileImageElement = document.getElementById('main-image');
            const DateOfCreationElement = document.getElementById('date-of-Creation');
            const ClanElement = document.getElementById('Clan');
            const BadgeDiv = document.getElementById('main-badge');

            if (!BadgeDiv) {
                console.error('BadgeDiv not found');
                return;
            }

            console.log(BadgeDiv); 

            UsernameElement.textContent = data.username;
            DateOfCreationElement.textContent = formattedDate;
            ClanElement.textContent = clan;
            ProfileImageElement.src = image;

            while (BadgeDiv.firstChild) {
                BadgeDiv.removeChild(BadgeDiv.firstChild);
            }

            if (data.badges && data.badges.includes('ACTIVE_DEVELOPER')) {
                let BadgeBackground1 = document.createElement('div');
                BadgeBackground1.className = 'BADGE';
                BadgeBackground1.innerHTML = '<img class="badge-image" src="active_dev_badge.gif">Active Dev';
                BadgeDiv.appendChild(BadgeBackground1);
            }
            


        })
        .catch(error => {
            console.error('Error:', error);
        });
}
