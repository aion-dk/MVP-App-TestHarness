(self["webpackChunkMVP_Test_Harness"] = self["webpackChunkMVP_Test_Harness"] || []).push([["src_app_pages_ballot-resealed_ballot-resealed_module_ts"],{

/***/ 32618:
/*!*************************************************************************!*\
  !*** ./src/app/pages/ballot-resealed/ballot-resealed-routing.module.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BallotResealedPageRoutingModule": () => (/* binding */ BallotResealedPageRoutingModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 39895);
/* harmony import */ var _ballot_resealed_page__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ballot-resealed.page */ 30265);




const routes = [
    {
        path: '',
        component: _ballot_resealed_page__WEBPACK_IMPORTED_MODULE_0__.BallotResealedPage
    }
];
let BallotResealedPageRoutingModule = class BallotResealedPageRoutingModule {
};
BallotResealedPageRoutingModule = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.NgModule)({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule],
    })
], BallotResealedPageRoutingModule);



/***/ }),

/***/ 41857:
/*!*****************************************************************!*\
  !*** ./src/app/pages/ballot-resealed/ballot-resealed.module.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BallotResealedPageModule": () => (/* binding */ BallotResealedPageModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ 38583);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/forms */ 3679);
/* harmony import */ var _ionic_angular__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @ionic/angular */ 80476);
/* harmony import */ var _ballot_resealed_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ballot-resealed-routing.module */ 32618);
/* harmony import */ var _ballot_resealed_page__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ballot-resealed.page */ 30265);







let BallotResealedPageModule = class BallotResealedPageModule {
};
BallotResealedPageModule = (0,tslib__WEBPACK_IMPORTED_MODULE_2__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.NgModule)({
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_4__.CommonModule,
            _angular_forms__WEBPACK_IMPORTED_MODULE_5__.FormsModule,
            _ionic_angular__WEBPACK_IMPORTED_MODULE_6__.IonicModule,
            _ballot_resealed_routing_module__WEBPACK_IMPORTED_MODULE_0__.BallotResealedPageRoutingModule
        ],
        declarations: [_ballot_resealed_page__WEBPACK_IMPORTED_MODULE_1__.BallotResealedPage]
    })
], BallotResealedPageModule);



/***/ }),

/***/ 30265:
/*!***************************************************************!*\
  !*** ./src/app/pages/ballot-resealed/ballot-resealed.page.ts ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BallotResealedPage": () => (/* binding */ BallotResealedPage)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 64762);
/* harmony import */ var _raw_loader_ballot_resealed_page_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !raw-loader!./ballot-resealed.page.html */ 4905);
/* harmony import */ var _ballot_resealed_page_scss__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ballot-resealed.page.scss */ 82873);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 37716);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 39895);





let BallotResealedPage = class BallotResealedPage {
    constructor(route) {
        this.route = route;
        this.results = [];
    }
    ngOnInit() {
        fetch('./assets/inputFile/input.json').then(res => res.json()).then(json => {
            this.results = json[0]['ballot_resealed_page'];
        });
    }
    nextbtn() {
        this.route.navigate(['/ballot-fingerprint']);
    }
};
BallotResealedPage.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__.Router }
];
BallotResealedPage = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Component)({
        selector: 'app-ballot-resealed',
        template: _raw_loader_ballot_resealed_page_html__WEBPACK_IMPORTED_MODULE_0__.default,
        styles: [_ballot_resealed_page_scss__WEBPACK_IMPORTED_MODULE_1__.default]
    })
], BallotResealedPage);



/***/ }),

