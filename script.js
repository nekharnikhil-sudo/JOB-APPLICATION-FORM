document.getElementById('jobForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Form reload hone se rokta hai

    const submitBtn = document.querySelector('.submit-btn');
    if (submitBtn) {
        submitBtn.innerText = 'सबमिट हो रहा है...';
        submitBtn.disabled = true;
    }

    // Form values get karna
    const name = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const role = document.getElementById('jobRole').value;
    const exp = document.getElementById('experience').value;
    
    // Cover Letter aur Resume safety check
    const coverLetterInput = document.getElementById('coverLetter');
    const coverLetter = coverLetterInput ? (coverLetterInput.value || 'कोई कवर लेटर नहीं') : 'N/A';

    const resumeInput = document.getElementById('resume');
    const resumeFile = (resumeInput && resumeInput.files.length > 0) ? resumeInput.files[0].name : 'कोई फाइल नहीं';
    const currentDate = new Date().toLocaleString('hi-IN');

    // 1. Google Sheet (SheetDB) ke liye data prepare karna
    const sheetData = {
        data: [
            {
                'Name': name,
                'Email': email,
                'Phone': phone,
                'Role': role,
                'Experience': exp,
                'Resume': resumeFile,
                'CoverLetter': coverLetter,
                'Date': currentDate
            }
        ]
    };

    // 2. SheetDB API par data bhejna (Aapka API Link)
    try {
        const response = await fetch('https://sheetdb.io/api/v1/epzvuk95irslu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(sheetData)
        });

        if (!response.ok) {
            console.error('SheetDB par data save hone me dikkat aayi.');
        }
    } catch (error) {
        console.error('Error:', error);
    }

    // 3. Summary Card me Data add karna
    const summaryHtml = `
        <p><strong>आवेदक का नाम:</strong> ${name}</p>
        <p><strong>ईमेल:</strong> ${email}</p>
        <p><strong>फोन नंबर:</strong> ${phone}</p>
        <p><strong>पद (Job Role):</strong> ${role}</p>
        <p><strong>अनुभव:</strong> ${exp} Year(s)</p>
        <p><strong>रिज्यूमे फ़ाइल:</strong> ${resumeFile}</p>
        <p><strong>कवर लेटर:</strong> ${coverLetter}</p>
    `;

    document.getElementById('summaryDetails').innerHTML = summaryHtml;

    // 4. Form ko hide karna aur Confirmation Card dikhana
    document.getElementById('jobForm').classList.add('hidden');
    document.getElementById('confirmationCard').classList.remove('hidden');
});