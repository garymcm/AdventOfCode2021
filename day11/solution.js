const rawData = `5723573158
3154748563
4783514878
3848142375
3637724151
8583172484
7747444184
1613367882
6228614227
4732225334`

const NUMBER_OF_STEPS = 100
let numberOfFlashes = 0
let flashListCache = null
let allFlashedStepNum = null

function solution() {
  const part1Data = rawData
    .split('\n')
    .map((row) => row.split('').map((o) => +o))
  computePart1(part1Data)
  document.getElementById('answer_part_1').innerHTML = `${numberOfFlashes}`

  const part2Data = rawData
    .split('\n')
    .map((row) => row.split('').map((o) => +o))
  computePart2(part2Data)
  document.getElementById('answer_part_2').innerHTML = `${allFlashedStepNum}`
}
// Process flashes for set number of steps.
function computePart1(data) {
  for (let i = 0; i < NUMBER_OF_STEPS; i++) {
    flashListCache = []
    stepTick(data)
    processFlash(data)
  }
}

// Process flashes until all points are flashed.
function computePart2(data) {
  let i = 0
  for (; !haveAllFlashed(data); i++) {
    flashListCache = []
    stepTick(data)
    processFlash(data)
  }
  allFlashedStepNum = i
}

// increment the neighbours, if they haven't flashed yet.
function incrementNeighbours(data, i, j) {
  // top left
  if (i - 1 >= 0 && j - 1 >= 0 && !hasFlashedThisStep(i - 1, j - 1)) {
    data[i - 1][j - 1] += 1
  }

  // top
  if (i - 1 >= 0 && !hasFlashedThisStep(i - 1, j)) {
    data[i - 1][j] += 1
  }
  // top right
  if (
    i - 1 >= 0 &&
    j + 1 < data[i].length &&
    !hasFlashedThisStep(i - 1, j + 1)
  ) {
    data[i - 1][j + 1] += 1
  }
  // right
  if (j + 1 < data[i].length && !hasFlashedThisStep(i, j + 1)) {
    data[i][j + 1] += 1
  }
  // bottom right
  if (
    i + 1 < data.length &&
    j + 1 < data[i].length &&
    !hasFlashedThisStep(i + 1, j + 1)
  ) {
    data[i + 1][j + 1] += 1
  }
  // bottom
  if (i + 1 < data.length && !hasFlashedThisStep(i + 1, j)) {
    data[i + 1][j] += 1
  }
  // bottom left
  if (i + 1 < data.length && j - 1 >= 0 && !hasFlashedThisStep(i + 1, j - 1)) {
    data[i + 1][j - 1] += 1
  }
  // left
  if (j - 1 >= 0 && !hasFlashedThisStep(i, j - 1)) {
    data[i][j - 1] += 1
  }
}

// Store the point that's flashed.
function cachePoint(i, j) {
  if (!flashListCache[i]) {
    flashListCache[i] = []
  }
  if (!flashListCache[i][j]) {
    flashListCache[i][j] = 1
  }
}

// Confirm the Point has not been checked.
function hasFlashedThisStep(i, j) {
  return flashListCache?.[i]?.[j]
}

// process each cell.
function processFlash(data) {
  // eslint-disable-next-line no-constant-condition
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      // Do flash processing. If we flash, we'll increment its neighbours and
      // reprocess the data
      if (data[i][j] > 9) {
        data[i][j] = 0
        numberOfFlashes++
        cachePoint(i, j)
        incrementNeighbours(data, i, j)
        processFlash(data)
      }
    }
  }
}

// loop over the array
// increment each by one
function stepTick(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      data[i][j]++
    }
  }
}

function haveAllFlashed(data) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i][j] > 0) {
        return false
      }
    }
  }
  return true
}

window.onload = solution
