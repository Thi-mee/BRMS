

const compareObjects = (obj1, obj2) => {
  const loc1keys = Object.keys(obj1).sort();
  const loc2keys = Object.keys(obj2).sort();
  if (loc1keys.length !== loc2keys.length) {
    return false;
  } else {
    const areEqual = loc1keys.every((key, index) => {
      const objValue1 = obj1[key];
      const objValue2 = obj2[loc2keys[index]];
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
  pickuppoint = {};
  locations = []
  constructor(pickupPoint, locations) {
    this.locations = locations;
    this.pickuppoint = pickupPoint;
  }

  getStatus = (status) => {
    if (typeof status === 'boolean') {
      return status === true ? 'active' : 'inactive';
    } else {
      switch (status) {
        case 'active':
          return 'active';
        case 'inactive':
          return 'inactive';
        default:
          throw new Error('Invalid status');
      }
    }
  }

  getAddPkp = () => {
    const pkpDto = {
      name: this.pickuppoint.name,
      title: this.pickuppoint.title,
      busStop: this.pickuppoint.busStop,
      description: this.pickuppoint.description,
      status: this.getStatus(this.pickuppoint.status),
    }
    if (this.pickuppoint.location.id) {
      const location = this.locations.find(loc => loc.id === this.pickuppoint.location.id);
      if (!location) {
        throw new Error('Error selecting loaction ' + location.title);
      }
      const isUnchanged = compareObjects(location, this.pickuppoint.location);
      if (isUnchanged) {
        pkpDto.locationId = this.pickuppoint.location.id;
      } else {
        pkpDto.location = this.pickuppoint.location;
      }
    } else if (this.pickuppoint.location) {
      delete this.pickuppoint.location.id;
      pkpDto.location = this.pickuppoint.location;
    }
    return pkpDto;
  }

  getUpdatePkp = () => {
    const pkpDto = {
      id: this.pickuppoint.id,
      name: this.pickuppoint.name,
      title: this.pickuppoint.title,
      busStop: this.pickuppoint.busStop,
      description: this.pickuppoint.description,
      status: this.getStatus(this.pickuppoint.status),
    }
    if (this.pickuppoint.location.id) {
      const location = this.locations.find(loc => loc.id === this.pickuppoint.location.id);
      if (!location) {
        throw new Error('Error selecting loaction ' + location.title);
      }
      const isUnchanged = compareObjects(location, this.pickuppoint.location);
      console.log(this.pickuppoint)
      if (isUnchanged) {
        pkpDto.locationId = this.pickuppoint.location.id;
      } else {
        pkpDto.location = this.pickuppoint.location;
      }
    } else if (this.pickuppoint.location) {
      delete this.pickuppoint.location.id;
      pkpDto.location = this.pickuppoint.location;
    }
    return pkpDto;
  }
}

export class BulkPkpDto {
  constructor(pickupPoints, locations) {
    this.pickupPoints = pickupPoints.map(pickupPoint => {
      pickupPoint.status = this.getStatus(pickupPoint.status);
      const location = locations.find(l => l.title === pickupPoint.locationTitle);
      delete pickupPoint.locationTitle;
      if (location && location.id) {
        return { ...pickupPoint, locationId: location.id }
      } else {
        return { ...pickupPoint, location: location }
      }
    });
  }
  getPickupPoints = () => {
    return this.pickupPoints;
  }
  getStatus = (status) => {
    if (typeof status === 'boolean') {
      return status === true ? 'active' : 'inactive';
    }
    if (status === 0) return 'inactive';
    if (status === 1) return 'active';
    throw new Error('Invalid status');
  }
}

