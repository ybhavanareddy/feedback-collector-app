const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

// Handle form submit
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById("username");
    const message = document.getElementById("message");
    const submitBtn = form.querySelector("button");

    // Show loading text
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    // Send POST request to backend
    try {
        await fetch('/feedback', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username.value,
                message: message.value
            }),
        });

        // Clear form and show toast
        form.reset();
        showToast("Feedback added!");
        getFeedback();
    } catch (error) {
        console.error("Error submitting feedback:", error);
        showToast("Failed to submit feedback", "error");
    }

    submitBtn.disabled = false;
    submitBtn.textContent = "Submit";
});

// Fetch and display all feedback
async function getFeedback() {
    try {
        const res = await fetch("/feedback");
        const data = await res.json();
        feedbackList.innerHTML = '';
        data.forEach((item, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <strong>${item.username}:</strong> ${item.message}
                <button onclick="deleteFeedback(${index})"
                    style="margin-left:10px;color:red;border:none;background:none;cursor:pointer;">❌</button>
            `;
            feedbackList.appendChild(li);
        });
    } catch (error) {
        console.error("Error fetching feedback:", error);
        showToast("Failed to load feedbacks", "error");
    }
}

// Delete feedback by index
async function deleteFeedback(index) {
    const confirmDelete = confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    try {
        await fetch(`/feedback/${index}`, {
            method: "DELETE",
        });
        showToast("Feedback deleted!", "delete");
        getFeedback();
    } catch (error) {
        console.error("Error deleting feedback:", error);
        showToast("Failed to delete", "error");
    }
}

// Show toast notification
function showToast(message = "Success!", type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;

    // Set background color based on type
    if (type === "delete") {
        toast.style.backgroundColor = "#dc3545"; // red
    } else if (type === "error") {
        toast.style.backgroundColor = "#ff8800"; // orange
    } else {
        toast.style.backgroundColor = "#28a745"; // green
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// Toggle dark mode
const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});

// Load feedbacks on page load
getFeedback();
