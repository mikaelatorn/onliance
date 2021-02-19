(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["about"],{"2be1":function(e,t,s){"use strict";s.d(t,"a",(function(){return r}));var r={name:[{required:!0,message:"Name required",trigger:"blur"}],email:[{required:!0,message:"Email required",trigger:"blur"},{type:"email",message:"Invalid email address",trigger:["blur","change"]}],password:[{required:!0,message:"Password required",trigger:"blur"}],newPassword:[{required:!0,message:"Password required",trigger:"blur"},{min:6,message:"Password should be at least 6 characters",trigger:"blur"}],company:[{required:!0,message:"Company name required",trigger:"blur"}],required:[{required:!0,message:"This field is required",trigger:"blur"}]}},b043:function(e,t,s){"use strict";var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"title"},[s("el-button",{staticClass:"topbar-button hidden-sm-and-up",on:{click:function(t){return e.changeDrawer()}}},[s("i",{staticClass:"el-icon-s-fold"})]),s("h2",[e._v(e._s(e.name))])],1)},a=[],n={props:{name:{type:String}},methods:{changeDrawer:function(){this.$root.$emit("update-drawer")}}},o=n,i=s("2877"),l=Object(i["a"])(o,r,a,!1,null,null,null);t["a"]=l.exports},b41f:function(e,t,s){"use strict";s.r(t);var r=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("el-row",[s("TopBar",{attrs:{name:"Settings"}}),s("div",{staticClass:"justify-center inner-row"},[s("el-col",{staticClass:"settings-col",attrs:{xs:22,sm:18,md:12,lg:8}},[s("h4",[e._v("Security")]),s("el-form",{ref:"form",attrs:{rules:e.rules,model:e.security},on:{submit:function(e){e.preventDefault()}}},[s("el-form-item",{attrs:{prop:"newPassword"}},[s("el-input",{staticClass:"padding-small",attrs:{placeholder:"New password",type:"password",name:"newPassword"},model:{value:e.security.newPassword,callback:function(t){e.$set(e.security,"newPassword",t)},expression:"security.newPassword"}})],1),s("el-form-item",{attrs:{prop:"newPasswordRepeat"}},[s("el-input",{staticClass:"padding-small",attrs:{placeholder:"Repeat New password",type:"password",name:"newPasswordRepeat"},model:{value:e.security.newPasswordRepeat,callback:function(t){e.$set(e.security,"newPasswordRepeat",t)},expression:"security.newPasswordRepeat"}})],1),s("div",{staticClass:"button-container"},[s("el-button",{staticClass:"settings-button",attrs:{type:"primary"},on:{click:function(t){return e.changePassword("form")}}},[e._v("Save password")])],1)],1),s("el-divider"),s("h4",[e._v("Account")]),s("p",[e._v("Delete onliance account")]),s("div",{staticClass:"button-container"},[s("el-button",{staticClass:"settings-button",attrs:{type:"primary"},on:{click:function(t){e.deleteAccountDialog=!0}}},[e._v("Delete account")])],1)],1)],1),s("el-dialog",{attrs:{title:"Delete Account",visible:e.deleteAccountDialog},on:{"update:visible":function(t){e.deleteAccountDialog=t}}},[s("p",[e._v("Are you sure you want to delete your account?")]),s("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[s("el-button",{on:{click:function(t){e.deleteAccountDialog=!1}}},[e._v("Cancel")]),s("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.deleteAccount()}}},[e._v("Confirm")])],1)])],1)},a=[],n=s("b043"),o=s("2be1"),i={components:{TopBar:n["a"]},data:function(){var e=this,t=function(t,s,r){""===s?r(new Error("Please input the password again")):s!==e.security.newPassword?r(new Error("Password inputs don't match!")):r()};return{form:{email:""},security:{newPassword:"",newPasswordRepeat:""},deleteAccountDialog:!1,rules:{newPassword:o["a"].newPassword,newPasswordRepeat:[{validator:t,trigger:"blur"}]}}},methods:{deleteAccount:function(){var e=this;this.$store.dispatch("deleteAccount").then((function(){e.$router.push({name:"login"})})).catch((function(t){console.log(t),e.$root.$emit("create-alert",{title:t.message,type:"error"})}))},changePassword:function(e){var t=this;this.$refs[e].validate((function(e){if(console.log(e),!e)return!1;t.$store.dispatch("changePassword",t.security).then((function(e){console.log("done"),t.$root.$emit("create-alert",{title:"Password successfully changed!",type:"success"})})).catch((function(e){console.log(e),t.$root.$emit("create-alert",{title:e.message,type:"error"})}))}))}}},l=i,c=s("2877"),u=Object(c["a"])(l,r,a,!1,null,null,null);t["default"]=u.exports}}]);
//# sourceMappingURL=about.9b08e73b.js.map