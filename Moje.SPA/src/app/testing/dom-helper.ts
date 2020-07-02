import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';


export class DOMHelper<T> {

  private fixture: ComponentFixture<T>;
  constructor(fixture: ComponentFixture<T>)   {
    this.fixture = fixture;
  }

    textContentByCss(tagName: string): string {
    const element = this.fixture.debugElement.query(By.css(tagName));
    if (element) {
    return element.nativeElement.textContent;
    }
  }


  clickButton(buttonText: string) {
    this.findAll('button').forEach(button => {
      const buttonElement: HTMLButtonElement =
        button.nativeElement;
      if (buttonElement.textContent === buttonText) {
        buttonElement.click();
      }
    });
  }

  findAll(tagName: string) {
    return this.fixture.debugElement
      .queryAll(By.css(tagName));
  }
}
