# Cheerio web scraping

### What is this project ?
This project code allows you to grab some especific data about Americanas.com products. You can simply call the ```getProduct``` function passing the product page url like in the example below:

```
  const getProduct = require('./product-scraping')
  getProduct('https://www.americanas.com.br/produto/26904402')
```


### How to run this project

Make sure you have a node environment setup in your computer. You can dowload it in the oficial [Node.js site](https://nodejs.org/en/download/) if you don't have it already.

First you must install the project dependencies.
Run ```npm install``` from the project root in the command line and you will be good to go.

Yet in the project root from the command line type ```node index.js``` hit enter and see the magic happen.
