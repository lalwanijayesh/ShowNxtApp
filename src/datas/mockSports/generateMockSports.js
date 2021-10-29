import {mockSports} from './mockSportsData';

export const generateSportList = () => {
  const listOfSport = [];
  for (let i = 0; i < mockSports.length; i++) {
    let sport = mockSports[i].sport;
    listOfSport.push(sport);
  }
  return listOfSport;
}

export const generateListOfPositionBySport = (sportName) => {
  for (let i = 0; i < mockSports.length; i++) {
    const sport = mockSports[i].sport;
    console.log(sport);
    console.log(sportName);
    if (sportName === sport) {
      console.log(mockSports[i]);
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