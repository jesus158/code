import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: 'filterCustomer',
  standalone: true
})
export class FilterCustomer implements PipeTransform {
  
  transform(array : any[], args: string): any[] {
    if(args.length > 0) {
      return array.filter((customer) => customer.lead_company.toLowerCase().includes(args.toLowerCase()));
    }
    return array;
  }

}