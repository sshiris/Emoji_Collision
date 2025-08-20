const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const btnStart = document.getElementById("btnStart");

let emojis = [];
const emojiA = "🖖";
const emojiB = "🖐️";
const newEmoji = "🌹";
const size = 30;

function createEmojiA() {
  const emojisA = {
    x: (Math.random() * canvas.width) / 4,
    y: Math.random() * (canvas.height / 2) + canvas.height / 4,
    emoji: emojiA,
    dx: Math.random() - 1,
    dy: Math.random() - 1,
  };
  return emojisA;
}

function createEmojiB() {
  const emojisB = {
    x: (Math.random() * canvas.width) / 4 + (3 * canvas.width) / 4 - size,
    y: Math.random() * (canvas.height / 2) + canvas.height / 4,
    emoji: emojiB,
    dx: Math.random() - 1,
    dy: Math.random() - 1,
  };
  return emojisB;
}

function startGame() {
  for (let i = 0; i < 20; i++) {
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
  drawEmojis();
  requestAnimationFrame(updateEmojis);
}
btnStart.addEventListener("click", startGame);
