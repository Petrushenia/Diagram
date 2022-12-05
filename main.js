class Statistcs {
  constructor(root) {
    this.root = root;
    this.yellowIndicator = this.root.querySelector('.yellow-js');
    this.greenIndicator = this.root.querySelector('.green-js');
    this.greenIndPos = 20 - parseInt(getComputedStyle(this.yellowIndicator).strokeDasharray, 10);
    this.statDataPromoter = this.root.querySelectorAll('.statistics-data-percent')[0];
    this.statDataSkeptic = this.root.querySelectorAll('.statistics-data-percent')[1];
    this.inputSkeptics = this.root.querySelector('.skeptic');
    this.inputPromoters = this.root.querySelector('.promoters');

    this.inputPromoters.addEventListener('input',  (e) => {
      this.validInputPromoters(e)
      this.changeStatPromoters();
      this.changeStatisticsPromoters();
    })
    
    this.inputSkeptics.addEventListener('input', (e) => {
      this.validInputSkeptics(e);
      this.changeStatSkeptics();
      this.changeStatisticsSkeptics()
    })
  }

  validInputPromoters = (e) => {
    if (+e.target.value > 100) {
      e.target.value = 100 - this.inputSkeptics.value;
    }else if (+e.target.value + +this.inputSkeptics.value > 100) {
       e.target.value = 100 - +this.inputSkeptics.value;
    }
  }

  validInputSkeptics = (e) => {
    if (+e.target.value > 100) {
      e.target.value = 100 - +this.inputPromoters.value;
    }else if (+e.target.value + +this.inputPromoters.value > 100) {
      e.target.value = 100 - +this.inputPromoters.value;
    }
  }

  changeStatPromoters = () => {
    this.statDataPromoter.textContent = `${this.inputPromoters.value.length > 3 ? this.inputPromoters.value.slice(0, 4) : this.inputPromoters.value}%`;
  }

  changeStatSkeptics = () => { 
    this.statDataSkeptic.textContent = `${this.inputSkeptics.value > 3 ? this.inputSkeptics.value.slice(0, 4) : this.inputSkeptics.value}%`;
  }

  changeStatisticsPromoters = () => {
    let currentValue = +this.inputPromoters.value;
    if (currentValue > 90) {
      currentValue = currentValue - 10;
    }
    else if (parseInt(getComputedStyle(this.greenIndicator).strokeDasharray, 10) + currentValue >= 90) {
      currentValue = currentValue - 10
    }
    this.yellowIndicator.style.strokeDasharray = `${currentValue} ${100 - currentValue}`;
    this.greenIndicator.style.strokeDashoffset = 20 - currentValue;
  }

  changeStatisticsSkeptics = () => {
    let currentValue = +this.inputSkeptics.value;
    if (currentValue > 90) {
      currentValue = currentValue - 10;
    }else if (parseInt(getComputedStyle(this.yellowIndicator).strokeDasharray, 10) + currentValue >= 90) {
      currentValue = currentValue - 10
    }
    this.greenIndicator.style.strokeDasharray = `${currentValue} ${100 - currentValue}`;
  }
} 

const stat = new Statistcs(document.querySelector('.wrapper-chart-js'))