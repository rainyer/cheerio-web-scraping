const cloudscraper = require('cloudscraper')
const cheerio = require('cheerio')

extractProductId = $ => {
  const elemSelector = '.TextUI-sc-1hrwx40-0.brNcBx'
  const id = $('body')
    .find(elemSelector)
    .text()

  if (typeof id === 'string' && id.length) {
    // remove other things but digits
    return id.toLowerCase().replace(/[^0-9]+/g, '')
  }

  return ''
}

extractBreadcrumbs = $ => {
  const elemSelector = '.TextUI-iw976r-5.fbPVXQ.TextUI-sc-1hrwx40-0.doPTSH'
  const crumbs = []
  $(elemSelector).each(function(i, elem) {
    crumbs[i] = $(this).text()
  })
  return crumbs
}

extractProductName = $ => {
  const elemSelector =
    '.product-title__TitleUI-sc-116vf1e-1.fIAiYD.TitleH1-c6mv26-0.iEwJxn'
  const name = $('body')
    .find(elemSelector)
    .text()
  return name || ''
}

const extractSeller = $ => {
  const text = $('body')
    .find('.seller-name-container span')
    .text()
  return text || ''
}

const extractImgUrl = $ => {
  const src = $('body')
    .find('.image-gallery-image > img')
    .first()
    .attr('src')

  return src || ''
}

const extractPrice = $ => {
  const elemSelector =
    '.sales-price.main-offer__SalesPrice-sc-1oo1w8r-1.haZIvY.TextUI-sc-1hrwx40-0.doPTSH'
  const price = $('body')
    .find(elemSelector)
    .text()

  if (typeof price === 'string' && price.length) {
    var res = price
      .replace('R$', '')
      .replace(' ', '')
      .replace('.', '')
      .replace(',', '.')
    return parseFloat(res).toFixed(2)
  }
  return ''
}

handleHTML = HTML => {
  const $ = cheerio.load(HTML)
  const id = extractProductId($)
  const name = extractProductName($)
  const breadcrumb = extractBreadcrumbs($)
  const img = extractImgUrl($)
  const seller = extractSeller($)
  const price = extractPrice($)
  console.log({ id, name, breadcrumb, img, seller, price })
}

const handleError = err => {
  // should implement proper error handling here
  console.log('Oops something went wrong: ', err.message)
}

module.exports = function(url = null) {
  if (!url || typeof url !== 'string')
    return console.log('Please provide a valid url parameter.')
  cloudscraper(url).then(handleHTML, handleError)
}
