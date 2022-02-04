const rawData = `ax-end
xq-GF
end-xq
im-wg
ax-ie
start-ws
ie-ws
CV-start
ng-wg
ng-ie
GF-ng
ng-av
CV-end
ie-GF
CV-ie
im-xq
start-GF
GF-ws
wg-LY
CV-ws
im-CV
CV-wg`

const rawData1 = `start-A
start-b
A-c
A-b
b-d
A-end
b-end`

const rawData2 = `fs-end
he-DX
fs-he
start-DX
pj-DX
end-zg
zg-sl
zg-pj
pj-he
RW-he
fs-DX
pj-RW
zg-RW
start-pj
he-WI
zg-he
pj-fs
start-RW`

/** A lightweight representation of a cave. */
class Cave {
  #name = null
  #leadsTo = null

  constructor(name, leadsTo) {
    this.#name = name
    this.#leadsTo = leadsTo
  }

  /** name of the cave */
  get name() {
    return this.#name
  }
  /** Where this cave goes, aka exit. */
  get leadsTo() {
    return this.#leadsTo
  }

  /** return `true` if this cave name is all in lowercase, which represents a
   * small cave */
  isSmall() {
    return this.#name?.toLowerCase() === this.#name
  }
}

// Initialize the cave map and data.
/** @type {Array<Cave>} The maps of Caves. */
let CAVE_MAP = []
rawData2
  .split('\n')
  .map((row) => row.split('-'))
  .reduce((acc, mapping) => {
    const [cave, leadsTo] = mapping
    // Add both directions
    acc.push(new Cave(cave, leadsTo))
    acc.push(new Cave(leadsTo, cave))
    return acc
  }, CAVE_MAP)

/** @type {Cave} Start cave */
const CAVE_START = CAVE_MAP.find((cave) => cave.name === 'start')
/** @type {Cave} End cave */
const CAVE_END = CAVE_MAP.find((cave) => cave.name === 'end').name
/** @type {Array<String>} small cave names */
const SMALL_CAVE_NAMES = CAVE_MAP.filter(
  (cave) => cave.isSmall() && cave.name !== 'start' && cave.name !== 'end'
).map((cave) => cave.name)

// Script global for both parts, and should be initialized before starting the
// search.
let paths = null

function solution() {
  // Part 1
  paths = []
  // smallCaveVisitsAllowed = 1
  const answerPart1 = startPathSearch(1)
  document.getElementById('answer_part_1').innerHTML = `${answerPart1.length}`
  // Part 2
  paths = []
  // smallCaveVisitsAllowed = 2
  const answerPart2 = startPathSearch(2)
  document.getElementById('answer_part_2').innerHTML = `${answerPart2.length}`
}

// Find distinct paths from start to end.
// Don't visit start more than once.
// Don't visit small caves more than once
// - Small cave is in lowercase
// Can visit large caves more than once
// - Large cave is in uppercase
function startPathSearch(smallCaveVisitsAllowed) {
  followPath(CAVE_START, [], smallCaveVisitsAllowed)
  return paths
}

function followPath(start, path, smallCaveVisitsAllowed) {
  if (start.name === 'end') {
    path.push(CAVE_END)
    // console.log('Path complete. smallCaveVisits', smallCaveVisitsAllowed, path)
    paths.push(path)
    return
  }

  // We can visit one small cave more than once. After this occurs reduce the number of visits allowed to only once
  if (smallCaveVisitsAllowed > 1 && getDuplicateSmallCaves(path).length) {
    // console.log('Dupe count', getDuplicateCaves(path))
    smallCaveVisitsAllowed = 1
  }

  // Get all exits from this cave, but don't go back to the start.
  const caveExits = CAVE_MAP.filter(
    (/** @type {Cave} */ exit) =>
      exit.name === start.name &&
      exit.leadsTo !== 'start' &&
      !isSmallCaveAlreadyVisited(path, exit, smallCaveVisitsAllowed)
  )

  // follow the exits
  caveExits.map((exit) => {
    const nextCave = CAVE_MAP.find((cave) => cave.name === exit.leadsTo)
    followPath(nextCave, path.concat(exit.name), smallCaveVisitsAllowed)
  })
}

// Get dupe small caves
function getDuplicateSmallCaves(path) {
  // Get all small caves in the path
  const caves = path.filter((c) => SMALL_CAVE_NAMES.includes(c))
  return caves.filter((c, i) => caves.indexOf(c) !== i)
}

// Is visited small cave already in the path?
function isSmallCaveAlreadyVisited(path, cave, visitsAllowed = 1) {
  return (
    cave.isSmall() &&
    path.filter((c) => c === cave.name).length >= visitsAllowed
  )
}

window.onload = solution
