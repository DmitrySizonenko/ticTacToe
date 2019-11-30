import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ILogMove} from '../field/field.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {

  @Input() logs: ILogMove[];
  @Input() winner: string;
  @Output() closeModal = new EventEmitter<boolean>();


  constructor() { }

  ngOnInit() {
  }

  public closeModalWindow(): void {
    this.closeModal.emit(true);
  }

}