/***/ 82873:
/*!*****************************************************************!*\
  !*** ./src/app/pages/ballot-resealed/ballot-resealed.page.scss ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("ion-content {\n  --padding-bottom: 10px;\n  --padding-end: 0px;\n  --padding-start: 20px;\n  --padding-top: 20px;\n}\n\n.list-question p {\n  font-size: 30px;\n  font-weight: 700;\n  border-bottom: 1px solid;\n  padding-bottom: 12px;\n  margin-bottom: 0px;\n  margin-top: 10px;\n  color: black;\n}\n\n.next-btn {\n  text-align: end;\n}\n\np {\n  padding-bottom: 0px;\n}\n\n.Required-div {\n  font-size: 24px;\n  font-weight: 600;\n  padding-right: 20px;\n  padding-left: 0px;\n}\n\np {\n  font-size: 23px;\n  padding-right: 12px;\n  font-weight: 600;\n  color: #000000;\n  margin-bottom: 0vw;\n}\n\nion-row {\n  font-size: 23px;\n  font-weight: 100;\n  padding-top: 20px;\n  color: #0000006e;\n  margin-bottom: 5vw;\n}\n\n.div-two {\n  padding-top: 25px;\n  text-align: center;\n}\n\n.div-two .div-upr-text p {\n  font-size: 14px;\n  font-weight: 600;\n}\n\n.div-two .div-upr-text ion-icon {\n  font-size: 65px;\n}\n\n.cen-div-text {\n  text-align: start;\n  font-size: 70px;\n  padding-right: 20px;\n}\n\n.div-text-mid {\n  text-align: center;\n  padding-bottom: 20%;\n  font-size: 20px;\n}\n\n.div-text-mid ion-icon {\n  font-size: 11vh;\n}\n\nion-toolbar {\n  height: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhbGxvdC1yZXNlYWxlZC5wYWdlLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDSSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBQUNKOztBQUVJO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0VBQ0Esd0JBQUE7RUFDQSxvQkFBQTtFQUNBLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0FBQ047O0FBR0E7RUFDSSxlQUFBO0FBQUo7O0FBR0E7RUFDSSxtQkFBQTtBQUFKOztBQUdBO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQUFKOztBQUVBO0VBQ0ksZUFBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0VBQ0Esa0JBQUE7QUFDSjs7QUFDQTtFQUNJLGVBQUE7RUFDQSxnQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtBQUVKOztBQUNBO0VBQ0ksaUJBQUE7RUFDQSxrQkFBQTtBQUVKOztBQUtRO0VBQ0ksZUFBQTtFQUNBLGdCQUFBO0FBSFo7O0FBS1E7RUFDSSxlQUFBO0FBSFo7O0FBUUE7RUFDSSxpQkFBQTtFQUNBLGVBQUE7RUFDQSxtQkFBQTtBQUxKOztBQU9BO0VBQ0ksa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGVBQUE7QUFKSjs7QUFLRztFQUNDLGVBQUE7QUFISjs7QUFPQTtFQUNJLGFBQUE7QUFKSiIsImZpbGUiOiJiYWxsb3QtcmVzZWFsZWQucGFnZS5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiaW9uLWNvbnRlbnQge1xyXG4gICAgLS1wYWRkaW5nLWJvdHRvbTogMTBweDtcclxuICAgIC0tcGFkZGluZy1lbmQ6IDBweDtcclxuICAgIC0tcGFkZGluZy1zdGFydDogMjBweDtcclxuICAgIC0tcGFkZGluZy10b3A6IDIwcHg7XHJcbiAgfVxyXG4gIC5saXN0LXF1ZXN0aW9uIHtcclxuICAgIHAge1xyXG4gICAgICBmb250LXNpemU6IDMwcHg7XHJcbiAgICAgIGZvbnQtd2VpZ2h0OiA3MDA7XHJcbiAgICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZDtcclxuICAgICAgcGFkZGluZy1ib3R0b206IDEycHg7XHJcbiAgICAgIG1hcmdpbi1ib3R0b206IDBweDtcclxuICAgICAgbWFyZ2luLXRvcDogMTBweDtcclxuICAgICAgY29sb3I6IGJsYWNrO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbi5uZXh0LWJ0bntcclxuICAgIHRleHQtYWxpZ246IGVuZDtcclxuICAgIFxyXG59XHJcbnB7XHJcbiAgICBwYWRkaW5nLWJvdHRvbTogMHB4O1xyXG4gICAgXHJcbn1cclxuLlJlcXVpcmVkLWRpdntcclxuICAgIGZvbnQtc2l6ZTogMjRweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7IFxyXG4gICAgcGFkZGluZy1yaWdodDogMjBweDtcclxuICAgIHBhZGRpbmctbGVmdDogMHB4O1xyXG59XHJcbnAge1xyXG4gICAgZm9udC1zaXplOiAyM3B4O1xyXG4gICAgcGFkZGluZy1yaWdodDogMTJweDtcclxuICAgIGZvbnQtd2VpZ2h0OiA2MDA7XHJcbiAgICBjb2xvcjogIzAwMDAwMDtcclxuICAgIG1hcmdpbi1ib3R0b206IDB2dztcclxuICB9XHJcbmlvbi1yb3cge1xyXG4gICAgZm9udC1zaXplOiAyM3B4O1xyXG4gICAgZm9udC13ZWlnaHQ6IDEwMDtcclxuICAgIHBhZGRpbmctdG9wOiAyMHB4O1xyXG4gICAgY29sb3I6ICMwMDAwMDA2ZTtcclxuICAgIG1hcmdpbi1ib3R0b206IDV2dztcclxuICB9XHJcbiAgXHJcbi5kaXYtdHdve1xyXG4gICAgcGFkZGluZy10b3A6IDI1cHg7XHJcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XHJcblxyXG4gICAgLmRpdi11cHItdGV4dHtcclxuICAgICAgICAvLyBib3JkZXI6IDJweCBzb2xpZCAjMDAwO1xyXG4gICAgICAgIC8vIG1hcmdpbjogMCAzNSUgMCAzNSU7XHJcbiAgICAgICBcclxuICAgICAgICAvLyBib3JkZXItcmFkaXVzOiA1cHg7XHJcbiAgICAgICAgcHtcclxuICAgICAgICAgICAgZm9udC1zaXplOiAxNHB4O1xyXG4gICAgICAgICAgICBmb250LXdlaWdodDogNjAwO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpb24taWNvbntcclxuICAgICAgICAgICAgZm9udC1zaXplOiA2NXB4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLmNlbi1kaXYtdGV4dCB7XHJcbiAgICB0ZXh0LWFsaWduOiBzdGFydDtcclxuICAgIGZvbnQtc2l6ZTogNzBweDtcclxuICAgIHBhZGRpbmctcmlnaHQ6IDIwcHg7XHJcbiAgfVxyXG4uZGl2LXRleHQtbWlke1xyXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xyXG4gICAgcGFkZGluZy1ib3R0b206IDIwJTtcclxuICAgIGZvbnQtc2l6ZTogMjBweDtcclxuICAgaW9uLWljb257XHJcbiAgICBmb250LXNpemU6IDExdmg7XHJcbiAgIH1cclxuXHJcbn1cclxuaW9uLXRvb2xiYXJ7XHJcbiAgICBoZWlnaHQ6IDEwMHB4O1xyXG59XHJcbiJdfQ== */");

