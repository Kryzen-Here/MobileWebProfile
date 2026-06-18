// ===== MAIN APPLICATION =====
(function() {
    'use strict';

    // ===== LOADING SCREEN =====
    function initLoader() {
        var loadingScreen = document.getElementById('loading-screen');
        var loaderBar = loadingScreen.querySelector('.loader-bar');
        var percentage = loadingScreen.querySelector('.loader-percentage');
        var progress = 0;
        var duration = 2000;
        var startTime = Date.now();

        function updateLoader() {
            var elapsed = Date.now() - startTime;
            progress = Math.min((elapsed / duration) * 100, 100);
            loaderBar.style.width = progress + '%';
            percentage.textContent = Math.floor(progress) + '%';

            if (progress < 100) {
                requestAnimationFrame(updateLoader);
            } else {
                setTimeout(function() {
                    loadingScreen.classList.add('hidden');
                    document.body.classList.add('load-flash');
                    initApp();
                }, 200);
            }
        }

        requestAnimationFrame(updateLoader);
    }

    // ===== MAIN INIT =====
    function initApp() {
        ParticleSystem.init();
        ScrollSystem.init();
        initClock();
        initTitleRotation();
        initEnterButton();
        initHexInteraction();
        initArsenalTilt();
        initTouchRipple();
        initBinaryRain();
        initSmokeEffects();
        initSparkEffects();
        initEasterEgg();
        initAmbientSound();
        initProfileFallback();
    }

    // ===== DIGITAL CLOCK =====
    function initClock() {
        var clockEl = document.getElementById('clock-time');
        function updateClock() {
            var now = new Date();
            var h = String(now.getHours()).padStart(2, '0');
            var m = String(now.getMinutes()).padStart(2, '0');
            var s = String(now.getSeconds()).padStart(2, '0');
            clockEl.textContent = h + ':' + m + ':' + s;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }

    // ===== TITLE ROTATION =====
    function initTitleRotation() {
        var titles = [
            'Embedded Architect',
            'AI Builder',
            'Digital Reaper',
            'Hardware Summoner',
            'Code Necromancer'
        ];
        var titleEl = document.getElementById('hero-title');
        var currentIndex = 0;

        function changeTitle() {
            // Fade out
            titleEl.style.opacity = '0';
            titleEl.style.transform = 'translateY(10px)';

            setTimeout(function() {
                currentIndex = (currentIndex + 1) % titles.length;
                titleEl.textContent = titles[currentIndex];
                // Fade in
                titleEl.style.opacity = '1';
                titleEl.style.transform = 'translateY(0)';
            }, 300);
        }

        titleEl.style.transition = 'all 0.3s ease';
        setInterval(changeTitle, 3000);
    }

    // ===== ENTER BUTTON =====
    function initEnterButton() {
        var enterBtn = document.getElementById('enter-btn');
        enterBtn.addEventListener('click', function() {
            var about = document.getElementById('about');
            if (about) {
                about.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ===== HEX CARD INTERACTION =====
    function initHexInteraction() {
        var hexCards = document.querySelectorAll('.hex-card');
        hexCards.forEach(function(card) {
            card.addEventListener('touchstart', function() {
                card.classList.add('touched');
                card.classList.add('pulse-anim');
            }, { passive: true });

            card.addEventListener('touchend', function() {
                setTimeout(function() {
                    card.classList.remove('touched');
                    card.classList.remove('pulse-anim');
                }, 300);
            }, { passive: true });
        });
    }

    // ===== ARSENAL TILT =====
    function initArsenalTilt() {
        var arsenalCards = document.querySelectorAll('.arsenal-card');
        arsenalCards.forEach(function(card) {
            card.addEventListener('touchstart', function(e) {
                card.classList.add('tilted');
                
                // Create small spark effect
                createSpark(e.touches[0].clientX, e.touches[0].clientY);
            }, { passive: true });

            card.addEventListener('touchend', function() {
                card.classList.remove('tilted');
            }, { passive: true });
        });
    }

    // ===== TOUCH RIPPLE =====
    function initTouchRipple() {
        var rippleContainer = document.getElementById('ripple-container');
        document.addEventListener('touchstart', function(e) {
            var touch = e.touches[0];
            var ripple = document.createElement('div');
            ripple.className = 'touch-ripple';
            ripple.style.left = (touch.clientX - 10) + 'px';
            ripple.style.top = (touch.clientY - 10) + 'px';
            rippleContainer.appendChild(ripple);
            setTimeout(function() {
                ripple.remove();
            }, 600);
        }, { passive: true });
    }

    // ===== BINARY RAIN =====
    function initBinaryRain() {
        var container = document.getElementById('binary-rain');
        if (!container) return;

        var columns = 12;
        for (var i = 0; i < columns; i++) {
            var col = document.createElement('div');
            col.className = 'binary-column';
            col.style.left = (Math.random() * 100) + '%';
            col.style.animationDuration = (6 + Math.random() * 8) + 's';
            col.style.animationDelay = (Math.random() * 5) + 's';
            col.style.fontSize = (0.5 + Math.random() * 0.3) + 'rem';

            var text = '';
            var length = 15 + Math.floor(Math.random() * 20);
            for (var j = 0; j < length; j++) {
                text += Math.random() > 0.5 ? '1' : '0';
            }
            col.textContent = text;
            container.appendChild(col);
        }
    }

    // ===== SMOKE EFFECTS =====
    function initSmokeEffects() {
        function createSmoke() {
            if (document.hidden) return;
            
            var smoke = document.createElement('div');
            smoke.className = 'smoke-particle';
            smoke.style.left = (Math.random() * 100) + '%';
            smoke.style.bottom = '-80px';
            smoke.style.animationDuration = (6 + Math.random() * 4) + 's';
            document.body.appendChild(smoke);

            setTimeout(function() {
                smoke.remove();
            }, 10000);
        }

        setInterval(createSmoke, 3000);
    }

    // ===== SPARK EFFECTS =====
    function initSparkEffects() {
        // Periodic random sparks
        setInterval(function() {
            if (document.hidden) return;
            if (Math.random() > 0.6) {
                createSpark(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }
        }, 2000);
    }

    function createSpark(x, y) {
        var count = 3;
        for (var i = 0; i < count; i++) {
            var spark = document.createElement('div');
            spark.className = 'digital-spark';
            spark.style.left = x + 'px';
            spark.style.top = y + 'px';
            var angle = Math.random() * Math.PI * 2;
            var dist = 15 + Math.random() * 25;
            spark.style.setProperty('--sx', (Math.cos(angle) * dist) + 'px');
            spark.style.setProperty('--sy', (Math.sin(angle) * dist) + 'px');
            document.body.appendChild(spark);
            setTimeout(function() { spark.remove(); }, 1000);
        }
    }

    // ===== EASTER EGG =====
    function initEasterEgg() {
        var profileTarget = document.getElementById('profile-tap-target');
        var tapCount = 0;
        var tapTimer;

        profileTarget.addEventListener('click', function() {
            tapCount++;
            clearTimeout(tapTimer);
            tapTimer = setTimeout(function() { tapCount = 0; }, 2000);

            if (tapCount >= 5) {
                activateKryzenMode();
                tapCount = 0;
            }
        });
    }

    function activateKryzenMode() {
        var overlay = document.getElementById('kryzen-mode');
        overlay.classList.remove('hidden');
        overlay.classList.add('active');
        document.body.classList.add('kryzen-glow');

        // Create extra particles
        for (var i = 0; i < 15; i++) {
            setTimeout(function() {
                createSpark(
                    Math.random() * window.innerWidth,
                    Math.random() * window.innerHeight
                );
            }, i * 100);
        }

        setTimeout(function() {
            overlay.classList.remove('active');
            overlay.classList.add('hidden');
            document.body.classList.remove('kryzen-glow');
        }, 3000);
    }

    // ===== AMBIENT SOUND =====
    function initAmbientSound() {
        var btn = document.getElementById('ambient-btn');
        var audioCtx = null;
        var isPlaying = false;
        var nodes = {};

        btn.addEventListener('click', function() {
            if (!isPlaying) {
                startAmbient();
                btn.classList.add('active');
                isPlaying = true;
            } else {
                stopAmbient();
                btn.classList.remove('active');
                isPlaying = false;
            }
        });

        function startAmbient() {
            try {
                audioCtx = new (window.AudioContext || window.webkitAudioContext)();

                // Create a subtle ambient drone
                var osc1 = audioCtx.createOscillator();
                var osc2 = audioCtx.createOscillator();
                var gain1 = audioCtx.createGain();
                var gain2 = audioCtx.createGain();
                var masterGain = audioCtx.createGain();

                // Low drone
                osc1.type = 'sine';
                osc1.frequency.setValueAtTime(55, audioCtx.currentTime);
                gain1.gain.setValueAtTime(0.03, audioCtx.currentTime);

                // Higher subtle tone
                osc2.type = 'sine';
                osc2.frequency.setValueAtTime(110, audioCtx.currentTime);
                gain2.gain.setValueAtTime(0.015, audioCtx.currentTime);

                // Slow frequency modulation
                var lfo = audioCtx.createOscillator();
                var lfoGain = audioCtx.createGain();
                lfo.type = 'sine';
                lfo.frequency.setValueAtTime(0.1, audioCtx.currentTime);
                lfoGain.gain.setValueAtTime(2, audioCtx.currentTime);
                lfo.connect(lfoGain);
                lfoGain.connect(osc1.frequency);

                masterGain.gain.setValueAtTime(0.5, audioCtx.currentTime);

                osc1.connect(gain1);
                osc2.connect(gain2);
                gain1.connect(masterGain);
                gain2.connect(masterGain);
                masterGain.connect(audioCtx.destination);

                osc1.start();
                osc2.start();
                lfo.start();

                nodes = { osc1: osc1, osc2: osc2, lfo: lfo, masterGain: masterGain };
            } catch (e) {
                console.log('Audio not supported');
            }
        }

        function stopAmbient() {
            if (audioCtx) {
                try {
                    nodes.masterGain.gain.linearRampToValueAtTime(0, audioCtx.currentTime + 0.5);
                    setTimeout(function() {
                        if (nodes.osc1) nodes.osc1.stop();
                        if (nodes.osc2) nodes.osc2.stop();
                        if (nodes.lfo) nodes.lfo.stop();
                        audioCtx.close();
                        audioCtx = null;
                    }, 600);
                } catch (e) {
                    audioCtx = null;
                }
            }
        }
    }

    // ===== PROFILE IMAGE FALLBACK =====
    function initProfileFallback() {
        var imgs = document.querySelectorAll('img[src="assets/profile.jpg"]');
        imgs.forEach(function(img) {
            img.addEventListener('error', function() {
                // Create a canvas-based fallback profile image
                var canvas = document.createElement('canvas');
                canvas.width = 200;
                canvas.height = 200;
                var ctx = canvas.getContext('2d');

                // Dark background
                ctx.fillStyle = '#0a0a0a';
                ctx.fillRect(0, 0, 200, 200);

                // Green circle
                ctx.beginPath();
                ctx.arc(100, 100, 80, 0, Math.PI * 2);
                ctx.fillStyle = '#001a0d';
                ctx.fill();
                ctx.strokeStyle = '#00ff88';
                ctx.lineWidth = 2;
                ctx.stroke();

                // Glow
                var gradient = ctx.createRadialGradient(100, 100, 40, 100, 100, 90);
                gradient.addColorStop(0, 'rgba(0, 255, 136, 0.1)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fill();

                // "K" letter
                ctx.font = 'bold 60px Courier New';
                ctx.fillStyle = '#00ff88';
                ctx.textAlign = 'center';
                ctx.textBaseline = 'middle';
                ctx.shadowColor = '#00ff88';
                ctx.shadowBlur = 20;
                ctx.fillText('K', 100, 100);

                // Eyes (reaper style)
                ctx.shadowBlur = 15;
                ctx.fillStyle = '#00ff88';
                ctx.beginPath();
                ctx.ellipse(80, 75, 6, 4, 0, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.ellipse(120, 75, 6, 4, 0, 0, Math.PI * 2);
                ctx.fill();

                img.src = canvas.toDataURL();
            });
        });
    }

    // ===== START =====
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initLoader);
    } else {
        initLoader();
    }
})();
