import { Component, OnInit,OnDestroy } from '@angular/core';
import {  FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ShareserviceService } from 'src/app/services/shareservice.service';
import { AuthoManService } from 'src/app/services/autho-man.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-addprod',
  templateUrl: './addprod.component.html',
  styleUrls: ['./addprod.component.css']
})
export class AddprodComponen implements OnInit,OnDestroy {
  myForm:any
  id_man:any
  image:any
  constructor(private route:Router 
    ,private formbuild:FormBuilder,
    private share:ShareserviceService,
    private auth:AuthoManService,
    private toastr:ToastrService ) {
    this.myForm=this.formbuild.group({
      name:['',Validators.required],
      mark:['',Validators.required],
      image:[null],
      description:['',Validators.required],
      price:['',Validators.required],
      tage:['',Validators.required]  
    })
   this.id_man=this.auth.getprof().id
   }

  ngOnInit(): void {
  }
  selectImage(event:any){
    if(event.target.files.length >0){
      const file =event.target.files[0]
      this.myForm.patchValue({
        image:file
      });
      this.myForm.get('image')?.updateValueAndValidity()
    }
  }
  add(dan:any){
    const formData:any =new FormData();
    formData.append('name', this.myForm.get('name').value)
    formData.append('mark', this.myForm.get('mark').value)
    formData.append('image', this.myForm.get('image').value)
    formData.append('description', this.myForm.get('description').value)
    formData.append('price', this.myForm.get('price').value)
    formData.append('tage', this.myForm.get('tage').value)
    // console.log(this.myForm.value.image)
    // this.myForm.image=formData
    //let profile=this.myForm.value
    console.log(formData)
    console.log(this.myForm.value)
    this.share.addprod(formData,this.id_man).subscribe(doc=>{
      console.log(doc)
      this.toastr.success('succeded','notification')
      this.myForm.reset()
    },(err)=>{
      console.log(err.error);
      this.toastr.error(err.error,'Error')
    })
    
  }
  tocranon(){
    this.route.navigate(['manager/anonce'])
  }
  ngOnDestroy(): void {
    
  }
}
