import {NO_SPECIAL_CHARS_REGEX} from "./constants";


export const pupValidationRules = [
  { name: "name", label: "Name", minLength: 2, maxLength: 50, pattern: NO_SPECIAL_CHARS_REGEX },
  { name: "title", label: "Title", minLength: 2, maxLength: 50, pattern: NO_SPECIAL_CHARS_REGEX },
  { name: "description", label: "Description", minLength: 2, maxLength: 300, pattern: NO_SPECIAL_CHARS_REGEX },
  { name: "busStop", label: "Bus Stop", minLength: 2, maxLength: 150, pattern: NO_SPECIAL_CHARS_REGEX },
  // { name: "locationTitle", label: "Location Title", minLength: 2, maxLength: 50}
]
