import {mockSports} from './mockSportsData';

export const generateSportList = () => {
  const listOfSport = [];
  mockSports.forEach((value) => {
    listOfSport.push(value.sport);
  })
  return listOfSport;
}

const generateListOfAllPositions = () => {
  const listOfPositions = [];
  mockSports.forEach((value) => {
    listOfPositions.push(...value.positions);
  })
  return listOfPositions;
}

export const generateListOfPositionBySport = (sportName) => {
  if (sportName === null || sportName === undefined) {
    return generateListOfAllPositions();
  }
  
  for (let i = 0; i < mockSports.length; i++) {
    const sport = mockSports[i].sport;
    if (sportName === sport) {
      return mockSports[i].positions;
    }
  }   
  
  return ['None'];
}

export const generateInfo = (listOfString) => {
  const sportInfos = [];
  for (let i = 0; i < listOfString.length; i++) {
    let item = listOfString[i];
    sportInfos.push({label: item, value: item});
  }
  return sportInfos;
}