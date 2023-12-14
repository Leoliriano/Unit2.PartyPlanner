document.addEventListener('DOMContentLoaded', () => {
    const partyList = document.getElementById('partyList');
    const partyForm = document.getElementById('partyForm');

    const apiUrl = 'https://fsa-crud-2aa9294fe819.herokuapp.com/api/2109-CPU-RM-WEB-PT/events';


    const fetchParties = async () => {
        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            partyList.innerHTML = '';


            data.forEach(party => {
                const partyItem = document.createElement('div');
                partyItem.innerHTML = `<p>${party.name}, ${party.date}, ${party.location}, ${party.description} <button data-id="${party.id}" class="deleteButton">Delete</button></p>`;
                partyList.appendChild(partyItem);
            });


            document.querySelectorAll('.deleteButton').forEach(button => {
                button.addEventListener('click', (event) => deleteParty(event.target.dataset.id));
            });
        } catch (error) {
            console.error('Error fetching parties:', error);
        }
    };


    const addParty = async (partyData) => {
        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(partyData),
            });

            if (response.ok) {
                fetchParties();
            } else {
                console.error('Failed to add party');
            }
        } catch (error) {
            console.error('Error adding party:', error);
        }
    };

    const deleteParty = async (partyId) => {
        try {
            const response = await fetch(`${apiUrl}/${partyId}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                fetchParties();
            } else {
                console.error('Failed to delete party');
            }
        } catch (error) {
            console.error('Error deleting party:', error);
        }
    };

    partyForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const description = document.getElementById('description').value;
        const date = document.getElementById('date').value;
        const location = document.getElementById('location').value;

        if (name && description && date && location) {
            const partyData = { name, description, date, location };
            addParty(partyData);

            partyForm.reset();
        } else {
            alert('Please fill in all fields.');
        }
    });

    fetchParties();
});