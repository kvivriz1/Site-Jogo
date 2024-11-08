
        // Initialize variables
        let sidebarOpen = false;
        let currentUsername = 'User';
        let currentTheme = 'dark';
        let currentLanguage = 'pt';

        // Core functions that need to be available immediately
        function toggleSidebar() {
            const sidebar = document.getElementById("sidebar");
            const main = document.getElementById("main");
            if (!sidebarOpen) {
                sidebar.style.width = "250px";
                main.style.marginLeft = "250px";
                sidebar.classList.add('open');
            } else {
                sidebar.style.width = "0";
                main.style.marginLeft = "50px";
                sidebar.classList.remove('open');
            }
            sidebarOpen = !sidebarOpen;
        }

        function showSection(sectionName) {
            const targetSection = document.getElementById(sectionName + '-section');
            if (targetSection) {
                document.querySelectorAll('.section').forEach(section => {
                    section.classList.remove('active');
                });
                targetSection.classList.add('active');
                if (window.innerWidth <= 600) {
                    toggleSidebar();
                }
            } else {
                console.warn(`Section "${sectionName}" not found`);
            }
        }

        function toggleAuthForm(formType) {
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');
            const buttons = document.querySelectorAll('.auth-toggle');
            buttons.forEach(btn => btn.classList.remove('active'));
            if (formType === 'login') {
                if (loginForm) {
                    loginForm.style.display = 'block';
                }
                if (registerForm) {
                    registerForm.style.display = 'none';
                }
                buttons[0].classList.add('active');
            } else {
                if (loginForm) {
                    loginForm.style.display = 'none';
                }
                if (registerForm) {
                    registerForm.style.display = 'block';
                }
                buttons[1].classList.add('active');
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            // Add null check for chat form
            const chatForm = document.getElementById('chatForm');
            if (chatForm) {
                chatForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const input = document.getElementById('messageInput');
                    if (input) {
                        const message = input.value.trim();
                        if (message) {
                            addMessage(message);
                            input.value = '';
                        }
                    }
                });
            }

            // Add null checks for forms
            const loginForm = document.getElementById('login-form');
            const registerForm = document.getElementById('register-form');

            if (loginForm) {
                loginForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    this.reset();
                });
            }

            if (registerForm) {
                registerForm.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const username = document.getElementById('register-username').value.trim();
                    const password = this.querySelectorAll('input[type="password"]')[0].value;
                    const confirmPassword = this.querySelectorAll('input[type="password"]')[1].value;
                    if (password !== confirmPassword) {
                        alert('Passwords do not match!');
                        return;
                    }
                    if (username) {
                        updateUsernameDisplay(username);
                    }
                    this.reset();
                });
            }

            // Add null checks for pagination
            const paginationButtons = document.querySelectorAll('.pagination button');
            if (paginationButtons) {
                paginationButtons.forEach(button => {
                    button.addEventListener('click', function () {
                        // Add pagination logic here
                    });
                });
            }

            // Add null check for language change
            if (typeof changeLanguage === 'function') {
                changeLanguage('pt');
            }

            // Add null check for profile menu click handler
            const profileContainer = document.querySelector('.profile-container');
            if (profileContainer) {
                document.addEventListener('click', function (event) {
                    const profileMenu = document.getElementById('profileMenu');
                    if (profileMenu && !profileContainer.contains(event.target)) {
                        profileMenu.classList.remove('active');
                    }
                });
            }
        });

        function updateUsernameDisplay(username) {
            const profileName = document.querySelector('.profile-name');
            if (profileName) {
                profileName.textContent = username;
                currentUsername = username;
            }
        }

        function addMessage(message, user = currentUsername) {
            const chatBox = document.getElementById('chatBox');
            if (chatBox) {
                const messageElement = document.createElement('div');
                messageElement.className = 'chat-message';
                messageElement.textContent = `${user}: ${message}`;
                chatBox.appendChild(messageElement);
                chatBox.scrollTop = chatBox.scrollHeight;
            }
        }

        function toggleProfileMenu() {
            const menu = document.getElementById('profileMenu');
            if (menu) {
                menu.classList.toggle('active');
            }
        }

        function editBio() {
            const bioText = document.getElementById('bioText');
            if (bioText) {
                const currentBio = bioText.textContent;
                const newBio = prompt('Edit your bio:', currentBio);
                if (newBio !== null) {
                    bioText.textContent = newBio;
                }
            }
        }

        function editUsername() {
            const newUsername = prompt('Enter new username:', currentUsername);
            if (newUsername && newUsername.trim()) {
                updateUsernameDisplay(newUsername.trim());
            }
        }

        function signOut() {
            updateUsernameDisplay('User');
        }

        function toggleTheme() {
            const body = document.body;
            const themeText = document.querySelector('.theme-text');
            if (currentTheme === 'dark') {
                body.classList.add('light-theme');
                currentTheme = 'light';
                themeText.textContent = translations[currentLanguage].themeLight;
            } else {
                body.classList.remove('light-theme');
                currentTheme = 'dark';
                themeText.textContent = translations[currentLanguage].theme;
            }
        }

        function changeLanguage(lang) {
            currentLanguage = lang;
            const elements = document.querySelectorAll('[data-translate]');
            elements.forEach(element => {
                const key = element.getAttribute('data-translate');
                if (translations[lang][key]) {
                    element.textContent = translations[lang][key];
                }
            });
            const themeText = document.querySelector('.theme-text');
            themeText.textContent = currentTheme === 'dark' ? translations[lang].theme : translations[lang].themeLight;
        }

        const translations = {
            pt: {
                home: 'Início',
                download: 'Download',
                forum: 'Fórum',
                shop: 'Loja',
                donate: 'Doar',
                login: 'Entrar/Registrar',
                profile: 'Perfil',
                settings: 'Configurações',
                theme: 'Tema Claro',
                themeLight: 'Tema Escuro'
            },
            en: {
                home: 'Home',
                download: 'Download',
                forum: 'Forum',
                shop: 'Shop',
                donate: 'Donate',
                login: 'Login/Register',
                profile: 'Profile',
                settings: 'Settings',
                theme: 'Light Theme',
                themeLight: 'Dark Theme'
            }
        };

        // Add this to the existing JavaScript
        function toggleSupportChat() {
            const bat = document.querySelector('.support-bat');
            const chat = document.querySelector('.support-chat');

            bat.classList.toggle('landed');

            // Toggle chat visibility when bat is clicked
            if (chat.style.display === 'none' || !chat.style.display) {
                chat.style.display = 'block';
            } else {
                chat.style.display = 'none';
            }
        }

        function handleSupportChat(event) {
            event.preventDefault();
            const input = event.target.querySelector('input');
            const message = input.value.trim();
            if (message) {
                // Handle support message here
                input.value = '';
            }
        }