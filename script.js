document.addEventListener('DOMContentLoaded', () => {
    // Grab the form and message container from the DOM
    const updateForm = document.getElementById('update-form');
    const confirmationMessage = document.getElementById('confirmation-message');

    // Listen for the form submission
    updateForm.addEventListener('submit', function(event) {
        // 1. Prevent the default page reload
        event.preventDefault();

        // 2. Capture the user inputs
        const vehicleId = document.getElementById('vehicle-id').value;
        const newStatus = document.getElementById('status-update').value;

        // 3. Update the UI with a confirmation message
        confirmationMessage.textContent = `Success: Vehicle ${vehicleId} status updated to '${newStatus}'.`;
        
        // Remove the hidden class and add the success styling
        confirmationMessage.classList.remove('hidden');
        confirmationMessage.classList.add('success-msg');

        // 4. Automatically hide the message after 4 seconds for better UX
        setTimeout(() => {
            confirmationMessage.classList.add('hidden');
            confirmationMessage.classList.remove('success-msg');
        }, 4000);

        // 5. Reset the form back to its default state
        updateForm.reset();
    });
});