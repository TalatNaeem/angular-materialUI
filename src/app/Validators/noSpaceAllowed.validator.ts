import { AbstractControl, FormControl } from "@angular/forms";


export class CustomValidator{

  static NoSpaceAllowed(control: FormControl){
    if(control.value != null && control.value.indexOf(' ') != -1){
      return {noSpaceAllowed: true};
    }
    return null;
  }

  static minValueOne(control: FormControl){
    if(control.value != null){
      if(control.value <= 0)
        return {minValueOne: true};
    }
    return null;
  }

  static AgeValidator(control: FormControl){
    debugger;
    const birthDate = new Date(control.value);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    if(birthDate > today){
      return {ageFuture: true};
    }
    const monthDifference = today.getMonth() - birthDate.getMonth();

    // Adjust age if birth date hasn't occurred yet this year
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }

    return age >= 20 ? null : { ageInvalid: true };
  }

  static checkUserName(control: AbstractControl) : Promise<any>{
    return userNameAllowed(control.value);
  }
}

function userNameAllowed(userName: string){
  let users = ['talat', 'naeem','gondal'];
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      if(users.includes(userName)){
        resolve({checkUserName: true});
      }
      else {
        resolve(null);
      }
    }, 5000);
  })
}