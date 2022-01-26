const rawInput = `3,5,3,1,4,4,5,5,2,1,4,3,5,1,3,5,3,2,4,3,5,3,1,1,2,1,4,5,3,1,4,5,4,3,3,4,3,1,1,2,2,4,1,1,4,3,4,4,2,4,3,1,5,1,2,3,2,4,4,1,1,1,3,3,5,1,4,5,5,2,5,3,3,1,1,2,3,3,3,1,4,1,5,1,5,3,3,1,5,3,4,3,1,4,1,1,1,2,1,2,3,2,2,4,3,5,5,4,5,3,1,4,4,2,4,4,5,1,5,3,3,5,5,4,4,1,3,2,3,1,2,4,5,3,3,5,4,1,1,5,2,5,1,5,5,4,1,1,1,1,5,3,3,4,4,2,2,1,5,1,1,1,4,4,2,2,2,2,2,5,5,2,4,4,4,1,2,5,4,5,2,5,4,3,1,1,5,4,5,3,2,3,4,1,4,1,1,3,5,1,2,5,1,1,1,5,1,1,4,2,3,4,1,3,3,2,3,1,1,4,4,3,2,1,2,1,4,2,5,4,2,5,3,2,3,3,4,1,3,5,5,1,3,4,5,1,1,3,1,2,1,1,1,1,5,1,1,2,1,4,5,2,1,5,4,2,2,5,5,1,5,1,2,1,5,2,4,3,2,3,1,1,1,2,3,1,4,3,1,2,3,2,1,3,3,2,1,2,5,2`

const NEW_FISH = 8
const NEW_CYCLE = 6

/**
 * Group numbers of fish into timer groups 0-8.
 * Each day group[timer] is set to group[timer+1], thus moving the groups to the left.
 * The population of timer = 0 is becomes tomorrow's timer = 8 and is also added to timer = 6.
 */
function calculatePopulation(numberOfDays) {
  let populationState = Array.from({ length: 9 }, () => 0)
  rawInput
    .split(',')
    .map((timeToSpawn) => +timeToSpawn)
    .forEach((timer) => populationState[timer]++)

  // Day iterator
  for (let i = 1; i <= numberOfDays; i++) {
    let newBorns = 0
    let restartedCycles = 0

    // Timer groups
    for (let j = 0; j < populationState.length; j++) {
      // The reproduction group. Store the values and mutate the array after
      // this cycle.
      if (j === 0) {
        newBorns = populationState[0]
        restartedCycles = populationState[0]
      }
      populationState[j] = populationState[j + 1]
    }
    populationState[NEW_FISH] = newBorns
    populationState[NEW_CYCLE] += restartedCycles
  }

  return populationState.reduce((acc, curr) => (acc += curr), 0)
}

function solution() {
  const populationSize1 = calculatePopulation(80)
  document.getElementById('answer_part_1').innerHTML = `${populationSize1}`
  const populationSize2 = calculatePopulation(256)
  document.getElementById('answer_part_2').innerHTML = `${populationSize2}`
}

window.onload = solution
