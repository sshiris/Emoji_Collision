const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const btnStart = document.getElementById("btnStart");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

let emojis = [];
const emojiA = "🖖";
const emojiB = "🖐️";
const newEmoji = "🌹";
const size = 30;
const speed = 2;

function createEmojiA() {
  const emojisA = {
    x: (Math.random() * canvas.width) / 4,
    y: Math.random() * (canvas.height / 2) + canvas.height / 4,
    emoji: emojiA,
    dx: (Math.random() - 1) * speed,
    dy: (Math.random() - 1) * speed,
  };
  return emojisA;
}

function createEmojiB() {
  const emojisB = {
    x: (Math.random() * canvas.width) / 4 + (3 * canvas.width) / 4 - size,
    y: Math.random() * (canvas.height / 2) + canvas.height / 4,
    emoji: emojiB,
    dx: (Math.random() - 1) * speed,
    dy: (Math.random() - 1) * speed,
  };
  return emojisB;
}

function createNewEmoji() {
  const emojisNew = {
    x: null,
    y: null,
    emoji: newEmoji,
    dx: Math.random() - 1,
    dy: Math.random() - 1,
  };
  return emojisNew;
}

function startGame() {
  for (let i = 0; i < 30; i++) {
    emojis.push(createEmojiA());
    emojis.push(createEmojiB());
  }
  requestAnimationFrame(updateEmojis);
}

function drawEmojis() {
  emojis.forEach((emoji) => {
    ctx.font = `${size}px Arial`;
    ctx.fillText(emoji.emoji, emoji.x, emoji.y);
  });
}

function updateEmojis() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  emojis.forEach((emoji) => {
    emoji.x += emoji.dx;
    emoji.y += emoji.dy;
    if (emoji.x < 0 || emoji.x > canvas.width - size) {
      emoji.dx *= -1;
    }
    if (emoji.y < size || emoji.y > canvas.height) {
      emoji.dy *= -1;
    }
  });
  collision();
  drawEmojis();
  requestAnimationFrame(updateEmojis);
}

function collision() {
  for (let i = 0; i < emojis.length; i++) {
    for (let j = i + 1; j < emojis.length; j++) {
      let a = emojis[i];
      let b = emojis[j];
      if (Math.abs(a.x - b.x) < size && Math.abs(a.y - b.y) < size) {
        if (
          (a.emoji == emojiA && b.emoji == emojiB) ||
          (a.emoji == emojiB && b.emoji == emojiA)
        ) {
          const newEmoji = createNewEmoji();
          newEmoji.x = (a.x + b.x) / 2;
          newEmoji.y = (a.y + b.y) / 2;
          emojis.splice(j, 1);
          emojis.splice(i, 1, newEmoji);
          break;
        }
      }
    }
  }
}
btnStart.addEventListener("click", startGame);
