module.exports = (sentence) => {
  const splitSentence = sentence.split(" ")
  const returnedV = splitSentence.map(
    (word) => word[0].toUpperCase() + word.substring(1)
  )
  return returnedV.join(" ")
}