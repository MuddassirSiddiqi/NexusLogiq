document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('update-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Capture user inputs
        const vehicleId = document.getElementById('vehicle-id').value.trim().toUpperCase();
        const newStatus = document.getElementById('status-update').value;
        const statusClass = newStatus.toLowerCase(); // 'in-transit', 'delivered', 'delayed'

        // Scan the table to update the row if the vehicle is visible in "Recent Shipments"
        const tableRows = document.querySelectorAll('tbody tr');
        let vehicleFound = false;

        tableRows.forEach(row => {
            const rowVehicleId = row.cells[0].textContent.trim().toUpperCase();
            
            if (rowVehicleId === vehicleId) {
                vehicleFound = true;
                
                // Grab the status badge and update it
                const statusBadge = row.cells[2].querySelector('.status');
                statusBadge.textContent = newStatus;
                statusBadge.className = `status ${statusClass}`;
            }
        });

        // Update the UI message
        if (vehicleFound) {
            confirmationMessage.textContent = `Success: Vehicle ${vehicleId} updated to '${newStatus}'.`;
        } else {
            // If not in the recent table, simulate a successful backend update
            confirmationMessage.textContent = `Success: Status for Vehicle ${vehicleId} logged in system.`;
        }
        
        // Show the message
        confirmationMessage.className = 'success-msg'; 
        confirmationMessage.classList.remove('hidden');

        // Hide the message after 4 seconds
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
            confirmationMessage.classList.remove('success-msg');
        }, 4000);

        // Reset the form
        updateForm.reset();
    });
});