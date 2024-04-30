import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';

import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  projectForm: UntypedFormGroup;

  ngOnInit() {
    this.projectForm = new UntypedFormGroup({
      'projectName': new UntypedFormControl(
        null,
        [Validators.required, CustomValidators.invalidProjectName],
        CustomValidators.asyncInvalidProjectName
      ),
      'email': new UntypedFormControl(null, [Validators.required, Validators.email]),
      'projectStatus': new UntypedFormControl('critical')
    });
  }

  onSaveProject() {
    console.log(this.projectForm.value);
  }
}
