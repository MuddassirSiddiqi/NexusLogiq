document.addEventListener('DOMContentLoaded', () => {
    const updateForm = document.getElementById('update-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    updateForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 1. Capture user inputs
        const vehicleId = document.getElementById('vehicle-id').value.trim();
        const newStatus = document.getElementById('status-update').value;

        // 2. Scan the table to update the row if the vehicle is visible
        const tableRows = document.querySelectorAll('tbody tr');
        let vehicleFound = false;

        tableRows.forEach(row => {
            const rowVehicleId = row.cells[0].textContent.trim(); // First column is the ID
            
            // Make the search case-insensitive so "v-1042" matches "V-1042"
            if (rowVehicleId.toUpperCase() === vehicleId.toUpperCase()) {
                vehicleFound = true;
                
                // Grab the status badge in the third column
                const statusBadge = row.cells[2].querySelector('.status');
                
                // Update the text
                statusBadge.textContent = newStatus;
                
                // Reset classes, then add the specific color class based on selection
                statusBadge.className = 'status'; 
                const statusClass = newStatus.toLowerCase(); // e.g., 'in-transit', 'delivered', 'delayed'
                statusBadge.classList.add(statusClass);
            }
        });

        // 3. Update the UI message
        if (vehicleFound) {
            confirmationMessage.textContent = `Success: Vehicle ${vehicleId.toUpperCase()} updated to '${newStatus}'.`;
        } else {
            // In case they type a vehicle not currently shown in the "Recent" table
            confirmationMessage.textContent = `Success: Vehicle ${vehicleId.toUpperCase()} updated in main database.`;
        }
        
        confirmationMessage.className = 'success-msg'; // Show success styling
        confirmationMessage.classList.remove('hidden');

        // 4. Hide the message after 4 seconds
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
            confirmationMessage.classList.remove('success-msg');
        }, 4000);

        // 5. Reset the form
        updateForm.reset();
    });
});