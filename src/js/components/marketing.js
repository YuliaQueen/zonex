let marketing = document.querySelector('.marketing');

//close card
marketing.addEventListener('click', (e) => {
  if (e.target.classList.contains('marketing__close')) {
    closeMarketing();
  }
})

const closeMarketing = () => {
  marketing.classList.remove('marketing--visible');
}

//marketing-data change

const data = [
  {
    title: 'Wonderful Product name 1',
    where: 'Moscow, Russia'
  },

  {
    title: 'Wonderful Product name 2',
    where: 'Kiev, Ukraine'
  },
  {
    title: 'Wonderful Product name 3',
    where: 'Rome, Italy'
  },
];

let counter = 0;
let delay = 20000;

const randomInteger = (min, max) => {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}


const changeMarketingData = () => {
  marketing.classList.remove('marketing--visible');

  setTimeout(() => {
    marketing.classList.add('marketing--visible');
  }, delay - 10000)

  const stringTitle = `${data[counter].title}`;
  const stringWhere = `${randomInteger(5, 59)} minutes ago ${data[counter].where}`;

  marketing.querySelector('.marketing__title').textContent = stringTitle;
  marketing.querySelector('.marketing__when-from').textContent = stringWhere;

  counter++;

  if (counter === data.length) {
    counter = 0;
  }
}

changeMarketingData();

setInterval(changeMarketingData, delay);
