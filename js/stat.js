"use strict";

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
  COLOR: `rgba(0, 0, 0, 0.7)`,
  SHADOW: `#ffffff`
};

const Bar = {
  WIDTH: 40,
  HEIGHT: 150,
  GAP: 50
};

const Font = {
  SIZE: `16px`,
  FAMILY: `PT Mono`,
  HEIGHT: 20
};

const Name = {
  // HEIGHT: 20,
  X: Cloud.X + Bar.WIDTH,
  Y: Cloud.HEIGHT - Cloud.GAP
};


function renderCloud(ctx, x, y, colorShadow, colorCloud) {
  ctx.fillStyle = colorShadow;
  ctx.fillRect(x + Cloud.GAP, y + Cloud.GAP, Cloud.WIDTH, Cloud.HEIGHT);
  ctx.fillStyle = colorCloud;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
}

function renderColumn(ctx, x, y, name, height, color) {
  if (name === `Вы`) {
    ctx.fillStyle = `rgba(255, 0, 0, 1)`;
  } else {
    ctx.fillStyle = color;
  }
  ctx.fillRect(x, y, Bar.WIDTH, height);
}

function renderText(ctx, x, y, text, color) {
  ctx.fillStyle = color;
  ctx.fillText(text, x, y);
}

function getMaxElement(arr) {
  let maxElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
}

function showStats(ctx, shift, text, name, height, color) {
  renderText(
      ctx,
      Name.X + shift,
      Name.Y,
      name
  );

  renderText(
      ctx,
      Name.X + shift,
      Cloud.HEIGHT - Cloud.GAP * 2 - Font.HEIGHT + height,
      text
  );

  renderColumn(
      ctx,
      Cloud.X + Bar.WIDTH + shift,
      Cloud.HEIGHT - Cloud.GAP - Font.HEIGHT,
      name,
      height,
      color
  );
}


window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      Cloud.X + Cloud.GAP,
      Cloud.Y + Cloud.GAP,
      Cloud.COLOR,
      Cloud.SHADOW
  );

  ctx.font = `${Font.SIZE} ${Font.FAMILY}`;
  const maxTime = getMaxElement(times);
  const textColor = `#000000`;

  renderText(
      ctx,
      Cloud.X + Font.HEIGHT,
      Cloud.Y + Cloud.GAP + Font.HEIGHT,
      `Ура вы победили!`,
      textColor
  );

  renderText(
      ctx,
      Cloud.X + Font.HEIGHT,
      Cloud.Y + Cloud.GAP + Font.HEIGHT * 2,
      `Список результатов:`,
      textColor
  );

  for (let i = 0; i < names.length; i++) {
    const statShift = (Bar.WIDTH + Bar.GAP) * i;
    const columnColor = `hsl(240,` + (Math.floor(Math.random() * (100 - 1 + 1)) + 1) + `%` + `, 50%)`;
    let barHeight = -((Bar.HEIGHT * times[i]) / maxTime);
    let playerTime = Math.round(times[i]).toString();
    ctx.fillStyle = textColor;

    showStats(
        ctx,
        statShift,
        playerTime,
        names[i],
        barHeight,
        columnColor
    );
  }
};
