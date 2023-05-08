import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DEFAULT_EDUCATIONAL_LEVELS, DEFAULT_EDUCATION_LEVEL, DEFAULT_ITEM_QUANTITY_PER_REQUEST } from 'src/app/constants/prompt';
import { EducationLevel } from 'src/app/enums/prompt.enums';

export interface IControlsForm {
  subject: string;
  itemQuantity: number;
  educationLevel: EducationLevel;
}

@Component({
  selector: 'app-specification-controls',
  templateUrl: './specification-controls.component.html',
  styleUrls: ['./specification-controls.component.scss']
})
export class SpecificationControlsComponent {
  @Input() isSidebar: boolean = false;
  @Output() onControlsFormSubmit: EventEmitter<IControlsForm> = new EventEmitter();
  educationalLevels = DEFAULT_EDUCATIONAL_LEVELS;

  controlsForm = new FormGroup({
    subject: new FormControl('', Validators.required),
    itemQuantity: new FormControl(DEFAULT_ITEM_QUANTITY_PER_REQUEST, Validators.required),
    educationLevel: new FormControl(DEFAULT_EDUCATION_LEVEL, Validators.required)
  });

  onFormSubmit() {
    if (this.controlsForm.valid) {
      this.onControlsFormSubmit.emit(this.controlsForm.value as IControlsForm);
    }
  }
}
