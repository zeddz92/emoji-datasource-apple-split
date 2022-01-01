# emoji-datasource-split sprite image sub divided into 12x12 grid

This project uses [emoji-datasource](https://www.npmjs.com/package/emoji-datasource) images.

The purpose of this project is to make it easy to lazy load group of emojis instead of loading all at once. Each part has 25 emojis each.

# Installation

This package includes 32 and 64 spritesheets for apple, google, facebook and twitter. Including sheets: `128`, `256` and `clean`

```
npm install emoji-datasource-split
```

If you want an specify set you can install one of these packages

```
npm install emoji-datasource-apple-split
npm install emoji-datasource-google-split
npm install emoji-datasource-twitter-split
npm install emoji-datasource-facebook-split
```

Each chunk has a size between `32.4kB` and `210kB`

# Usage

Every grid has 5 rows and 5 columns of emojis, but index start from 0 to 4.

```
x: sheet_x * (100 / 4) // 4 = columns
y: sheet_y * (100 / 4) // 4 = rows
background-image: "emoji-1-1.png"
background-size: 510% 510%;
```

The height and width of each chunk is `330x330` so the background-size is half of it

### Example of grid 5x5

<div style="display: flex; margin-bottom: 10px; margin-top: 10px;">
<img style="width:49%; border-right: 2px solid lightgrey;"; src="https://raw.githubusercontent.com/zeddz92/emoji-datasource-split/main/img/sheets-clean/64/apple/emoji-2-7.png"/>
<img style="width:49%"; src="https://raw.githubusercontent.com/zeddz92/emoji-datasource-split/main/img/sheets-clean/64/apple/emoji-7-3.png"/>
</div>

## Grid image

The way is named is like this: `emoji-1-1.png`. The first number is the row and the latter is the column.

## Object

The new list adds `img` property and changes `sheet_x` and `sheet_y` so to be found in the grid in the `img`

```
{
    "name": "HASH KEY",
    "unified": "0023-FE0F-20E3",
    "non_qualified": "0023-20E3",
    "docomo": "E6E0",
    "au": "EB84",
    "softbank": "E210",
    "google": "FE82C",
    "image": "0023-fe0f-20e3.png",
    "sheet_x": 0,
    "sheet_y": 0,
    "short_name": "hash",
    "short_names": [
      "hash"
    ],
    "text": null,
    "texts": null,
    "category": "Symbols",
    "subcategory": "keycap",
    "sort_order": 1463,
    "added_in": "0.6",
    "has_img_apple": true,
    "has_img_google": true,
    "has_img_twitter": true,
    "has_img_facebook": false,
    "img": "emoji-1-1.png"
  },
```

### Custom Object

The original list has a lot of properties that users may not use such as `docomo`, `au`, or `non_qualified`, which makes the file bigger. This object strips those properties, replace `snake_case` for `camelCase`, add `keywords` for each one, and the native emoji.

To make the file size smaller, you should:

- Put the json object inside a `.js` file and use a formatter like `prettier` to remove the double quotes for each property.
- Minify the file when you bundle your project.

In the end It'll go from `1.1mB` to `654.2kB`

```
  {
    "sheetX": 2,
    "sheetY": 4,
    "google": 1,
    "twitter": 1,
    "facebook": 1,
    "apple": 1,
    "native": "😂",
    "name": "face with tears of joy",
    "category": "Smileys & People",
    "sortOrder": 8,
    "keywords": [
      "face",
      "face with tears of joy",
      "joy",
      "laugh",
      "tear"
    ],
    "description": "face with tears of joy",
    "version": 0.6,
    "img": "emoji-11-7.png"
  },
```
