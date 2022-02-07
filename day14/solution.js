const rawData = `BB -> H
BC -> P
BF -> K
BH -> P
BK -> N
BN -> O
BO -> V
BP -> H
BS -> P
BV -> H
CB -> F
CC -> K
CF -> P
CH -> P
CK -> P
CN -> H
CO -> V
CP -> N
CS -> P
CV -> P
FB -> B
FC -> H
FF -> C
FH -> N
FK -> H
FN -> C
FO -> B
FP -> O
FS -> F
FV -> V
HB -> H
HC -> B
HF -> O
HH -> F
HK -> F
HN -> F
HO -> B
HP -> V
HS -> O
HV -> P
KB -> B
KC -> H
KF -> F
KH -> P
KK -> P
KN -> P
KO -> F
KP -> B
KS -> H
KV -> H
NB -> F
NC -> N
NF -> S
NH -> K
NK -> F
NN -> P
NO -> P
NP -> C
NS -> F
NV -> S
OB -> N
OC -> V
OF -> P
OH -> H
OK -> F
ON -> N
OO -> C
OP -> H
OS -> B
OV -> C
PB -> S
PC -> K
PF -> P
PH -> V
PK -> B
PN -> H
PO -> V
PP -> H
PS -> O
PV -> N
SB -> P
SC -> C
SF -> V
SH -> N
SK -> O
SN -> F
SO -> B
SP -> K
SS -> P
SV -> F
VB -> F
VC -> F
VF -> V
VH -> K
VK -> F
VN -> S
VO -> H
VP -> B
VS -> C
VV -> K`

const TEMPLATE = `HBCHSNFFVOBNOFHFOBNO`

const PAIRS = new Map()
rawData.split('\n').map((line) => {
  const [a, b] = line.split(' -> ')
  PAIRS.set(a, b)
})

function solution() {
  const answerPart1 = calculatePart1()
  document.getElementById('answer_part_1').innerHTML = `${answerPart1}`
  const answerPart2 = calculatePart2()
  document.getElementById('answer_part_2').innerHTML = `${answerPart2}`
}

// Part 1: calculations over 10 iterations
function calculatePart1() {
  const result = getCountsByLetter(10)
  return Math.max(...Object.values(result)) - Math.min(...Object.values(result))
}

// Part 2: calculations over 40 iterations
function calculatePart2() {
  const result = getCountsByLetter(40)
  return Math.max(...Object.values(result)) - Math.min(...Object.values(result))
}

// Using the rule get the counts of each letter afer `numberOfIterations`
// iterations.
function getCountsByLetter(numberOfIterations = 0) {
  // Start the counts off with the initial polymer string
  let letterCount = initializeLetterCount(TEMPLATE)
  // Well track pair counts, so intialize with the initial polymer string
  let pairs = initializePairs(TEMPLATE)
  for (let i = 0; i < numberOfIterations; i++) {
    const stepPairs = new Map()
    for (let [pair, count] of pairs.entries()) {
      const letter = PAIRS.get(pair)
      // Build two new pairs from this pair
      stepPairs.set(
        pair[0] + letter,
        (stepPairs.get(pair[0] + letter) || 0) + count
      )
      stepPairs.set(
        letter + pair[1],
        (stepPairs.get(letter + pair[1]) || 0) + count
      )
      // Increment the letter count for this pair
      letterCount[letter] = (letterCount[letter] || 0) + count
    }
    pairs = stepPairs
  }
  return letterCount
}

function initializePairs(str) {
  const result = new Map()
  for (let i = 0; i < str.length - 1; i++) {
    const pair = str[i] + str[i + 1]
    result.set(pair, (result.get(pair) || 0) + 1)
  }
  return result
}

function initializeLetterCount(str) {
  const result = {}
  for (let i = 0; i < str.length; i++) {
    if (!result[str[i]]) {
      result[str[i]] = 1
    } else {
      result[str[i]]++
    }
  }
  return result
}

window.onload = solution
