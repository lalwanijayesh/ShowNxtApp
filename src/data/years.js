const  years = [];
const currentYear = new Date().getFullYear();
for (let year = 1975; year <= currentYear; year++) {
  years.push({label:`${year}`, value:`${year}`});
}

export default years;