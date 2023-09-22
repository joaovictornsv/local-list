const placeholders = [
  'Buy milk',
  'Walk with the dog',
  'Sell mouse',
  'Buy fruits',
  'Pay monthly bills',
  'Study for test',
  'Take the car to a mechanic',
  'Print the papers',
  'Read an article',
  'Talk with John',
  'Send an email to the teacher',
  'Paint the wall',
  'Start the course',
  'Clean my bedroom'
]

export const generateRandomPlaceholder = () => {
  const randomIndex = Math.floor(Math.random()*placeholders.length)
  return placeholders[randomIndex];
}
