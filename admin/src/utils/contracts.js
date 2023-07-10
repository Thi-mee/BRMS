


const compareLocations = (location1, location2) => {
  const loc1keys = Object.keys(location1).sort();
  const loc2keys = Object.keys(location2).sort();
  if (loc1keys.length !== loc2keys.length) {
    return false;
  } else {
    const areEqual = loc1keys.every((key, index) => {
      const objValue1 = location1[key];
      const objValue2 = location2[loc2keys[index]];
      return objValue1 === objValue2;
    });
    if (areEqual) {
      return true;
    } else {
      return false
    }
  }
}

export class PkpDto {
  constructor(pickupPoint) {
    this.name = pickupPoint.name;
    this.title = pickupPoint.title;
    this.busStop = pickupPoint.busStop;
    this.description = pickupPoint.description;
    this.status = pickupPoint.status === true ? 'active' : 'inactive';
    if (pickupPoint.location.id) {
      this.locationId = pickupPoint.location.id;
      if (!compareLocations(pickupPoint.location, pickupPoint.locationOriginal)) {
        this.location = { ...pickupPoint.location };
      }
    } else {
      this.location = { ...pickupPoint.location };
    }
  }


  
}

export class BulkPkpDto {
  constructor(pickupPoints, newLocations, locations) {
    this.pickupPoints = pickupPoints.map(pickupPoint => {
      const location = newLocations.find(newLocation => newLocation.title === pickupPoint.locationTitle);
      if (location) {
        if (this.isExistingLocation(location, locations)) {
          return {...pickupPoint, locationId: location.id}
        } else {
          return {...pickupPoint, location: location}
        }
      }
      console.log("Why you no go get location?")
      return pickupPoint;
    });  
  }

  isExistingLocation = (location, locations) => {
    return locations.some(loc => compareLocations(loc, location));
  }
}