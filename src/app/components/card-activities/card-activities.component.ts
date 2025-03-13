import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { Message } from "primeng/api";
import { MessagesModule } from "primeng/messages";
import { ColorActivityDirective } from "src/app/directives/color-activity.directive";


@Component({
  selector: 'app-card-activities',
  standalone: true,
  imports: [NzCardModule, ColorActivityDirective, CommonModule, MessagesModule],
  templateUrl: './card-activities.component.html',
  styles: [
    `
      nz-card {
        border-radius: 10px;
        box-shadow: 1px 1px 3px rgb(177, 177, 177) !important;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardActivitiesComponent implements OnChanges, AfterViewInit {

  @Input({required: true}) activities!: any[];

  messages: Message[]  = [{ severity: 'info', summary: '', detail: 'Actualmente no tienes ninguna actividad generada' }];
  loading: boolean = true;

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['activities'].currentValue) {
      this.activities.forEach(e => {
        e.activities_assign_to = JSON.parse(e.activities_assign_to as string)
      })
    }
  }

  ngAfterViewInit(): void {
   this.loading = false; 
  }
  
}