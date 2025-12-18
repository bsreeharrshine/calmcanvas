function goBack() {
  window.location.href = "dashboard.html";
}

const canvas = document.getElementById('burnCanvas');
const ctx = canvas.getContext('2d');
let particles = [];
let burning = false;

// Particle for flames
function Particle(x, y, color, size, vy) {
  this.x = x;
  this.y = y;
  this.color = color;
  this.size = size;
  this.vy = vy;
  this.alpha = 1;
}

Particle.prototype.update = function () {
  this.y -= this.vy;
  this.alpha -= 0.02;
};

Particle.prototype.draw = function () {
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.fill();
  ctx.globalAlpha = 1;
};

function addFlame() {
  const x = canvas.width / 2 + (Math.random() - 0.5) * 150;
  const y = 300 + Math.random() * 20;
  const color = `hsl(${Math.random() * 40}, 100%, 50%)`;
  const size = Math.random() * 6 + 4;
  const vy = Math.random() * 2 + 1;
  particles.push(new Particle(x, y, color, size, vy));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (burning) addFlame();

  particles.forEach((p, i) => {
    p.update();
    p.draw();
    if (p.alpha <= 0) particles.splice(i, 1);
  });

  requestAnimationFrame(animate);
}

animate();

function burnPaper() {
  const paper = document.getElementById('paper');
  const textArea = document.getElementById('thoughtInput');
  const quote = document.getElementById('quote');
  const text = textArea.value.trim();

  if (!text) {
    alert("Please type something to burn!");
    return;
  }

  paper.textContent = text;
  textArea.value = '';

  burning = true;
  let index = 0;
  const chars = paper.textContent.split('');

  const burnInterval = setInterval(() => {
    // Burn letters gradually
    for (let i = index; i < index + 2 && i < chars.length; i++) {
      chars[i] = '';
    }
    paper.textContent = chars.join('');
    index += 2;

    if (index >= chars.length) {
      clearInterval(burnInterval);
      burning = false;
      paper.style.display = 'none';
      quote.style.display = 'block';
    }
  }, 200);
}
