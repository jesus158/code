import { Component, EventEmitter, Output } from '@angular/core';
import { ResponseTemplateService } from '../../response-template.service';
import { Validators, FormBuilder } from '@angular/forms';
import { PrimeNGConfig } from 'primeng/api';
import { ResponseTemplate } from '../../interfaces/response-template';

@Component({
  selector: 'app-modal-response-template',
  templateUrl: './modal-response-template.component.html',
  styleUrls: ['./modal-response-template.component.scss'],
})
export class ModalResponseTemplateComponent {
  visible: boolean = false;
  response_template_uid!: string;

  @Output() RealoadResponse: EventEmitter<any> = new EventEmitter<any>();

  ResponseForm = this.fb.group({
    response_template_name: ['', [Validators.required]],
    response_template_response_text: ['', [Validators.required]],
  });

  ngOnInit(): void {
    this.primengConfig.ripple = true;
  }

  constructor(
    private primengConfig: PrimeNGConfig,
    private fb: FormBuilder,
    private responseService: ResponseTemplateService
  ) {}

  showModalSave() {
    this.visible = true;
  }

  async getResponse(
    response_template_uid: string | null | undefined
  ): Promise<ResponseTemplate[]> {
    const result = await this.responseService.get_ResponseTemplate(
      response_template_uid
    );
    this.ResponseForm.patchValue({
      response_template_name: result.response_template_name,
      response_template_response_text: result.response_template_response_text,
    });
    return result;
  }

  showModalUpdate(response_template_uid: string | null | undefined) {
    this.getResponse(response_template_uid);
    this.visible = true;
  }

  async Save(): Promise<any> {
    if (this.response_template_uid) {
      if (!this.ResponseForm.valid) {
        return this.ResponseForm.markAllAsTouched();
      } else {
        const result = await this.responseService.update_response_template(
          this.response_template_uid,
          this.ResponseForm.value
        );
        this.ResponseForm.reset();
        this.visible = false;
        this.RealoadResponse.emit();
        return result;
      }
    } else {
      if (!this.ResponseForm.valid) {
        return this.ResponseForm.markAllAsTouched();
      } else {
        const result = await this.responseService.post_response_template(
          this.ResponseForm.value
        );
        this.ResponseForm.reset();
        this.visible = false;
        this.RealoadResponse.emit();
        return result;
      }
    }
  }

  onHide() {
    this.ResponseForm.reset();
    this.response_template_uid = '';
  }
}
