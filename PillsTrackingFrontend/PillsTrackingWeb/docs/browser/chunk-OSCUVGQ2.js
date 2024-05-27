import{a as K,b as Q,c as X,d as Y,e as Z,f as $,g as ee}from"./chunk-FOXOWQ4K.js";import{Cb as L,Db as R,G as a,H as A,Kb as q,Pb as J,R as h,Ra as j,T as d,W as C,Wa as N,Y as o,Z as i,Za as x,_ as p,_a as V,da as g,ea as S,ib as w,jb as B,lb as z,n as H,na as m,o as _,oa as u,ob as P,p as k,pb as G,qb as I,ra as D,rb as f,s as M,sa as E,t as y,ta as F,tb as U,ub as W,vb as O,wa as b}from"./chunk-C3IY5EDC.js";var te=(()=>{let e=class e{constructor(n){this.http=n,this.baseUrl=B.baseUrl+"api/Admins/"}getDoctors(){return this.http.get(this.baseUrl+"getDoctors")}getAdmins(){return this.http.get(this.baseUrl+"getAdmins")}addDoctor(n){let l=new x().set("Name",n.name).set("Email",n.email).set("Specialization",n.specialization);return this.http.post(this.baseUrl+"addDoctor",null,{params:l})}addAdmin(n){let l=new x().set("Name",n.name).set("Email",n.email);return this.http.post(this.baseUrl+"addAdmin",null,{params:l})}};e.\u0275fac=function(l){return new(l||e)(k(V))},e.\u0275prov=H({token:e,factory:e.\u0275fac,providedIn:"root"});let t=e;return t})();var ie=()=>({width:"80%"}),oe=()=>({"min-width":"70rem"});function me(t,e){t&1&&(o(0,"tr")(1,"th"),m(2,"Name"),i(),o(3,"th"),m(4,"E-mail"),i(),o(5,"th"),m(6,"Specialization"),i()())}function le(t,e){if(t&1&&(o(0,"tr")(1,"td",18),m(2),i(),o(3,"td",18),m(4),i(),o(5,"td",18),m(6),i()()),t&2){let s=e.$implicit;a(2),u(s.name),a(2),u(s.email),a(2),u(s.specialization)}}function de(t,e){if(t&1&&(o(0,"div",14)(1,"p-table",15),h(2,me,7,0,"ng-template",16)(3,le,7,3,"ng-template",17),i()()),t&2){let s=S();a(),d("value",s.doctors)("tableStyle",b(2,oe))}}function se(t,e){t&1&&(o(0,"div",19)(1,"p"),m(2,"Currently no doctor is added in the app"),i()())}function ce(t,e){t&1&&(o(0,"tr")(1,"th"),m(2,"Name"),i(),o(3,"th"),m(4,"E-mail"),i()())}function pe(t,e){if(t&1&&(o(0,"tr")(1,"td",18),m(2),i(),o(3,"td",18),m(4),i()()),t&2){let s=e.$implicit;a(2),u(s.name),a(2),u(s.email)}}function ue(t,e){if(t&1&&(o(0,"div",14)(1,"p-table",15),h(2,ce,5,0,"ng-template",16)(3,pe,5,2,"ng-template",17),i()()),t&2){let s=S();a(),d("value",s.admins)("tableStyle",b(2,oe))}}function fe(t,e){t&1&&(o(0,"div",19)(1,"p"),m(2,"Currently no admin is added in the app"),i()())}var ne=(()=>{let e=class e{constructor(n,l){this.adminsService=n,this.messageService=l,this.doctorForm=new I({name:new f,email:new f,specialization:new f}),this.adminForm=new I({name:new f,email:new f}),this.isAddDialogVisible=!1,this.isAddAdminDialogVisible=!1}ngOnInit(){this.getDoctors(),this.getAdmins()}createDoctorFromForm(){return{name:this.doctorForm.value.name,email:this.doctorForm.value.email,specialization:this.doctorForm.value.specialization}}createAdminFromForm(){return{name:this.doctorForm.value.name,email:this.doctorForm.value.email}}getDoctors(){this.adminsService.getDoctors().subscribe({next:n=>{this.doctors=n},error:n=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not fetch doctors"})}})}getAdmins(){this.adminsService.getAdmins().subscribe({next:n=>{this.admins=n},error:n=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not fetch admins"})}})}onAddButtonClick(){if(this.doctorForm.valid){let n=this.createDoctorFromForm();this.adminsService.addDoctor(n).subscribe({next:()=>{this.messageService.add({severity:"success",summary:"Success",detail:"Doctor added successfully"}),this.getDoctors()},error:()=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not add doctor"})}})}this.closeAddDialog(),this.doctorForm.reset()}onAddAdminButtonClick(){if(this.adminForm.valid){let n=this.createAdminFromForm();this.adminsService.addAdmin(n).subscribe({next:()=>{this.messageService.add({severity:"success",summary:"Success",detail:"Admin added successfully"}),this.getAdmins()},error:()=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not add admin"})}})}this.closeAddAdminDialog(),this.adminForm.reset()}openAddDialog(){this.isAddDialogVisible=!0}openAddAdminDialog(){this.isAddAdminDialogVisible=!0}closeAddDialog(){this.isAddDialogVisible=!1}closeAddAdminDialog(){this.isAddAdminDialogVisible=!1}};e.\u0275fac=function(l){return new(l||e)(A(te),A(q))},e.\u0275cmp=M({type:e,selectors:[["app-home-admin"]],decls:44,vars:21,consts:[[1,"flex","justify-content-between","flex-wrap","header"],[1,"title","align-items-center"],[1,"flex","align-items-center","justify-content-center","border-round"],["label","Add doctor",1,"add",3,"click"],["header","Add doctor",3,"visibleChange","modal","visible"],[3,"formGroup"],[1,"form-group"],["pInputText","",1,"form-control",3,"formControl"],[1,"p-dialog-footer","mt-2"],["pButton","","type","button","label","Add",1,"p-button-success",3,"click"],["class","flex justify-content-center table",4,"ngIf"],["class","flex justify-content-center",4,"ngIf"],["label","Add admin",1,"add",3,"click"],["header","Add admin",3,"visibleChange","modal","visible"],[1,"flex","justify-content-center","table"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[1,"info"],[1,"flex","justify-content-center"]],template:function(l,r){l&1&&(o(0,"div",0)(1,"div",1)(2,"h3"),m(3,"Doctors"),i()(),o(4,"div",2)(5,"p-button",3),g("click",function(){return r.openAddDialog()}),i(),o(6,"p-dialog",4),F("visibleChange",function(c){return E(r.isAddDialogVisible,c)||(r.isAddDialogVisible=c),c}),o(7,"form",5)(8,"div",6)(9,"label"),m(10,"Name"),i(),p(11,"input",7),i(),o(12,"div",6)(13,"label"),m(14,"Email"),i(),p(15,"input",7),i(),o(16,"div",6)(17,"label"),m(18,"Specialization"),i(),p(19,"input",7),i(),o(20,"div",8)(21,"button",9),g("click",function(){return r.onAddButtonClick()}),i()()()()()(),h(22,de,4,3,"div",10)(23,se,3,0,"div",11),o(24,"div",0)(25,"div",1)(26,"h3"),m(27,"Admins"),i()(),o(28,"div",2)(29,"p-button",12),g("click",function(){return r.openAddAdminDialog()}),i(),o(30,"p-dialog",13),F("visibleChange",function(c){return E(r.isAddAdminDialogVisible,c)||(r.isAddAdminDialogVisible=c),c}),o(31,"form",5)(32,"div",6)(33,"label"),m(34,"Name"),i(),p(35,"input",7),i(),o(36,"div",6)(37,"label"),m(38,"Email"),i(),p(39,"input",7),i(),o(40,"div",8)(41,"button",9),g("click",function(){return r.onAddAdminButtonClick()}),i()()()()()(),h(42,ue,4,3,"div",10)(43,fe,3,0,"div",11)),l&2&&(a(6),C(b(19,ie)),d("modal",!0),D("visible",r.isAddDialogVisible),a(),d("formGroup",r.doctorForm),a(4),d("formControl",r.doctorForm.controls.name),a(4),d("formControl",r.doctorForm.controls.email),a(4),d("formControl",r.doctorForm.controls.specialization),a(3),d("ngIf",r.doctors&&r.doctors.length>0),a(),d("ngIf",r.doctors&&r.doctors.length===0),a(7),C(b(20,ie)),d("modal",!0),D("visible",r.isAddAdminDialogVisible),a(),d("formGroup",r.adminForm),a(4),d("formControl",r.doctorForm.controls.name),a(4),d("formControl",r.doctorForm.controls.email),a(3),d("ngIf",r.admins&&r.admins.length>0),a(),d("ngIf",r.admins&&r.admins.length===0))},dependencies:[j,K,Q,J,Y,U,z,P,G,W,O,$],styles:[".add[_ngcontent-%COMP%]{border-radius:5px}.form-group[_ngcontent-%COMP%]{margin:.3rem}.header[_ngcontent-%COMP%]{margin:3% 10% 1%}"]});let t=e;return t})();var ve=[{path:"",component:ne}],re=(()=>{let e=class e{};e.\u0275fac=function(l){return new(l||e)},e.\u0275mod=y({type:e}),e.\u0275inj=_({imports:[w.forChild(ve),w]});let t=e;return t})();var ze=(()=>{let e=class e{};e.\u0275fac=function(l){return new(l||e)},e.\u0275mod=y({type:e}),e.\u0275inj=_({imports:[N,re,X,Z,L,R,ee]});let t=e;return t})();export{ze as a};
