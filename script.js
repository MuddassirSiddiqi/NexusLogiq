document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('update-form');
    const confirmationMessage = document.getElementById('confirmation-message');
    const tableBody = document.querySelector('tbody');

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Capture user inputs
        const vehicleId = document.getElementById('vehicle-id').value.trim().toUpperCase();
        const newStatus = document.getElementById('status-update').value;
        const statusClass = newStatus.toLowerCase(); // 'in-transit', 'delivered', 'delayed'

        // 2. Scan the table to see if the vehicle is already there
        const tableRows = document.querySelectorAll('tbody tr');
        let vehicleFound = false;

        tableRows.forEach(row => {
            const rowVehicleId = row.cells[0].textContent.trim();
            
            if (rowVehicleId.toUpperCase() === vehicleId) {
                vehicleFound = true;
                
                // Update existing row
                const statusBadge = row.cells[2].querySelector('.status');
                statusBadge.textContent = newStatus;
                statusBadge.className = `status ${statusClass}`;
            }
        });

        // 3. If the vehicle wasn't found, create a new row!
        if (!vehicleFound) {
            const newRow = document.createElement('tr');
            
            // Adding TBD for destination and Pending for priority since we don't collect them in the form
            newRow.innerHTML = `
                <td>${vehicleId}</td>
                <td>TBD</td>
                <td><span class="status ${statusClass}">${newStatus}</span></td>
                <td><span class="priority low">Pending</span></td>
            `;
            
            // Add the new row to the top of the table
            tableBody.insertBefore(newRow, tableBody.firstChild);
        }

        // 4. Show success message
        if (vehicleFound) {
            confirmationMessage.textContent = `Success: Vehicle ${vehicleId} updated to '${newStatus}'.`;
        } else {
            confirmationMessage.textContent = `Success: New log created for Vehicle ${vehicleId}.`;
        }
        
        confirmationMessage.className = 'success-msg'; 
        confirmationMessage.classList.remove('hidden');

        // 5. Hide the message after 4 seconds
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
            confirmationMessage.classList.remove('success-msg');
        }, 4000);

        // 6. Reset the form
        updateForm.reset();
    });
});