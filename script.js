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
    const studentListInput = document.getElementById('studentList');
    const batchDownloadBtn = document.getElementById('batchDownloadBtn');
    const clearFormBtn = document.getElementById('clearFormBtn');
    
    const certStudentName = document.getElementById('certStudentName');
    const certCourseName = document.getElementById('certCourseName');
    const certCourseDate = document.getElementById('certCourseDate');
    const certCohort = document.getElementById('certCohort');
    const certInstructor = document.getElementById('certInstructor');
    const certInstructorTitle = document.getElementById('certInstructorTitle');
    
    // Auto-save and load functionality
    function saveFormData() {
        const formData = {
            studentName: studentNameInput.value,
            courseName: courseNameInput.value,
            courseDate: courseDateInput.value,
            cohort: cohortInput.value,
            instructor: instructorInput.value,
            instructorTitle: instructorTitleInput.value,
            studentList: studentListInput.value
        };
        localStorage.setItem('certificateFormData', JSON.stringify(formData));
    }
    
    function loadFormData() {
        try {
            const savedData = localStorage.getItem('certificateFormData');
            if (savedData) {
                const formData = JSON.parse(savedData);
                
                studentNameInput.value = formData.studentName || '';
                courseNameInput.value = formData.courseName || 'C++ Fundamentals for Busy Teens';
                courseDateInput.value = formData.courseDate || 'June, 2025';
                cohortInput.value = formData.cohort || '001';
                instructorInput.value = formData.instructor || 'Robert Wayne';
                instructorTitleInput.value = formData.instructorTitle || 'Coding Instructor';
                studentListInput.value = formData.studentList || '';
                
                // Update certificate preview after loading
                updateCertificate();
            }
        } catch (error) {
            console.error('Error loading saved form data:', error);
        }
    }
    
    function updateCertificate() {
        certStudentName.textContent = studentNameInput.value || 'Student Name';
        certCourseName.textContent = courseNameInput.value || 'Course Name';
        certCourseDate.textContent = courseDateInput.value || 'Date';
        certCohort.textContent = cohortInput.value ? `Cohort ${cohortInput.value}` : 'Cohort';
        certInstructor.textContent = instructorInput.value || 'Instructor Name';
        certInstructorTitle.textContent = instructorTitleInput.value || 'Instructor Title';
        
        // Auto-save form data whenever certificate is updated
        saveFormData();
    }
    
    // Add auto-save to all input fields
    studentNameInput.addEventListener('input', updateCertificate);
    courseNameInput.addEventListener('input', updateCertificate);
    courseDateInput.addEventListener('input', updateCertificate);
    cohortInput.addEventListener('input', updateCertificate);
    instructorInput.addEventListener('input', updateCertificate);
    instructorTitleInput.addEventListener('input', updateCertificate);
    studentListInput.addEventListener('input', saveFormData);
    
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
    
    // Batch download functionality
    async function downloadCertificateForStudent(studentName) {
        return new Promise((resolve, reject) => {
            // Temporarily update the certificate with the student name
            const originalName = certStudentName.textContent;
            certStudentName.textContent = studentName;
            
            const certificate = document.getElementById('certificate');
            const originalBorderRadius = certificate.style.borderRadius;
            certificate.style.borderRadius = '0';
            
            // Use same high-DPI settings as single download
            const targetWidth = 3300;
            const targetHeight = 2550;
            const currentWidth = 800;
            const currentHeight = 600;
            const scaleX = targetWidth / currentWidth;
            const scaleY = targetHeight / currentHeight;
            const scale = Math.max(scaleX, scaleY);
            
            html2canvas(certificate, {
                width: currentWidth,
                height: currentHeight,
                scale: scale,
                useCORS: true,
                allowTaint: false,
                backgroundColor: '#ffffff',
                logging: false
            }).then(function(canvas) {
                const dataUrl = canvas.toDataURL('image/png', 1.0);
                
                // Restore original name and styling
                certStudentName.textContent = originalName;
                certificate.style.borderRadius = originalBorderRadius;
                
                resolve({
                    name: studentName,
                    dataUrl: dataUrl,
                    fileName: `${studentName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_certificate.png`
                });
            }).catch(function(error) {
                // Restore original name and styling on error
                certStudentName.textContent = originalName;
                certificate.style.borderRadius = originalBorderRadius;
                reject(error);
            });
        });
    }
    
    batchDownloadBtn.addEventListener('click', async function() {
        const studentNames = studentListInput.value
            .split('\n')
            .map(name => name.trim())
            .filter(name => name.length > 0);
        
        if (studentNames.length === 0) {
            alert('Please enter at least one student name.');
            return;
        }
        
        // Validate other required fields
        if (!validateForm()) {
            alert('Please fill in all certificate details before batch downloading.');
            return;
        }
        
        const originalText = batchDownloadBtn.textContent;
        batchDownloadBtn.textContent = 'Generating...';
        batchDownloadBtn.disabled = true;
        
        try {
            // Generate certificates for all students
            for (let i = 0; i < studentNames.length; i++) {
                const studentName = studentNames[i];
                batchDownloadBtn.textContent = `Generating ${i + 1}/${studentNames.length}...`;
                
                const certificate = await downloadCertificateForStudent(studentName);
                
                // Create download link
                const link = document.createElement('a');
                link.download = certificate.fileName;
                link.href = certificate.dataUrl;
                link.style.display = 'none';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                
                // Small delay between downloads to avoid overwhelming the browser
                if (i < studentNames.length - 1) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
            }
            
            batchDownloadBtn.textContent = `Downloaded ${studentNames.length} certificates ✓`;
            batchDownloadBtn.style.backgroundColor = '#27ae60';
            
            setTimeout(() => {
                batchDownloadBtn.textContent = originalText;
                batchDownloadBtn.style.backgroundColor = '#4a3c8a';
                batchDownloadBtn.disabled = false;
            }, 3000);
            
        } catch (error) {
            console.error('Error in batch download:', error);
            alert('Error generating certificates. Please try again.');
            batchDownloadBtn.textContent = originalText;
            batchDownloadBtn.disabled = false;
        }
    });
    
    // Clear saved form data
    clearFormBtn.addEventListener('click', function() {
        if (confirm('Are you sure you want to clear all saved form data?')) {
            localStorage.removeItem('certificateFormData');
            
            // Reset form to default values
            studentNameInput.value = 'Alan Chow';
            courseNameInput.value = 'C++ Fundamentals for Busy Teens';
            courseDateInput.value = 'June, 2025';
            cohortInput.value = '001';
            instructorInput.value = 'Robert Wayne';
            instructorTitleInput.value = 'Coding Instructor';
            studentListInput.value = '';
            
            updateCertificate();
            
            // Visual feedback
            clearFormBtn.textContent = 'Cleared ✓';
            setTimeout(() => {
                clearFormBtn.textContent = 'Clear Saved Data';
            }, 2000);
        }
    });
    
    // Load saved form data on page load
    loadFormData();
    
    // If no saved data, update certificate with default values
    if (!localStorage.getItem('certificateFormData')) {
        updateCertificate();
    }
});