import {
  Component,
  OnInit,
  ViewChild,
  Output,
  EventEmitter,
} from "@angular/core";
import { UntypedFormControl, UntypedFormGroup, Validators, NgForm } from "@angular/forms";

import { first } from "rxjs/operators";
import { Post } from "src/app/model/Post";
import { AuthService } from "src/app/services/auth.service";
import { PostService } from "src/app/services/post.service";

@Component({
  selector: "app-create-post",
  templateUrl: "./create-post.component.html",
  styleUrls: ["./create-post.component.scss"],
})
export class CreatePostComponent implements OnInit {
  @ViewChild("formDirective") formDirective: NgForm;
  @Output() create: EventEmitter<any> = new EventEmitter();

  form: UntypedFormGroup;

  isOpen = false;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.form = this.createFormGroup();
  }

  createFormGroup(): UntypedFormGroup {
    return new UntypedFormGroup({
      title: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(5),
      ]),
      body: new UntypedFormControl("", [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onSubmit(formData: Pick<Post, "title" | "body">): void {
    this.postService
      .createPost(formData, this.authService.userId)
      .pipe(first())
      .subscribe(() => {
        this.create.emit(null);
      });
    this.form.reset();
    this.formDirective.resetForm();
  }
}
