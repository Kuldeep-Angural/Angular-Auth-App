import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-questionarcard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questionarcard.component.html',
  styleUrl: './questionarcard.component.scss'
})
export class QuestionarcardComponent {
  @Input() title: string = '';
  @Input() step: string = '0';
  @Input() status: string = '';

  @Input() index: string = '0';
  @Input() isCompleted: boolean = false;
  @Input() buttonLabel: string = 'Continue';
  @Input() infoText: string = '';
  @Input() skipLabel: string = 'Skip';
  
  @Output() buttonClick = new EventEmitter<void>();
  @Output() skipClick = new EventEmitter<void>();

  onButtonClick() {
    this.buttonClick.emit();

  }

  onSkipClick() {
    this.skipClick.emit();
  }
}
