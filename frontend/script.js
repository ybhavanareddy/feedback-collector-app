const form = document.getElementById("feedbackForm");
const feedbackList = document.getElementById("feedbackList");

//Handle form submit 
form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    const username = document.getElementById("username");
    const message = document.getElementById("message");
    const submitBtn = form.querySelector("button");

    // Show loading text
    submitBtn.disabled = true;
    submitBtn.textContent = "Sending...";

    //Send POST request to backend

    await fetch('http://localhost:3000/feedback',
        {
            method:"POST",
            headers:{
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                username:username.value,
                message: message.value
            }),

        });
        
        //clear form 
        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = "Submit";
        showToast()
        // Refresh feedback list 
        showToast("Feedback added!");
        getFeedback();

});

//Fetch and display all feedback 

async function getFeedback(){
    const res = await 
    fetch("http://localhost:3000/feedback");
    const data = await res.json();
    feedbackList.innerHTML = '';
    data.forEach((item,index)=>{
        const li = document.createElement('li');
        li.innerHTML = `<strong>${item.username}:</strong> ${item.message}
        <button onclick="deleteFeedback(${index})" style="margin-left:10px;color:red;border:none;
        background:none;cursor:pointer;">❌</button>
        `;
        feedbackList.appendChild(li);
    });
}

async function deleteFeedback(index){
    const confirmDelete = confirm("Are you sure you want to delete this feedback?");
    if (!confirmDelete) return;

    await fetch(`http://localhost:3000/feedback/${index}`,{
        method:"DELETE",
    });

    showToast("Feedback deleted!", "delete");

    getFeedback();
    
}

//Load feedback on page load
getFeedback();

function showToast(message = "Success!", type = "success") {
    const toast = document.getElementById("toast");
    toast.textContent = message;

    // Set background color based on type
    if (type === "delete") {
        toast.style.backgroundColor = "#dc3545"; // red
    } else {
        toast.style.backgroundColor = "#28a745"; // green
    }

    toast.classList.add("show");

    setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

const toggle = document.getElementById('darkModeToggle');
toggle.addEventListener('change', () => {
    document.body.classList.toggle('dark');
});
