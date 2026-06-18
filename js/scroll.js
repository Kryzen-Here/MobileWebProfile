// ===== SCROLL SYSTEM =====
const ScrollSystem = (function() {
    let scrollContainer;
    let sections;
    let navBtns;
    let floatingCore;
    let currentSection = 0;
    let isHeroVisible = true;

    function init() {
        scrollContainer = document.getElementById('scroll-container');
        sections = document.querySelectorAll('.snap-section');
        navBtns = document.querySelectorAll('.nav-btn');
        floatingCore = document.getElementById('floating-core');

        if (!scrollContainer) return;

        scrollContainer.addEventListener('scroll', onScroll, { passive: true });

        // Nav button clicks
        navBtns.forEach(function(btn) {
            btn.addEventListener('click', function() {
                var targetId = btn.getAttribute('data-target');
                navigateTo(targetId);
                pulseNav(btn);
            });
        });

        // Initial state
        sections.forEach(function(s, i) {
            if (i === 0) s.classList.add('section-active');
        });

        // Observe sections for reveal
        observeSections();
    }

    function onScroll() {
        var scrollTop = scrollContainer.scrollTop;
        var vh = window.innerHeight;

        // Determine current section
        sections.forEach(function(section, index) {
            var rect = section.getBoundingClientRect();
            var sectionTop = section.offsetTop - scrollContainer.offsetTop;
            
            if (scrollTop >= sectionTop - vh / 2 && scrollTop < sectionTop + section.offsetHeight - vh / 2) {
                currentSection = index;
                section.classList.add('section-active');
            } else {
                section.classList.remove('section-active');
            }
        });

        // Update nav buttons
        updateNav();

        // Floating core logic
        if (scrollTop > vh * 0.5) {
            if (isHeroVisible) {
                isHeroVisible = false;
                floatingCore.classList.remove('hidden');
            }
        } else {
            if (!isHeroVisible) {
                isHeroVisible = true;
                floatingCore.classList.add('hidden');
            }
        }

        // Reveal timeline items
        revealTimelineItems();
        
        // Reveal terminal lines
        revealTerminal();
    }

    function navigateTo(targetId) {
        var target;
        switch(targetId) {
            case 'hero': target = document.getElementById('hero'); break;
            case 'skills': target = document.getElementById('skills'); break;
            case 'projects': target = document.getElementById('projects'); break;
            case 'contact': target = document.getElementById('contact'); break;
            default: return;
        }
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    function updateNav() {
        var sectionMap = {
            0: 'hero',
            1: 'hero',
            2: 'skills',
            3: 'skills',
            4: 'projects',
            5: 'projects',
            6: 'contact'
        };

        var sectionIds = [];
        sections.forEach(function(s) { sectionIds.push(s.id); });

        var activeTarget = sectionIds[currentSection] || 'hero';

        // Map section ids to nav targets
        var navMap = {
            'hero': 'hero',
            'about': 'hero',
            'skills': 'skills',
            'arsenal': 'skills',
            'projects': 'projects',
            'shrine': 'projects',
            'contact': 'contact'
        };

        var mapped = navMap[activeTarget] || 'hero';

        navBtns.forEach(function(btn) {
            if (btn.getAttribute('data-target') === mapped) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    function pulseNav(btn) {
        btn.style.transform = 'scale(1.3)';
        setTimeout(function() {
            btn.style.transform = '';
        }, 200);
    }

    function revealTimelineItems() {
        var items = document.querySelectorAll('.timeline-item');
        items.forEach(function(item) {
            var rect = item.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                item.classList.add('visible');
            }
        });
    }

    function revealTerminal() {
        var terminalCard = document.getElementById('terminal-card');
        if (!terminalCard) return;
        var rect = terminalCard.getBoundingClientRect();
        if (rect.top < window.innerHeight * 0.8) {
            var lines = terminalCard.querySelectorAll('.terminal-line');
            lines.forEach(function(line, i) {
                setTimeout(function() {
                    line.classList.add('visible');
                }, parseInt(line.getAttribute('data-delay')) || i * 200);
            });
        }
    }

    function observeSections() {
        if ('IntersectionObserver' in window) {
            var observer = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-active');
                    }
                });
            }, { threshold: 0.3 });

            sections.forEach(function(section) {
                observer.observe(section);
            });
        }
    }

    return {
        init: init,
        navigateTo: navigateTo
    };
})();
