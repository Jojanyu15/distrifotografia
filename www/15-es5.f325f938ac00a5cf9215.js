(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{JLuJ:function(l,n,u){"use strict";u.r(n);var t=u("CcnG"),o=function(){return function(){}}(),e=u("pMnS"),i=u("oBZk"),r=u("ZZ/e"),c=u("gIcY"),a=u("Ip0R"),s=u("mrSG"),b=u("UPSQ"),p=u("UxPe"),h=u("6/gD"),g=u("ncJE"),m=u("1Vzp"),d=u("sHLR"),f=u("EnSQ"),k=function(){function l(l,n,u,t,o,e,i){var r=this;this.authSvc=l,this.phProvider=n,this.phService=u,this.router=t,this.modalController=o,this.dataService=e,this.actionSheetController=i,this.posts=[],this.categorias=[],this.scateg="",this.phProvider.obtenerPaths().snapshotChanges().subscribe((function(l){r.posts=[],l.map((function(l){var n=l.payload.doc.data();n.docId=l.payload.doc.id,r.posts.push(n)}))}))}return l.prototype.mostrarMenu=function(l){return s.__awaiter(this,void 0,void 0,(function(){var n,u=this;return s.__generator(this,(function(t){switch(t.label){case 0:return(n=[]).push({text:"Ir al perfil",icon:"person",handler:function(){u.goProfile(l.userUid)}}),l.userUid==this.authSvc.getCurrentUser().uid&&n.push({cssClass:"rojo",text:"Eliminar",role:"destructive",icon:"trash",handler:function(){u.phService.deletephoto(l)}}),[4,this.actionSheetController.create({header:"Opciones",buttons:n})];case 1:return[4,t.sent().present()];case 2:return t.sent(),[2]}}))}))},l.prototype.goHD=function(l){window.location.href=l.urlPath},l.prototype.optionsFn=function(){},l.prototype.ngOnInit=function(){this.categorias=this.dataService.loadCategorias(!0)},l.prototype.verComentarios=function(l){return s.__awaiter(this,void 0,void 0,(function(){return s.__generator(this,(function(n){switch(n.label){case 0:return[4,this.modalController.create({component:d.a,componentProps:{post:l}})];case 1:return[4,n.sent().present()];case 2:return[2,n.sent()]}}))}))},l.prototype.goMetadata=function(l){return s.__awaiter(this,void 0,void 0,(function(){return s.__generator(this,(function(n){switch(n.label){case 0:return[4,this.modalController.create({component:m.a,componentProps:{pMetadata:l,metadataEdit:!1}})];case 1:return[4,n.sent().present()];case 2:return[2,n.sent()]}}))}))},l.prototype.goProfile=function(l){return s.__awaiter(this,void 0,void 0,(function(){return s.__generator(this,(function(n){switch(n.label){case 0:return[4,this.modalController.create({component:g.a,componentProps:{uid:l}})];case 1:return[4,n.sent().present()];case 2:return[2,n.sent()]}}))}))},l.prototype.swipePage=function(l){2===l.direction&&this.goMessages()},l.prototype.goMessages=function(){},l.prototype.presentPostPopover=function(){},l.prototype.scrollToTop=function(){},l}(),v=u("ZYCi"),C=t.sb({encapsulation:0,styles:[[".welcome-card[_ngcontent-%COMP%]   img[_ngcontent-%COMP%]{max-height:35vh;overflow:hidden}.escudo[_ngcontent-%COMP%]{width:2.5rem}ion-toolbar[_ngcontent-%COMP%]   .title[_ngcontent-%COMP%]{padding-top:10px;padding-right:40px;width:15rem}.rojo[_ngcontent-%COMP%]{color:red!important}.caja-vacia[_ngcontent-%COMP%]{color:#c7c7c7;padding-top:5%}.caja-vacia[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{font-size:30px}.icono-grande[_ngcontent-%COMP%]{font-size:200px}"]],data:{}});function z(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,2,"ion-select-option",[],null,null,null,i.Y,i.w)),t.tb(1,49152,null,0,r.ob,[t.h,t.k,t.z],{value:[0,"value"]},null),(l()(),t.Lb(2,0,[""," "]))],(function(l,n){l(n,1,0,t.yb(1,"",n.context.$implicit.value,""))}),(function(l,n){l(n,2,0,n.context.$implicit.key)}))}function x(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,10,"ion-grid",[],null,null,null,i.O,i.l)),t.tb(1,49152,null,0,r.A,[t.h,t.k,t.z],null,null),(l()(),t.ub(2,0,null,0,8,"ion-row",[],null,null,null,i.V,i.s)),t.tb(3,49152,null,0,r.jb,[t.h,t.k,t.z],null,null),(l()(),t.ub(4,0,null,0,6,"ion-col",[["class","caja-vacia"],["text-center",""]],null,null,null,i.J,i.g)),t.tb(5,49152,null,0,r.t,[t.h,t.k,t.z],null,null),t.tb(6,16384,null,0,r.e,[t.k],null,null),(l()(),t.ub(7,0,null,0,1,"ion-icon",[["class","icono-grande"],["name","ios-sunny"]],null,null,null,i.Q,i.n)),t.tb(8,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null),(l()(),t.ub(9,0,null,0,1,"p",[],null,null,null,null,null)),(l()(),t.Lb(-1,null,["No hay ninguna fotograf\xeda por ahora, \xa1Publica una!"]))],(function(l,n){l(n,8,0,"ios-sunny")}),null)}function P(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,33,"ion-card",[],null,null,null,i.I,i.e)),t.tb(1,49152,null,0,r.m,[t.h,t.k,t.z],null,null),(l()(),t.ub(2,0,null,0,11,"ion-item",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goProfile(l.parent.context.$implicit.userUid)&&t),t}),i.S,i.p)),t.tb(3,49152,null,0,r.H,[t.h,t.k,t.z],null,null),(l()(),t.ub(4,0,null,0,2,"ion-avatar",[["slot","start"]],null,null,null,i.E,i.b)),t.tb(5,49152,null,0,r.g,[t.h,t.k,t.z],null,null),(l()(),t.ub(6,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),t.ub(7,0,null,0,2,"ion-label",[],null,null,null,i.T,i.q)),t.tb(8,49152,null,0,r.N,[t.h,t.k,t.z],null,null),(l()(),t.Lb(9,0,[""," "])),(l()(),t.ub(10,0,null,0,3,"ion-button",[["fill","clear"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.mostrarMenu(l.parent.context.$implicit)&&t),t}),i.F,i.c)),t.tb(11,49152,null,0,r.k,[t.h,t.k,t.z],{fill:[0,"fill"]},null),(l()(),t.ub(12,0,null,0,1,"ion-icon",[["name","options"]],null,null,null,i.Q,i.n)),t.tb(13,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null),(l()(),t.ub(14,0,null,0,2,"ion-card-content",[],null,null,null,i.H,i.f)),t.tb(15,49152,null,0,r.n,[t.h,t.k,t.z],null,null),(l()(),t.ub(16,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),t.ub(17,0,null,0,16,"div",[],null,null,null,null,null)),(l()(),t.ub(18,0,null,null,15,"ion-segment",[],null,[[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var o=!0;return"ionBlur"===n&&(o=!1!==t.Gb(l,21)._handleBlurEvent(u.target)&&o),"ionChange"===n&&(o=!1!==t.Gb(l,21)._handleChangeEvent(u.target)&&o),o}),i.X,i.t)),t.Ib(5120,null,c.h,(function(l){return[l]}),[r.Mb]),t.tb(20,49152,null,0,r.lb,[t.h,t.k,t.z],null,null),t.tb(21,16384,null,0,r.Mb,[t.k],null,null),(l()(),t.ub(22,0,null,0,3,"ion-segment-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goHD(l.parent.context.$implicit)&&t),t}),i.W,i.u)),t.tb(23,49152,null,0,r.mb,[t.h,t.k,t.z],null,null),(l()(),t.ub(24,0,null,0,1,"ion-icon",[["src","https://image.flaticon.com/icons/svg/1837/1837553.svg"]],null,null,null,i.Q,i.n)),t.tb(25,49152,null,0,r.C,[t.h,t.k,t.z],{src:[0,"src"]},null),(l()(),t.ub(26,0,null,0,3,"ion-segment-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.verComentarios(l.parent.context.$implicit)&&t),t}),i.W,i.u)),t.tb(27,49152,null,0,r.mb,[t.h,t.k,t.z],null,null),(l()(),t.ub(28,0,null,0,1,"ion-icon",[["name","text"]],null,null,null,i.Q,i.n)),t.tb(29,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null),(l()(),t.ub(30,0,null,0,3,"ion-segment-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goMetadata(l.parent.context.$implicit)&&t),t}),i.W,i.u)),t.tb(31,49152,null,0,r.mb,[t.h,t.k,t.z],null,null),(l()(),t.ub(32,0,null,0,1,"ion-icon",[["name","information-circle-outline"]],null,null,null,i.Q,i.n)),t.tb(33,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null)],(function(l,n){l(n,11,0,"clear"),l(n,13,0,"options"),l(n,25,0,"https://image.flaticon.com/icons/svg/1837/1837553.svg"),l(n,29,0,"text"),l(n,33,0,"information-circle-outline")}),(function(l,n){l(n,6,0,null==n.parent.context.$implicit?null:n.parent.context.$implicit.photoCreador),l(n,9,0,null==n.parent.context.$implicit?null:n.parent.context.$implicit.creador),l(n,16,0,null==n.parent.context.$implicit?null:n.parent.context.$implicit.urlPath)}))}function M(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,33,"ion-card",[],null,null,null,i.I,i.e)),t.tb(1,49152,null,0,r.m,[t.h,t.k,t.z],null,null),(l()(),t.ub(2,0,null,0,11,"ion-item",[],null,null,null,i.S,i.p)),t.tb(3,49152,null,0,r.H,[t.h,t.k,t.z],null,null),(l()(),t.ub(4,0,null,0,2,"ion-avatar",[["slot","start"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goProfile(l.parent.context.$implicit.userUid)&&t),t}),i.E,i.b)),t.tb(5,49152,null,0,r.g,[t.h,t.k,t.z],null,null),(l()(),t.ub(6,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),t.ub(7,0,null,0,2,"ion-label",[],null,null,null,i.T,i.q)),t.tb(8,49152,null,0,r.N,[t.h,t.k,t.z],null,null),(l()(),t.Lb(9,0,["",""])),(l()(),t.ub(10,0,null,0,3,"ion-button",[["fill","clear"]],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.mostrarMenu(l.parent.context.$implicit)&&t),t}),i.F,i.c)),t.tb(11,49152,null,0,r.k,[t.h,t.k,t.z],{fill:[0,"fill"]},null),(l()(),t.ub(12,0,null,0,1,"ion-icon",[["name","options"]],null,null,null,i.Q,i.n)),t.tb(13,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null),(l()(),t.ub(14,0,null,0,2,"ion-card-content",[],null,null,null,i.H,i.f)),t.tb(15,49152,null,0,r.n,[t.h,t.k,t.z],null,null),(l()(),t.ub(16,0,null,0,0,"img",[],[[8,"src",4]],null,null,null,null)),(l()(),t.ub(17,0,null,0,16,"div",[],null,null,null,null,null)),(l()(),t.ub(18,0,null,null,15,"ion-segment",[],null,[[null,"ionBlur"],[null,"ionChange"]],(function(l,n,u){var o=!0;return"ionBlur"===n&&(o=!1!==t.Gb(l,21)._handleBlurEvent(u.target)&&o),"ionChange"===n&&(o=!1!==t.Gb(l,21)._handleChangeEvent(u.target)&&o),o}),i.X,i.t)),t.Ib(5120,null,c.h,(function(l){return[l]}),[r.Mb]),t.tb(20,49152,null,0,r.lb,[t.h,t.k,t.z],null,null),t.tb(21,16384,null,0,r.Mb,[t.k],null,null),(l()(),t.ub(22,0,null,0,3,"ion-segment-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goHD(l.parent.context.$implicit)&&t),t}),i.W,i.u)),t.tb(23,49152,null,0,r.mb,[t.h,t.k,t.z],null,null),(l()(),t.ub(24,0,null,0,1,"ion-icon",[["src","https://image.flaticon.com/icons/svg/1837/1837553.svg"]],null,null,null,i.Q,i.n)),t.tb(25,49152,null,0,r.C,[t.h,t.k,t.z],{src:[0,"src"]},null),(l()(),t.ub(26,0,null,0,3,"ion-segment-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.verComentarios(l.parent.context.$implicit)&&t),t}),i.W,i.u)),t.tb(27,49152,null,0,r.mb,[t.h,t.k,t.z],null,null),(l()(),t.ub(28,0,null,0,1,"ion-icon",[["name","text"]],null,null,null,i.Q,i.n)),t.tb(29,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null),(l()(),t.ub(30,0,null,0,3,"ion-segment-button",[],null,[[null,"click"]],(function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goMetadata(l.parent.context.$implicit)&&t),t}),i.W,i.u)),t.tb(31,49152,null,0,r.mb,[t.h,t.k,t.z],null,null),(l()(),t.ub(32,0,null,0,1,"ion-icon",[["name","information-circle-outline"]],null,null,null,i.Q,i.n)),t.tb(33,49152,null,0,r.C,[t.h,t.k,t.z],{name:[0,"name"]},null)],(function(l,n){l(n,11,0,"clear"),l(n,13,0,"options"),l(n,25,0,"https://image.flaticon.com/icons/svg/1837/1837553.svg"),l(n,29,0,"text"),l(n,33,0,"information-circle-outline")}),(function(l,n){l(n,6,0,null==n.parent.context.$implicit?null:n.parent.context.$implicit.photoCreador),l(n,9,0,null==n.parent.context.$implicit?null:n.parent.context.$implicit.creador),l(n,16,0,null==n.parent.context.$implicit?null:n.parent.context.$implicit.urlPath)}))}function _(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,4,"div",[],null,null,null,null,null)),(l()(),t.jb(16777216,null,null,1,null,P)),t.tb(2,16384,null,0,a.k,[t.P,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.jb(16777216,null,null,1,null,M)),t.tb(4,16384,null,0,a.k,[t.P,t.L],{ngIf:[0,"ngIf"]},null)],(function(l,n){var u=n.component;l(n,2,0,(null==n.context.$implicit?null:n.context.$implicit.categoria)==u.scateg),l(n,4,0,""==u.scateg)}),null)}function E(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,12,"ion-header",[],null,null,null,i.P,i.m)),t.tb(1,49152,null,0,r.B,[t.h,t.k,t.z],null,null),(l()(),t.ub(2,0,null,0,10,"ion-toolbar",[["text-center",""]],null,null,null,i.fb,i.C)),t.tb(3,49152,null,0,r.Cb,[t.h,t.k,t.z],null,null),t.tb(4,16384,null,0,r.e,[t.k],null,null),(l()(),t.ub(5,0,null,0,4,"ion-buttons",[["slot","start"]],null,null,null,i.G,i.d)),t.tb(6,49152,null,0,r.l,[t.h,t.k,t.z],null,null),(l()(),t.ub(7,0,null,0,2,"ion-button",[],null,null,null,i.F,i.c)),t.tb(8,49152,null,0,r.k,[t.h,t.k,t.z],null,null),(l()(),t.ub(9,0,null,0,0,"img",[["class","escudo"],["slot","start"],["src","../../assets/icons/escudoUD.svg"]],null,null,null,null,null)),(l()(),t.ub(10,0,null,0,2,"ion-title",[],null,null,null,i.eb,i.B)),t.tb(11,49152,null,0,r.Ab,[t.h,t.k,t.z],null,null),(l()(),t.ub(12,0,null,0,0,"img",[["class","title"],["src","../../assets/icons/distrifotografia.svg"]],null,null,null,null,null)),(l()(),t.ub(13,0,null,null,20,"ion-content",[["class","contenido"]],null,null,null,i.K,i.h)),t.tb(14,49152,null,0,r.u,[t.h,t.k,t.z],null,null),(l()(),t.ub(15,0,null,0,14,"ion-item",[["text-wrap",""]],null,null,null,i.S,i.p)),t.tb(16,49152,null,0,r.H,[t.h,t.k,t.z],null,null),t.tb(17,16384,null,0,r.e,[t.k],null,null),(l()(),t.ub(18,0,null,0,2,"ion-label",[["color","primary"],["position","center"]],null,null,null,i.T,i.q)),t.tb(19,49152,null,0,r.N,[t.h,t.k,t.z],{color:[0,"color"],position:[1,"position"]},null),(l()(),t.Lb(-1,0,["Categor\xeda"])),(l()(),t.ub(21,0,null,0,8,"ion-select",[["interface","popover"],["placeholder",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"ionChange"],[null,"ionBlur"]],(function(l,n,u){var o=!0,e=l.component;return"ionBlur"===n&&(o=!1!==t.Gb(l,23)._handleBlurEvent(u.target)&&o),"ionChange"===n&&(o=!1!==t.Gb(l,23)._handleChangeEvent(u.target)&&o),"ngModelChange"===n&&(o=!1!==(e.scateg=u)&&o),"ionChange"===n&&(o=!1!==e.optionsFn()&&o),o}),i.Z,i.v)),t.tb(22,49152,null,0,r.nb,[t.h,t.k,t.z],{interface:[0,"interface"],placeholder:[1,"placeholder"]},null),t.tb(23,16384,null,0,r.Mb,[t.k],null,null),t.Ib(1024,null,c.h,(function(l){return[l]}),[r.Mb]),t.tb(25,671744,null,0,c.l,[[8,null],[8,null],[8,null],[6,c.h]],{model:[0,"model"]},{update:"ngModelChange"}),t.Ib(2048,null,c.i,null,[c.l]),t.tb(27,16384,null,0,c.j,[[4,c.i]],null,null),(l()(),t.jb(16777216,null,0,1,null,z)),t.tb(29,278528,null,0,a.j,[t.P,t.L,t.s],{ngForOf:[0,"ngForOf"]},null),(l()(),t.jb(16777216,null,0,1,null,x)),t.tb(31,16384,null,0,a.k,[t.P,t.L],{ngIf:[0,"ngIf"]},null),(l()(),t.jb(16777216,null,0,1,null,_)),t.tb(33,278528,null,0,a.j,[t.P,t.L,t.s],{ngForOf:[0,"ngForOf"]},null)],(function(l,n){var u=n.component;l(n,19,0,"primary","center"),l(n,22,0,"popover",""),l(n,25,0,u.scateg),l(n,29,0,u.categorias),l(n,31,0,0==u.posts.length),l(n,33,0,u.posts)}),(function(l,n){l(n,21,0,t.Gb(n,27).ngClassUntouched,t.Gb(n,27).ngClassTouched,t.Gb(n,27).ngClassPristine,t.Gb(n,27).ngClassDirty,t.Gb(n,27).ngClassValid,t.Gb(n,27).ngClassInvalid,t.Gb(n,27).ngClassPending)}))}function $(l){return t.Mb(0,[(l()(),t.ub(0,0,null,null,1,"app-tab1",[],null,null,null,E,C)),t.tb(1,114688,null,0,k,[b.a,p.a,h.a,v.m,r.Hb,f.a,r.a],null,null)],(function(l,n){l(n,1,0)}),null)}var w=t.qb("app-tab1",k,$,{},{},[]);u.d(n,"Tab1PageModuleNgFactory",(function(){return y}));var y=t.rb(o,[],(function(l){return t.Db([t.Eb(512,t.j,t.cb,[[8,[e.a,w]],[3,t.j],t.x]),t.Eb(4608,a.m,a.l,[t.u,[2,a.x]]),t.Eb(4608,r.c,r.c,[t.z,t.g]),t.Eb(4608,r.Hb,r.Hb,[r.c,t.j,t.q]),t.Eb(4608,r.Lb,r.Lb,[r.c,t.j,t.q]),t.Eb(4608,c.p,c.p,[]),t.Eb(1073742336,a.b,a.b,[]),t.Eb(1073742336,r.Eb,r.Eb,[]),t.Eb(1073742336,c.o,c.o,[]),t.Eb(1073742336,c.e,c.e,[]),t.Eb(1073742336,v.n,v.n,[[2,v.s],[2,v.m]]),t.Eb(1073742336,o,o,[]),t.Eb(1024,v.k,(function(){return[[{path:"",component:k}]]}),[])])}))}}]);