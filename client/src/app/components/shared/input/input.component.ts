import { animate, style, transition, trigger } from "@angular/animations";
import { ValidateImageService } from "./../../../services/validate-image/validate-image.service";
import { KeyValuePipe, NgFor } from "@angular/common";
import {
  Component,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  inject,
  Input,
  OnInit,
  Output,
  signal,
  viewChild
} from "@angular/core";
import {
  AbstractControl,
  FormControl,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { EyeComponent } from "@components/icons/eye/eye.component";
import { ButtonComponent } from "@components/shared/button/button.component";
import { SvgIconComponent } from "@components/shared/svg-icon/svg-icon.component";
import { AlertService } from "@services/alert/alert.service";
import { AlertProps } from "@type/types";
import { cn } from "../../../helpers/helpers";

@Component({
  selector: "klock-input",
  standalone: true,
  imports: [
    EyeComponent,
    ReactiveFormsModule,
    KeyValuePipe,
    NgFor,
    SvgIconComponent,
    ButtonComponent
  ],
  templateUrl: "./input.component.html",
  styleUrl: "./input.component.css",
  animations: [
    trigger("actionHoverMenu", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-100px)" }),
        animate(
          "500ms ease-in",
          style({ opacity: 1, transform: "translateY(0)" })
        )
      ]),

      transition(":leave", [
        animate(
          "500ms ease-out",
          style({ opacity: 0, transform: "translateY(-100px)" })
        )
      ])
    ])
  ]
})
export class InputComponent implements OnInit {
  @Input() type = "text";
  @Input() inputType: "text" | "textarea" = "text";
  @Input() placeholder = "placeholder";
  @Input() label = "";
  @Input() id = "input-id";
  @Input() isPassword = false;
  @Input() control = new FormControl();
  @Input() isRequired = false;
  @Input() className = "";
  @Input() pattern?: string;
  @Input() mismatch?: FormControl;
  @Input() fileClass = "";

  @Output() uploadImage = new EventEmitter<File | null>();

  cn = cn;

  alertService = inject(AlertService);
  validateImageService = inject(ValidateImageService);

  selectedImage = signal<File | null>(null);
  previewImage = signal("");
  isDragOver = signal(false);
  displayUpdateActions = signal(false);
  showPassword = signal(false);
  displyEyeIcon = signal(false);

  @HostBinding("class") get hostClass() {
    return "flex flex-col gap-2.5 relative";
  }

  @HostListener("mouseenter", ["$event"])
  hoverEnterFunction() {
    this.displyEyeIcon.set(true);
  }
  @HostListener("mouseleave", ["$event"])
  hoverLeaveFunction() {
    this.displyEyeIcon.set(false);
  }

  uploadElement = viewChild<ElementRef<HTMLElement> | null>("uploadImage");

  getErrorMessages(): Record<string, string> {
    if (this.type === "password" || this.mismatch) {
      return {
        required: "Field can't be empty",
        minlength: "Field should be at least eight characters",
        pattern: "Strength required: 8+ characters, include numbers & symbols.",
        mismatch: "Passwords do not match"
      };
    } else if (this.type === "email") {
      return {
        required: "Field can't be empty",
        email: "Invalid email address",
        pattern: "Invalid email format"
      };
    } else {
      return {
        required: "Field can't be empty",
        minlength: "Field should be at least four characters",
        min: "Minimum value should be 1"
      };
    }
  }

  toggleIsShowPassword() {
    this.showPassword.set(!this.showPassword());
    this.type == "password" ? (this.type = "text") : (this.type = "password");
  }

  matchValidator(controlToMatch: FormControl): ValidatorFn {
    return (control: AbstractControl) => {
      return controlToMatch.value === control.value ? null : { mismatch: true };
    };
  }

  mouseOver(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.displayUpdateActions.set(!!event);
  }

  mouseLeave(event: MouseEvent) {
    event.stopImmediatePropagation();
    this.displayUpdateActions.set(!event);
  }

  dragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(!!event);
  }

  dragLeave(event: DragEvent) {
    event.preventDefault();
    this.isDragOver.set(!!event);
  }

  fileDrop(event: DragEvent) {
    event.preventDefault();
    const droppedFiles = (event.dataTransfer as DataTransfer).files;
    this.processFiles(droppedFiles);
  }

  uploadFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.processFiles(files);
  }

  processFiles(files: FileList) {
    const file = files[0];

    this.validateImageService
      .validateSelectedImage(file)
      .then((validatedFile) => {
        this.selectedImage.set(validatedFile);
        this.previewImage.set(URL.createObjectURL(validatedFile));
        this.uploadImage.emit(validatedFile);
      })
      .catch((error: AlertProps) => {
        this.alertService.showAlert(error);
      });
  }

  updateImage() {
    this.uploadElement()?.nativeElement?.click();
  }

  deleteImage() {
    this.selectedImage.set(null);
    this.previewImage.set("");
    this.displayUpdateActions.set(false);
    this.uploadImage.emit(null);
  }

  ngOnInit(): void {
    if (this.pattern) {
      this.control.setValidators([Validators.pattern(this.pattern)]);
    }
    if (this.mismatch) {
      this.control.setValidators([
        Validators.required,
        this.matchValidator(this.mismatch)
      ]);
    }
  }
}
