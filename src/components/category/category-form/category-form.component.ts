import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {ActivatedRoute} from '@angular/router';
import {CategoryService} from '../../../services/category.service';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  styleUrls: ['./category-form.component.css']
})
export class CategoryFormComponent implements OnInit {
  categoryForm: FormGroup;
  categoryId: number | null = null;
  successfullyAdded: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private categoryService: CategoryService
  ) {
    this.categoryForm = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.params['categoryId'];
    this.categoryId = paramId !== null ? +paramId : null;
    if (this.categoryId) {
      this.categoryService.getCategory(this.categoryId).subscribe(category => {
        this.categoryForm.patchValue(category);
      });
    }

  }

  saveCategory(): void {
    if (this.categoryForm.valid) {
      const saveObservable = this.categoryId
        ? this.categoryService.updateCategory(this.categoryForm.value)
        : this.categoryService.saveCategory(this.categoryForm.value);

      saveObservable.subscribe(() => {
        this.successfullyAdded = true;
      }, error => {
        console.error('Error saving category:', error);
      });
    }
  }
}
