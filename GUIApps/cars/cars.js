const cars = [
  { make: 'Honda', image: 'images/honda-accord-2005.jpg', model: 'Accord', year: 2005, price: 7000 },
  { make: 'Honda', image: 'images/honda-accord-2008.jpg', model: 'Accord', year: 2008, price: 11000 },
  { make: 'Toyota', image: 'images/toyota-camry-2009.jpg', model: 'Camry', year: 2009, price: 12500 },
  { make: 'Toyota', image: 'images/toyota-corrolla-2016.jpg', model: 'Corolla', year: 2016, price: 15000 },
  { make: 'Suzuki', image: 'images/suzuki-swift-2014.jpg', model: 'Swift', year: 2014, price: 9000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 25000 },
  { make: 'Audi', image: 'images/audi-a4-2013.jpg', model: 'A4', year: 2013, price: 26000 },
];
let carsList = document.getElementById('cars');
let filterForm = document.getElementById('filter_form')

function renderCarListItems(carData) {
  let carTemplate = document.getElementById('car_template');
  let carScript = Handlebars.compile(carTemplate.innerHTML);
  carsList.innerHTML = carScript({ 'cars': carData });
}

function renderSelectOptions() {
  let optionsTemplate = document.getElementById('options_template');
  let optionScript = Handlebars.compile(optionsTemplate.innerHTML);

  let uniqueMakeData = getUniqueData('make');
  document.getElementById('make').insertAdjacentHTML('beforeend', optionScript({ 'cars': uniqueMakeData }));

  let uniqueModelData = getUniqueData('model');
  document.getElementById('model').insertAdjacentHTML('beforeend', optionScript({ 'cars': uniqueModelData}));

  let uniquePriceData = getUniqueData('price');
  document.getElementById('price').insertAdjacentHTML('beforeend', optionScript({ 'cars': uniquePriceData}));

  let uniqueYearData = getUniqueData('year');
  document.getElementById('year').insertAdjacentHTML('beforeend', optionScript({ 'cars': uniqueYearData}));

}

function getUniqueData(option) {
  let uniqueData = [];
  let data = cars.map(car => car[option]);
  data.forEach(car => {
    if (!uniqueData.includes(car)) {
      uniqueData.push(car);
    }
  });
  return uniqueData.map(car => { 
    return { option: car };
  });
}

function renderFilterMatches(filters) {
  let matchingCars = cars.slice();

  filters.forEach(filter => {
    let filterKey = Object.keys(filter)[0];
    let filterValue = filter[filterKey];
    matchingCars = matchingCars.filter(car => {
      return String(car[filterKey]) === filterValue;
    })
  });

  renderCarListItems(matchingCars);
  console.log(matchingCars);
}

function addFilterListener() {
  filterForm.addEventListener('submit', event => {
    event.preventDefault();
    let filters = [];
  
    let formData = new FormData(event.currentTarget)
    const data = {}
    formData.forEach((value, key) => {data[key] = value});
    Object.keys(data).forEach((category, index) => {
      if (data[category] !== 'all') {
        filters.push({ [category]: data[category] });
      }
    });
    console.log(filters);
    renderFilterMatches(filters);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderCarListItems(cars);
  renderSelectOptions();
  addFilterListener();
});