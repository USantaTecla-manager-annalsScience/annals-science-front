import { FormGroup, ValidationErrors, ValidatorFn, Validators } from "@angular/forms";

const EMAIL_REG_EXP = /[a-zA-Z0-9.-_]{1,}@[a-zA-Z.-]{2,}[.]{1}[a-zA-Z]{2,}/;

export const passwordMatchValidator: ValidatorFn = (modalForm: FormGroup): ValidationErrors | null => {
    if (modalForm.get('password').value === modalForm.get('passwordRepeat').value)
      return null;
    else
      return {passwordMismatch: true};
  };

const LOGIN_FORM = {
    CONF:{
        email: ['', [Validators.required, Validators.pattern(EMAIL_REG_EXP)]],
        password: ['',Validators.required]
    }
}

const REGISTER_FORM = {
    CONF:{
        name: ['', Validators.required],
        surname: ['', Validators.required],
        email: ['', [Validators.required, Validators.pattern(EMAIL_REG_EXP)]],
        password: ['',Validators.required],
        passwordRepeat: ['', [Validators.required]]
    }
}



export { LOGIN_FORM, REGISTER_FORM };
