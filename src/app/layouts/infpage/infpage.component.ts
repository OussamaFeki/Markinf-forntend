import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthoInfService } from 'src/app/services/autho-inf.service';
import io from 'socket.io-client'
import { Observable } from 'rxjs';
import { ShareserviceService } from 'src/app/services/shareservice.service';
@Component({
  selector: 'app-infpage',
  templateUrl: './infpage.component.html',
  styleUrls: ['./infpage.component.css']
})
export class InfpageComponent implements OnInit {
  username:any
  id:any
  prof:any
  myForm:any
  address:any
  counter:any
  numberofnewman:any
  socket:any
  test:number=0
  image:any
  fbid:any
  
  constructor(private auth:AuthoInfService,private route:Router,
    private formbuilder:FormBuilder,
    private share:ShareserviceService) {
    
    this.myForm=this.formbuilder.group({
      fullname:['']
    })
    this.username=this.auth.getprof().fullname
    this.id=this.auth.getprof().id
    this.auth.getinf(this.id).subscribe(doc=>{this.prof=doc
    this.image=this.prof.image
    this.fbid=this.prof.facebookId
    this.share.boiteinvitofinf(this.id).subscribe((res:any)=>{
      this.test=res.notif
    })
    })
    console.log(this.auth.IsloggedIn())
    this.socket=io('http://localhost:3000')
    
  }

  ngOnInit(): void {
    this.listen(`notif ${this.id}`).subscribe((data:any)=>{
      this.test=data
      console.log(this.test)
     })
  }
  logout(){
   localStorage.clear()
   this.route.navigate(['/login'])
  }
  search(){
    this.address='?fullname='+this.myForm.get('fullname').value
    if(this.myForm.get('fullname').value){
       this.route.navigateByUrl(`/influencer/managers${this.address}`)
    }else{
      this.route.navigate(['/influencer/managers'])}
  }
  listen(eventName:any){
    return new Observable((sub:any)=>{
      this.socket.on(eventName,(data:any)=>{
      sub.next(data)
      })
    })
  }
  desnot(){
    this.test=0
    this.share.restnotifinf(this.id).subscribe(doc=>console.log(doc))

  }
}
