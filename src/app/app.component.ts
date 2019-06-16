import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Item } from './models/model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { arrayOfItems } from './helper/items.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit {

  constructor(private fb: FormBuilder) {
  }

  itemMarkedForEdit: Item;
  isAddModal = false;
  viewMode = false;
  bookForm: FormGroup;
  arrayOfItems = arrayOfItems;
  modal: any;

  ngOnInit() {
    this.initForm();
    this.detectCloseModal();
  }

  ngAfterViewInit() {
    this.modal = document.getElementById('modal-add-edit');
  }

  detectCloseModal() {
    window.onclick = (event) => {
      if (event.target === this.modal) {
        this.modal.style.display = 'none';
        this.viewMode = false;
      }
    };
  }

  initForm() {
    this.bookForm = this.fb.group({
      author: ['', [Validators.required]],
      content: ['', [Validators.required]]
    });
  }

  displayModal() {
    this.modal.style.display = 'block';
  }

  closeModal() {
    this.modal.style.display = 'none';
  }

  setCurrentItem(index: number) {

    this.itemMarkedForEdit = {
      ...this.arrayOfItems[index],
      index
    };
  }

  editItem(index: number) {

    this.isAddModal = false;
    this.setCurrentItem(index);
    this.bookForm.patchValue(this.itemMarkedForEdit);
    this.displayModal();
  }

  viewItem(index: number) {

    this.viewMode = true;
    this.isAddModal = false;
    this.setCurrentItem(index);
    this.bookForm.patchValue(this.itemMarkedForEdit);
    this.displayModal();
  }

  addItem() {

    this.itemMarkedForEdit = {} as Item;
    this.isAddModal = true;
    this.bookForm.reset();
    this.displayModal();
  }

  deleteItem(index: number) {

    this.arrayOfItems.splice(index, 1);
  }

  submitForm() {

    this.itemMarkedForEdit.author = this.bookForm.get('author').value;
    this.itemMarkedForEdit.content = this.bookForm.get('content').value;

    if (!this.isAddModal) {
      this.arrayOfItems[this.itemMarkedForEdit.index] = this.itemMarkedForEdit;
    } else {
      this.arrayOfItems.push(this.itemMarkedForEdit);
    }

    this.closeModal();
  }
}
