/* =========================================
   USERS
========================================= */

let users =
    JSON.parse(
        localStorage.getItem("internUsers")
    ) || [

        {
            id: 1,
            username: "student",
            password: "1234",
            role: "student",
            name: "John Student"
        },

        {
            id: 2,
            username: "company",
            password: "1234",
            role: "company",
            name: "Tech Solutions"
        },

        {
            id: 3,
            username: "admin",
            password: "admin123",
            role: "admin",
            name: "Platform Admin"
        }

    ];


/* =========================================
   INTERNSHIPS
========================================= */

let internships =
    JSON.parse(
        localStorage.getItem(
            "internships"
        )
    ) || [

        {
            id: 1,
            title: "Frontend Developer Intern",
            company: "Tech Solutions",
            category: "Technology",
            location: "Bangalore",
            duration: "3 months",
            stipend: "₹15,000/month",
            skills: "HTML, CSS, JavaScript",
            description:
                "Work with our development team to build responsive web applications.",
            postedBy: 2
        },

        {
            id: 2,
            title: "Data Science Intern",
            company: "DataLabs",
            category: "Technology",
            location: "Hyderabad",
            duration: "6 months",
            stipend: "₹20,000/month",
            skills: "Python, SQL, Pandas",
            description:
                "Analyze real-world datasets and build data-driven solutions.",
            postedBy: 2
        },

        {
            id: 3,
            title: "Digital Marketing Intern",
            company: "MarketPro",
            category: "Marketing",
            location: "Chennai",
            duration: "3 months",
            stipend: "₹10,000/month",
            skills: "SEO, Social Media, Analytics",
            description:
                "Help develop and execute digital marketing campaigns.",
            postedBy: 2
        },

        {
            id: 4,
            title: "UI/UX Design Intern",
            company: "Creative Studio",
            category: "Design",
            location: "Remote",
            duration: "4 months",
            stipend: "₹12,000/month",
            skills: "Figma, UI Design, Prototyping",
            description:
                "Design intuitive user interfaces and engaging digital experiences.",
            postedBy: 2
        }

    ];


/* =========================================
   APPLICATIONS
========================================= */

let applications =
    JSON.parse(
        localStorage.getItem(
            "internApplications"
        )
    ) || [

        {
            id: 1,
            internshipId: 1,
            studentId: 1,
            studentName: "John Student",
            status: "Pending",
            date: new Date().toLocaleDateString()
        }

    ];


/* =========================================
   CURRENT USER
========================================= */

let currentUser =
    JSON.parse(
        sessionStorage.getItem(
            "internCurrentUser"
        )
    );


/* =========================================
   SAVE DATA
========================================= */

function saveData() {

    localStorage.setItem(
        "internUsers",
        JSON.stringify(users)
    );

    localStorage.setItem(
        "internships",
        JSON.stringify(internships)
    );

    localStorage.setItem(
        "internApplications",
        JSON.stringify(applications)
    );

}


/* =========================================
   LOGIN
========================================= */

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();

            const username =
                document
                    .getElementById("username")
                    .value
                    .trim();

            const password =
                document
                    .getElementById("password")
                    .value;


            const user =
                users.find(
                    u =>
                        u.username === username &&
                        u.password === password
                );


            if (!user) {

                document
                    .getElementById(
                        "loginMessage"
                    )
                    .textContent =
                    "Invalid username or password.";

                return;
            }


            currentUser = user;


            sessionStorage.setItem(
                "internCurrentUser",
                JSON.stringify(user)
            );


            document
                .getElementById("loginPage")
                .classList.add("hidden");

            document
                .getElementById("app")
                .classList.remove("hidden");


            setupApplication();

        }
    );


/* =========================================
   SETUP
========================================= */

