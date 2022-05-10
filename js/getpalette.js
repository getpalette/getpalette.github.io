const
  chooseFileBtn = document.getElementById('chooseFileBtn')
const fileInput = document.getElementById('file')
const imageView = document.getElementById('img')
const imageView2 = document.getElementById('img2')
const canvas = document.getElementById('canvas')
const table = document.getElementById('table')
const spinner = document.getElementById('spinner')
const content = document.getElementById('content')
const customRange = document.getElementById('customRange')
const customRangePanel = document.getElementById('customRangePanel')
const colorCounter = document.getElementById('colorCounter')
const getPalette = eval('demo.getPalette')
const whiteColor = eval('demo.whiteColor')

imageView.style.opacity = '0'
spinner.style.display = 'none'
content.style.opacity = '0'
customRangePanel.style.opacity = '0'
// progressBarLine.style.width = '0%'
chooseFileBtn.onclick = function () { fileInput.click() }

fileInput.onchange = function () {
  if (!fileInput.files) return
  const reader = new FileReader()
  spinner.style.display = 'flex'
  content.style.opacity = '0'
  reader.readAsDataURL(fileInput.files[0])
  reader.onload = function () {
    imageView.style.opacity = '1'
    imageView.src = reader.result
    imageView.onload = function () {
      const result = getPalette(imageView, canvas, customRange.value)
      imageView2.src = result.image
      drawPalette(result.list)
    }
  }
}

customRange.onchange = function () {
  const result = getPalette(imageView, canvas, customRange.value)
  imageView2.src = result.image
  drawPalette(result.list)
}

function drawPalette (data) {
  table.innerHTML = ''

  for (let i = 0; i < data.length; i++) {
    const color = data[i]

    const div = document.createElement('div')
    div.innerHTML = color.toString() // + '<br />' + color.toHSV().toString()
    div.style.backgroundColor = 'rgba(' + color.r + ',' + color.g + ',' + color.b + ',' + color.a + ')'

    div.style.color = color.getContrastRatio(whiteColor, true) > 5 ? '#fff' : '#000'

    table.appendChild(div)
  }
  colorCounter.textContent = data.length
  spinner.style.display = 'none'
  content.style.opacity = '1'
  customRangePanel.style.opacity = '1'
}
