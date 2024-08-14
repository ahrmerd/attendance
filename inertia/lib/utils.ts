import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

function convertSingleString(str: string): string {
  // Convert to string if not already
  // str = String(str)

  // Step 1: Convert snake_case to space-separated words
  let result = str.replace(/_/g, ' ')

  // Step 2: Insert space before capital letters in camelCase and PascalCase
  result = result.replace(/([a-z])([A-Z])/g, '$1 $2')

  // Step 3: Insert space between letters and numbers
  result = result.replace(/([a-zA-Z])(\d)/g, '$1 $2').replace(/(\d)([a-zA-Z])/g, '$1 $2')

  // Step 4: Split into words, capitalize each word, and join
  return result
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ')
}

export function convertToCapitalizedWords(input: string | string[]): string {
  if (Array.isArray(input)) {
    // If input is an array, process each element and join with line breaks
    return input.map(convertSingleString).join('\n')
  } else if (typeof input === 'string') {
    // If input is a string, process it directly
    return convertSingleString(input)
  } else if (input === null || input === undefined) {
    return 'Invalid input: null or undefined'
  } else {
    // For any other type, convert to string and process
    return convertSingleString(String(input))
  }
}
