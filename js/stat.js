"use strict";

const Cloud = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10
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


function renderCloud(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, Cloud.WIDTH, Cloud.HEIGHT);
}

function renderColumn(ctx, x, y, name, time, maxTime) {
  if (name === `Вы`) {
    ctx.fillStyle = `rgba(255, 0, 0, 1)`;
  } else {
    ctx.fillStyle = `hsl(240,` + (Math.floor(Math.random() * (100 - 1 + 1)) + 1) + `%` + `, 50%)`;
  }
  ctx.fillRect(x, y, Bar.WIDTH, -(Bar.HEIGHT * time) / maxTime);
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


window.renderStatistics = function (ctx, names, times) {
  renderCloud(
      ctx,
      Cloud.X + Cloud.GAP,
      Cloud.Y + Cloud.GAP,
      `rgba(0, 0, 0, 0.7)`
  );
  renderCloud(
      ctx,
      Cloud.X,
      Cloud.Y,
      `#ffffff`
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
    let barHeight = -((Bar.HEIGHT * times[i]) / maxTime);
    let playerTime = Math.round(times[i]).toString();
    renderText(
        ctx,
        Name.X + statShift,
        Name.Y,
        names[i]
    );

    renderColumn(
        ctx,
        // переменная для позиции Х?
        Cloud.X + Bar.WIDTH + statShift,
        Cloud.HEIGHT - Cloud.GAP - Font.HEIGHT,
        names[i],
        times[i],
        maxTime
    );

    renderText(
        ctx,
        Name.X + statShift,
        Cloud.HEIGHT - Cloud.GAP * 2 - Font.HEIGHT + barHeight,
        playerTime
    );
  }
};
