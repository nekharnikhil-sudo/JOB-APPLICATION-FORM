document.getElementById('jobForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Form reload hone se rokta hai

    // Form values get karna
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('jobRole').value;
    const exp = document.getElementById('experience').value;
    const resumeFile = document.getElementById('resume').files[0].name;

    // Summary Card me Data add karna
    const summaryHtml = `
        <p><strong>आवेदक का नाम:</strong> ${name}</p>
        <p><strong>ईमेल:</strong> ${email}</p>
        <p><strong>फोन नंबर:</strong> ${phone}</p>
        <p><strong>पद (Job Role):</strong> ${role}</p>
        <p><strong>अनुभव:</strong> ${exp} Year(s)</p>
        <p><strong>रिज्यूमे फ़ाइल:</strong> ${resumeFile}</p>
    `;

    document.getElementById('summaryDetails').innerHTML = summaryHtml;

    // Form ko hide karna aur Confirmation Card dikhana
    document.getElementById('jobForm').classList.add('hidden');
    document.getElementById('confirmationCard').classList.remove('hidden');
});