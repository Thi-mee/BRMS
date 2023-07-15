// // define regex filtering out special characters
// export const specialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/

// // define regex filtering out numbers
// export const numbers = /[0-9]+/

// // define regex without special characters
export const noSpecialChars = /^[a-zA-Z][a-zA-Z0-9 ]*$/

export const pickupFormValidationRules = [
  { name: "name", label: "Name", minLength: 3, maxLength: 50, pattern: noSpecialChars },
  { name: "busStop", label: "Bus Stop", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  {
    name: "description",
    label: "Description",
    minLength: 2,
    maxLength: 300,
    pattern: noSpecialChars
  },
  { name: "location.landmark", label: "Landmark", minLength: 3, maxLength: 150, pattern: noSpecialChars },
  { name: "location.title", label: "title", minLength: 0, maxLength: 150, pattern: noSpecialChars },
  { name: "location.city", label: "City", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  {
    name: "location.description",
    label: "Description",
    minLength: 2,
    maxLength: 300,
    pattern: noSpecialChars
  },
  { name: "location.lcda", label: "LCDA", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "location.area", label: "Area", minLength: 2, maxLength: 50, pattern: noSpecialChars },
]

export const pupValidationRules = [
  { name: "name", label: "Name", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "title", label: "Title", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "description", label: "Description", minLength: 2, maxLength: 300, pattern: noSpecialChars },
  { name: "busStop", label: "Bus Stop", minLength: 2, maxLength: 150, pattern: noSpecialChars },
  // { name: "locationTitle", label: "Location Title", minLength: 2, maxLength: 50}
]

export const locationValidationRules = [
  { name: "title", label: "Title", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "description", label: "Description", minLength: 2, maxLength: 300, pattern: noSpecialChars },
  { name: "lcda", label: "L.C.D.A.", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "city", label: "City", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "area", label: "Area", minLength: 2, maxLength: 50, pattern: noSpecialChars },
  { name: "landmark", label: "Landmark", minLength: 2, maxLength: 150, pattern: noSpecialChars },
]