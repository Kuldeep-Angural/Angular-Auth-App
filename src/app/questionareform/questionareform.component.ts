import { Component } from '@angular/core';
import { QuestionarcardComponent } from './questionarcard/questionarcard.component';
import { QUESTIONNAIRE_FORM_TABS, YOUR_DETAILS_QUESTIONS1, YOUR_DETAILS_QUESTIONS2 } from '../constants/constant';
import { CommonModule } from '@angular/common';
import { ToasterService } from '../services/toaster.service';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { InputComponent } from "../components/input/input.component";
@Component({
  selector: 'app-questionareform',
  standalone: true,
  imports: [QuestionarcardComponent, CommonModule, MatToolbarModule, MatIconModule, InputComponent],
  templateUrl: './questionareform.component.html',
  styleUrls: ['./questionareform.component.scss']
})
export class QuestionareformComponent {
  allCards = QUESTIONNAIRE_FORM_TABS;
  questions1 = YOUR_DETAILS_QUESTIONS1 
  questions2 = YOUR_DETAILS_QUESTIONS2 

  currentCard = 1;
  currentTab='PERSONALDETAILS'

  constructor(private toasterService: ToasterService) {}

  previousCard(): void {
    if (this.currentCard > 1) {
      this.currentCard--;
    }
  }

  nextCard(): void {
    if (this.currentCard < this.allCards.length) {
      this.currentCard++;
    }else{
      this.toasterService.show('Completed','success')
    }
  }

  private updateCardStatus(cardName: string, status: 'COMPLETED' | 'SKIPPED'): void {
    this.allCards.forEach(card => {
      if (card.name === cardName) {
        card.status = status;
      }
    });
    console.log(this.allCards , this.currentCard);
  }

  handleContinue(response: any): void {
    if (this.currentCard===response.index) {
      this.updateCardStatus(response.name, 'COMPLETED');
      this.nextCard();
      
    }
  }

  handleSkip(response: any): void {
    if (this.currentCard===response.index) {
      this.updateCardStatus(response.name, 'SKIPPED');
      this.nextCard();
    }
  }

  handleNextClick(){
    if (this.currentTab==='PERSONALDETAILS') {
      this.currentTab='PERSONALDETAILS2'
    }else{
      this.currentTab='MENU'
    }
  }

  handleBackClick(){
    if (this.currentTab==='PERSONALDETAILS2') {
      this.currentTab='PERSONALDETAILS'
    }else{
      this.currentTab='MENU'
    }
  }
  
}
