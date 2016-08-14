const EventEmitter = require('events').EventEmitter;
import moment from 'moment';

let now = moment();

function updateDays(now) {
  //这个月有多少天
  let inNow = moment(now._d);
  let dayNum = inNow.endOf('month').date();
  let currentMonth = now.month()+1;
  let days = [];


  for (let i = 1; i <= dayNum; i++) {
    let thisDay = inNow.date(i);
    let isCurrentWeek = thisDay.week() === now.week() && thisDay.year() === now.year();
    days.push({
      date: i,
      week: thisDay.day(),
      //判断是不是和今天同一周
      isCurrentWeek
    });
  }
  return days;
}


const DaysStore = Object.assign({}, EventEmitter.prototype, {
  days: updateDays(now),

  now: now,

  monthId: '' + now.year() + now.month(),

  initialize() {
    
  },

  initDays() {

  },

  getDays() {
    return this.days;
  },

  getMonthId() {
    return this.monthId;
  },

  preWeek() {
    this.now.subtract(7, 'days');
    this.days = updateDays(this.now);
  },

  afterWeek() {
    this.now.add(7, 'days');
    this.days = updateDays(this.now);
  },

  preMonth() {
    this.now.subtract(1, 'months');
    this.days = updateDays(this.now);
    this.monthId = '' + this.now.year() + this.now.month();
  },

  afterMonth() {
    this.now.add(1, 'months');
    this.days = updateDays(this.now);
    this.monthId = '' + this.now.year() + this.now.month();
  },

  emitChange() {
    this.emit('change');
  },

  addChangeListener(callback) {
    this.on('change', () => {
      callback(this.monthId);
    })
  }
})
export default DaysStore;
