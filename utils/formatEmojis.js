const fs = require("fs");

const emojis = require("../emoji_original");
const customEmojis = require("../emoji_custom_original");
const result = [];

for (let i = 0; i < emojis.length; i++) {
  const emoji = emojis[i];
  let skin_variations = emoji.skin_variations;

  if (emoji.sheet_y % 5 === 0) {
    row = emoji.sheet_y / 5;
  }

  if (emoji.sheet_x % 5 === 0) {
    column = emoji.sheet_x / 5;
  }

  let sheet_y = emoji.sheet_y - row * 5;
  let sheet_x = emoji.sheet_x - column * 5;
  let baseImg = `emoji-${row + 1}-${column + 1}.png`;

  const newEmoji = {
    ...emoji,
    img: baseImg,
    skin_variations,
    sheet_y,
    sheet_x,
  };

  if (emoji.skin_variations) {
    skin_variations = Object.entries(emoji.skin_variations).reduce(
      (acc, [unicode, emoji]) => {
        if (emoji.sheet_y % 5 === 0) {
          row = emoji.sheet_y / 5;
        }

        if (emoji.sheet_x % 5 === 0) {
          column = emoji.sheet_x / 5;
        }

        let sheet_y = emoji.sheet_y - row * 5;
        let sheet_x = emoji.sheet_x - column * 5;

        acc[unicode] = {
          ...emoji,
          img: `emoji-${row + 1}-${column + 1}.png`,
          sheet_y,
          sheet_x,
        };
        return acc;
      },
      {}
    );
  }

  result.push({
    ...newEmoji,
    skin_variations,
  });
}

const resultCustom = customEmojis.reduce((acc, emoji) => {
  const data = result.find(
    ({ name }) => name.toLowerCase() === emoji.name.toLowerCase()
  );
  let skinVariations = emoji.skinVariations;
  if (emoji.skinVariations) {
    skinVariations = [];
    const originEmojiSkins = Object.values(data.skin_variations);
    for (let i = 0; i < emoji.skinVariations.length; i++) {
      const skin = emoji.skinVariations[i];
      const origin = originEmojiSkins[i];
      skinVariations.push({
        ...skin,
        img: origin.img,
        sheetY: origin.sheet_y,
        sheetX: origin.sheet_x,
      });
    }
  }

  if (data) {
    acc.push({
      ...emoji,
      sheetX: data.sheet_x,
      sheetY: data.sheet_y,
      skinVariations,
      version: parseFloat(data.added_in),
      img: data.img,
    });
  }
  return acc;
}, []);

fs.writeFile("emoji.json", JSON.stringify(result, null, 2), "utf8", () => {});

fs.writeFile(
  "emoji_custom.json",
  JSON.stringify(resultCustom, null, 2),
  "utf8",
  () => {}
);
