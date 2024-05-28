import{a as oe}from"./chunk-4FGUXDIU.js";import{a as j,b as ve,c as Oe,d as he,e as Be,f as q,g as je}from"./chunk-FOXOWQ4K.js";import{Ab as ge,B as xe,Cb as Te,Db as Me,Fa as W,G as s,H as h,Ha as H,Kb as B,Nb as Ne,Ob as ke,Pa as te,Pb as M,Qa as Ee,Qb as Ae,R as u,Ra as I,S as G,Sa as ie,T as p,Ta as Pe,Va as ne,W as z,Wa as F,X as K,Y as i,Z as e,Za as T,_ as c,_a as De,a as Q,b as J,ba as k,ca as A,da as b,ea as v,eb as we,fa as X,ga as O,gb as re,ia as Y,ib as be,jb as Ie,ka as Z,la as ee,lb as ae,n as Se,na as n,o as x,oa as C,ob as le,p as Ce,pa as f,pb as se,qb as y,ra as L,rb as m,s as S,sa as U,t as E,ta as $,tb as de,ub as pe,vb as me,w as P,wa as w,wb as Fe,x as D,xb as ce,yb as ue,zb as fe}from"./chunk-C3IY5EDC.js";var R=function(t){return t[t.M=0]="M",t[t.F=1]="F",t}(R||{});var V=(()=>{let l=class l{constructor(r){this.http=r,this.baseUrl=Ie.baseUrl+"Doctors/"}getDoctorIdByEmail(r){let o=new T;return o=o.append("email",r),this.http.get(this.baseUrl,{params:o})}getPatientsByDoctorId(r){let o=new T().set("doctorId",r);return this.http.get(`${this.baseUrl}getPatientsOfDoctor`,{params:o})}getPatientById(r){let o=new T;return o=o.append("id",r),this.http.get(this.baseUrl+"getPatientById",{params:o})}getPatients(){return this.http.get(this.baseUrl+"getAllPatients")}addPatient(r){return this.http.post(this.baseUrl+"addPatient",r)}addPatientToDoctorList(r,o){let d=new T().set("doctorId",o).set("patientId",r);return this.http.put(this.baseUrl+"addPatientToADoctorList",null,{params:d})}deletePatientFromDoctorList(r,o){let d=new T().set("doctorId",o).set("patientId",r);return this.http.delete(this.baseUrl+"deletePatientFromADoctorList",{params:d})}getPrescriptionById(r){let o=new T;return o=o.append("prescriptionId",r),this.http.get(this.baseUrl+"getPrescriptionById",{params:o})}addPrescription(r){return this.http.post(this.baseUrl+"addPrescription",r)}updatePrescription(r){return this.http.post(this.baseUrl+"updatePrescription",r)}deletePrescription(r){let o=new T;return o=o.append("id",r),this.http.delete(this.baseUrl+"removePrescription",{params:o})}};l.\u0275fac=function(o){return new(o||l)(Ce(De))},l.\u0275prov=Se({token:l,factory:l.\u0275fac,providedIn:"root"});let t=l;return t})();var Ye=()=>({"min-width":"70rem"});function Ze(t,l){t&1&&(i(0,"tr")(1,"th"),n(2,"Name"),e(),i(3,"th"),n(4,"Phone Number"),e(),i(5,"th"),n(6,"Gender"),e(),i(7,"th"),n(8,"Date of birth"),e(),i(9,"th"),n(10,"Actions"),e()())}function et(t,l){if(t&1){let a=A();i(0,"tr",7),b("click",function(){let o=P(a).$implicit,d=v(2);return D(d.onPatientClick(o.id))}),i(1,"td",8),n(2),e(),i(3,"td",8),n(4),e(),i(5,"td",8),n(6),e(),i(7,"td",8),n(8),W(9,"date"),e(),i(10,"td")(11,"button",9),b("click",function(o){let d=P(a).$implicit,g=v(2);return D(g.onDeletePatient(d.id,o))}),e()()()}if(t&2){let a=l.$implicit,r=v(2);s(2),C(a.name),s(2),C(a.phoneNumber),s(2),C(r.mapGender(a.gender)),s(2),C(H(9,5,a.dateOfBirth,"dd-MM-yyyy")),s(3),p("text",!0)}}function tt(t,l){if(t&1&&(i(0,"div",3)(1,"p-table",4),u(2,Ze,11,0,"ng-template",5)(3,et,12,8,"ng-template",6),e()()),t&2){let a=v();s(),p("value",a.patients)("tableStyle",w(2,Ye))}}function it(t,l){t&1&&(i(0,"div",10)(1,"p"),n(2,"Currently no patient is added inside your list."),e()())}var Le=(()=>{let l=class l{constructor(r,o,d,g){this.doctorsService=r,this.accountService=o,this.messageService=d,this.router=g,this.isAddDialogVisible=!1,this.patientForm=new y({name:new m,phoneNumber:new m,address:new m,gender:new m,dateOfBirth:new m})}ngOnInit(){this.getDoctorIdByEmail()}getDoctorIdByEmail(){this.accountService.currentUserEmail$.subscribe(r=>{r&&this.doctorsService.getDoctorIdByEmail(r).subscribe({next:o=>{this.doctorId=o.id,this.getPatients()},error:o=>{console.error(o)}})})}getPatients(){this.doctorId?this.doctorsService.getPatientsByDoctorId(this.doctorId).subscribe({next:r=>{this.patients=r},error:r=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not fetch patients"})}}):console.error("Doctor ID is not set.")}mapGender(r){return r===R.M?"M":"F"}onAddButtonClick(){let r=J(Q({},this.patientForm.value),{dateOfBirth:new Date(this.patientForm.value.dateOfBirth).toISOString(),gender:Number(this.patientForm.value.gender)});this.patientForm.valid&&this.doctorsService.addPatient(r).subscribe({complete:()=>{this.messageService.add({severity:"success",summary:"Success",detail:"Patient added successfully"})},error:()=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not add patient"})}}),this.closeAddDialog(),this.patientForm.reset()}onDeletePatient(r,o){this.doctorId&&(o.stopPropagation(),this.doctorsService.deletePatientFromDoctorList(r,this.doctorId).subscribe({next:()=>{this.getPatients()},error:d=>{this.getPatients()}}))}onPatientClick(r){this.router.navigate(["/doctor/patient",r])}openAddDialog(){this.isAddDialogVisible=!0}closeAddDialog(){this.isAddDialogVisible=!1}};l.\u0275fac=function(o){return new(o||l)(h(V),h(oe),h(B),h(re))},l.\u0275cmp=S({type:l,selectors:[["app-home-doctor"]],decls:5,vars:2,consts:[[1,"title"],["class","flex justify-content-center table",4,"ngIf"],["class","flex justify-content-center",4,"ngIf"],[1,"flex","justify-content-center","table"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[2,"cursor","pointer",3,"click"],[1,"info"],["pButton","","type","button","icon","pi pi-trash","label","Delete patient from my list",1,"p-button-rounded","p-button-danger",3,"click","text"],[1,"flex","justify-content-center"]],template:function(o,d){o&1&&(i(0,"div",0)(1,"h3"),n(2,"My Patients"),e()(),u(3,tt,4,3,"div",1)(4,it,3,0,"div",2)),o&2&&(s(3),p("ngIf",d.patients&&d.patients.length>0),s(),p("ngIf",d.patients&&d.patients.length===0))},dependencies:[I,j,M,q,ne],styles:[".form-group[_ngcontent-%COMP%]{margin:.3rem}.table[_ngcontent-%COMP%], .info[_ngcontent-%COMP%]{text-align:center}.title[_ngcontent-%COMP%]{margin-left:10rem;margin-top:1.7rem;margin-bottom:1rem}"]});let t=l;return t})();var nt=["*",[["p-header"]],[["p-footer"]]],rt=["*","p-header","p-footer"];function ot(t,l){t&1&&k(0)}function at(t,l){if(t&1&&(i(0,"div",8),O(1,1),u(2,ot,1,0,"ng-container",6),e()),t&2){let a=v();s(2),p("ngTemplateOutlet",a.headerTemplate)}}function lt(t,l){t&1&&k(0)}function st(t,l){if(t&1&&(i(0,"div",9),n(1),u(2,lt,1,0,"ng-container",6),e()),t&2){let a=v();s(),f(" ",a.header," "),s(),p("ngTemplateOutlet",a.titleTemplate)}}function dt(t,l){t&1&&k(0)}function pt(t,l){if(t&1&&(i(0,"div",10),n(1),u(2,dt,1,0,"ng-container",6),e()),t&2){let a=v();s(),f(" ",a.subheader," "),s(),p("ngTemplateOutlet",a.subtitleTemplate)}}function mt(t,l){t&1&&k(0)}function ct(t,l){t&1&&k(0)}function ut(t,l){if(t&1&&(i(0,"div",11),O(1,2),u(2,ct,1,0,"ng-container",6),e()),t&2){let a=v();s(2),p("ngTemplateOutlet",a.footerTemplate)}}var Ue=(()=>{class t{el;header;subheader;style;styleClass;headerFacet;footerFacet;templates;headerTemplate;titleTemplate;subtitleTemplate;contentTemplate;footerTemplate;constructor(a){this.el=a}ngAfterContentInit(){this.templates.forEach(a=>{switch(a.getType()){case"header":this.headerTemplate=a.template;break;case"title":this.titleTemplate=a.template;break;case"subtitle":this.subtitleTemplate=a.template;break;case"content":this.contentTemplate=a.template;break;case"footer":this.footerTemplate=a.template;break;default:this.contentTemplate=a.template;break}})}getBlockableElement(){return this.el.nativeElement.children[0]}static \u0275fac=function(r){return new(r||t)(h(xe))};static \u0275cmp=S({type:t,selectors:[["p-card"]],contentQueries:function(r,o,d){if(r&1&&(Y(d,Ne,5),Y(d,ke,5),Y(d,M,4)),r&2){let g;Z(g=ee())&&(o.headerFacet=g.first),Z(g=ee())&&(o.footerFacet=g.first),Z(g=ee())&&(o.templates=g)}},hostAttrs:[1,"p-element"],inputs:{header:"header",subheader:"subheader",style:"style",styleClass:"styleClass"},ngContentSelectors:rt,decls:9,vars:10,consts:[[3,"ngClass","ngStyle"],["class","p-card-header",4,"ngIf"],[1,"p-card-body"],["class","p-card-title",4,"ngIf"],["class","p-card-subtitle",4,"ngIf"],[1,"p-card-content"],[4,"ngTemplateOutlet"],["class","p-card-footer",4,"ngIf"],[1,"p-card-header"],[1,"p-card-title"],[1,"p-card-subtitle"],[1,"p-card-footer"]],template:function(r,o){r&1&&(X(nt),i(0,"div",0),u(1,at,3,1,"div",1),i(2,"div",2),u(3,st,3,2,"div",3)(4,pt,3,2,"div",4),i(5,"div",5),O(6),u(7,mt,1,0,"ng-container",6),e(),u(8,ut,3,1,"div",7),e()()),r&2&&(K(o.styleClass),p("ngClass","p-card p-component")("ngStyle",o.style),G("data-pc-name","card"),s(),p("ngIf",o.headerFacet||o.headerTemplate),s(2),p("ngIf",o.header||o.titleTemplate),s(),p("ngIf",o.subheader||o.subtitleTemplate),s(3),p("ngTemplateOutlet",o.contentTemplate),s(),p("ngIf",o.footerFacet||o.footerTemplate))},dependencies:[te,I,Pe,ie],styles:[`@layer primeng{.p-card-header img{width:100%}}
`],encapsulation:2,changeDetection:0})}return t})(),$e=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=E({type:t});static \u0275inj=x({imports:[F,Ae]})}return t})();var gt=["*"],We=(()=>{class t{style;styleClass;layout="horizontal";type="solid";align;containerClass(){return{"p-divider p-component":!0,"p-divider-horizontal":this.layout==="horizontal","p-divider-vertical":this.layout==="vertical","p-divider-solid":this.type==="solid","p-divider-dashed":this.type==="dashed","p-divider-dotted":this.type==="dotted","p-divider-left":this.layout==="horizontal"&&(!this.align||this.align==="left"),"p-divider-center":this.layout==="horizontal"&&this.align==="center"||this.layout==="vertical"&&(!this.align||this.align==="center"),"p-divider-right":this.layout==="horizontal"&&this.align==="right","p-divider-top":this.layout==="vertical"&&this.align==="top","p-divider-bottom":this.layout==="vertical"&&this.align==="bottom"}}static \u0275fac=function(r){return new(r||t)};static \u0275cmp=S({type:t,selectors:[["p-divider"]],hostAttrs:[1,"p-element"],inputs:{style:"style",styleClass:"styleClass",layout:"layout",type:"type",align:"align"},ngContentSelectors:gt,decls:3,vars:6,consts:[["role","separator",3,"ngClass","ngStyle"],[1,"p-divider-content"]],template:function(r,o){r&1&&(X(),i(0,"div",0)(1,"div",1),O(2),e()()),r&2&&(K(o.styleClass),p("ngClass",o.containerClass())("ngStyle",o.style),G("aria-orientation",o.layout)("data-pc-name","divider"))},dependencies:[te,ie],styles:[`@layer primeng{.p-divider-horizontal{display:flex;width:100%;position:relative;align-items:center}.p-divider-horizontal:before{position:absolute;display:block;top:50%;left:0;width:100%;content:""}.p-divider-horizontal.p-divider-left{justify-content:flex-start}.p-divider-horizontal.p-divider-right{justify-content:flex-end}.p-divider-horizontal.p-divider-center{justify-content:center}.p-divider-content{z-index:1}.p-divider-vertical{min-height:100%;margin:0 1rem;display:flex;position:relative;justify-content:center}.p-divider-vertical:before{position:absolute;display:block;top:0;left:50%;height:100%;content:""}.p-divider-vertical.p-divider-top{align-items:flex-start}.p-divider-vertical.p-divider-center{align-items:center}.p-divider-vertical.p-divider-bottom{align-items:flex-end}.p-divider-solid.p-divider-horizontal:before{border-top-style:solid}.p-divider-solid.p-divider-vertical:before{border-left-style:solid}.p-divider-dashed.p-divider-horizontal:before{border-top-style:dashed}.p-divider-dashed.p-divider-vertical:before{border-left-style:dashed}.p-divider-dotted.p-divider-horizontal:before{border-top-style:dotted}.p-divider-dotted.p-divider-horizontal:before{border-left-style:dotted}}
`],encapsulation:2,changeDetection:0})}return t})(),He=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=E({type:t});static \u0275inj=x({imports:[F]})}return t})();var bt=()=>({width:"25rem"}),_t=()=>({width:"75rem"});function St(t,l){if(t&1&&(i(0,"li")(1,"p")(2,"strong"),n(3,"Name:"),e(),n(4),e(),i(5,"p")(6,"strong"),n(7,"Concentration:"),e(),n(8),e(),i(9,"p")(10,"strong"),n(11,"Dosage:"),e(),n(12),e(),i(13,"p")(14,"strong"),n(15,"Frequency:"),e(),n(16),e()()),t&2){let a=l.$implicit;s(4),f(" ",a.name,""),s(4),f(" ",a.concentration," mg"),s(4),f(" ",a.dosage," quantity"),s(4),f(" every ",a.frequency," hours")}}function Ct(t,l){if(t&1&&(i(0,"div")(1,"h4"),n(2,"Drugs"),e(),i(3,"ul"),u(4,St,17,4,"li",31),e()()),t&2){let a=v(2);s(4),p("ngForOf",a.detailedPrescription.drugs)}}function xt(t,l){if(t&1&&(i(0,"div")(1,"h3"),n(2),e(),i(3,"p")(4,"strong"),n(5,"Duration:"),e(),n(6),e(),i(7,"p")(8,"strong"),n(9,"Creation Date:"),e(),n(10),W(11,"date"),e(),u(12,Ct,5,1,"div",2),e()),t&2){let a=v();s(2),C(a.detailedPrescription.name),s(4),f(" ",a.detailedPrescription.duration," days"),s(4),f(" ",H(11,4,a.detailedPrescription.creationDate,"dd/MM/yyyy"),""),s(2),p("ngIf",a.detailedPrescription.drugs&&a.detailedPrescription.drugs.length>0)}}function Et(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function Pt(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function Dt(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function wt(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function It(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function Ft(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function Tt(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function Mt(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function Nt(t,l){if(t&1&&(i(0,"option",32),n(1),e()),t&2){let a=l.$implicit;p("value",a),s(),f("",a," hours")}}function kt(t,l){t&1&&(i(0,"td",39),n(1,"This patient has currently no prescriptions"),e())}function At(t,l){if(t&1&&(i(0,"tr")(1,"th"),n(2,"Prescription's name"),e(),i(3,"th"),n(4,"Actions"),e()(),i(5,"tr"),u(6,kt,2,0,"td",38),e()),t&2){let a=v(2);s(6),p("ngIf",a.patient.prescriptions.length===0)}}function Ot(t,l){if(t&1){let a=A();i(0,"tr",40),b("click",function(){let o=P(a).$implicit,d=v(2);return D(d.onPrescriptionClick(o))}),i(1,"td"),n(2),e(),i(3,"td")(4,"button",41),b("click",function(o){let d=P(a).$implicit,g=v(2);return D(g.onDeletePrescription(d.id,o))}),e()()()}if(t&2){let a=l.$implicit;s(2),f(" ",a.name," "),s(2),p("text",!0)}}function Bt(t,l){if(t&1&&(i(0,"div",33)(1,"p-card")(2,"h1"),n(3),e(),c(4,"p-divider"),i(5,"div",34)(6,"div")(7,"p"),n(8),e(),i(9,"p"),n(10),e(),i(11,"p"),n(12),e(),i(13,"p"),n(14),W(15,"date"),e()()(),i(16,"div",35)(17,"p-table",32,0),u(19,At,7,1,"ng-template",36)(20,Ot,5,2,"ng-template",37),e()()()()),t&2){let a=v();s(3),C(a.patient.name),s(5),f("Phone number: ",a.patient.phoneNumber,""),s(2),f("Address: ",a.patient.address,""),s(2),f("Gender: ",a.getGenderDisplay(a.patient.gender),""),s(2),f("Birth date: ",H(15,6,a.patient.dateOfBirth,"dd/MM/yyyy"),""),s(3),p("value",a.patient.prescriptions)}}var Re=(()=>{let l=class l{constructor(r,o,d){this.doctorsService=r,this.activatedRoute=o,this.messageService=d,this.isPrescriptionDialogVisible=!1,this.isAddPrescriptionDialogVisible=!1,this.frequencies=[1,2,3,4,6,8,12,24,36,48],this.prescriptionForm=new y({name:new m,duration:new m,creationDate:new m,drug1:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug2:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug3:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug4:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug5:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug6:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug7:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug8:new y({name:new m,concentration:new m,dosage:new m,frequency:new m}),drug9:new y({name:new m,concentration:new m,dosage:new m,frequency:new m})})}ngOnInit(){this.getPatient()}getGenderDisplay(r){return r===0?"M":"F"}getPatient(){this.activatedRoute.paramMap.subscribe(r=>{this.patientId=r.get("id"),this.patientId&&this.doctorsService.getPatientById(this.patientId).subscribe({next:o=>{this.patient=o},error:o=>{console.error(o)}})})}onPrescriptionClick(r){this.selectedPrescription=r,this.showPrescriptionDetails()}onAddPrescriptionClick(){this.showAddPrescriptionDialog()}onDeletePrescription(r,o){o.stopPropagation(),this.doctorsService.deletePrescription(r).subscribe({next:()=>{this.getPatient()},error:d=>{this.getPatient()}})}onSubmitButtonClick(){let r={patientId:this.patientId,name:this.prescriptionForm.value.name,duration:this.prescriptionForm.value.duration,creationDate:new Date(this.prescriptionForm.value.creationDate).toISOString(),drugs:[]};for(let o in this.prescriptionForm.value)if(o.startsWith("drug")){let d=this.prescriptionForm.value[o];d.name&&d.concentration&&d.dosage&&d.frequency&&r.drugs.push(d)}r.drugs.length>0&&this.prescriptionForm.valid?this.doctorsService.addPrescription(r).subscribe({complete:()=>{this.hideAddPrescriptionDialog(),this.messageService.add({severity:"success",summary:"Success",detail:"Prescription added successfully"}),this.getPatient()},error:()=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not add prescription"})}}):this.messageService.add({severity:"error",summary:"Error",detail:"Prescription must contain at least one drug with all fields filled"}),this.prescriptionForm.reset()}showPrescriptionDetails(){this.isPrescriptionDialogVisible=!0,this.selectedPrescription&&this.doctorsService.getPrescriptionById(this.selectedPrescription?.id).subscribe({next:r=>{this.detailedPrescription=r,console.log(this.detailedPrescription)},error:r=>{console.error(r)}})}showAddPrescriptionDialog(){this.isAddPrescriptionDialogVisible=!0}hideAddPrescriptionDialog(){this.isAddPrescriptionDialogVisible=!1,this.getPatient()}};l.\u0275fac=function(o){return new(o||l)(h(V),h(we),h(B))},l.\u0275cmp=S({type:l,selectors:[["app-patient"]],decls:222,vars:25,consts:[["dt",""],["header","Prescription's details",3,"visibleChange","modal","visible"],[4,"ngIf"],["header","Add prescription",3,"visibleChange","modal","visible"],[1,"form",3,"formGroup"],[1,"form-group","m"],["pInputText","",1,"form-control",3,"formControl"],["pInputNumber","",1,"form-control",3,"formControl"],["type","date",1,"form-control",3,"formControl"],["formGroupName","drug1"],[1,"form-group","row"],[1,"col-3"],["pInputText","","formControlName","name",1,"form-control"],["pInputNumber","","formControlName","concentration",1,"form-control"],["pInputNumber","","formControlName","dosage",1,"form-control"],["formControlName","frequency",1,"form-control"],[3,"value",4,"ngFor","ngForOf"],["formGroupName","drug2"],["formGroupName","drug3"],["formGroupName","drug4"],["formGroupName","drug5"],["formGroupName","drug6"],["formGroupName","drug7"],["formGroupName","drug8"],["formGroupName","drug9"],[1,"p-dialog-footer","mt-2"],["pButton","","type","button","label","Submit",1,"p-button-success",3,"click"],[1,"page"],[1,"flex","justify-content-end","flex-wrap"],["label","Add new prescription",1,"add-pp",3,"click"],["class","card",4,"ngIf"],[4,"ngFor","ngForOf"],[3,"value"],[1,"card"],[1,"flex","justify-content-between"],["id","table"],["pTemplate","header"],["pTemplate","body"],["colspan","4",4,"ngIf"],["colspan","4"],[1,"clickable-row",3,"click"],["pButton","","type","button","icon","pi pi-trash","label","Delete prescription",1,"p-button-rounded","p-button-danger",3,"click","text"]],template:function(o,d){o&1&&(i(0,"p-dialog",1),$("visibleChange",function(_){return U(d.isPrescriptionDialogVisible,_)||(d.isPrescriptionDialogVisible=_),_}),u(1,xt,13,7,"div",2),e(),i(2,"p-dialog",3),$("visibleChange",function(_){return U(d.isAddPrescriptionDialogVisible,_)||(d.isAddPrescriptionDialogVisible=_),_}),i(3,"span"),n(4,"For a drug to be saved into the prescriptions, all values must be completed."),e(),i(5,"form",4)(6,"div",5)(7,"label"),n(8,"Name"),e(),c(9,"input",6),e(),i(10,"div",5)(11,"label"),n(12,"Duration(in days)"),e(),c(13,"input",7),e(),i(14,"div",5)(15,"label"),n(16,"Creation Date"),e(),c(17,"input",8),e(),i(18,"div",5)(19,"p"),n(20,"Drug no.1"),e(),i(21,"div",9)(22,"div",10)(23,"div",11)(24,"label"),n(25,"Name"),e(),c(26,"input",12),e(),i(27,"div",11)(28,"label"),n(29,"Concentration(mg)"),e(),c(30,"input",13),e(),i(31,"div",11)(32,"label"),n(33,"Dosage"),e(),c(34,"input",14),e(),i(35,"div",11)(36,"label"),n(37,"Frequency"),e(),i(38,"select",15),u(39,Et,2,2,"option",16),e()()()()(),i(40,"div",5)(41,"p"),n(42,"Drug no.2"),e(),i(43,"div",17)(44,"div",10)(45,"div",11)(46,"label"),n(47,"Name"),e(),c(48,"input",12),e(),i(49,"div",11)(50,"label"),n(51,"Concentration"),e(),c(52,"input",13),e(),i(53,"div",11)(54,"label"),n(55,"Dosage"),e(),c(56,"input",14),e(),i(57,"div",11)(58,"label"),n(59,"Frequency"),e(),i(60,"select",15),u(61,Pt,2,2,"option",16),e()()()()(),i(62,"div",5)(63,"p"),n(64,"Drug no.3"),e(),i(65,"div",18)(66,"div",10)(67,"div",11)(68,"label"),n(69,"Name"),e(),c(70,"input",12),e(),i(71,"div",11)(72,"label"),n(73,"Concentration"),e(),c(74,"input",13),e(),i(75,"div",11)(76,"label"),n(77,"Dosage"),e(),c(78,"input",14),e(),i(79,"div",11)(80,"label"),n(81,"Frequency"),e(),i(82,"select",15),u(83,Dt,2,2,"option",16),e()()()()(),i(84,"div",5)(85,"p"),n(86,"Drug no.4"),e(),i(87,"div",19)(88,"div",10)(89,"div",11)(90,"label"),n(91,"Name"),e(),c(92,"input",12),e(),i(93,"div",11)(94,"label"),n(95,"Concentration"),e(),c(96,"input",13),e(),i(97,"div",11)(98,"label"),n(99,"Dosage"),e(),c(100,"input",14),e(),i(101,"div",11)(102,"label"),n(103,"Frequency"),e(),i(104,"select",15),u(105,wt,2,2,"option",16),e()()()()(),i(106,"div",5)(107,"p"),n(108,"Drug no.5"),e(),i(109,"div",20)(110,"div",10)(111,"div",11)(112,"label"),n(113,"Name"),e(),c(114,"input",12),e(),i(115,"div",11)(116,"label"),n(117,"Concentration"),e(),c(118,"input",13),e(),i(119,"div",11)(120,"label"),n(121,"Dosage"),e(),c(122,"input",14),e(),i(123,"div",11)(124,"label"),n(125,"Frequency"),e(),i(126,"select",15),u(127,It,2,2,"option",16),e()()()()(),i(128,"div",5)(129,"p"),n(130,"Drug no.6"),e(),i(131,"div",21)(132,"div",10)(133,"div",11)(134,"label"),n(135,"Name"),e(),c(136,"input",12),e(),i(137,"div",11)(138,"label"),n(139,"Concentration"),e(),c(140,"input",13),e(),i(141,"div",11)(142,"label"),n(143,"Dosage"),e(),c(144,"input",14),e(),i(145,"div",11)(146,"label"),n(147,"Frequency"),e(),i(148,"select",15),u(149,Ft,2,2,"option",16),e()()()()(),i(150,"div",5)(151,"p"),n(152,"Drug no.7"),e(),i(153,"div",22)(154,"div",10)(155,"div",11)(156,"label"),n(157,"Name"),e(),c(158,"input",12),e(),i(159,"div",11)(160,"label"),n(161,"Concentration"),e(),c(162,"input",13),e(),i(163,"div",11)(164,"label"),n(165,"Dosage"),e(),c(166,"input",14),e(),i(167,"div",11)(168,"label"),n(169,"Frequency"),e(),i(170,"select",15),u(171,Tt,2,2,"option",16),e()()()()(),i(172,"div",5)(173,"p"),n(174,"Drug no.8"),e(),i(175,"div",23)(176,"div",10)(177,"div",11)(178,"label"),n(179,"Name"),e(),c(180,"input",12),e(),i(181,"div",11)(182,"label"),n(183,"Concentration"),e(),c(184,"input",13),e(),i(185,"div",11)(186,"label"),n(187,"Dosage"),e(),c(188,"input",14),e(),i(189,"div",11)(190,"label"),n(191,"Frequency"),e(),i(192,"select",15),u(193,Mt,2,2,"option",16),e()()()()(),i(194,"div",5)(195,"p"),n(196,"Drug no.9"),e(),i(197,"div",24)(198,"div",10)(199,"div",11)(200,"label"),n(201,"Name"),e(),c(202,"input",12),e(),i(203,"div",11)(204,"label"),n(205,"Concentration"),e(),c(206,"input",13),e(),i(207,"div",11)(208,"label"),n(209,"Dosage"),e(),c(210,"input",14),e(),i(211,"div",11)(212,"label"),n(213,"Frequency"),e(),i(214,"select",15),u(215,Nt,2,2,"option",16),e()()()()(),i(216,"div",25)(217,"button",26),b("click",function(){return d.onSubmitButtonClick()}),e()()()(),i(218,"div",27)(219,"div",28)(220,"p-button",29),b("click",function(){return d.onAddPrescriptionClick()}),e()(),u(221,Bt,21,9,"div",30),e()),o&2&&(z(w(23,bt)),p("modal",!0),L("visible",d.isPrescriptionDialogVisible),s(),p("ngIf",d.detailedPrescription),s(),z(w(24,_t)),p("modal",!0),L("visible",d.isAddPrescriptionDialogVisible),s(3),p("formGroup",d.prescriptionForm),s(4),p("formControl",d.prescriptionForm.controls.name),s(4),p("formControl",d.prescriptionForm.controls.duration),s(4),p("formControl",d.prescriptionForm.controls.creationDate),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(22),p("ngForOf",d.frequencies),s(6),p("ngIf",d.patient))},dependencies:[Ee,I,j,ve,M,he,de,fe,ge,ae,ue,le,se,pe,me,ce,Fe,Ue,We,q,ne],styles:[".page[_ngcontent-%COMP%]{margin:20px}  .p-button{border-radius:5px}.add-pp[_ngcontent-%COMP%]{margin-bottom:1%}.m[_ngcontent-%COMP%]{margin-bottom:2%}.form[_ngcontent-%COMP%]{margin:2%}p[_ngcontent-%COMP%]{margin-bottom:.5%}"]});let t=l;return t})();var jt=()=>({width:"80%"}),qt=()=>({"min-width":"70rem"});function Vt(t,l){t&1&&(i(0,"tr")(1,"th"),n(2,"Name"),e(),i(3,"th"),n(4,"Phone Number"),e(),i(5,"th"),n(6,"Actions"),e()())}function Gt(t,l){if(t&1){let a=A();i(0,"tr")(1,"td",20),n(2),e(),i(3,"td",20),n(4),e(),i(5,"td")(6,"button",21),b("click",function(o){let d=P(a).$implicit,g=v(2);return D(g.onAddPatientToMyList(d.id,o))}),e()()()}if(t&2){let a=l.$implicit;s(2),C(a.name),s(2),C(a.phoneNumber),s(2),p("text",!0)}}function zt(t,l){if(t&1&&(i(0,"div",16)(1,"p-table",17),u(2,Vt,7,0,"ng-template",18)(3,Gt,7,3,"ng-template",19),e()()),t&2){let a=v();s(),p("value",a.patients)("tableStyle",w(2,qt))}}function Lt(t,l){t&1&&(i(0,"div",22)(1,"p"),n(2,"Currently no patient is added in the app"),e()())}var Qe=(()=>{let l=class l{constructor(r,o,d,g){this.doctorsService=r,this.accountService=o,this.messageService=d,this.router=g,this.isAddDialogVisible=!1,this.patientForm=new y({name:new m,phoneNumber:new m,address:new m,gender:new m,dateOfBirth:new m})}ngOnInit(){this.getDoctorIdByEmail()}getDoctorIdByEmail(){this.accountService.currentUserEmail$.subscribe(r=>{r&&this.doctorsService.getDoctorIdByEmail(r).subscribe({next:o=>{this.doctorId=o.id,this.getPatients()},error:o=>{console.error(o)}})})}getPatients(){this.doctorsService.getPatients().subscribe({next:r=>{this.patients=r},error:r=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not fetch patients"})}})}mapGender(r){return r===R.M?"M":"F"}onAddButtonClick(){let r=J(Q({},this.patientForm.value),{dateOfBirth:new Date(this.patientForm.value.dateOfBirth).toISOString(),gender:Number(this.patientForm.value.gender)});this.patientForm.valid&&this.doctorsService.addPatient(r).subscribe({complete:()=>{this.messageService.add({severity:"success",summary:"Success",detail:"Patient added in the database successfully"}),this.getPatients()},error:()=>{this.messageService.add({severity:"error",summary:"Error",detail:"Could not add patient in the database"})}}),this.closeAddDialog(),this.patientForm.reset()}onAddPatientToMyList(r,o){this.doctorId&&(o.stopPropagation(),this.doctorsService.addPatientToDoctorList(r,this.doctorId).subscribe({}))}openAddDialog(){this.isAddDialogVisible=!0}closeAddDialog(){this.isAddDialogVisible=!1}};l.\u0275fac=function(o){return new(o||l)(h(V),h(oe),h(B),h(re))},l.\u0275cmp=S({type:l,selectors:[["app-all-patients"]],decls:36,vars:11,consts:[[1,"flex","justify-content-between","flex-wrap","header"],[1,"title","align-items-center"],[1,"flex","align-items-center","justify-content-center","border-round"],["label","Add patient",1,"add",3,"click"],["header","Add patient",3,"visibleChange","modal","visible"],[3,"formGroup"],[1,"form-group"],["pInputText","",1,"form-control",3,"formControl"],["formControlName","gender",1,"form-control"],["value","0"],["value","1"],["type","date","formControlName","dateOfBirth",1,"form-control"],[1,"p-dialog-footer","mt-2"],["pButton","","type","button","label","Add",1,"p-button-success",3,"click"],["class","flex justify-content-center table",4,"ngIf"],["class","flex justify-content-center",4,"ngIf"],[1,"flex","justify-content-center","table"],[3,"value","tableStyle"],["pTemplate","header"],["pTemplate","body"],[1,"info"],["pButton","","type","button","icon","pi pi-plus","label","Add patient to my list",1,"p-button-rounded","p-button-success",3,"click","text"],[1,"flex","justify-content-center"]],template:function(o,d){o&1&&(i(0,"div",0)(1,"div",1)(2,"h3"),n(3,"Patients available in our database"),e()(),i(4,"div",2)(5,"p-button",3),b("click",function(){return d.openAddDialog()}),e(),i(6,"p-dialog",4),$("visibleChange",function(_){return U(d.isAddDialogVisible,_)||(d.isAddDialogVisible=_),_}),i(7,"form",5)(8,"div",6)(9,"label"),n(10,"Name"),e(),c(11,"input",7),e(),i(12,"div",6)(13,"label"),n(14,"Phone Number"),e(),c(15,"input",7),e(),i(16,"div",6)(17,"label"),n(18,"Address"),e(),c(19,"input",7),e(),i(20,"div",6)(21,"label"),n(22,"Gender"),e(),i(23,"select",8)(24,"option",9),n(25,"M"),e(),i(26,"option",10),n(27,"F"),e()()(),i(28,"div",6)(29,"label"),n(30,"Date of Birth"),e(),c(31,"input",11),e(),i(32,"div",12)(33,"button",13),b("click",function(){return d.onAddButtonClick()}),e()()()()()(),u(34,zt,4,3,"div",14)(35,Lt,3,0,"div",15)),o&2&&(s(6),z(w(10,jt)),p("modal",!0),L("visible",d.isAddDialogVisible),s(),p("formGroup",d.patientForm),s(4),p("formControl",d.patientForm.controls.name),s(4),p("formControl",d.patientForm.controls.phoneNumber),s(4),p("formControl",d.patientForm.controls.address),s(15),p("ngIf",d.patients&&d.patients.length>0),s(),p("ngIf",d.patients&&d.patients.length===0))},dependencies:[I,j,ve,M,he,de,fe,ge,ae,ue,le,se,pe,me,ce,q],styles:[".form-group[_ngcontent-%COMP%]{margin:.3rem}.add[_ngcontent-%COMP%]{border-radius:5px}.header[_ngcontent-%COMP%]{margin:3% 10% 1%}"]});let t=l;return t})();var Ut=[{path:"",component:Le},{path:"patient/:id",component:Re},{path:"patients",component:Qe}],Je=(()=>{let l=class l{};l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=E({type:l}),l.\u0275inj=x({imports:[be.forChild(Ut),be]});let t=l;return t})();var Ke=(()=>{class t{static \u0275fac=function(r){return new(r||t)};static \u0275mod=E({type:t});static \u0275inj=x({imports:[F]})}return t})();var Mi=(()=>{let l=class l{};l.\u0275fac=function(o){return new(o||l)},l.\u0275mod=E({type:l}),l.\u0275inj=x({imports:[F,Je,Oe,Be,Te,Me,$e,He,je,Ke]});let t=l;return t})();export{Mi as a};