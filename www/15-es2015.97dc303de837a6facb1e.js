(window.webpackJsonp=window.webpackJsonp||[]).push([[15],{vtv3:function(l,n,o){"use strict";o.r(n);var u=o("8Y7J");class e{}var t=o("pMnS"),i=o("oBZk"),s=o("ZZ/e"),r=o("DZQ9"),a=o("Wcq6"),c=o("UPSQ");class b{constructor(l,n,o,u,e){this.authSvc=l,this.router=n,this.afAuth=o,this.zone=u,this.pProvider=e}ngOnInit(){}googleLogin(){this.afAuth.auth.signInWithPopup(new a.auth.GoogleAuthProvider).then(l=>{this.pProvider.obtenerUsuario(l.user.uid).get().subscribe(n=>{n.exists||this.pProvider.registrarUsuario({username:l.user.displayName,bio:"\xa1Hola! soy "+l.user.displayName+", Bienvenido a mi perfil",cellphone:null,email:l.user.email,userUid:l.user.uid,photoURL:l.user.photoURL},l.user.uid)}),this.zone.run(()=>{this.router.routeReuseStrategy.shouldReuseRoute=()=>!1,this.router.navigate(["/tabs"])})}).catch(l=>{console.error(l)})}}var g=o("iInd"),p=o("irV9"),d=u.qb({encapsulation:0,styles:[['.login-content[_ngcontent-%COMP%]{--background:url("/../../assets/images/photo.jpg") 0 0/100% no-repeat}.googlelogo[_ngcontent-%COMP%]{font-size:4rem}.escudo[_ngcontent-%COMP%]{padding-top:5px;width:13rem}.logo[_ngcontent-%COMP%]{color:#fff!important;fill:#fff;font-size:24px;font-weight:700;text-align:center}.description[_ngcontent-%COMP%]{color:#fff;font-size:22px;text-align:center}.log-in-button[_ngcontent-%COMP%]{margin-top:20px;padding-left:20px;padding-right:20px;height:60px;font-weight:700}']],data:{}});function h(l){return u.Kb(0,[(l()(),u.sb(0,0,null,null,23,"ion-content",[["class","login-content contenido"],["padding",""]],null,null,null,i.K,i.h)),u.rb(1,49152,null,0,s.u,[u.h,u.k,u.x],null,null),u.rb(2,16384,null,0,s.e,[u.k],null,null),(l()(),u.sb(3,0,null,0,20,"div",[["class","contenido"]],null,null,null,null,null)),(l()(),u.sb(4,0,null,null,10,"ion-row",[],null,null,null,i.V,i.s)),u.rb(5,49152,null,0,s.jb,[u.h,u.k,u.x],null,null),(l()(),u.sb(6,0,null,0,8,"ion-col",[],null,null,null,i.J,i.g)),u.rb(7,49152,null,0,s.t,[u.h,u.k,u.x],null,null),(l()(),u.sb(8,0,null,0,0,"img",[["class","logo"],["src","../../assets/icons/iniciarsesion.svg"]],null,null,null,null,null)),(l()(),u.sb(9,0,null,0,1,"p",[["class","description"]],null,null,null,null,null)),(l()(),u.Jb(-1,null,["\xa1Bienvenido a distrifotografia!"])),(l()(),u.sb(11,0,null,0,1,"p",[["class","description"]],null,null,null,null,null)),(l()(),u.Jb(-1,null,["Una increible aplicaci\xf3n donde podr\xe1s compartir tu experiencia aprendiendo fotograf\xeda y aprender de la experiencia de los dem\xe1s."])),(l()(),u.sb(13,0,null,0,1,"p",[["class","description"]],null,null,null,null,null)),(l()(),u.Jb(-1,null,["Desarrollado por Andrea Segura y Johan Vargas"])),(l()(),u.sb(15,0,null,null,8,"ion-row",[],null,null,null,i.V,i.s)),u.rb(16,49152,null,0,s.jb,[u.h,u.k,u.x],null,null),(l()(),u.sb(17,0,null,0,6,"ion-col",[],null,null,null,i.J,i.g)),u.rb(18,49152,null,0,s.t,[u.h,u.k,u.x],null,null),(l()(),u.sb(19,0,null,0,4,"ion-button",[["class","log-in-button"],["color","light"],["expand","block"],["fill","outline"]],null,[[null,"click"]],(function(l,n,o){var u=!0;return"click"===n&&(u=!1!==l.component.googleLogin()&&u),u}),i.F,i.c)),u.rb(20,49152,null,0,s.k,[u.h,u.k,u.x],{color:[0,"color"],expand:[1,"expand"],fill:[2,"fill"]},null),(l()(),u.sb(21,0,null,0,1,"ion-icon",[["class","googlelogo"],["name","logo-google"]],null,null,null,i.Q,i.n)),u.rb(22,49152,null,0,s.C,[u.h,u.k,u.x],{name:[0,"name"]},null),(l()(),u.Jb(-1,0,[" INGRESA CON GOOGLE "]))],(function(l,n){l(n,20,0,"light","block","outline"),l(n,22,0,"logo-google")}),null)}function f(l){return u.Kb(0,[(l()(),u.sb(0,0,null,null,1,"app-login-page",[],null,null,null,h,d)),u.rb(1,114688,null,0,b,[c.a,g.m,p.a,u.x,r.a],null,null)],(function(l,n){l(n,1,0)}),null)}var x=u.ob("app-login-page",b,f,{},{},[]),m=o("SVse"),C=o("s7LF");class v{}o.d(n,"LoginPagePageModuleNgFactory",(function(){return k}));var k=u.pb(e,[],(function(l){return u.Bb([u.Cb(512,u.j,u.ab,[[8,[t.a,x]],[3,u.j],u.v]),u.Cb(4608,m.m,m.l,[u.s,[2,m.x]]),u.Cb(4608,C.p,C.p,[]),u.Cb(4608,s.c,s.c,[u.x,u.g]),u.Cb(4608,s.Hb,s.Hb,[s.c,u.j,u.p]),u.Cb(4608,s.Lb,s.Lb,[s.c,u.j,u.p]),u.Cb(1073742336,m.b,m.b,[]),u.Cb(1073742336,C.o,C.o,[]),u.Cb(1073742336,C.e,C.e,[]),u.Cb(1073742336,s.Eb,s.Eb,[]),u.Cb(1073742336,g.n,g.n,[[2,g.s],[2,g.m]]),u.Cb(1073742336,v,v,[]),u.Cb(1073742336,e,e,[]),u.Cb(1024,g.k,(function(){return[[{path:"",component:b}]]}),[])])}))}}]);