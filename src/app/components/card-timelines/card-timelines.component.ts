import { CommonModule } from "@angular/common";
import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { NzCardModule } from "ng-zorro-antd/card";
import { Message } from "primeng/api";
import { MessagesModule } from "primeng/messages";


@Component({
  selector: 'app-card-timelines',
  standalone: true,
  imports: [CommonModule, NzCardModule, MessagesModule],
  templateUrl: './card-timelines.component.html',
  styles: [
    `
      nz-card {
        border-radius: 10px;
        box-shadow: 1px 1px 3px rgb(177, 177, 177) !important;
        background-color: #e7f4f5;
      }
    `
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardTimelinesComponent implements OnChanges, AfterViewInit {
  
  @Input({required: true}) timelines: any[] = [];
  
  messages: Message[]  = [{ severity: 'info', summary: '', detail: 'Actualmente no se tiene una linea de tiempo' }]
  
  loading: boolean = true;
  
  ngOnChanges(changes: SimpleChanges): void {}
  
  ngAfterViewInit(): void {
    this.loading = false;
  }
  
}