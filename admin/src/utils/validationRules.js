export const pickupFormValidationRules = [
  { name: "name", label: "Name", minLength: 3, maxLength: 50 },
  { name: "busStop", label: "Bus Stop", minLength: 2, maxLength: 50 },
  {
    name: "description",
    label: "Description",
    minLength: 2,
    maxLength: 300,
  },
  { name: "location.landmark", label: "Landmark", minLength: 3, maxLength: 150 },
  { name: "location.title", label: "title", minLength: 0, maxLength: 150 },
  { name: "location.city", label: "City", minLength: 2, maxLength: 50 },
  {
    name: "location.description",
    label: "Description",
    minLength: 2,
    maxLength: 300,
  },
  { name: "location.lcda", label: "LCDA", minLength: 2, maxLength: 50 },
  { name: "location.area", label: "Area", minLength: 2, maxLength: 50 },
]

export const pupValidationRules = [
  { name: "name", label: "Name", minLength: 2, maxLength: 50 },
  { name: "title", label: "Title", minLength: 2, maxLength: 50 },
  { name: "description", label: "Description", minLength: 2, maxLength: 300 },
  { name: "busStop", label: "Bus Stop", minLength: 2, maxLength: 150 },
  // { name: "locationTitle", label: "Location Title", minLength: 2, maxLength: 50}
]

export const locationValidationRules = [
  { name: "title",label: "Title", minLength: 2, maxLength: 50 },
  { name: "description", label: "Description", minLength: 2, maxLength: 300 },
  { name: "lcda", label: "L.C.D.A.", minLength: 2, maxLength: 50 },
  { name: "city",label: "City", minLength: 2, maxLength: 50 },
  { name: "area", label: "Area", minLength: 2, maxLength: 50 },
  { name: "landmark",label: "Landmark", minLength: 2, maxLength: 150 },
]