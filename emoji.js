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
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
  };
  return emojisA;
}

function createEmojiB() {
  const emojisB = {
    x: (Math.random() * canvas.width) / 4 + (3 * canvas.width) / 4,
    y: Math.random() * (canvas.height / 2) + canvas.height / 4,
    emoji: emojiB,
    dx: (Math.random() - 0.5) * 4,
    dy: (Math.random() - 0.5) * 4,
  };
  return emojisB;
}

function startGame() {
  //emojiA
  emojis.push(createEmojiA());

  //emojiB
  emojis.push(createEmojiB());

  drawEmojis();
}

function drawEmojis() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  emojis.forEach((emoji) => {
    ctx.font = `${size}px Arial`;
    ctx.fillText(emoji.emoji, emoji.x, emoji.y);
  });
}

btnStart.addEventListener("click", startGame);
