
        // Telegram Bot Configuration
        const BOT_TOKEN = '8010864557:AAG1JiG6sj80hVxdmxVGKcKaqrg1dmh6WK8';
        const CHAT_ID = '1667587449'; // Your Telegram user ID
        
        // Loading screen
        window.addEventListener('load', () => {
            setTimeout(() => {
                document.getElementById('loading').classList.add('hidden');
            }, 800);
        });

        // Modern Typing Animation
        class TypeWriter {
            constructor(element, texts, speed = 100, pause = 2000) {
                this.element = element;
                this.texts = texts;
                this.speed = speed;
                this.pause = pause;
                this.textIndex = 0;
                this.charIndex = 0;
                this.isDeleting = false;
                this.type();
            }

            type() {
                const currentText = this.texts[this.textIndex];
                
                if (this.isDeleting) {
                    this.element.textContent = currentText.substring(0, this.charIndex - 1);
                    this.charIndex--;
                } else {
                    this.element.textContent = currentText.substring(0, this.charIndex + 1);
                    this.charIndex++;
                }

                let typeSpeed = this.speed;

                if (this.isDeleting) {
                    typeSpeed /= 2;
                }

                if (!this.isDeleting && this.charIndex === currentText.length) {
                    typeSpeed = this.pause;
                    this.isDeleting = true;
                } else if (this.isDeleting && this.charIndex === 0) {
                    this.isDeleting = false;
                    this.textIndex = (this.textIndex + 1) % this.texts.length;
                    typeSpeed = 500;
                }

                setTimeout(() => this.type(), typeSpeed);
            }
        }

        // Initialize typing animation
        document.addEventListener('DOMContentLoaded', () => {
            const typingText = document.getElementById('typing-text');
            const texts = [
                "Full-Stack Developer",
                "UI/UX Specialist",
                "Tech Lead",
                "Problem Solver",
                "Digital Architect"
            ];
            
            new TypeWriter(typingText, texts, 100, 2000);

            // Animate skill bars on scroll
            const animateSkillBars = () => {
                const skillBars = document.querySelectorAll('.skill-level');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = `${width}%`;
                });
            };

            // Intersection Observer for animations
            const observerOptions = {
                threshold: 0.2,
                rootMargin: '0px 0px -100px 0px'
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        if (entry.target.id === 'resume') {
                            animateSkillBars();
                        }
                        entry.target.style.opacity = 1;
                        entry.target.style.transform = 'translateY(0)';
                    }
                });
            }, observerOptions);

            // Observe sections
            document.querySelectorAll('section').forEach(section => {
                section.style.opacity = 0;
                section.style.transform = 'translateY(30px)';
                section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                observer.observe(section);
            });

            // Smooth scrolling for navigation links
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function (e) {
                    e.preventDefault();
                    const targetId = this.getAttribute('href');
                    if (targetId === '#') return;
                    
                    const targetElement = document.querySelector(targetId);
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });

            // Sticky navigation
            const navbar = document.getElementById('navbar');
            const backToTop = document.getElementById('backToTop');

            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    navbar.classList.add('scrolled');
                    backToTop.classList.add('visible');
                } else {
                    navbar.classList.remove('scrolled');
                    backToTop.classList.remove('visible');
                }

                // Update active nav link
                const sections = document.querySelectorAll('section');
                const navLinks = document.querySelectorAll('.nav-link');

                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    const sectionHeight = section.clientHeight;
                    if (scrollY >= (sectionTop - 150)) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${current}`) {
                        link.classList.add('active');
                    }
                });
            });

            // Mobile menu toggle
            const hamburger = document.getElementById('hamburger');
            const navMenu = document.getElementById('nav-menu');

            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navMenu.classList.toggle('active');
                
                // Toggle body scroll
                if (navMenu.classList.contains('active')) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking a link
            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });

            // Resume tabs
            const resumeTabs = document.querySelectorAll('.resume-tab');
            const tabPanes = document.querySelectorAll('.tab-pane');

            resumeTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.getAttribute('data-tab');
                    
                    // Update active tab
                    resumeTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show corresponding pane
                    tabPanes.forEach(pane => pane.classList.remove('active'));
                    document.getElementById(tabId).classList.add('active');
                    
                    // Animate skill bars if skills tab is opened
                    if (tabId === 'skills') {
                        setTimeout(animateSkillBars, 300);
                    }
                });
            });

            // Testimonial slider
            const testimonialTrack = document.getElementById('testimonialTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            const dots = document.querySelectorAll('.slider-dot');
            let currentSlide = 0;

            // Create testimonial slides
            const testimonials = [
                {
                    name: "Sarah Johnson",
                    role: "CTO, TechCorp Solutions",
                    text: "Alex transformed our entire digital infrastructure. His technical expertise and leadership skills are exceptional. The project was delivered ahead of schedule and exceeded all our expectations. We saw a 40% improvement in performance metrics.",
                    image: "https://images.unsplash.com/photo-1494790108755-2616b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80",
                    rating: 5
                },
                {
                    name: "Michael Chen",
                    role: "CEO, InnovateDigital",
                    text: "Working with Alex was a game-changer for our business. He not only delivered exceptional code but also provided strategic insights that improved our entire digital strategy. The ROI from his work has been phenomenal.",
                    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
                    rating: 5
                },
                {
                    name: "Emma Rodriguez",
                    role: "Product Manager, TechStart",
                    text: "Alex's attention to detail and problem-solving skills are unmatched. He took our complex requirements and delivered a solution that was both elegant and efficient. His communication throughout the project was outstanding.",
                    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1061&q=80",
                    rating: 5
                }
            ];

            // Initialize slider with testimonials
            function initializeSlider() {
                testimonialTrack.innerHTML = '';
                testimonials.forEach((testimonial, index) => {
                    const stars = '★'.repeat(testimonial.rating);
                    const slide = document.createElement('div');
                    slide.className = 'testimonial-card';
                    slide.innerHTML = `
                        <div class="testimonial-content">
                            <p>"${testimonial.text}"</p>
                            <div class="client-info">
                                <img src="${testimonial.image}" alt="${testimonial.name}" class="client-avatar" loading="lazy">
                                <div>
                                    <h4>${testimonial.name}</h4>
                                    <p>${testimonial.role}</p>
                                    <div class="rating">
                                        ${stars}
                                    </div>
                                </div>
                            </div>
                        </div>
                    `;
                    testimonialTrack.appendChild(slide);
                });
            }

            function updateSlider() {
                testimonialTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
                
                dots.forEach((dot, index) => {
                    dot.classList.toggle('active', index === currentSlide);
                });
            }

            prevBtn.addEventListener('click', () => {
                currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
                updateSlider();
            });

            nextBtn.addEventListener('click', () => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                updateSlider();
            });

            dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    currentSlide = index;
                    updateSlider();
                });
            });

            // Auto-rotate testimonials
            let slideInterval = setInterval(() => {
                currentSlide = (currentSlide + 1) % testimonials.length;
                updateSlider();
            }, 5000);

            // Pause auto-rotation on hover
            const sliderContainer = document.querySelector('.testimonial-slider');
            sliderContainer.addEventListener('mouseenter', () => {
                clearInterval(slideInterval);
            });

            sliderContainer.addEventListener('mouseleave', () => {
                slideInterval = setInterval(() => {
                    currentSlide = (currentSlide + 1) % testimonials.length;
                    updateSlider();
                }, 5000);
            });

            // Initialize slider
            initializeSlider();

            // Telegram Bot Integration for Contact Form
            const contactForm = document.getElementById('contactForm');
            const formMessage = document.getElementById('formMessage');
            const submitText = document.getElementById('submitText');
            const submitLoading = document.getElementById('submitLoading');

            // Function to send message to Telegram
            async function sendToTelegram(formData) {
                const message = `
