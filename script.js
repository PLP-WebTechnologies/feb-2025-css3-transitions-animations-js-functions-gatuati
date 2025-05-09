document.addEventListener('DOMContentLoaded', function() {
    // DOM elements
    const savePrefsBtn = document.getElementById('save-prefs');
    const animateBtn = document.getElementById('animate-btn');
    const animatedElement = document.getElementById('animated-element');
    const animationStyleSelect = document.getElementById('animation-style');
    const themeSelect = document.getElementById('theme');
    
    // Load saved preferences
    loadPreferences();
    
    // Save preferences to localStorage
    savePrefsBtn.addEventListener('click', function() {
        const preferences = {
            animationStyle: animationStyleSelect.value,
            theme: themeSelect.value
        };
        
        localStorage.setItem('userPreferences', JSON.stringify(preferences));
        alert('Preferences saved!');
        
        // Apply theme immediately
        applyTheme(preferences.theme);
    });
    
    // Trigger animation
    animateBtn.addEventListener('click', function() {
        // Get current animation style (either from select or localStorage)
        const savedPrefs = JSON.parse(localStorage.getItem('userPreferences'));
        const animationStyle = savedPrefs?.animationStyle || animationStyleSelect.value;
        
        // Reset any existing animations
        animatedElement.className = 'box';
        void animatedElement.offsetWidth; // Trigger reflow
        
        // Apply the selected animation
        animatedElement.classList.add(animationStyle);
        
        // For non-looping animations, remove class after animation ends
        if (animationStyle !== 'pulse') {
            animatedElement.addEventListener('animationend', function() {
                animatedElement.classList.remove(animationStyle);
            }, { once: true });
        }
    });
    
    // Function to load and apply saved preferences
    function loadPreferences() {
        const savedPrefs = localStorage.getItem('userPreferences');
        
        if (savedPrefs) {
            const preferences = JSON.parse(savedPrefs);
            
            // Set dropdown values
            animationStyleSelect.value = preferences.animationStyle;
            themeSelect.value = preferences.theme;
            
            // Apply theme
            applyTheme(preferences.theme);
        }
    }
    
    // Function to apply theme
    function applyTheme(theme) {
        document.body.className = theme;
    }
    
    // Theme change handler (without saving)
    themeSelect.addEventListener('change', function() {
        applyTheme(this.value);
    });
});