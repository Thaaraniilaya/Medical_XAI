// -----------------------
// Global User Info
// -----------------------
const userId = sessionStorage.getItem("user_id") || "User";
const userLang = sessionStorage.getItem("lang") || "en";

document.addEventListener("DOMContentLoaded", () => {
    // Display username in navbar
    const userNameEl = document.getElementById("userName");
    if(userNameEl) userNameEl.innerText = userId;

    // Initialize calendar
    const calendarEl = document.getElementById("calendar");
    if(calendarEl) {
        const calendar = new FullCalendar.Calendar(calendarEl, {
            initialView: 'dayGridMonth',
            events: [] // Placeholder; fetch from backend if needed
        });
        calendar.render();
        window.userCalendar = calendar;
    }
});

// -----------------------
// Module Navigation
// -----------------------
function showModule(name) {
    const modules = ["diet", "report", "tips", "appointments", "hydration", "women_diet", "assistant"];
    modules.forEach(m => {
        const el = document.getElementById(m + "Module");
        if(el) el.style.display = "none";
    });

    const activeModule = document.getElementById(name + "Module");
    if(activeModule) activeModule.style.display = "block";

    // Fetch data dynamically
    if(name === "diet") fetchDietPlan();
    else if(name === "hydration") fetchHydrationLogs();
    else if(name === "appointments") fetchAppointments();
    else if(name === "women_diet") fetchWomenDietPlan();
}

// -----------------------
// Report Upload & AI Summary
// -----------------------
function uploadReport() {
    const fileInput = document.getElementById("reportFile");
    if(!fileInput.files.length) return alert("Please select a file.");

    const formData = new FormData();
    formData.append("file", fileInput.files[0]);
    formData.append("language", userLang);

    axios.post("/api/upload_report", formData, {
        headers: {"Content-Type": "multipart/form-data"}
    })
    .then(res => displayReportSummary(res.data))
    .catch(err => {
        console.error(err);
        alert("Error analyzing report.");
    });
}

function displayReportSummary(data) {
    const container = document.getElementById("reportResult");
    if(!container) return;

    let html = `<h5>Summary:</h5><p>${data.summary}</p>`;
    html += `<h5>Health Tips:</h5><ul>`;
    data.health_tips.forEach(tip => html += `<li>${tip}</li>`);
    html += `</ul>`;
    html += `<h5>Critical Highlights:</h5><ul>`;
    data.xai.highlights.forEach(item => html += `<li>${item.word}: ${item.reason}</li>`);
    html += `</ul>`;
    container.innerHTML = html;
}

// -----------------------
// Virtual Assistant Chat
// -----------------------
function chatWithAI() {
    const prompt = document.getElementById("chatPrompt").value;
    if(!prompt) return alert("Type your question first.");

    axios.post("/api/chat", { prompt })
        .then(res => {
            const container = document.getElementById("chatResponse");
            container.innerHTML = `<p>${res.data.reply}</p>`;
        })
        .catch(err => {
            console.error(err);
            alert("Error communicating with AI assistant.");
        });
}

// -----------------------
// Emergency Alert
// -----------------------
function triggerAlert() {
    axios.post("/api/alert_caretaker", { user_id: userId, reason: "Immediate medical assistance required." })
        .then(res => alert(res.data.message))
        .catch(err => {
            console.error(err);
            alert("Error triggering alert.");
        });
}

// -----------------------
// Diet Plan Module
// -----------------------
function fetchDietPlan() {
    const container = document.getElementById("dietModule");
    container.innerHTML = "<p>Loading diet plan...</p>";

    axios.get("/api/diet_plan")
        .then(res => {
            let html = "<ul>";
            res.data.diet_plan.forEach(item => {
                html += `<li><strong>${item.meal}:</strong> ${item.menu}</li>`;
            });
            html += "</ul>";
            container.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Error loading diet plan.</p>";
        });
}

// -----------------------
// Hydration Tracker Module
// -----------------------
function fetchHydrationLogs() {
    const container = document.getElementById("hydrationModule");
    container.innerHTML = "<p>Loading hydration logs...</p>";

    axios.get("/api/hydration")
        .then(res => {
            let html = "<ul>";
            res.data.hydration_logs.forEach(log => {
                html += `<li>${log.date}: ${log.value} liters</li>`;
            });
            html += "</ul>";
            container.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Error loading hydration logs.</p>";
        });
}

function logHydration(volume, date) {
    axios.post("/api/hydration", {volume, date})
        .then(res => fetchHydrationLogs())
        .catch(err => console.error(err));
}

// -----------------------
// Appointments Module
// -----------------------
function fetchAppointments() {
    const container = document.getElementById("appointmentsModule");
    container.innerHTML = "<p>Loading appointments...</p>";

    axios.get("/api/appointments")
        .then(res => {
            let html = "<ul>";
            res.data.appointments.forEach(appt => {
                html += `<li>${appt.date}: ${appt.value}</li>`;
            });
            html += "</ul>";
            container.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Error loading appointments.</p>";
        });
}

function scheduleAppointment(description, date) {
    axios.post("/api/appointments", {description, date})
        .then(res => fetchAppointments())
        .catch(err => console.error(err));
}

// -----------------------
// Women Period Diet Plan Module
// -----------------------
function fetchWomenDietPlan() {
    const container = document.getElementById("women_dietModule");
    container.innerHTML = "<p>Loading women period diet plan...</p>";

    axios.get("/api/women_diet")
        .then(res => {
            let html = "<ul>";
            res.data.women_diet.forEach(item => {
                html += `<li><strong>${item.phase}:</strong> ${item.menu}</li>`;
            });
            html += "</ul>";
            container.innerHTML = html;
        })
        .catch(err => {
            console.error(err);
            container.innerHTML = "<p>Error loading women diet plan.</p>";
        });
}

// -----------------------
// Placeholder for Health Tips Module
// -----------------------
function fetchHealthTips() {
    const container = document.getElementById("tipsModule");
    container.innerHTML = "<ul><li>Stay hydrated</li><li>Exercise daily</li><li>Eat vegetables and fruits</li></ul>";
}