function setupApplication() {

    const companyNav =
        document.getElementById(
            "companyNav"
        );

    const adminNav =
        document.getElementById(
            "adminNav"
        );


    companyNav.classList.add("hidden");

    adminNav.classList.add("hidden");


    if (
        currentUser.role ===
        "company"
    ) {

        companyNav.classList.remove(
            "hidden"
        );

    }


    if (
        currentUser.role ===
        "admin"
    ) {

        adminNav.classList.remove(
            "hidden"
        );

    }


    displayInternships();

    updateDashboard();

    updateCompanyDashboard();

    updateAdminDashboard();

}


/* =========================================
   LOGOUT
========================================= */

function logout() {

    sessionStorage.removeItem(
        "internCurrentUser"
    );

    currentUser = null;


    document
        .getElementById("app")
        .classList.add("hidden");

    document
        .getElementById("loginPage")
        .classList.remove("hidden");


    document
        .getElementById("loginForm")
        .reset();

}


/* =========================================
   PAGE NAVIGATION
========================================= */

function showPage(page) {

    const pages = [

        "homePage",
        "internshipsPage",
        "dashboardPage",
        "companyPage",
        "adminPage"

    ];


    pages.forEach(
        id => {

            document
                .getElementById(id)
                .classList.add("hidden");

        }
    );


    if (page === "home") {

        document
            .getElementById(
                "homePage"
            )
            .classList.remove("hidden");

    }


    if (page === "internships") {

        document
            .getElementById(
                "internshipsPage"
            )
            .classList.remove("hidden");

        displayInternships();

    }


    if (page === "dashboard") {

        document
            .getElementById(
                "dashboardPage"
            )
            .classList.remove("hidden");

        updateDashboard();

    }


    if (page === "company") {

        if (
            currentUser.role !==
            "company"
        ) {

            alert(
                "Company access required."
            );

            return;
        }


        document
            .getElementById(
                "companyPage"
            )
            .classList.remove("hidden");

        updateCompanyDashboard();

    }


    if (page === "admin") {

        if (
            currentUser.role !==
            "admin"
        ) {

            alert(
                "Admin access required."
            );

            return;
        }


        document
            .getElementById(
                "adminPage"
            )
            .classList.remove("hidden");

        updateAdminDashboard();

    }

}


/* =========================================
   DISPLAY INTERNSHIPS
========================================= */