/***/ }),

/***/ 4905:
/*!*******************************************************************************************************!*\
  !*** ./node_modules/raw-loader/dist/cjs.js!./src/app/pages/ballot-resealed/ballot-resealed.page.html ***!
  \*******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<ion-content>\r\n  <div class=\"list-question\">\r\n    <p>{{results.test_results}}</p>\r\n  </div>\r\n  <div class=\"cen-div-text\">\r\n  \r\n    <p>{{results.ydn}}</p>\r\n  \r\n  \r\n  </div>\r\n  <div class=\"Required-div\" style=\"text-align: center\">\r\n    <!-- <p style=\"text-align: start;\">{{results.dbf}}</p> -->\r\n   \r\n  </div>\r\n</ion-content>\r\n<ion-footer >\r\n  <ion-toolbar>\r\n    <ion-row>\r\n      <ion-col size=\"6\" class=\"back-btn\">\r\n        <!-- <ion-button color=\"dark\" (click)=\"passbtn()\">\r\n          {{results.back}}\r\n          <ion-icon slot=\"start\" name=\"refresh-outline\"></ion-icon>\r\n        \r\n        </ion-button> -->\r\n      </ion-col>\r\n      <ion-col size=\"6\" class=\"next-btn\">\r\n        <ion-button color=\"dark\" (click)=\"nextbtn()\">\r\n          {{results.next}}\r\n          <ion-icon slot=\"end\" name=\"chevron-forward-outline\"></ion-icon>\r\n        </ion-button>\r\n      </ion-col>\r\n    </ion-row>\r\n  </ion-toolbar>\r\n</ion-footer>\r\n");

/***/ })

}]);
//# sourceMappingURL=src_app_pages_ballot-resealed_ballot-resealed_module_ts.js.map