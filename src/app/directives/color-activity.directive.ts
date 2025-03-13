import { Directive, ElementRef, Input } from "@angular/core";


@Directive({
  selector: '[appColorActivity]',
  standalone: true
})
export class ColorActivityDirective {

  @Input() appColorActivity = '';

  private readonly colors = new Map([
    ['Correo', '#efd77a'],
    ['Llamada', '#ffb4b2'],
    ['Reunión', '#dccaea'],
    ['Visita', '#a8eefc'],
    ['Whatsapp', '#bdebc3'],
    ['Otro', '#f0f0f0']
  ]);
  constructor(private el: ElementRef) {}

  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.colors.get(this.appColorActivity);
  }
}