function displayInternships(
    list = internships
) {

    const container =
        document.getElementById(
            "internshipList"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            "<p>No internships found.</p>";

        return;
    }


    list.forEach(
        internship => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "internship-card";


            const alreadyApplied =
                applications.some(
                    application =>
                        application.internshipId ===
                            internship.id &&
                        application.studentId ===
                            currentUser.id
                );


            let actionButton = "";


            if (
                currentUser.role ===
                "student"
            ) {

                actionButton =
                    alreadyApplied

                    ?

                    `
                    <button
                        class="btn"
                        disabled
                    >
                        Applied
                    </button>
                    `

                    :

                    `
                    <button
                        class="btn"
                        onclick="applyInternship(${internship.id})"
                    >
                        Apply Now
                    </button>
                    `;

            }


            card.innerHTML = `

                <span class="category">
                    ${internship.category}
                </span>

                <h3>
                    ${internship.title}
                </h3>

                <p class="company-name">
                    🏢 ${internship.company}
                </p>

                <p>
                    📍 ${internship.location}
                </p>

                <p>
                    ⏱️ ${internship.duration}
                </p>

                <p>
                    💰 ${internship.stipend}
                </p>

                <div class="skills">
                    <strong>Skills:</strong>
                    ${internship.skills}
                </div>

                <p>
                    ${internship.description}
                </p>

                <div class="card-actions">
                    ${actionButton}
                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================
   FILTER INTERNSHIPS
========================================= */

function filterInternships() {

    const search =
        document
            .getElementById(
                "searchInput"
            )
            .value
            .toLowerCase();


    const category =
        document
            .getElementById(
                "categoryFilter"
            )
            .value;


    const filtered =
        internships.filter(
            internship => {

                const matchesSearch =

                    internship.title
                        .toLowerCase()
                        .includes(search)

                    ||

                    internship.company
                        .toLowerCase()
                        .includes(search)

                    ||

                    internship.skills
                        .toLowerCase()
                        .includes(search)

                    ||

                    internship.location
                        .toLowerCase()
                        .includes(search);


                const matchesCategory =

                    category === "all"

                    ||

                    internship.category ===
                        category;


                return (
                    matchesSearch &&
                    matchesCategory
                );

            }
        );


    displayInternships(filtered);

}


/* =========================================
   APPLY
========================================= */

function applyInternship(id) {

    if (
        currentUser.role !==
        "student"
    ) {

        alert(
            "Only students can apply."
        );

        return;
    }


    const internship =
        internships.find(
            internship =>
                internship.id === id
        );


    if (!internship) {
        return;
    }


    const alreadyApplied =
        applications.some(
            application =>
                application.internshipId === id &&
                application.studentId ===
                    currentUser.id
        );


    if (alreadyApplied) {

        alert(
            "You have already applied for this internship."
        );

        return;
    }


    applications.push({

        id: Date.now(),

        internshipId: id,

        studentId:
            currentUser.id,

        studentName:
            currentUser.name,

        status: "Pending",

        date:
            new Date()
                .toLocaleDateString()

    });


    saveData();

    displayInternships();

    updateDashboard();

    updateCompanyDashboard();


    alert(
        "Application submitted successfully!"
    );

}


/* =========================================
   STUDENT DASHBOARD
========================================= */

function updateDashboard() {

    if (
        !currentUser ||
        currentUser.role !==
            "student"
    ) {

        return;
    }


    const myApplications =
        applications.filter(
            application =>
                application.studentId ===
                currentUser.id
        );


    const pending =
        myApplications.filter(
            application =>
                application.status ===
                "Pending"
        );


    const accepted =
        myApplications.filter(
            application =>
                application.status ===
                "Accepted"
        );


    const rejected =
        myApplications.filter(
            application =>
                application.status ===
                "Rejected"
        );


    document
        .getElementById(
            "applicationCount"
        )
        .textContent =
        myApplications.length;


    document
        .getElementById(
            "pendingCount"
        )
        .textContent =
        pending.length;


    document
        .getElementById(
            "acceptedCount"
        )
        .textContent =
        accepted.length;


    document
        .getElementById(
            "rejectedCount"
        )
        .textContent =
        rejected.length;


    const container =
        document.getElementById(
            "myApplications"
        );


    container.innerHTML = "";


    if (
        myApplications.length === 0
    ) {

        container.innerHTML =
            "<p>You have not applied for any internships yet.</p>";

        return;
    }


    myApplications.forEach(
        application => {

            const internship =
                internships.find(
                    internship =>
                        internship.id ===
                        application.internshipId
                );


            if (!internship) {
                return;
            }


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "application-card";


            let statusClass =
                "status-pending";


            if (
                application.status ===
                "Accepted"
            ) {

                statusClass =
                    "status-accepted";

            }


            if (
                application.status ===
                "Rejected"
            ) {

                statusClass =
                    "status-rejected";

            }


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${internship.title}
                    </h3>

                    <p>
                        🏢 ${internship.company}
                    </p>

                    <p>
                        📍 ${internship.location}
                    </p>

                    <p>
                        Applied:
                        ${application.date}
                    </p>

                </div>

                <span
                    class="status ${statusClass}"
                >
                    ${application.status}
                </span>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================
   COMPANY DASHBOARD
========================================= */

function updateCompanyDashboard() {

    if (
        !currentUser ||
        currentUser.role !==
            "company"
    ) {

        return;
    }


    const companyInternships =
        internships.filter(
            internship =>
                internship.postedBy ===
                currentUser.id
        );


    const companyApplications =
        applications.filter(
            application => {

                const internship =
                    internships.find(
                        internship =>
                            internship.id ===
                            application.internshipId
                    );


                return (
                    internship &&
                    internship.postedBy ===
                        currentUser.id
                );

            }
        );


    document
        .getElementById(
            "postedCount"
        )
        .textContent =
        companyInternships.length;


    document
        .getElementById(
            "companyApplications"
        )
        .textContent =
        companyApplications.length;


    displayCompanyInternships(
        companyInternships
    );


    displayReceivedApplications(
        companyApplications
    );

}


/* =========================================
   COMPANY INTERNSHIPS
========================================= */

function displayCompanyInternships(
    list
) {

    const container =
        document.getElementById(
            "companyInternships"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            "<p>No internships posted yet.</p>";

        return;
    }


    list.forEach(
        internship => {

            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${internship.title}
                    </h3>

                    <p>
                        Category:
                        ${internship.category}
                    </p>

                    <p>
                        Location:
                        ${internship.location}
                    </p>

                    <p>
                        Stipend:
                        ${internship.stipend}
                    </p>

                </div>

                <button
                    class="delete-btn"
                    onclick="deleteInternship(${internship.id})"
                >
                    Delete
                </button>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================
   RECEIVED APPLICATIONS
========================================= */

function displayReceivedApplications(
    list
) {

    const container =
        document.getElementById(
            "receivedApplications"
        );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML =
            "<p>No applications received.</p>";

        return;
    }


    list.forEach(
        application => {

            const internship =
                internships.find(
                    internship =>
                        internship.id ===
                        application.internshipId
                );


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${application.studentName}
                    </h3>

                    <p>
                        Applied for:
                        ${internship.title}
                    </p>

                    <p>
                        Date:
                        ${application.date}
                    </p>

                </div>

                <div class="admin-actions">

                    ${
                        application.status ===
                        "Pending"

                        ?

                        `

                        <button
                            class="accept-btn"
                            onclick="updateApplicationStatus(
                                ${application.id},
                                'Accepted'
                            )"
                        >
                            Accept
                        </button>

                        <button
                            class="reject-btn"
                            onclick="updateApplicationStatus(
                                ${application.id},
                                'Rejected'
                            )"
                        >
                            Reject
                        </button>

                        `

                        :

                        `
                        <span
                            class="status ${
                                application.status ===
                                "Accepted"
                                    ? "status-accepted"
                                    : "status-rejected"
                            }"
                        >
                            ${application.status}
                        </span>
                        `

                    }

                </div>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================
   UPDATE APPLICATION STATUS
========================================= */

function updateApplicationStatus(
    applicationId,
    status
) {

    const application =
        applications.find(
            application =>
                application.id ===
                applicationId
        );


    if (!application) {
        return;
    }


    application.status =
        status;


    saveData();

    updateCompanyDashboard();

    updateDashboard();


    alert(
        `Application ${status.toLowerCase()}.`
    );

}


/* =========================================
   POST INTERNSHIP
========================================= */

document
    .getElementById(
        "internshipForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            if (
                currentUser.role !==
                "company"
            ) {

                alert(
                    "Only companies can post internships."
                );

                return;
            }


            const internship = {

                id: Date.now(),

                title:
                    document
                        .getElementById(
                            "internshipTitle"
                        )
                        .value
                        .trim(),

                company:
                    document
                        .getElementById(
                            "internshipCompany"
                        )
                        .value
                        .trim(),

                category:
                    document
                        .getElementById(
                            "internshipCategory"
                        )
                        .value,

                location:
                    document
                        .getElementById(
                            "internshipLocation"
                        )
                        .value
                        .trim(),

                duration:
                    document
                        .getElementById(
                            "internshipDuration"
                        )
                        .value
                        .trim(),

                stipend:
                    document
                        .getElementById(
                            "internshipStipend"
                        )
                        .value
                        .trim(),

                skills:
                    document
                        .getElementById(
                            "internshipSkills"
                        )
                        .value
                        .trim(),

                description:
                    document
                        .getElementById(
                            "internshipDescription"
                        )
                        .value
                        .trim(),

                postedBy:
                    currentUser.id

            };


            internships.push(
                internship
            );


            saveData();


            this.reset();


            displayInternships();

            updateCompanyDashboard();

            updateAdminDashboard();


            alert(
                "Internship posted successfully!"
            );

        }
    );


/* =========================================
   DELETE INTERNSHIP
========================================= */

function deleteInternship(id) {

    const internship =
        internships.find(
            internship =>
                internship.id === id
        );


    if (!internship) {
        return;
    }


    if (
        internship.postedBy !==
        currentUser.id
    ) {

        alert(
            "You can only delete your own internships."
        );

        return;
    }


    const confirmed =
        confirm(
            `Delete "${internship.title}"?`
        );


    if (!confirmed) {
        return;
    }


    internships =
        internships.filter(
            internship =>
                internship.id !== id
        );


    applications =
        applications.filter(
            application =>
                application.internshipId !==
                id
        );


    saveData();

    updateCompanyDashboard();

    updateAdminDashboard();

    displayInternships();

}


/* =========================================
   ADMIN DASHBOARD
========================================= */

function updateAdminDashboard() {

    if (
        !currentUser ||
        currentUser.role !==
            "admin"
    ) {

        return;
    }


    const students =
        users.filter(
            user =>
                user.role ===
                "student"
        );


    const companies =
        users.filter(
            user =>
                user.role ===
                "company"
        );


    document
        .getElementById(
            "studentCount"
        )
        .textContent =
        students.length;


    document
        .getElementById(
            "companyCount"
        )
        .textContent =
        companies.length;


    document
        .getElementById(
            "totalInternships"
        )
        .textContent =
        internships.length;


    document
        .getElementById(
            "totalApplications"
        )
        .textContent =
        applications.length;


    displayAdminInternships();

}


/* =========================================
   ADMIN INTERNSHIPS
========================================= */

function displayAdminInternships() {

    const container =
        document.getElementById(
            "adminInternships"
        );


    container.innerHTML = "";


    internships.forEach(
        internship => {

            const company =
                users.find(
                    user =>
                        user.id ===
                        internship.postedBy
                );


            const card =
                document.createElement(
                    "div"
                );

            card.className =
                "application-card";


            card.innerHTML = `

                <div class="application-info">

                    <h3>
                        ${internship.title}
                    </h3>

                    <p>
                        Company:
                        ${internship.company}
                    </p>

                    <p>
                        Category:
                        ${internship.category}
                    </p>

                    <p>
                        Location:
                        ${internship.location}
                    </p>

                </div>

                <button
                    class="delete-btn"
                    onclick="adminDeleteInternship(
                        ${internship.id}
                    )"
                >
                    Remove
                </button>

            `;


            container.appendChild(card);

        }
    );

}


/* =========================================
   ADMIN DELETE
========================================= */

function adminDeleteInternship(id) {

    if (
        currentUser.role !==
        "admin"
    ) {

        alert(
            "Admin access required."
        );

        return;
    }


    const confirmed =
        confirm(
            "Remove this internship?"
        );


    if (!confirmed) {
        return;
    }


    internships =
        internships.filter(
            internship =>
                internship.id !== id
        );


    applications =
        applications.filter(
            application =>
                application.internshipId !==
                id
        );


    saveData();

    displayInternships();

    updateAdminDashboard();

}


/* =========================================
   RESTORE SESSION
========================================= */

if (currentUser) {

    document
        .getElementById(
            "loginPage"
        )
        .classList.add("hidden");

    document
        .getElementById(
            "app"
        )
        .classList.remove("hidden");

    setupApplication();

}
