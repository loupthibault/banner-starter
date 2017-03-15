# Starter Banner

```bash
git clone https://gitlab.digitas.fr/digitas_front/starter_banners.git MyApp
cd MyApp
npm i
npm run init
npm run gulp
```
## Basic Usage
Make sure Node 4.x is installed.

#### Install Dependencies
```
npm install
```

#### Configuration
Directory and top level settings are convienently exposed in `gulpfile.js/config.js`. All task configuration objects have src and dest directories specfied. These are relative to root.src and root.dest respectively. Each configuration also has an extensions array. This is used for file watching, and file deleting/replacing.

In that config file you will found the part below :

```json
{
  "banners" : [
    {
      "width": 320,
      "height": 480,
      "html": "banner.html",
      "js": ["main.js"],
      "css": ["main.css"],
      "include": "includes/animations.html"
    }
  ]
}
```

* `width` - banner's width
* `height` - banner's height
* `html` - html name file
* `js` - list of javascripts files the banner needs *(optional)*
* `css` - list of css files the banner needs
* `include` - the html file containing the DOM animation

You can add any banners profil you want.
When banners's configuration is done just type :
```
npm run init
```

#### Start compiling, serving, and watching files
```
npm run gulp
```

(or `npm run development`)

### Build production-ready files
```
npm run production
```

This will :
- Compile all javascripts, css and html files and minify them.
- Transform to base64 all images in html & css files.
- Inject css & javascripts files in each html files.
- Clean temporarily folder and give you a size report of each html files.
