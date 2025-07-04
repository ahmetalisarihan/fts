/**
 * URL encoding/decoding helper functions
 */

/**
 * Safely decode URL parameters that might be double-encoded
 */
export function safeDecodeURIComponent(str: string): string {
  try {
    let decoded = decodeURIComponent(str);
    
    // Check if still encoded and decode again
    while (decoded !== str && decoded.includes('%')) {
      str = decoded;
      decoded = decodeURIComponent(str);
    }
    
    return decoded;
  } catch (error) {
    console.warn('URL decode error:', error);
    return str; // Return original if decode fails
  }
}

/**
 * Properly encode for URL usage
 */
export function safeEncodeURIComponent(str: string): string {
  try {
    return encodeURIComponent(str);
  } catch (error) {
    console.warn('URL encode error:', error);
    return str;
  }
}

/**
 * Normalize category name for consistent API calls
 */
export function normalizeCategoryName(catName: string): string {
  return safeDecodeURIComponent(catName)
    .trim()
    .replace(/\s+/g, ' '); // Replace multiple spaces with single space
}

/**
 * Create category URL with proper encoding
 */
export function createCategoryUrl(catName: string): string {
  const normalized = normalizeCategoryName(catName);
  return `/categories/${safeEncodeURIComponent(normalized)}`;
}

/**
 * Create subcategory URL with proper encoding
 */
export function createSubcategoryUrl(catName: string, subcatName: string): string {
  const normalizedCat = normalizeCategoryName(catName);
  const normalizedSubcat = normalizeCategoryName(subcatName);
  return `/categories/${safeEncodeURIComponent(normalizedCat)}/subcategories/${safeEncodeURIComponent(normalizedSubcat)}`;
}
