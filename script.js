document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('certificateForm');
    const generateBtn = document.getElementById('generateBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    const studentNameInput = document.getElementById('studentName');
    const courseNameInput = document.getElementById('courseName');
    const courseDateInput = document.getElementById('courseDate');
    const cohortInput = document.getElementById('cohort');
    const instructorInput = document.getElementById('instructor');
    const instructorTitleInput = document.getElementById('instructorTitle');
    
    const certStudentName = document.getElementById('certStudentName');
    const certCourseName = document.getElementById('certCourseName');
    const certCourseDate = document.getElementById('certCourseDate');
    const certCohort = document.getElementById('certCohort');
    const certInstructor = document.getElementById('certInstructor');
    const certInstructorTitle = document.getElementById('certInstructorTitle');
    
    function updateCertificate() {
        certStudentName.textContent = studentNameInput.value || 'Student Name';
        certCourseName.textContent = courseNameInput.value || 'Course Name';
        certCourseDate.textContent = courseDateInput.value || 'Date';
        certCohort.textContent = cohortInput.value ? `Cohort ${cohortInput.value}` : 'Cohort';
        certInstructor.textContent = instructorInput.value || 'Instructor Name';
        certInstructorTitle.textContent = instructorTitleInput.value || 'Instructor Title';
    }
    
    studentNameInput.addEventListener('input', updateCertificate);
    courseNameInput.addEventListener('input', updateCertificate);
    courseDateInput.addEventListener('input', updateCertificate);
    cohortInput.addEventListener('input', updateCertificate);
    instructorInput.addEventListener('input', updateCertificate);
    instructorTitleInput.addEventListener('input', updateCertificate);
    
    function validateForm() {
        const inputs = [studentNameInput, courseNameInput, courseDateInput, cohortInput, instructorInput, instructorTitleInput];
        let isValid = true;
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
            } else {
                input.style.borderColor = '#ddd';
            }
        });
        
        return isValid;
    }
    
    generateBtn.addEventListener('click', function() {
        if (validateForm()) {
            updateCertificate();
            generateBtn.textContent = 'Certificate Generated ✓';
            generateBtn.style.backgroundColor = '#27ae60';
            setTimeout(() => {
                generateBtn.textContent = 'Generate Certificate';
                generateBtn.style.backgroundColor = '#4a3c8a';
            }, 2000);
        } else {
            alert('Please fill in all required fields.');
        }
    });
    
    downloadBtn.addEventListener('click', function() {
        if (!validateForm()) {
            alert('Please fill in all required fields before downloading.');
            return;
        }
        
        const certificate = document.getElementById('certificate');
        const originalText = downloadBtn.textContent;
        
        downloadBtn.textContent = 'Generating...';
        downloadBtn.disabled = true;
        
        // Letter size landscape at 300 DPI: 11" x 8.5" = 3300px x 2550px
        // Keep original design proportions but scale up for high DPI
        const targetWidth = 3300;
        const targetHeight = 2550;
        const currentWidth = 800;
        const currentHeight = 600;
        
        // Calculate how much we need to scale to reach target dimensions
        const scaleX = targetWidth / currentWidth;  // 4.125
        const scaleY = targetHeight / currentHeight; // 4.25
        
        // Use the larger scale to ensure we fill the target area
        const scale = Math.max(scaleX, scaleY);
        
        // Temporarily remove rounded corners for printing
        const originalBorderRadius = certificate.style.borderRadius;
        certificate.style.borderRadius = '0';
        
        html2canvas(certificate, {
            width: currentWidth,
            height: currentHeight,
            scale: scale,
            useCORS: true,
            allowTaint: false,
            backgroundColor: '#ffffff',
            logging: false
        }).then(function(canvas) {
            const link = document.createElement('a');
            const fileName = `${studentNameInput.value.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate.png`;
            link.download = fileName;
            link.href = canvas.toDataURL('image/png', 1.0);
            link.click();
            
            // Restore rounded corners
            certificate.style.borderRadius = originalBorderRadius;
            
            downloadBtn.textContent = 'Downloaded ✓';
            downloadBtn.style.backgroundColor = '#27ae60';
            setTimeout(() => {
                downloadBtn.textContent = originalText;
                downloadBtn.style.backgroundColor = '#4a3c8a';
                downloadBtn.disabled = false;
            }, 2000);
        }).catch(function(error) {
            console.error('Error generating certificate:', error);
            
            // Restore rounded corners on error too
            certificate.style.borderRadius = originalBorderRadius;
            
            alert('Error generating high-DPI certificate. Please try again.');
            downloadBtn.textContent = originalText;
            downloadBtn.disabled = false;
        });
    });
    
    updateCertificate();
});