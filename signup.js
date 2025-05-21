 document.addEventListener('DOMContentLoaded', function() {
            const emailInput = document.getElementById('email');
            const passwordInput = document.getElementById('password');
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const emailError = document.getElementById('emailError');
            const passwordError = document.getElementById('passwordError');
            const confirmError = document.getElementById('confirmError');
            const successMessage = document.getElementById('successMessage');
            const form = document.getElementById('signupForm');
            
            // Helper function to validate email
            function isValidEmail(email) {
                return email.length > 3 && email.includes('@') && email.includes('.');
            }
            
            // Helper function to validate password
            function isValidPassword(password) {
                return password.length > 8;
            }
            
            // Function to check overall form validity
            function checkFormValidity() {
                const isEmailValid = isValidEmail(emailInput.value);
                const isPasswordValid = isValidPassword(passwordInput.value);
                const doPasswordsMatch = passwordInput.value === confirmPasswordInput.value;
                
                if (isEmailValid && isPasswordValid && doPasswordsMatch) {
                    successMessage.style.display = 'block';
                } else {
                    successMessage.style.display = 'none';
                }
            }
            
            // Email validation
            emailInput.addEventListener('input', function() {
                if (!isValidEmail(this.value)) {
                    emailError.style.display = 'block';
                    this.classList.add('input-error');
                } else {
                    emailError.style.display = 'none';
                    this.classList.remove('input-error');
                }
                checkFormValidity();
            });
            
            // Password validation
            passwordInput.addEventListener('input', function() {
                if (!isValidPassword(this.value)) {
                    passwordError.style.display = 'block';
                    this.classList.add('input-error');
                } else {
                    passwordError.style.display = 'none';
                    this.classList.remove('input-error');
                }
                
                // Check if passwords match when password is updated
                if (confirmPasswordInput.value && this.value !== confirmPasswordInput.value) {
                    confirmError.style.display = 'block';
                    confirmPasswordInput.classList.add('input-error');
                } else if (confirmPasswordInput.value) {
                    confirmError.style.display = 'none';
                    confirmPasswordInput.classList.remove('input-error');
                }
                
                checkFormValidity();
            });
            
            // Confirm password validation
            confirmPasswordInput.addEventListener('input', function() {
                if (this.value !== passwordInput.value) {
                    confirmError.style.display = 'block';
                    this.classList.add('input-error');
                } else {
                    confirmError.style.display = 'none';
                    this.classList.remove('input-error');
                }
                checkFormValidity();
            });
            
            // Form submission
            form.addEventListener('submit', function(event) {
                event.preventDefault();
                
                // Check if email and password are valid
                const isEmailValid = isValidEmail(emailInput.value);
                const isPasswordValid = isValidPassword(passwordInput.value);
                const doPasswordsMatch = passwordInput.value === confirmPasswordInput.value;
                
                if (isEmailValid && isPasswordValid && doPasswordsMatch) {
                    // Show confirmation dialog
                    const confirmSubmit = confirm("Are you sure you want to submit the form?");
                    
                    if (confirmSubmit) {
                        // User clicked OK
                        alert("Successful signup!");
                        // Reset form after successful submission
                        form.reset();
                        successMessage.style.display = 'none';
                    } else {
                        // User clicked Cancel - clear form
                        form.reset();
                        successMessage.style.display = 'none';
                        // Remove any error styling
                        emailInput.classList.remove('input-error');
                        passwordInput.classList.remove('input-error');
                        confirmPasswordInput.classList.remove('input-error');
                        emailError.style.display = 'none';
                        passwordError.style.display = 'none';
                        confirmError.style.display = 'none';
                    }
                } else {
                    // If form is invalid, show appropriate error messages
                    if (!isEmailValid) {
                        emailError.style.display = 'block';
                        emailInput.classList.add('input-error');
                    }
                    
                    if (!isPasswordValid) {
                        passwordError.style.display = 'block';
                        passwordInput.classList.add('input-error');
                    }
                    
                    if (!doPasswordsMatch) {
                        confirmError.style.display = 'block';
                        confirmPasswordInput.classList.add('input-error');
                    }
                }
            });
        });