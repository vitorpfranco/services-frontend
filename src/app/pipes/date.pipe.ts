

import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {

  transform(date: any): any  {

  let dateOut: moment.Moment = moment(date, "EEEE, MMM, d, y, h:mm:ss zzzz")

  return dateOut.format("DD/MM/yyyy HH:mm:ss")

  }

}
