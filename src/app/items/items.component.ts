import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

import { Item } from '../models/model';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemComponent {

  @Input() item: Item;

  @Output() edit = new EventEmitter<boolean>();
  @Output() delete = new EventEmitter<boolean>();
  @Output() view = new EventEmitter<boolean>();
}