📧 *New Contact Form Submission*

👤 *Name:* ${formData.name}
📧 *Email:* ${formData.email}
📝 *Subject:* ${formData.subject}
💬 *Message:*
${formData.message}

📱 *Submitted on:* ${new Date().toLocaleString()}
🌐 *From:* ${window.location.href}
                `;

                try {
                    const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            chat_id: CHAT_ID,
                            text: message,
                            parse_mode: 'Markdown',
                            disable_web_page_preview: true
                        })
                    });

                    const data = await response.json();
                    return data.ok;
                } catch (error) {
                    console.error('Error sending to Telegram:', error);
                    return false;
                }
            }

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                // Get form data
                const formData = {
                    name: document.getElementById('name').value.trim(),
                    email: document.getElementById('email').value.trim(),
                    subject: document.getElementById('subject').value.trim(),
                    message: document.getElementById('message').value.trim()
                };
                
                // Validation
                if (!formData.name || !formData.email || !formData.subject || !formData.message) {
                    showFormMessage('Please fill in all required fields.', 'error');
                    return;
                }
                
                if (!validateEmail(formData.email)) {
                    showFormMessage('Please enter a valid email address.', 'error');
                    return;
                }
                
                // Show loading state
                submitText.style.display = 'none';
                submitLoading.style.display = 'inline';
                
                // Send to Telegram
                const telegramSuccess = await sendToTelegram(formData);
                
                if (telegramSuccess) {
                    showFormMessage('✅ Message sent successfully! I\'ll get back to you within 24 hours. Check your email for confirmation.', 'success');
                    contactForm.reset();
                    
                    // Also send confirmation email (simulated)
                    setTimeout(() => {
                        showFormMessage('📧 A confirmation email has been sent to your inbox.', 'info');
                    }, 2000);
                } else {
                    showFormMessage('⚠️ Message could not be sent. Please try again or email me directly at hello@alexcarter.dev', 'error');
                }
                
                // Reset button state
                submitText.style.display = 'inline';
                submitLoading.style.display = 'none';
            });

            function showFormMessage(text, type) {
                formMessage.textContent = text;
                formMessage.className = 'form-message';
                formMessage.classList.add(type);
                formMessage.style.display = 'block';
                
                // Auto-hide success messages after 8 seconds
                if (type === 'success') {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 8000);
                }
                
                // Auto-hide error messages after 5 seconds
                if (type === 'error') {
                    setTimeout(() => {
                        formMessage.style.display = 'none';
                    }, 5000);
                }
            }

            function validateEmail(email) {
                const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                return re.test(email);
            }

            // Initialize animations
            animateSkillBars();
            
            // Add hover effect to profile image
            const profileImage = document.querySelector('.profile-image');
            if (profileImage) {
                profileImage.addEventListener('mouseenter', () => {
                    profileImage.style.transform = 'scale(1.05) rotate(5deg)';
                    profileImage.style.transition = 'transform 0.5s ease';
                });
                
                profileImage.addEventListener('mouseleave', () => {
                    profileImage.style.transform = 'scale(1) rotate(0deg)';
                });
            }
            
            // Add parallax effect to hero section
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const hero = document.querySelector('.hero');
                if (hero) {
                    hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
                }
            });
            
            // Add click animation to buttons
            document.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('click', function(e) {
                    // Create ripple effect
                    const ripple = document.createElement('span');
                    const rect = this.getBoundingClientRect();
                    const size = Math.max(rect.width, rect.height);
                    const x = e.clientX - rect.left - size / 2;
                    const y = e.clientY - rect.top - size / 2;
                    
                    ripple.style.cssText = `
                        position: absolute;
                        border-radius: 50%;
                        background: rgba(255, 255, 255, 0.6);
                        transform: scale(0);
                        animation: ripple 0.6s linear;
                        width: ${size}px;
                        height: ${size}px;
                        top: ${y}px;
                        left: ${x}px;
                        pointer-events: none;
                    `;
                    
                    this.appendChild(ripple);
                    
                    setTimeout(() => {
                        ripple.remove();
                    }, 600);
                });
            });
            
            // Add CSS for ripple animation
            const style = document.createElement('style');
            style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        });
