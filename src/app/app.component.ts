import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Component, ViewChild} from '@angular/core';
import {MatChipInputEvent} from '@angular/material/chips';

export interface Fruit {
  name: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  addOnBlur = false;
  readonly separatorKeysCodes = [ENTER, COMMA, 299] as const;
  fruits: Fruit[] = [{name: 'Lemon'}, {name: 'Lime'}, {name: 'Apple'}];
  fuitToAdd:string = '';
  readonly COMMA_CHAR = ',';

  @ViewChild('cheapInput')
  cheapInput!:HTMLInputElement;


  add(event: MatChipInputEvent): void {
     console.log(event);
    const value = (event.value || '').trim();

    if (value) {
      this.fruits.push({name: value});
    }

    if(event.chipInput){
      event.chipInput!.clear();
    }

  }


  //for mobile chrome issue
  checkCharacter(){
    let fruit = this.fuitToAdd.trim();
    let character = fruit.substring(fruit.length-1);
    if(character == this.COMMA_CHAR){
      this.add({input: this.cheapInput, value:fruit.substring(0,fruit.length-1)});
      this.fuitToAdd = '';
    }
  }

  remove(fruit: Fruit): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }
}
