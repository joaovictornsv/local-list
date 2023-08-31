const placeholders = [
  'Buy milk',
  'Walk with the dog',
  'Sell mouse',
  'Buy fruits',
  'Pay monthly bills',
  'Study for test',
  'Take car to mechanic'
]

export const generateRandomPlaceholder = () => {
  const randomIndex = Math.floor(Math.random()*placeholders.length)
  return placeholders[randomIndex];
}
